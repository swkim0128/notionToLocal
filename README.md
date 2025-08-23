# Notion to Markdown Exporter

## 프로젝트 개요

이 프로젝트는 Notion 데이터베이스에서 저널 항목을 가져와 Markdown 파일로 변환한 다음, 해당 파일을 단일 통합 Markdown 문서로 병합하는 Node.js 애플리케이션입니다.

## 주요 기능

*   Notion 데이터베이스에서 콘텐츠를 가져옵니다.
*   가져온 콘텐츠를 개별 Markdown 파일로 변환합니다.
*   변환된 Markdown 파일을 주차별로 정렬하여 하나의 파일로 병합합니다.

## 사용 방법

### 1. 사전 준비

**의존성 설치**

```bash
npm install
```

**.env 파일 생성**

프로젝트 루트 디렉터리에 `.env` 파일을 생성하고 아래 내용을 추가합니다.

```
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
```

### 2. 명령어 안내

**Notion 페이지 가져오기 및 변환**

Notion의 콘텐츠를 가져와서 Markdown 파일로 변환합니다.

```bash
npm start
```

**Markdown 파일 병합**

변환된 Markdown 파일들을 하나의 파일로 병합합니다.

```bash
node merge.js
```
