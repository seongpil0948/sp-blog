import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import { getDictionary } from '../dictionaries'
import { getOnlyFiles } from '@/app/_utils/dir-tree'
import CertSection from './_components/client-only/sections/Cert'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}

export default async function SSGPage({ params: { lang } }: Param) {
  const certificates = getOnlyFiles('public/cert', { extensions: /\.png$/ })
  const certData = [
    ...certificates,
    ...certificates,
    ...certificates,
    ...certificates,
  ]
  const dict = await getDictionary(lang)

  return (
    <div>
      <section className="scene two">
        <header>
          <h1>Lorem ipsum dolor sit amet.</h1> Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Totam suscipit sint ab beatae nihi
        </header>
      </section>
      <CertSection certData={certData} />
      <section className="scene three">
        <header>
          <h1>Lorem ipsum dolor sit amet.</h1> Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Totam suscipit sint ab beatae nihi
        </header>
      </section>
    </div>
  )
}
