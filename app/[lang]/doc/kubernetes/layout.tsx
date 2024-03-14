import { Metadata } from 'next'
import { LANDING_PATH, siteConfig } from '@/config'
import { layout, docWrapper } from '@/app/_components/server-only/primitives'

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
  return <main className={docWrapper()}>{children}</main>
}
