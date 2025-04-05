import { json } from '@sveltejs/kit';
import { generateContent } from '$lib/server/prompt-llm';

function now() {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'CET',
    };
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
    return formattedDate.replace(',', '').concat(' CET');
}

export async function GET() {
    try {
        const response = await generateContent();

        const data = {
            timestamp: now(),
            text: response?.replace('\n',''),
        };

        return json(data);
    } catch (error) {
        console.error('Error:', error);
        return json({ error: 'Failed to generate content' }, { status: 500 });
    }
}
