import fs from 'fs';
import path from 'path';

export function mergeMarkdownFiles(inputDir = './output', outputFile = './merged/통합일지.md') {
  if (!fs.existsSync(inputDir)) {
    console.error(`❌ 입력 디렉토리 없음: ${inputDir}`);
    return;
  }

  const files = fs.readdirSync(inputDir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const match = file.match(/week_(\d{1,2})/i);
      const weekNumber = match ? parseInt(match[1], 10) : 999; // 못 찾으면 뒤로 보내기
      return {
        file,
        fullPath: path.join(inputDir, file),
        weekNumber
      };
    })
    .sort((a, b) => a.weekNumber - b.weekNumber); // ✅ 주차 오름차순 정렬

  if (!fs.existsSync('./merged')) fs.mkdirSync('./merged');

  const mergedContent = files.map(({ file, fullPath, weekNumber }) => {
    const content = fs.readFileSync(fullPath, 'utf-8');
    return `# Week ${String(weekNumber).padStart(2, '0')}\n\n${content}\n\n---\n`;
  }).join('\n');

  fs.writeFileSync(outputFile, mergedContent, 'utf-8');
  console.log(`✅ 통합 파일 저장 완료: ${outputFile}`);
}
