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
import { TreeSection } from '../../client-only/tree-section'
import { useRouter } from 'next/navigation'

export default function CommonClientNavbar(props: CommonNavbarProps) {
  const { tree, children, landingPath, links, classes } = props
  return (
    <NextUINavbar classNames={classes} maxWidth="xl" position="sticky">
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
          <SearchInput />
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
  if (props.prefix) {
    return props.prefix
  }
  const { treeLeft } = props

  if (!treeLeft) return <></>
  else if (
    treeLeft.children &&
    treeLeft.children.map((c) => c.children).flat().length > 0
  ) {
    const items = treeLeft.children.map((item, idx) => {
      return (
        <AccordionItem
          onDoubleClick={() => {
            router.push(item.href)
          }}
          key={item.href + idx}
          title={item.label}
        >
          <TreeSection treeProps={item.children ?? []} />
        </AccordionItem>
      )
    })
    return (
      <CommonDrawer
        title="Home"
        sheetProps={{
          placement: 'left',
          defaultOpen: true,
        }}
        {...props.drawerProps}
      >
        <Accordion>{...items}</Accordion>
      </CommonDrawer>
    )
  } else {
    return (
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
  }
}
