import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import CommonNavbar from '@/app/_components/server-client/navbar'
import { docWrapper } from '@/app/_components/server-only/primitives'

export const metadata: Metadata = {
  description: 'Abacus NextFramework Documentation',
  title: {
    default: `Abacus Next Framework`,
    template: `%s - ${siteConfig.name}`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const tree = getTree('app/[lang]/doc/framework-next', { extensions: /\.mdx$/ })
  return (
    <div className="relative flex h-screen flex-col">
      <CommonNavbar
        leftTreeOptions={{
          dir: 'app/[lang]/doc/framework-next',
        }}
      />

      <main className={docWrapper()}>{children}</main>
    </div>
  )
}
