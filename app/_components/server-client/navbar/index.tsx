import CommonClientNavbar from './client'
import { CommonNavbarProps } from './types'
import { clsx, type ClassValue } from 'clsx'
import { navbar } from './theme'
import { getTree } from '@/app/_utils/dir-tree'
import { LANDING_PATH, siteConfig } from '@/config/site'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export default function CommonNavbar(props: CommonNavbarProps) {
  const { tree, links, leftTreeOptions } = props
  const { base, content, brand, item } = navbar()

  const treeTop = tree ?? getTree({ dir: 'app/[lang]', options: { depth: 3 } })
  const treeLeft = getTree(leftTreeOptions)

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
      treeLeft={treeLeft}
      drawerProps={{
        sheetProps: {
          isDismissable: true,
          isKeyboardDismissDisabled: true,
          shouldBlockScroll: false,
        },
      }}
    />
  )
}
