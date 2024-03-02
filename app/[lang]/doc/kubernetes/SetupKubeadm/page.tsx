import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import Content from './content.mdx'
import DocumentContainer from '~/[lang]/doc/_components/server-only/DocumentContainer'
import { getDictionary } from '@/app/[lang]/dictionaries'
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
    title: dict['doc']['kubernetes']['on-premise-1']['title'],
    description: dict['doc']['kubernetes']['on-premise-1']['description'],
  }
}

export default async function SSGPage({ params: { lang } }: Props) {
  return (
    <DocumentContainer lang={lang}>
      <Content />
    </DocumentContainer>
  )
}
