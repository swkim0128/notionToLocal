import dotenv from 'dotenv';
import { fetchJournalEntries } from './notion/fetch.js';
import { exportToMarkdown } from './notion/exportMarkdown.js';
import { mergeMarkdownFiles } from './mergeMarkdownByWeek.js';

dotenv.config();

const getQuarterFromDate = (date) => {
  const month = date.getMonth();
  return Math.floor(month / 3) + 1;
};

const getPreviousQuarter = (date) => {
  let year = date.getFullYear();
  let quarter = getQuarterFromDate(date);

  if (quarter === 1) {
    quarter = 4;
    year -= 1;
  } else {
    quarter -= 1;
  }
  return { year, quarter };
};

const parseArgs = () => {
  const args = process.argv.slice(2);
  const quarterArgIndex = args.findIndex(arg => arg === '--quarter' || arg === '-q');

  if (quarterArgIndex !== -1 && args[quarterArgIndex + 1]) {
    const quarter = parseInt(args[quarterArgIndex + 1], 10);
    if (quarter >= 1 && quarter <= 4) {
      return { year: new Date().getFullYear(), quarter };
    }
  }
  return null;
};

const run = async () => {
  let year, quarter;

  const args = parseArgs();
  if (args) {
    year = args.year;
    quarter = args.quarter;
  } else {
    const prevQuarter = getPreviousQuarter(new Date());
    year = prevQuarter.year;
    quarter = prevQuarter.quarter;
  }

  console.log(`📅 ${year}년 ${quarter}분기 일지를 가져오는 중...`);

  const pages = await fetchJournalEntries(String(year), `${quarter} 분기`);

  if (!pages || pages.length === 0) {
    console.log('📄 가져올 데이터가 없습니다.');
    return;
  }

  console.log(`📄 총 ${pages.length}건의 데이터를 마크다운으로 변환 중...`);
  await exportToMarkdown(pages);
  console.log(`✅ 변환 완료! ./output 폴더를 확인하세요.`);

  console.log('📚 마크다운 파일을 하나로 병합 중...');
  mergeMarkdownFiles();
};

run();