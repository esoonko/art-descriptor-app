import { json, error } from '@sveltejs/kit';
import { generateContent } from '$lib/server/prompt-llm';
import { insertIntoBigQuery, dateToDisplay } from '$lib/server/bigquery';
import type { BigqueryData, HistoryData } from '$lib/server/bigquery';
import type { RequestEvent } from '@sveltejs/kit';
import { addToHistoryCache } from '$lib/server/history-cache';

function convertToDisplayData(bigqueryData: BigqueryData): HistoryData {
    const timestampValue = typeof bigqueryData.timestamp === 'object' && 'value' in bigqueryData.timestamp
        ? bigqueryData.timestamp.value
        : bigqueryData.timestamp;
  
    return {
        timestamp: dateToDisplay(timestampValue),
        text: bigqueryData.text,
        page: bigqueryData.page
    };
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

    const bigqueryData: BigqueryData = {
      timestamp: new Date().toISOString(),
      text: response ?? '',
      page: page
    };

    insertIntoBigQuery(bigqueryData)
    const data: HistoryData = convertToDisplayData(bigqueryData)
    addToHistoryCache(data);


    return json(data);
  } catch (err) {
    console.error('Error:', err);
    return json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
