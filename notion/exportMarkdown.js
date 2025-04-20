import fs from 'fs';
import path from 'path';
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import { NotionConverter } from 'notion-to-md'; // ✅ default import
import { DefaultExporter } from 'notion-to-md/plugins/exporter';

dotenv.config();
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function exportToMarkdown(pages, outputDir = './output') {

  for (const page of pages) {
    const title = page.properties.Title?.title?.[0]?.text.content || page.id;
    const filename = `${title.replace(/\s+/g, '_')}.md`;

    const exporter = new DefaultExporter({
      outputType: 'file',
      outputPath: `./output/${filename}` 
    });

	const n2m = new NotionConverter(notion).withExporter(exporter);
	await n2m.convert(page.id);
  }
}
