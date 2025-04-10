import { json, error } from '@sveltejs/kit';
import { fetchFromBigQuery, convertToHistoryData } from '$lib/server/bigquery';
import type { RequestEvent } from '@sveltejs/kit';
import { getHistoryCache, setHistoryCache } from '$lib/server/history-cache-dev';

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

    let historyData = getHistoryCache();  // Try to get history data from cache

    if (!historyData) {  // If cache is empty, fetch from BigQuery
      const bigqueryData = [{
        timestamp: "2025-03-01T01:00:00Z",
        text: "Example text in history",
        page: "1"
    }]
      historyData = bigqueryData.map(convertToHistoryData)
      setHistoryCache(historyData);  // Store in memory for future requests
    }
    const filteredData = historyData.filter(item => item.page === page);
    return json(filteredData);
  } catch (err) {
    console.error('Error:', err);
    return json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
