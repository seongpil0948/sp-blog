import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'
import clsx from 'clsx'
import { Providers } from './_providers'

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
  icons: siteConfig.icons,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers
          themeProps={{
            attribute: 'class',
            // defaultTheme: "system",
            defaultTheme: 'dark',
            enableSystem: true,
          }}
        >
          {children}
        </Providers>
      </body>
    </html>
  )
}
