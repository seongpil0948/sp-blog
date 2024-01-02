import { Metadata } from 'next'
import {
  LANDING_PATH,
  NAV_ITEMS_HOME,
  NAV_ITEMS_HOME_MOBILE,
  siteConfig,
} from '@/config/site'
import CommonNavbar from '@/app/_components/server-client/navbar'
import { TreeSection } from '@/app/_components/client-only/tree-section'
import { layout, main } from '@/app/_components/server-only/primitives'
import { CmFooter } from '@/app/_components/server-only/footers'
import CommonDrawer from '@/app/_components/client-only/drawer'
import { getTree } from '@/app/_utils/dir-tree'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "white" },
  //   { media: "(prefers-color-scheme: dark)", color: "black" },
  // ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tree = getTree('app/[lang]/doc/kubernetes', { extensions: /\.mdx$/ })
  console.log(tree)
  return (
    <div className={layout()}>
      <CommonNavbar
        navItems={NAV_ITEMS_HOME}
        landingPath={LANDING_PATH}
        links={siteConfig.links}
        prefix={
          <CommonDrawer
            title="Home"
            sheetProps={{
              placement: 'left',
            }}
          >
            <TreeSection treeProps={tree.children ?? []} />
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
