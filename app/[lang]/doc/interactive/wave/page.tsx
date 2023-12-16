import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import { WaveView } from './_components/client-only/WaveView'
import clsx from 'clsx'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}

export default async function SSGPage({ params: { lang } }: Param) {
  return (
    <div
      id="#"
      className="height-auto flex-center-col relative box-border min-h-screen bg-content1 text-foreground "
    >
      page
      <WaveView />
    </div>
  )
}
