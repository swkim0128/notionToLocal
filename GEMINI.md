# GEMINI.md

## 프로젝트 개요

이 프로젝트는 Notion 데이터베이스에서 저널 항목을 가져와 Markdown 파일로 변환한 다음 해당 파일을 단일 통합 Markdown 문서로 병합하도록 설계된 Node.js 애플리케이션입니다. Notion API와 상호 작용하기 위해 `@notionhq/client`를 사용하고 Notion 형식을 Markdown으로 변환하기 위해 `notion-to-md`를 사용합니다.

작업 흐름은 다음과 같습니다.
1.  `index.js`: 프로세스를 조정하는 기본 스크립트입니다. 특정 연도 및 분기의 저널 항목을 가져옵니다.
2.  `notion/fetch.js`: Notion API를 사용하여 지정된 Notion 데이터베이스에서 저널 항목을 가져옵니다. "연도" 및 "분기"별로 항목을 필터링합니다.
3.  `notion/exportMarkdown.js`: 가져온 Notion 페이지를 개별 Markdown 파일로 변환합니다. 각 파일의 이름은 페이지 제목을 따릅니다.
4.  `merge.js` 및 `mergeMarkdownByWeek.js`: 이 스크립트는 `output` 디렉터리에서 개별 Markdown 파일을 가져와 주 번호로 정렬하고 `merged` 디렉터리에 `통합일지.md`라는 단일 파일로 병합합니다.

## 빌드 및 실행

**의존성:**
*   `@notionhq/client`: Notion API에 연결합니다.
*   `dotenv`: 환경 변수(API 키, 데이터베이스 ID)를 관리합니다.
*   `notion-to-md`: Notion 페이지를 Markdown으로 변환합니다.

**설정:**
1.  의존성 설치: `npm install`
2.  루트 디렉터리에 다음 변수를 사용하여 `.env` 파일을 만듭니다.
    ```
    NOTION_API_KEY=your_notion_api_key
    NOTION_DATABASE_ID=your_notion_database_id
    ```

**애플리케이션 실행:**
*   Notion 페이지를 가져오고 변환하려면: `npm start`
*   변환된 마크다운 파일을 병합하려면: `node merge.js`

## 개발 규칙

*   **ES 모듈:** 프로젝트는 ES 모듈(`import`/`export` 구문)을 사용합니다. 이는 `package.json`에서 `"type": "module"`로 지정됩니다.
*   **파일 이름 지정:** 파일 이름은 카멜케이스(`mergeMarkdownByWeek.js`) 또는 소문자(`index.js`, `fetch.js`)를 사용합니다.
*   **코드 스타일:** 코드는 2칸 들여쓰기로 서식이 지정됩니다. ESLint 또는 Prettier와 같은 린터는 사용하지 않지만 스타일은 일관됩니다.
*   **오류 처리:** `mergeMarkdownByWeek.js`에서 입력 디렉터리의 존재를 확인하는 것과 같은 기본 오류 처리가 있습니다.
*   **구성:** 프로젝트 구성(API 키, 데이터베이스 ID)은 `dotenv` 패키지를 사용하여 환경 변수를 통해 처리됩니다.