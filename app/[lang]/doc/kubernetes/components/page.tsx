import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import { redirect } from 'next/navigation'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}

export default async function SSGPage({ params: { lang } }: Param) {
  return redirect(`/${lang}/doc/kubernetes/on-premise-1`)
}
