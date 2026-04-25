import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || '';
    const genAI = new GoogleGenerativeAI(apiKey);
    
    console.log('--- GEMINI DEBUG ---');
    console.log('Key length:', apiKey.length);
    console.log('Key prefix:', apiKey.substring(0, 7));
    console.log('--------------------');

    const { image } = await req.json(); // base64 image data

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
  As an elite Elliott Wave technician, your mission is to map wave counts with architectural precision. Use the following triangulation logic and categorical rules:

  ### STEP 1: DEFINE THE GRID (0 to 1000)
  - (0,0) = Top-Left pixel. (1000,1000) = Bottom-Right pixel.
  - VISUAL MAP: Main chart body usually lives in Y=50 to Y=700. Indicators (Volume, RSI) live in Y=700 to Y=1000.
  - X-AXIS: 0 is the left edge. 1000 is the right edge (after price labels).

  ### STEP 2: TRIANGULATE COORDINATES
  1. Find the Candle: Locate specific price bars.
  2. Anchor to Wick: For peaks (1, 3, 5, A, C), dot the highest pixel of the upper wick. For troughs (2, 4, B), dot the lowest pixel of the lower wick.
  3. Spatial Awareness: Place labels strictly in the Main Chart area (top 70%).

  ### STEP 3: LOGICAL HIERARCHY (CORE RULES & GUIDELINES)

  #### 1. MOTIVE WAVES (Dir: Larger Trend)
  - IMPULSE RULES:
    - Structure: Always 5 waves. Waves 1, 3, and 5 must be impulses; Wave 3 cannot be a diagonal.
    - Wave 2: Never retraces more than 100% of Wave 1.
    - Wave 3: Must move beyond Wave 1 and is NEVER the shortest wave.
    - Wave 4: Never entering the price territory of Wave 1.
    - Extensions: Typically only one subwave (1, 3, or 5) is extended.
  - IMPULSE GUIDELINES:
    - Alternation: Wave 4 usually differs in pattern from Wave 2.
    - Slope: Wave 3 typically has the steepest slope.
  - DIAGONALS (Overlap Allowed):
    - Ending: Occur in W5 or C; all subwaves are zigzags.
    - Leading: Occur in W1 or A.
    - Rule: Wave 4 usually ends within Wave 1 territory.

  #### 2. CORRECTIVE WAVES (Dir: Against Trend)
  - ZIGZAGS (5-3-5): Wave B never exceeds start of Wave A. Wave C usually ends beyond A.
  - FLATS (3-3-5): Subwave A is never a triangle. Wave B must retrace at least 90% of Wave A.
    - Expanded: B > 105% of A, C ends beyond A.
    - Running: B > 100% of A, C fails to exceed A.
  - TRIANGLES (3-3-3-3-3): Mostly zigzags. Contracting, Barrier (B-D horizontal), or Expanding. Occur only in Wave 4 or B positions.

  ### STEP 4: DEDUCTIVE APPLICATION
  - Objective Analysis: If a CORE RULE is violated, the count is objectively WRONG.
  - Preferred Count: Interpretation satisfying the most rules/guidelines.
  - Alternate Count: The "Plan B" if the preferred count is invalidated.

  ### OUTPUT REQUIREMENTS
  Return RAW JSON ONLY. Accuracy in 'strategy_bullets' and 'waves' is paramount.

  {
    "waves": [
      { "label": "1", "x": numeric, "y": numeric, "type": "impulse" },
      ...
    ],
    "interpretation": {
      "strategy_bullets": [
        "DETECTION: [Identify the asset and main boundary]",
        "REASONING: [Explain how the rules from Step 3 were applied to eliminate alternatives]",
        "OUTLOOK: [Summarize the current wave position and next expected move based on guidelines]"
      ],
      "rules_verified": ["Rule 1", "Rule 2", "Rule 3"],
      "guidelines_observed": "Alternation, channeling, slope, or wave equality.",
      "alternate_count": "Identify the critical level that invalidates this count."
    }
  }
    `;

    const mimeType = image.split(';')[0].split(':')[1] || 'image/png';
    const base64Data = image.split(',')[1];

    // Bypassing the SDK to force v1 stable endpoint
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data,
              },
            },
          ],
        },
      ],
      generation_config: {
        response_mime_type: 'application/json',
      },
    };

    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error('Gemini API Fetch Error:', JSON.stringify(errorData, null, 2));
      throw new Error(errorData.error?.message || `API error: ${apiResponse.status}`);
    }

    const resultData = await apiResponse.json();
    const text = resultData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Clean text in case Gemini adds markdown code blocks
    const cleanJson = text.replace(/```json|```/g, '').trim();

    try {
      const data = JSON.parse(cleanJson);
      return NextResponse.json(data);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError, 'Raw:', text);
      return NextResponse.json(
        { error: 'AI returned non-JSON data', raw: text },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Gemini API Route Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
