import { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Documentation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div id="layout-doc">{children}</div>
}
