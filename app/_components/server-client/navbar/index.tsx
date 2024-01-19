'use client'
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from '@nextui-org/navbar'
import { NavbarSlots, SlotsToClasses } from '@nextui-org/theme'
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
import { clsx, type ClassValue } from 'clsx'
import { navbar } from './theme'
import { TreeSectionProps } from '../../client-only/tree-section'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export default function CommonNavbar(props: {
  tree?: TreeSectionProps
  children?: React.ReactNode
  prefix?: React.ReactNode
  landingPath: string
  links?: {
    twitter?: string
    discord?: string
    github?: string
    sponsor?: string
  }
}) {
  const { tree, children, prefix, landingPath, links } = props
  const { base, content, brand, item } = navbar()
  const extendedClassNames = {
    base: cn(base()),
    content: cn(content()),
    brand: cn(brand()),
    item: cn(item()),
  } as SlotsToClasses<NavbarSlots>

  return (
    <NextUINavbar
      classNames={extendedClassNames}
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent>
        {prefix && prefix}
        <NavbarBrand as="li">
          <NextLink href={landingPath}>
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
