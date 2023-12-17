import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import { Metadata, ResolvingMetadata } from 'next'
import { getDictionary } from '../dictionaries'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

type Props = {
  params: { lang: TAvailLocale }
  searchParams: { [key: string]: string | string[] | undefined }
  children: React.ReactNode
}

export async function generateMetadata(
  { params: { lang } }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const dict = await getDictionary(lang)
  return {
    title: dict['doc']['title'],
    description: dict['doc']['description'],
    openGraph: {
      images: ['/image/logo.png'],
    },
  }
}

export default function RootLayout({ children }: Props) {
  return <div id="layout-doc">{children}</div>
}
