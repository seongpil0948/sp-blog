import type { TreeSectionProps } from '@/app/_components/client-only/tree-section'
import { uniqueFilter } from '@/app/_utils'

// TODO: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
export type SiteConfig = typeof siteConfig
export const LANDING_PATH = '/home'
export const APP_DOMAIN = 'https://www.peachhub.love'

export const siteConfig = {
  name: 'SeongPil Blog',
  short_name: 'SP Blog',
  description: 'my log',
  links: {
    github: 'https://github.com/seongpil0948',
    twitter: 'https://www.instagram.com/m_moonggg',
    // docs: '/doc',
    discord: 'https://discord.gg/9HsQkekR',
    // sponsor: 'https://patreon.com/jrgarciadev',
  },
  sitemap: APP_DOMAIN + '/sitemap.xml',
  start_url: '/',
  display: 'standalone',
  icons: {
    icon: '/favicon.ico',
    shortcut: 'favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}
// return children links recursively
export const reduceChildLinks = (tree: TreeSectionProps): string[] => {
  // return child links
  if (!tree || !tree.href) return []
  if (!tree.children) return [tree.href]

  return tree.children.reduce((acc, link) => {
    if (link.children) {
      acc.push( ...reduceChildLinks(link))
    }
    acc.push(link.href)
    return acc
  }, [] as string[])
}

// if (process.env.NEXT_PUBLIC_ENV === 'production') {
//   console.info("getAllLinks: ", ALL_LINKS)
// }


