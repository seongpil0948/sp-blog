import { tv } from 'tailwind-variants'

export const layout = tv({
  // base: 'h-screen relative',
  base: '',
})

export const main = tv({
  base: 'flex-grow py-2 px-8 relative flex flex-col min-h-screen',
  variants: {
    justify: {
      center: 'justify-center',
      start: 'justify-start',
      end: 'justify-end',
    },
    size: {
      sm: 'px-8 pt-6 pb-8',
      md: 'md:py-10',
      lg: 'px-4 py-10',
    },
  },
})

export const docWrapper = tv({
  base: 'docWrapper px-4 pt-15 mx-auto py-4 w-full  xl:w-4xl xl:py-20',

})

export const box = tv({
  base: 'relative overflow-y-hidden flex items-center border border-default-200 dark:border-default-100 px-2 py-4 rounded-lg overflow-hidden',
  variants: {
    isSearch: {
      true: '[&>div]:flex-center [&>div]:flex-1 [&>div]:w-full [&>div]:gap-16 px-6 py-5 gap-20',
    },
  },
})
