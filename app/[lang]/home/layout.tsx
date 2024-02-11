import { Metadata } from 'next'

import { LANDING_PATH, siteConfig } from '@/config/site'
import CommonNavbar from '@/app/_components/server-client/navbar'
import CommonDrawer from '../../_components/client-only/drawer'
import { TreeSection } from '@/app/_components/client-only/tree-section'
import { layout, main } from '@/app/_components/server-only/primitives'
import { CmFooter } from '@/app/_components/server-only/footers'
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
  // const tree = getTree('app/[lang]/', { depth: 1 })
  return (
    <div className={layout()}>
      <CommonNavbar
        // prefix={<div></div>}
        leftTreeOptions={{
          dir: 'app/[lang]',
        }}
      ></CommonNavbar>
      <main id="content-container" className={main()}>
        {children}
      </main>

      <CmFooter />
    </div>
  )
}
