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

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const prompt = `
  As an elite Elliott Wave technician, your mission is to map wave counts with architectural precision. Use the following categorical rules:

  ### STEP 1: LOGICAL HIERARCHY (CORE RULES & GUIDELINES)

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

  ### STEP 2: DEDUCTIVE APPLICATION
  - Objective Analysis: If a CORE RULE is violated, the count is objectively WRONG.
  - Preferred Count: Interpretation satisfying the most rules/guidelines.
  - Alternate Count: The "Plan B" if the preferred count is invalidated.

  ### OUTPUT REQUIREMENTS
  Return RAW JSON ONLY. Accuracy in 'strategy_bullets' is paramount. Do not include coordinates or attempt to draw the wave on the chart.

  {
    "interpretation": {
      "strategy_bullets": [
        "DETECTION: [Identify the asset and main boundary]",
        "REASONING: [Explain how the rules from Step 1 were applied to eliminate alternatives]",
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

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Data,
        },
      },
    ]);

    const text = result.response.text();

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
