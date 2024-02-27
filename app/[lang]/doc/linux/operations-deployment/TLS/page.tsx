import { getDictionary } from '@/app/[lang]/dictionaries'
import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import DocumentContainer from '../../../_components/server-only/DocumentContainer'
import Content from './content.mdx'
import { ResolvingMetadata, Metadata } from 'next'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

type Props = {
  params: { lang: TAvailLocale }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params: { lang } }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const dict = await getDictionary(lang)
  return {
    title: "TLS",
    description: 'TLS'
  }
}

export default async function SSGPage({ params: { lang } }: Props) {
  return (
    <DocumentContainer lang={lang}>
      <Content />
    </DocumentContainer>
  )
}
