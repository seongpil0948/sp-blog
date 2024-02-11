'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetProps,
} from './sheet'
import Icon from '@mdi/react'
import { useDisclosure } from '@nextui-org/modal'
import { mdiMenuClose, mdiMenuOpen } from '@mdi/js'
import CmButton from '@/app/_components/server-only/button'

export interface CommonDrawerProps {
  children: React.ReactNode
  title?: string
  sheetProps?: Partial<SheetProps>
}
export default function CommonDrawer(props: CommonDrawerProps) {
  const { children, sheetProps, title } = props
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({
    defaultOpen: sheetProps?.defaultOpen ?? true,
  })

  const handleClick = () => {
    console.log('clicked', isOpen)
    isOpen ? onClose() : onOpen()
  }
  return (
    <>
      <CmButton isIconOnly onPress={handleClick}>
        <Icon path={isOpen ? mdiMenuClose : mdiMenuOpen} size={1} />
      </CmButton>

      <Sheet
        classNames={{
          body: 'overflow-auto',
          wrapper: 'h-full rounded-l-none rounded-r-xl shadow-xl',
        }}
        isOpen={isOpen}
        defaultOpen={sheetProps?.defaultOpen ?? true}
        onOpenChange={onOpenChange}
        {...sheetProps}
      >
        <SheetContent>
          {(onClose) => (
            <>
              {title && <SheetHeader>{title}</SheetHeader>}
              <SheetBody>{children}</SheetBody>
              <SheetFooter>© 2023 ACF</SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
/*
 - https://github.com/nextui-org/nextui/blob/main/packages/components/modal/src/use-modal.ts 
 - {<AnimatePresence>{state.isOpen ? overlay : null} </AnimatePresence>}
 
 */
