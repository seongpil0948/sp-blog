import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { getDictionary } from '../../dictionaries'
import OneMin from '../_components/client-only/OneMin'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}

export default async function SSGPage({ params: { lang } }: Param) {
  const dict = await getDictionary(lang)

  return (
    <div>
      <OneMin />
    </div>
  )
}
