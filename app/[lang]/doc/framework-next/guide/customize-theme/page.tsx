import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import Content from './content.mdx'
import DocumentContainer from '~/[lang]/doc/_components/server-only/DocumentContainer'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}

export default async function SSGPage({ params: { lang } }: Param) {
  return (
    <DocumentContainer lang={lang}>
      <Content />
    </DocumentContainer>
  )
}
