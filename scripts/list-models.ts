import { config } from 'dotenv';
import path from 'path';

// Load .env from workspace root
config({ path: path.join(process.cwd(), '.env') });

const apiKey = process.env.GEMINI_API_KEY || '';

async function listModels() {
  if (!apiKey) {
    console.error('Error: GEMINI_API_KEY not found in environment variables.');
    return;
  }

  try {
    // The @google/generative-ai SDK does not natively support listModels().
    // We use the REST API endpoint directly to list available models.
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: any = await response.json();

    console.log('Available Models:');
    if (data.models && Array.isArray(data.models)) {
      data.models.forEach((m: any) => {
        // Only show models that support content generation
        if (m.supportedGenerationMethods.includes('generateContent')) {
          console.log(`- ${m.name}`);
        }
      });
    } else {
      console.log('No models found in the response.');
    }
  } catch (error) {
    console.error('Error listing models:', error);
  }
}

listModels();
