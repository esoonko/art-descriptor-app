import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export { generateContent };

const {
    FunctionDeclarationSchemaType,
    HarmBlockThreshold,
    HarmCategory,
    VertexAI
  } = await import('@google-cloud/vertexai');

const PROJECT_ID: string = env.PROJECT_ID || '';
const LOCATION_ID: string = env.LOCATION_ID || '';
const MODEL_ID: string = env.MODEL_ID || '';
const ACCESS_TOKEN: string = env.ACCESS_TOKEN || '';

const vertexAI = new VertexAI({project: PROJECT_ID, location: LOCATION_ID});
  
const generativeModel = vertexAI.getGenerativeModel({
    model: MODEL_ID,
    safetySettings: [{category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE}],
    generationConfig: {maxOutputTokens: 256},
    systemInstruction: {
      role: 'system',
      parts: [{"text": `For example, you are a helpful customer service agent.`}]
    },
});

const generativeModelPreview = vertexAI.preview.getGenerativeModel({
    model: MODEL_ID,
});

async function generateContent() {
    const request = {
        contents: [
            {
                role: 'user',
                parts: [
                    {
                        fileData: {
                            mimeType: 'image/jpeg',
                            fileUri: 'gs://junda-portfolio_art_images/test.jpeg'
                        }
                    },
                    { text: 'Describe max 1 paragraph.' }
                ]
            }
        ],
        systemInstruction: {
            role: 'system',
            parts: [
                {
                    text: 'You describe image. Avoid interpretations. Avoid mentioning it is a digital illustration. Avoid ending your answer with a question. Avoid talking about the style. Do not start the sentence with "this artwork depicts" or any text in such style. Just start describing. Describe max 1 paragraph.'
                }
            ]
        },
        generationConfig: {
            responseModalities: ['TEXT'],
            temperature: 1,
            maxOutputTokens: 8192,
            topP: 0.95
        }
    };

    try {
        const result = await generativeModel.generateContent(request);
        const response = result.response;
        if (response.candidates && response.candidates.length > 0) {
            const text = response.candidates[0].content.parts[0].text;
            console.log('Generated Text:', text);
            return text;
        } else {
            console.error('No candidates found in the response.');
            return 'No content generated.';
        }
    } catch (error) {
        console.error('Error generating content:', error);
    }
}
