import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import { getDictionary } from '../../dictionaries'
import Village from './_components/client-only/Village'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}

export default async function SSGPage({ params: { lang } }: Param) {
  const dict = await getDictionary(lang)

  return (
    <div
      style={{
        overflow: 'hidden',
        margin: '0',
      }}
    >
      <Village />
    </div>
  )
}
