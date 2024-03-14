import { Metadata } from 'next'
import { LANDING_PATH, siteConfig } from '@/config'
import CommonNavbar from '@/app/_components/server-client/navbar'
import {
  docWrapper,
  layout,
  main,
} from '@/app/_components/server-only/primitives'
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
      <CommonNavbar leftTreeOptions={{ dir: 'app/[lang]' }} />
      <main className={main()}>{children}</main>
      <CmFooter />
    </div>
  )
}
