import { Metadata } from 'next'
import { LANDING_PATH, siteConfig } from '@/config/site'
import CommonNavbar from '@/app/_components/server-client/navbar'
import { layout, main } from '@/app/_components/server-only/primitives'
import { CmFooter } from '@/app/_components/server-only/footers'

export const metadata: Metadata = {
  title: {
    default: `Documentation`,
    template: `%s - kubernetes - ${siteConfig.name}`,
  },
  description: 'fucking k8s',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const tree = getTree('app/[lang]/doc/kubernetes', { extensions: /\.mdx$/ })
  return (
    <div className={layout()}>
      <CommonNavbar
        leftTreeOptions={{
          dir: 'app/[lang]/doc/kubernetes',
        }}
        drawerProps={{
          title: 'Documentation',
        }}
      />
      <main id="content-container" className={main()}>
        {children}
      </main>
      <CmFooter />
    </div>
  )
}
