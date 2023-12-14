import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}

export default async function SSGPage({ params: { lang } }: Param) {
  return <section className="flex-center-col">{lang} Java</section>
}
