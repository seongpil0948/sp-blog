import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import Content from './content.mdx'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}

export default async function SSGPage({ params: { lang } }: Param) {
  return (
    <section>
      {lang}
      <Content />
    </section>
  )
}
