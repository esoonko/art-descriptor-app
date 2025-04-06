import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { loadConfig } from './config';

export { generateContent };

const { image_bucket_url, model_id, pages } = loadConfig();

const {
    FunctionDeclarationSchemaType,
    HarmBlockThreshold,
    HarmCategory,
    VertexAI
  } = await import('@google-cloud/vertexai');

const PROJECT_ID: string = env.PROJECT_ID || '';
const LOCATION_ID: string = env.LOCATION_ID || '';
const MODEL_ID: string = model_id

const vertexAI = new VertexAI({project: PROJECT_ID, location: LOCATION_ID});
  
const generativeModel = vertexAI.getGenerativeModel({
    model: MODEL_ID,
    safetySettings: [{category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE}],
    generationConfig: {maxOutputTokens: 256},
    systemInstruction: {
      role: 'system',
      parts: [{"text": `You describe image. Avoid interpretations. Avoid mentioning it is a digital illustration. Avoid ending your answer with a question. Avoid talking about the style. Do not start the sentence with "this artwork depicts" or any text in such style. Just start describing. Describe max 1 paragraph.`}]
    },
});

const generativeModelPreview = vertexAI.preview.getGenerativeModel({
    model: MODEL_ID,
});

function getPageByDenomination(denomination: string) {
    const pageConfig = pages.find((page) => String(page.denomination) === denomination);
    
    if (!pageConfig) {
      throw new Error(`Page with denomination ${denomination} not found`);
    }
  
    return pageConfig;
  }

async function generateContent( page: string ) {
    const pageConfig = getPageByDenomination(page);
    const promptText = pageConfig.prompt || 'Describe max 1 paragraph.';
    const systemPromptText = pageConfig.systemprompt || 'You describe image. Avoid interpretations. Avoid mentioning it is a digital illustration. Avoid ending your answer with a question. Avoid talking about the style. Do not start the sentence with "this artwork depicts" or any text in such style. Just start describing. Describe max 1 paragraph.';

    const request = {
        contents: [
            {
                role: 'user',
                parts: [
                    {
                        fileData: {
                            mimeType: 'image/jpeg',
                            fileUri: `${image_bucket_url}${pageConfig.name}/${pageConfig.image_urls[0]}`
                        }
                    },
                    { text: promptText }
                ]
            }
        ],
        systemInstruction: {
            role: 'system',
            parts: [
                {
                    text: systemPromptText
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
            return text;
        } else {
            console.error('No candidates found in the response.');
            return 'No content generated.';
        }
    } catch (error) {
        console.error('Error generating content:', error);
    }
}
