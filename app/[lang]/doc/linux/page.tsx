import { redirect } from 'next/navigation'

import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}

export default async function SSGPage({ params: { lang } }: Param) {
  return redirect(`/${lang}/doc/linux/essential-commands`)
}
