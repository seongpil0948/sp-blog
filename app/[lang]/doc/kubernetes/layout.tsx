import { Metadata } from 'next'
import { LANDING_PATH, siteConfig } from '@/config/site'
import CommonNavbar from '@/app/_components/server-client/navbar'
import { TreeSection } from '@/app/_components/client-only/tree-section'
import { layout, main } from '@/app/_components/server-only/primitives'
import { CmFooter } from '@/app/_components/server-only/footers'
import CommonDrawer from '@/app/_components/client-only/drawer'
import { getTree } from '@/app/_utils/dir-tree'

export const metadata: Metadata = {
  title: {
    default: `Documentation`,
    template: `%s - ${siteConfig.name}`,
  },
  description: 'fucking k8s',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tree = getTree('app/[lang]/doc/kubernetes', { extensions: /\.mdx$/ })
  return (
    <div className={layout()}>
      <CommonNavbar
        tree={tree}
        landingPath={LANDING_PATH}
        links={siteConfig.links}
        prefix={
          <CommonDrawer
            title="Documentation"
            sheetProps={{
              placement: 'left',
            }}
          >
            <TreeSection treeProps={tree?.children ?? []} />
          </CommonDrawer>
        }
      ></CommonNavbar>
      <main id="content-container" className={main()}>
        {children}
      </main>
      <CmFooter />
    </div>
  )
}
