import CmTitle from '@/app/_components/server-only/title'
import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import { getDictionary } from '../dictionaries'
import { getOnlyFiles } from '@/app/_utils/dir-tree'
import { ImageCard } from '@/app/_components/client-only/card/dynamic'
import { ReactNode } from 'react'

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
      <CmTitle>about</CmTitle>
      About Seongpil
      <div
        style={{
          width: '50vw',
        }}
      >
        <CertGrid certData={certData} />
      </div>
    </div>
  )
}

function CertGrid(props: { certData: string[] }) {
  const { certData } = props
  const colOne: ReactNode[] = []
  const colTwo: ReactNode[] = []
  for (let i = 0; i < certData.length; i++) {
    const c = certData[i]
    if (i % 2 === 0) {
      colOne.push(<ImageCard key={i + c} src={c} />)
    } else {
      colTwo.push(<ImageCard key={i + c} src={c} />)
    }
  }
  return (
    <div className="grid grid-cols-2">
      <GridCol>{colOne}</GridCol>
      <GridCol>{colTwo}</GridCol>
    </div>
  )
}

function GridCol({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-2">{children}</div>
}
