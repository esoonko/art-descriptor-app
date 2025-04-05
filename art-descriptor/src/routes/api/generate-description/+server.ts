import { json, error } from '@sveltejs/kit';
import { generateContent } from '$lib/server/prompt-llm';
import type { RequestEvent } from '@sveltejs/kit';

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

export async function GET({ url }: RequestEvent) {
  try {
    const page = url.searchParams.get('page');

    if (!page) {
      return error(400, { message: 'Page parameter is required' });
    }

    const pageNumber = parseInt(page);
    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 4) {
      return error(400, { message: 'Invalid page number. Must be between 1 and 4.' });
    }

    const response = await generateContent(page);

    const data = {
      timestamp: now(),
      text: response,
      page: pageNumber
    };

    return json(data);
  } catch (err) {
    console.error('Error:', err);
    return json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
