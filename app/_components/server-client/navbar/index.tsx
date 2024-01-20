import CommonClientNavbar from './client'
import { CommonNavbarProps } from './types'
import { clsx, type ClassValue } from 'clsx'
import { navbar } from './theme'
import { getTree } from '@/app/_utils/dir-tree'
import { LANDING_PATH, siteConfig } from '@/config/site'
import { TreeSection } from '../../client-only/tree-section'
import CommonDrawer from '../../client-only/drawer'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export default function CommonNavbar(props: CommonNavbarProps) {
  const { tree, links, leftTreeOptions } = props
  const { base, content, brand, item } = navbar()

  const treeTop = tree ?? getTree({ dir: 'app/[lang]', options: { depth: 1 } })
  // const treeLeft = getTree('app/[lang]/projects/', { depth: 1 })
  const treeLeft = getTree(leftTreeOptions)
  const prefix = props.prefix ?? (
    <CommonDrawer
      title="Home"
      sheetProps={{
        placement: 'left',
      }}
      {...props.drawerProps}
    >
      <TreeSection treeProps={treeLeft?.children ?? []} />
    </CommonDrawer>
  )
  const landingPath = props.landingPath ?? LANDING_PATH

  const extendedClassNames = {
    base: cn(base(), props.classes?.base),
    content: cn(content(), props.classes?.content),
    brand: cn(brand(), props.classes?.brand),
    item: cn(item(), props.classes?.item),
  } as CommonNavbarProps['classes']

  return (
    <CommonClientNavbar
      {...props}
      classes={extendedClassNames}
      tree={treeTop}
      links={links ?? siteConfig.links}
      landingPath={landingPath}
      prefix={prefix}
    />
  )
}
