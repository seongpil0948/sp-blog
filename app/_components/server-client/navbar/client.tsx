'use client'
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import NextLink from 'next/link'
import { ThemeSwitch } from '@/app/_components/client-only/theme-switch'
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
} from '@/app/_components/server-only/icons'
import { Logo } from '@/app/_components/server-only/icons'
import { SearchInput } from '@/app/_components/client-only/input/search'
import { CommonNavbarProps } from './types'
import { LANDING_PATH } from '@/config/site'
import { AccordionItem, Accordion } from '@nextui-org/accordion'
import CommonDrawer from '../../client-only/drawer'
import { TreeSection, TreeSectionProps } from '../../client-only/tree-section'
import { useRouter, usePathname } from 'next/navigation'
import { Kbd } from '@nextui-org/kbd'

export default function CommonClientNavbar(props: CommonNavbarProps) {
  const { tree, children, landingPath, links, classes } = props

  // onKeyDown={handleKeyDown}
  return (
    <NextUINavbar
      classNames={classes}
      maxWidth="full"
      // position="sticky"
      shouldHideOnScroll
    >
      <NavbarContent>
        <PrefixComp {...props} />
        <NavbarBrand as="li">
          <NextLink href={landingPath ?? LANDING_PATH}>
            <Logo />
            <p className="font-bold">Sp Blog</p>
          </NextLink>
        </NavbarBrand>
        {tree && tree.children && (
          <ul>
            {tree.children.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink href={item.href}>{item.label}</NextLink>
              </NavbarItem>
            ))}
          </ul>
        )}
        {children}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <SearchInput
            placeholder="click to search"
            disabled
            className=" cursor-pointer"
            endContent={
              <Kbd className="hidden lg:inline-block" keys={['command']}>
                K
              </Kbd>
            }
          />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        {links?.twitter && (
          <NavbarItem>
            <Link isExternal href={links.twitter} aria-label="Twitter">
              <TwitterIcon size={30} />
            </Link>
          </NavbarItem>
        )}
        {links?.discord && (
          <NavbarItem>
            <Link isExternal href={links.discord} aria-label="Discord">
              <DiscordIcon size={30} />
            </Link>
          </NavbarItem>
        )}

        {links?.github && (
          <NavbarItem>
            <Link isExternal href={links.github} aria-label="Github">
              <GithubIcon size={30} />
            </Link>
          </NavbarItem>
        )}
        {/* {links?.sponsor && (
          <NavbarItem>
            <Button
              isExternal
              as={Link}
              className="bg-default-100 text-sm font-normal text-default-600"
              href={links.sponsor}
              startContent={<HeartFilledIcon className="text-danger" />}
              variant="flat"
            >
              Contribute
            </Button>
          </NavbarItem>
        )} */}
      </NavbarContent>

      {/* <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent> */}

      {/* <NavbarMenu>
        <SearchInput />
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu> */}
    </NextUINavbar>
  )
}
function PrefixComp(props: CommonNavbarProps): React.ReactNode {
  const router = useRouter()
  const path = usePathname()
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
      return 'text-primary-700'
    } else {
      return ''
    }
  }
  const TitleComp = (props: { title: string }) => (
    <div className={getTitleClass(props.title)}>{props.title}</div>
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
          <Accordion isCompact defaultExpandedKeys={defaultExpandedKeys}>
            {renderAccordionItems(item.children!)}
          </Accordion>
        )
      }
      return (
        <AccordionItem
          key={item.label}
          title={<TitleComp title={item.label} />}
          isCompact
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
        <Accordion isCompact defaultExpandedKeys={defaultExpandedKeys}>
          {items}
        </Accordion>
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
