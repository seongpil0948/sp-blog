import MdxTable from '@/app/[lang]/doc/_utils/table'

export default function TableTopLevel() {
  return (
    <MdxTable
      columns={[
        { key: 'file-name', title: '명칭' },
        { key: 'desc', title: '설명' },
      ]}
      rows={[
        {
          key: '1',
          cells: [
            {
              key: '_providers',
              title: (
                <a href="https://react.dev/learn/scaling-up-with-reducer-and-context">
                  <code>_providers</code>
                </a>
              ),
            },
            { key: '_provider_value', title: 'context 모듈' },
          ],
        },
        {
          key: '2',
          cells: [
            {
              key: '_store',
              title: (
                <a href="https://ko.redux.js.org">
                  <code>_store</code>
                </a>
              ),
            },
            { key: '_store_val', title: 'redux 즉 reducer 모듈' },
          ],
        },
        {
          key: '3',
          cells: [
            {
              key: '_utils',
              title: <code>_utils</code>,
            },
            { key: '_utils_val', title: '플러그인, 예외처리 등 유틸함수 제공' },
          ],
        },
        {
          key: '4',
          cells: [
            {
              key: '[lang]',
              title: (
                <a href="https://nextjs.org/docs/app/building-your-application/routing/internationalization">
                  <code>[lang]</code>
                </a>
              ),
            },
            {
              key: '[lang]_val',
              title: '다국어 지원 목적으로 라우팅 파라미터로 분리된 모듈',
            },
          ],
        },
        {
          key: '5',
          cells: [
            {
              key: 'config',
              title: <code>config</code>,
            },
            {
              key: 'config_val',
              title: '프로젝트 설정과 관련된 전역 변수들을 관리하는 모듈',
            },
          ],
        },
        {
          key: '6',
          cells: [
            {
              key: 'styles',
              title: <code>styles</code>,
            },
            {
              key: 'styles_val',
              title: '전역 스타일을 정의하는 파일',
            },
          ],
        },
        {
          key: '7',
          cells: [
            {
              key: 'locales',
              title: <code>locales</code>,
            },
            {
              key: 'locales_val',
              title: '다국어 지원 문자를 정의하는 파일',
            },
          ],
        },
      ]}
    />
  )
}
