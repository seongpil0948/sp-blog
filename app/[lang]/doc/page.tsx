import { AVAIL_LOCALES, LANDING_PATH, TAvailLocale } from '@/config/system'
import DocCtgrCards from './_components/client-only/DocCtgrCards'
import { Suspense } from 'react'
import CommonNavbar from '@/app/_components/server-client/navbar'
import { docWrapper } from '@/app/_components/server-only/primitives'
import { NAV_ITEMS_HOME } from '@/config/site'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}

export default async function SSGPage({ params: { lang } }: Param) {
  return (
    <div className="relative flex h-screen flex-col">
      <CommonNavbar landingPath={LANDING_PATH} navItems={NAV_ITEMS_HOME} />
      <main className={docWrapper()}>
        <section className="flex-center-col">
          <Suspense fallback={null}>
            <DocCtgrCards lang={lang} />
          </Suspense>
        </section>
      </main>
    </div>
  )
}
