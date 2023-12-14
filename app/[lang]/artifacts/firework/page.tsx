import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import FireWork from './FireWork'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}

export default async function SSGPage({ params: { lang } }: Param) {
  return (
    <section className="flex-center-col">
      <div
        className="firework-container"
        style={{
          width: '70vw',
          height: '70vh',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <h1>가입 완료!!!</h1>
        <p>사장님 믿고 있었다구...!!!!</p>
        <FireWork />
      </div>
    </section>
  )
}
