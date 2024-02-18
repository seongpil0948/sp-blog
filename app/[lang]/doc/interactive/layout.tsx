import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { docWrapper } from '@/app/_components/server-only/primitives'

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
  // const tree = getTree('app/[lang]/doc/interactive', { extensions: /\.mdx$/,})
  return <main className={docWrapper()}>{children}</main>
}
