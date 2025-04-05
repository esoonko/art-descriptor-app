import { json, error } from '@sveltejs/kit';
import { generateContent } from '$lib/server/prompt-llm';
import { insertIntoBigQuery, fetchFromBigQuery, dateToDisplay, convertToHistoryData } from '$lib/server/bigquery';
import type { BigqueryData, HistoryData } from '$lib/server/bigquery';
import type { RequestEvent } from '@sveltejs/kit';

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

    const historyData = await fetchFromBigQuery();
    const filteredData = historyData.filter(item => item.page === page);
    return json(filteredData.map(convertToHistoryData));
  } catch (err) {
    console.error('Error:', err);
    return json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
