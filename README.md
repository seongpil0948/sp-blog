# Introduction

zz
## TODO
### visudo 서버 적용 admin
###  문서 검색 엔진 적용
1. 파일로부터 텍스트 추출
```ts
const rehype = require('rehype');
const tsxExtractText = require('tsx-extract-text');

// MDX, MD 파일 처리
async function extractTextFromMDX(filePath) {
  const fileContent = await fs.promises.readFile(filePath, 'utf-8');
  const hast = rehype().parse(fileContent);
  const text = hast.children.map(node => node.value).join('\n');
  return text;
}

// TSX 파일 처리
async function extractTextFromTSX(filePath) {
  const fileContent = await fs.promises.readFile(filePath, 'utf-8');
  const text = tsxExtractText(fileContent);
  return text;
}

// 검색 엔진 기능 구현
async function search(query) {
  const files = await fs.promises.readdir('.');
  const results = [];

  for (const file of files) {
    const filePath = path.join('.', file);
    const fileExtension = path.extname(file);

    if (fileExtension === '.mdx' || fileExtension === '.md') {
      const text = await extractTextFromMDX(filePath);
      if (text.includes(query)) {
        results.push({
          filePath,
          text,
        });
      }
    } else if (fileExtension === '.tsx') {
      const text = await extractTextFromTSX(filePath);
      if (text.includes(query)) {
        results.push({
          filePath,
          text,
        });
      }
    }
  }

  return results;
}

// 검색 엔진 실행 예시
const query = '검색';
const results = await search(query);

console.log(results);

```
2. [search engine](https://lunrjs.com/guides/core_concepts.html)

## Technologies Used

- [Next.js 13 (App router)](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [I18N](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [storybook](https://storybook.js.org/recipes/next)
  - https://storybook.js.org/
  - if u want tour, visit [?path=/story/example-button--primary&onboarding=true](http://localhost:6006/?path=/story/example-button--primary&onboarding=true)
- [react-spectrum](https://react-spectrum.adobe.com/react-spectrum/index.html)
  - 모든 기존/신규 기능은 다음 라이브러리를 이용합니다.
- [mdx](https://mdxjs.com/)

## How to Use

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm dev
```

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).

## Refer

- https://github.com/vercel/platforms/blob/main/app/sitemap.ts
