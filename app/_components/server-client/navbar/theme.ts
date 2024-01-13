import { tv } from '@nextui-org/theme'

const navbar = tv({
  slots: {
    base: 'border-b border-slate-900/10 dark:border-slate-50/[0.06] justify-start',
    content: 'basis-1/5 gap-6 sm:basis-full [&+&]:hidden [&+&]:gap-2 [&+&]:sm:flex',
    brand:'[&>a]:flex-center-ver [&+ul]:hidden [&+ul]:gap-6 [&+ul]:md:flex contents',
    item: '[&>a]:text-sm [&>a]:data-[active=true]:font-medium [&>a]:data-[active=true]:text-primary',
  },
})

export { navbar }
