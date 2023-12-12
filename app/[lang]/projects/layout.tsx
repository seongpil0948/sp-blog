import { Metadata } from 'next'
import {
  LANDING_PATH,
  NAV_ITEMS_HOME,
  NAV_ITEMS_HOME_MOBILE,
  siteConfig,
} from '@/config/site'
import CommonNavbar from '@/app/_components/server-client/navbar'
import CommonDrawer from '../../_components/client-only/drawer'
import { TreeSection } from '@/app/_components/client-only/tree-section'
import { layout, main } from '@/app/_components/server-only/primitives'
import { CmFooter } from '@/app/_components/server-only/footers'

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
            <TreeSection treeProps={NAV_ITEMS_HOME_MOBILE} />
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
