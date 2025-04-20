import dotenv from 'dotenv';
import { fetchJournalEntries } from './notion/fetch.js';
import { exportToMarkdown } from './notion/exportMarkdown.js';

dotenv.config();

const year = '2025';
const quarter = '1 분기';

console.log(`📅 ${year} 기간의 일지를 가져오는 중...`);

const pages = await fetchJournalEntries(year, quarter);

console.log(`📄 총 ${pages.length}건의 데이터를 마크다운으로 변환 중...`);

await exportToMarkdown(pages);

console.log(`✅ 변환 완료! ./output 폴더를 확인하세요.`);
