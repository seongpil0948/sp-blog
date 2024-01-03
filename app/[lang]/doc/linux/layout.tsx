import { Metadata } from 'next'
import { LANDING_PATH, NAV_ITEMS_HOME, siteConfig } from '@/config/site'
import CommonNavbar from '@/app/_components/server-client/navbar'
import CommonDrawer from '@/app/_components/client-only/drawer'
import { TreeSection } from '@/app/_components/client-only/tree-section'
import { docWrapper } from '@/app/_components/server-only/primitives'
import { getTree } from '@/app/_utils/dir-tree'

export const metadata: Metadata = {
  title: {
    default: `Linux`,
    template: `%s - ${siteConfig.name}`,
  },
  description: 'Linux Documentation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tree = getTree('app/[lang]/doc/linux', {
    extensions: /\.mdx$/,
  })
  return (
    <div className="relative flex h-screen flex-col">
      <CommonNavbar
        landingPath={LANDING_PATH}
        navItems={NAV_ITEMS_HOME}
        prefix={
          <CommonDrawer title="Linux">
            <TreeSection treeProps={tree?.children ?? []} />
          </CommonDrawer>
        }
      />

      <main className={docWrapper()}>{children}</main>
    </div>
  )
}
