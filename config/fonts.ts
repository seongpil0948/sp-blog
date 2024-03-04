import { Fira_Code as FontMono,  Roboto, Nanum_Gothic } from 'next/font/google'

export const fontSans = Nanum_Gothic({
  weight: ['400', '700'],
  variable: '--font-sans',
  subsets: ['latin'],
})

export const fontMono = FontMono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: '700',
})

export const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})
