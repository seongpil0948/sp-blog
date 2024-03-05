import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'
import '@/styles/globals.scss'

import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { fontSans, fontMono, roboto } from '@/config/fonts'
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
  metadataBase: new URL('https://www.peachhub.love'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta
        name="naver-site-verification"
        content="a1cd903032b0efba5543fddeb9533e90d0812859"
      />
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7483273776022909"
          crossOrigin="anonymous"
        />
        <script async src="http://localhost:8097"></script>
      </head>
      <body
        className={clsx(
          'min-h-screen bg-background antialiased',
          fontSans.className,
          fontMono.className,
          roboto.className,
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
