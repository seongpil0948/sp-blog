//TODO:  https://docsearch.algolia.com/docs/DocSearch-v3
// https://lunrjs.com/guides/core_concepts.html

const rehype = require('rehype')
// const tsxExtractText = require('tsx-extract-text')
const fs = require('fs')

// MDX, MD 파일 처리
async function extractTextFromMDX(filePath) {
  const fileContent = await fs.promises.readFile(filePath, 'utf-8')
  const hast = rehype().parse(fileContent)

  const text = hast.children.map((node) => node.value).join('\n')
  return text
}

async function build() {
  const txt = await extractTextFromMDX('app/[lang]/doc/write/content.mdx')
  console.log(txt)
}

// // TSX 파일 처리
// async function extractTextFromTSX(filePath) {
//   const fileContent = await fs.promises.readFile(filePath, 'utf-8')
//   const text = tsxExtractText(fileContent)
//   return text
// }

// // 검색 엔진 기능 구현
// async function search(query) {
//   const files = await fs.promises.readdir('.')
//   const results = []

//   for (const file of files) {
//     const filePath = path.join('.', file)
//     const fileExtension = path.extname(file)

//     if (fileExtension === '.mdx' || fileExtension === '.md') {
//       const text = await extractTextFromMDX(filePath)
//       if (text.includes(query)) {
//         results.push({
//           filePath,
//           text,
//         })
//       }
//     } else if (fileExtension === '.tsx') {
//       const text = await extractTextFromTSX(filePath)
//       if (text.includes(query)) {
//         results.push({
//           filePath,
//           text,
//         })
//       }
//     }
//   }

//   return results
// }

// // 검색 엔진 실행 예시
// const query = '검색'
// const results = await search(query)
