import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function fetchJournalEntries(year, quarter) {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      and: [
        {
          property: 'Year',
          select: {
            equals: year,
          },
        },
        {
          property: 'Quarter',
          select: {
            equals: quarter,
          },
        }
      ]
    }
  });

  return response.results;
}
