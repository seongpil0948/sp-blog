import type { IGetTreeArgs } from "@/app/_utils/dir-tree"
import type { TreeSectionProps } from "../../client-only/tree-section"
import type { NavbarSlots, SlotsToClasses } from '@nextui-org/theme'
import type { CommonDrawerProps } from "../../client-only/drawer"

export interface CommonNavbarProps {
  tree?: TreeSectionProps
  children?: React.ReactNode
  
  leftTreeOptions: IGetTreeArgs
  treeLeft?: TreeSectionProps
  prefix?: React.ReactNode

  landingPath?: string
  links?: {
    twitter?: string
    discord?: string
    github?: string
    sponsor?: string
  }
  classes?: SlotsToClasses<NavbarSlots>
  drawerProps?: Omit<CommonDrawerProps, 'children' >
}