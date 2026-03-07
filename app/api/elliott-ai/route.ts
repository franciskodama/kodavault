import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json(); // base64 image data

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
  As a world-class Elliott Wave technician with expertise in deductive reasoning, analyze this chart image to determine the "preferred count." Apply the rules and guidelines from the Wave Principle rigorously to eliminate impossible scenarios and identify the most probable wave structure.

### 1. MOTIVE WAVE ANALYSIS (1-2-3-4-5)
Strictly adhere to these Absolute Rules:
- Wave 2 never moves beyond the start of Wave 1[cite: 17].
- Wave 3 always moves beyond the end of Wave 1 and is never the shortest wave[cite: 18, 19].
- Wave 4 never moves beyond the end of Wave 1[cite: 20].
- Waves 1, 3, and 5 cannot all be extended simultaneously[cite: 21].

Apply these Guidelines for Precision:
- Extension: Identify which wave (1, 3, or 5) is "stretched." Wave 3 is the most common extension; Wave 1 is the least[cite: 29, 32].
- Slope: The center of Wave 3 should have the steepest slope[cite: 28].
- Alternation: Wave 4 should be a different corrective pattern than Wave 2 (e.g., if Wave 2 is a zigzag, Wave 4 is likely a flat or triangle)[cite: 23, 24, 25].
- Channeling: Wave 5 often ends near a parallel line drawn from Wave 3 based on the line connecting Waves 2 and 4[cite: 27].

### 2. CORRECTIVE WAVE ANALYSIS (A-B-C or W-X-Y)
Identify the correction type:
- Zigzag (5-3-5): Wave B never moves beyond the start of Wave A. Wave C usually ends beyond Wave A[cite: 72, 77].
- Flat (3-3-5): Wave B retraces at least 90% of Wave A. Look for "Expanded Flats" where B > 100% of A and C ends beyond A[cite: 87, 91].
- Triangles (3-3-3-3-3): Identify if it is Contracting, Barrier (B and D at the same level), or Expanding. Triangles occur only in Wave 4 or Wave B positions[cite: 93, 105, 109, 155].
- Combinations: If a correction appears too small for the degree, look for a "Double Three" (W-X-Y)[cite: 121, 128].

### 3. TECHNICAL INDICATORS & RATIOS
- Fibonacci: Check if Wave 4 subdivides the impulse into Fibonacci proportions or if Waves 1 and 5 are equal in magnitude when Wave 3 extends[cite: 33, 37].
- Retracements: In diagonals, Waves 2 and 4 usually retrace 0.66 to 0.81 of the preceding wave[cite: 55].

### OUTPUT REQUIREMENTS
Return ONLY a RAW JSON object. Use (x,y) coordinates from 0-1000 where (0,0) is top-left. Align labels precisely with candle peaks/troughs.

{
  "waves": [
    { "label": "1", "x": 0-1000, "y": 0-1000, "type": "impulse" },
    ...
    { "label": "A", "x": 0-1000, "y": 0-1000, "type": "correction" }
  ],
  "interpretation": {
    "preferred_count_reasoning": "Professional explanation using deductive reasoning to eliminate alternatives.",
    "rules_verified": ["Wave 2 < 100% of W1", "W3 is not shortest", "No W4/W1 overlap"],
    "guidelines_observed": "Notes on alternation, extensions, or Fibonacci relationships found.",
    "alternate_count": "Brief mention of the second-best interpretation if the preferred count is violated."
  }
}
    `;

    const imageParts = [
      {
        inlineData: {
          data: image.split(',')[1],
          mimeType: 'image/png',
        },
      },
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

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
