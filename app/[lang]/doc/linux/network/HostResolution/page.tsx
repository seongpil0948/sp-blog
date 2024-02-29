import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import Content from './content.mdx'
import DocumentContainer from '~/[lang]/doc/_components/server-only/DocumentContainer'
import { ResolvingMetadata, Metadata } from 'next'
import { getDictionary } from '@/app/[lang]/dictionaries'

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
    title: 'Networking and Hostname resolution',
    description: 'Configure IPv4 and IPv6 networking and hostname resolution',
  }
}

export default async function SSGPage({ params: { lang } }: Props) {
  return (
    <DocumentContainer lang={lang}>
      <Content />
    </DocumentContainer>
  )
}
