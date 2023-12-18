import type { TreeSectionProps } from '@/app/_components/client-only/tree-section'
import { uniqueFilter } from '@/app/_utils'
import { THrefLinks } from '@/types'

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

const linkToTree = (links: THrefLinks): TreeSectionProps[] => {
  return links.map((link) => {
    const tree = {
      id: link.href,
      index: 0,
      parentid: '',
      ...link,
    } as TreeSectionProps
    if (link.children) {
      return {
        ...tree,
        children: linkToTree(link.children),
      }
    }
    return tree
  })
}
const NAV_MENUS_HOME = [
  {
    label: 'Doc',
    href: '/doc',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
]
export const NAV_ITEMS_HOME = linkToTree(NAV_MENUS_HOME)
export const NAV_ITEMS_HOME_MOBILE = linkToTree(NAV_MENUS_HOME)

export const NAV_ITEMS_DOC = linkToTree([
  {
    label: 'Write',
    href: '/doc/write',
  },
  {
    label: 'Framework Next',
    href: '/doc/framework-next',
  },
  {
    label: 'Kubernetes',
    href: '/doc/kubernetes',
    children: [
      { label: 'architecture', href: '/doc/kubernetes/architecture' },
      {
        label: 'components', href: '/doc/kubernetes/components', children: [
          { label: 'etcd', href: '/doc/kubernetes/components/etcd' },
        ]
      },
      { label: 'on-premise-1', href: '/doc/kubernetes/on-premise-1' }, ,
      { label: 'workloads', href: '/doc/kubernetes/workloads' },
    ] as THrefLinks
  },
  {
    label: 'Java',
    href: '/doc/java',
  },
  {
    label: 'Interactive',
    href: '/doc/interactive',
    children: [
      {
        label: 'Wave',
        href: '/doc/interactive/wave',
      }
    ]
  },
])

export const NEXT_FRAME_MENU_LIST = linkToTree([
  {
    label: 'Getting Started',
    href: '/doc/framework-next/getting-started',
    children: [],
  },
  {
    label: 'Convention',
    href: '/doc/convention',
    children: [
      {
        label: 'File Structure',
        href: '/doc/framework-next/convention/structure',
      },
      { label: 'Naming', href: '/doc/convention/name' },
    ],
  },
  {
    label: 'Guide',
    href: '/doc/guide',
    children: [
      {
        label: 'Mdx Sample',
        href: '/doc/framework-next/guide/mdx-sample',
      },
      {
        label: 'Keyword',
        href: '/doc/framework-next/guide/keyword',
      },
      {
        label: 'Server Client Pattern',
        href: '/doc/framework-next/guide/server-client-pattern',
      },
      {
        label: 'Customize Theme',
        href: '/doc/framework-next/guide/customize-theme',
      },
      {
        label: 'Contribute',
        href: '/doc/framework-next/guide/contribute',
      },
    ],
  },
])


const reduceLinks = (links: THrefLinks): string[] => {
  return links.reduce((acc, link) => {
    if (link.children) {
      return [...acc, ...reduceLinks(link.children)]
    }
    return [...acc, APP_DOMAIN + link.href]
  }, [] as string[])
}

export const ALL_LINKS = [APP_DOMAIN, ...uniqueFilter(reduceLinks([
  ...NAV_ITEMS_HOME,
  ...NAV_ITEMS_DOC,
  ...NEXT_FRAME_MENU_LIST
]))]
// if (process.env.NEXT_PUBLIC_ENV === 'production') {
//   console.info("getAllLinks: ", ALL_LINKS)
// }