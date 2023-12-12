import { Metadata } from 'next'
import {
  LANDING_PATH,
  NEXT_FRAME_MENU_LIST,
  NAV_ITEMS_HOME,
  siteConfig,
} from '@/config/site'
import CommonNavbar from '@/app/_components/server-client/navbar'
import CommonDrawer from '@/app/_components/client-only/drawer'
import { TreeSection } from '@/app/_components/client-only/tree-section'
import { docWrapper } from '@/app/_components/server-only/primitives'

export const metadata: Metadata = {
  description: 'Documentation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex h-screen flex-col">
      <CommonNavbar
        landingPath={LANDING_PATH}
        navItems={NAV_ITEMS_HOME}
        prefix={
          <CommonDrawer
            title="Doc Drawer"
            sheetProps={{
              placement: 'left',
            }}
          >
            <TreeSection treeProps={NEXT_FRAME_MENU_LIST} />
          </CommonDrawer>
        }
      ></CommonNavbar>
      <main className={docWrapper()}>{children}</main>
    </div>
  )
}
