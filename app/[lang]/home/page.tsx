import CmTitle from '@/app/_components/server-only/title'
import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import { getDictionary } from '../dictionaries'
// import CmButton from '@/app/_components/server-only/button'
import HiButton from '@/app/_components/client-only/three-d/intro-button'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}

export default async function SSGPage({ params: { lang } }: Param) {
  const dict = await getDictionary(lang)
  // const storyComp = () => <CmButton>{dict['button']['button']}</CmButton>
  return (
    <section className="flex-center-col min-h-full">
      <div className="inline-block justify-center text-center">
        <div className="flex-center-col">
          <CmTitle className="m-auto" size="lg">
            {dict['home']['teamName']}
          </CmTitle>
          <CmTitle size="lg" gradient>
            {dict['home']['description']['title']}&nbsp;
          </CmTitle>
        </div>
        <p className="mb-12 mt-6 max-w-6xl text-xl text-default-500">
          {dict['home']['description']['summary1']}
          <br />
          {dict['home']['description']['summary2']}
          <br />
          {dict['home']['description']['summary3']}
        </p>
      </div>
      <HiButton />
    </section>
  )
}
