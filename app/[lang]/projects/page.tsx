import CmTitle from '@/app/_components/server-only/title'
import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import { getDictionary } from '../dictionaries'
import CmButton from '@/app/_components/server-only/button'
import HiButton from '@/app/_components/client-only/three-d/intro-button'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}

export default async function SSGPage({ params: { lang } }: Param) {
  const dict = await getDictionary(lang)
  return (
    <section className="flex-center-col">
      <div className="inline-block justify-center text-center">
        <div className="flex-center-col">
          <CmTitle className="m-auto" size="lg">
            Projects
          </CmTitle>
          <CmTitle size="lg" gradient>
            {dict['home']['description']['title']}&nbsp;
          </CmTitle>
        </div>
      </div>
      <HiButton />
    </section>
  )
}
