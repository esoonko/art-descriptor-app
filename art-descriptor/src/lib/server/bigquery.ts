import { BigQuery, BigQueryTimestamp } from '@google-cloud/bigquery';
import { loadConfig } from './config';
import { env } from '$env/dynamic/private';

const { bigqueryConfig } = loadConfig();

export interface BigqueryData {
    timestamp: string | BigQueryTimestamp;  // Ensure timestamp can be a string or BigQueryTimestamp
    text: string;
    page: string;
}

export interface HistoryData {
    timestamp: string;  // or Date if you prefer
    text: string;
    page: string
  }

  const bigquery = new BigQuery({
    projectId: env.PROJECT_ID,
  });

export async function fetchFromBigQuery(): Promise<BigqueryData[]> {
    try {
        const query = `SELECT * FROM \`${bigqueryConfig.dataset}.${bigqueryConfig.table}\` ORDER BY generated_timestamp desc`;

        // Run the query
        const [rows] = await bigquery.query(query);

        // Convert rows to HistoryData format
        const bigqueryData: BigqueryData[] = rows.map((row: any) => ({
            timestamp: row.generated_timestamp,
            text: row.description,
            page: row.page
        }));
        return bigqueryData;
    } catch (error) {
        console.error('Error fetching data from BigQuery:', error);
        throw new Error('Failed to fetch data from BigQuery');
    }
}

export async function insertIntoBigQuery(data: BigqueryData) {
    try {
        const rows = [
            {
                generated_timestamp: data.timestamp,
                page: data.page,
                description: data.text
            }
        ];

        // Insert the rows into BigQuery
        await bigquery
            .dataset(bigqueryConfig.dataset)
            .table(bigqueryConfig.table)
            .insert(rows);

        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data into BigQuery:', error);
    }
}

export function dateToDisplay(dateString: string) {
    const date = new Date(dateString);
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
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
    return formattedDate.replace(',', '').concat(' CET');
}

export function convertToHistoryData(bigqueryData: BigqueryData): HistoryData {
  const timestampValue = typeof bigqueryData.timestamp === 'object' && 'value' in bigqueryData.timestamp
      ? bigqueryData.timestamp.value
      : bigqueryData.timestamp;

  return {
      timestamp: dateToDisplay(timestampValue),
      text: bigqueryData.text,
      page: bigqueryData.page
  };
}