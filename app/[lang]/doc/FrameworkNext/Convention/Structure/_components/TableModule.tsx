import MdxTable from '@/app/[lang]/doc/_utils/table'

export default function TableModule() {
  return (
    <MdxTable
      columns={[
        { key: 'file-name', title: '명칭' },
        { key: 'desc', title: '설명' },
      ]}
      rows={[
        {
          key: 1,
          cells: [
            {
              key: 'page.(mdx|tsx)',
              title: (
                <a href="https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts">
                  <code>page.(mdx|tsx)</code>
                </a>
              ),
            },
            { key: 'page_val', title: '폴더에 해당하는 페이지 파일' },
          ],
        },
        {
          key: 2,
          cells: [
            {
              key: 'layout.(mdx|tsx)',
              title: (
                <a href="https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts">
                  <code>layout.(mdx|tsx)</code>
                </a>
              ),
            },
            { key: 'layout_val', title: '폴더에 해당하는 레이아웃 파일' },
          ],
        },
        {
          key: 3,
          cells: [
            {
              key: '_components/client-only',
              title: (
                <a>
                  <code>_components/client-only</code>
                </a>
              ),
            },
            {
              key: '_components/client-only_val',
              title: '상위 폴더내에서 사용되는 반응형 컴포넌트',
            },
          ],
        },
        {
          key: 4,
          cells: [
            {
              key: '_components/server-only',
              title: (
                <a>
                  <code>_components/server-only</code>
                </a>
              ),
            },
            {
              key: '_components/server-only_val',
              title: '상위 폴더내에서 사용되는 서버 컴포넌트',
            },
          ],
        },
        {
          key: 5,
          cells: [
            {
              key: '_components/server-client',
              title: (
                <a>
                  <code>_components/server-client</code>
                </a>
              ),
            },
            {
              key: '_components/server-client_val',
              title: '서버와 클라이언트 컴포넌트를 기반으로 제작된 컴포넌트',
            },
          ],
        },
      ]}
    />
  )
}
