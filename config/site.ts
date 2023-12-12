import type { TreeSectionProps } from '@/app/_components/client-only/tree-section'
import { THrefLinks } from '@/types'

export type SiteConfig = typeof siteConfig
export const LANDING_PATH = '/home'
export const siteConfig = {
  name: 'SP-Blog',
  description: 'Make beautiful websites regardless of your design experience.',
  links: {
    github: 'https://github.com/seongpil0948',
    twitter: 'https://www.instagram.com/m_moonggg',
    // docs: '/doc',
    // discord: 'https://discord.gg/9b6yyZKmH4',
    // sponsor: 'https://patreon.com/jrgarciadev',
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
export const NAV_ITEMS_HOME = linkToTree([

  {
    label: 'Doc',
    href: '/doc',
  },
])
export const NAV_ITEMS_HOME_MOBILE = linkToTree([

  {
    label: 'Doc',
    href: '/doc',
  },
  // {
  //   label: 'Logout',
  //   href: '/logout',
  // },
])

export const NEXT_FRAME_MENU_LIST = linkToTree([
  {
    label: 'Getting Started',
    href: '/doc/getting-started',
    children: [],
  },
  {
    label: 'Convention',
    href: '/doc/convention',
    children: [
      {
        label: 'File Structure',
        href: '/doc/convention/structure',
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
        href: '/doc/guide/mdx-sample',
      },
      {
        label: 'Keyword',
        href: '/doc/guide/keyword',
      },
      {
        label: 'Server Client Pattern',
        href: '/doc/guide/server-client-pattern',
      },
      {
        label: 'Customize Theme',
        href: '/doc/guide/customize-theme',
      },
      {
        label: 'Contribute',
        href: '/doc/guide/contribute',
      },
    ],
  },
])
