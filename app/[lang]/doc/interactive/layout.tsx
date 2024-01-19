import { Metadata } from 'next'
import { LANDING_PATH, siteConfig } from '@/config/site'
import CommonNavbar from '@/app/_components/server-client/navbar'
import CommonDrawer from '@/app/_components/client-only/drawer'
import { TreeSection } from '@/app/_components/client-only/tree-section'
import { docWrapper } from '@/app/_components/server-only/primitives'
import { getTree } from '@/app/_utils/dir-tree'

export const metadata: Metadata = {
  description: 'Interactive Documentation',
  title: {
    default: `Js Interactive`,
    template: `%s - ${siteConfig.name}`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tree = getTree('app/[lang]/doc/interactive', {
    extensions: /\.mdx$/,
  })
  return (
    <div className="relative flex h-screen flex-col">
      {tree && (
        <CommonNavbar
          landingPath={LANDING_PATH}
          tree={tree}
          prefix={
            <CommonDrawer title="Interactive">
              <TreeSection treeProps={tree?.children ?? []} />
            </CommonDrawer>
          }
        />
      )}

      <main className={docWrapper()}>{children}</main>
    </div>
  )
}
