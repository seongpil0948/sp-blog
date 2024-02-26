'use client'

import { CommonNavbarProps } from './types'
import { AccordionItem, Accordion } from '@nextui-org/accordion'
import CommonDrawer from '../../client-only/drawer'
import { TreeSection, TreeSectionProps } from '../../client-only/tree-section'
import { useRouter, usePathname } from 'next/navigation'
import { isMobile } from '@/app/_utils/responsive'
import { Link } from '@nextui-org/link'

export function PrefixComp(props: CommonNavbarProps): React.ReactNode {
  const router = useRouter()
  const path = usePathname()
  const isM = isMobile()

  const defaultExpandedKeys = path.split('/')
  const { prefix, treeLeft, drawerProps } = props

  if (prefix) {
    return prefix
  }

  if (!treeLeft) {
    return <></>
  }
  const getTitleClass = (label: string) => {
    if (defaultExpandedKeys.includes(label)) {
      return 'text-primary-700 underline'
    } else {
      return ''
    }
  }
  const TitleComp = (props: { item: TreeSectionProps }) => (
    <Link key={props.item.href} href={props.item.href} color="foreground">
      <div className={getTitleClass(props.item.label)}>{props.item.label}</div>
    </Link>
  )

  const renderAccordionItems = (items: TreeSectionProps[]): JSX.Element[] => {
    return items.map((item) => {
      let child: null | JSX.Element = (
        <TreeSection
          linkTextClass={getTitleClass}
          treeProps={item.children ?? []}
        />
      )
      if (!item.children || item.children.length < 1) {
        child = null
      } else if (isChildGroup(item)) {
        child = (
          <Accordion isCompact={isM} defaultExpandedKeys={defaultExpandedKeys}>
            {renderAccordionItems(item.children!)}
          </Accordion>
        )
      }
      return (
        <AccordionItem
          key={item.label}
          title={<TitleComp item={item} />}
          isCompact={isM}
          textValue={item.label}
          hideIndicator={child === null}
          disableIndicatorAnimation={child === null}
          disableAnimation={child === null}
          onPress={(evt) => {
            if (child === null) {
              router.push(item.href)
            }
          }}
          onDoubleClick={(evt) => {
            evt.stopPropagation()
            router.push(item.href)
          }}
        >
          {child}
        </AccordionItem>
      )
    })
  }

  const items = renderAccordionItems(treeLeft.children ?? [])
  const hasChildren = treeHasChildren(treeLeft)
  return (
    <CommonDrawer
      sheetProps={{
        placement: 'left',
        // defaultOpen: hasChildren,
        defaultOpen: true,
      }}
      {...drawerProps}
      title={drawerProps?.title ?? treeLeft.label}
    >
      {hasChildren ? (
        <Accordion defaultExpandedKeys={defaultExpandedKeys}>{items}</Accordion>
      ) : (
        <TreeSection
          linkTextClass={getTitleClass}
          treeProps={treeLeft.children ?? []}
        />
      )}
    </CommonDrawer>
  )
}

const treeHasChildren = (tree: TreeSectionProps) =>
  tree.children?.some((item) => item.children && item.children?.length > 0)
const isChildGroup = (item: TreeSectionProps) =>
  treeHasChildren(item) &&
  item.children!.map((c) => c.children).flat().length > 0
