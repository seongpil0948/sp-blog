import CmTitle from '@/app/_components/server-only/title'
import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import { getDictionary } from '../dictionaries'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import {
  mdiVuejs,
  mdiLanguageGo,
  mdiLanguageTypescript,
  mdiGoogleCloud,
  mdiGoogleAnalytics,
  mdiFirebase,
  mdiLanguagePython,
  mdiAws,
  mdiKubernetes,
  mdiNodejs,
  mdiApple,
  mdiAndroid,
  mdiWeb,
} from '@mdi/js'
import Icon from '@mdi/react'

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
        <CmTitle className="m-auto" size="lg">
          Projects
        </CmTitle>
        <CmTitle size="lg" gradient>
          {dict['home']['description']['title']}&nbsp;
        </CmTitle>
      </div>
      <ProjectView />
    </section>
  )
}

function ProjectView() {
  const cards = PROJECTS.map((p) => <ProjectCard key={p.title} p={p} />)
  return <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{...cards}</div>
}

function ProjectCard(props: { p: (typeof PROJECTS)[0] }) {
  const { p } = props
  return (
    <Card
      isBlurred
      className="max-w-[610px] border-none bg-background/60 dark:bg-default-100/50"
      shadow="sm"
      isPressable={!!p.to}
      isHoverable={!!p.to}
    >
      <CardBody>
        <div className="grid grid-cols-6 items-center justify-center gap-6 md:grid-cols-12 md:gap-4">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Project title image"
              className="object-cover"
              height={200}
              shadow="md"
              src={p.titleImg}
              width="100%"
            />
          </div>

          <div className="col-span-6 flex flex-col md:col-span-8">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">{p.title}</h3>
                <p className="text-small text-foreground/80">{p.desc}</p>
                <h1 className="mt-2 text-large font-medium">{}</h1>
              </div>
              <div className="flex justify-end">
                <ProjectTypeIcon projType={p.projType} />
              </div>
              {/* className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2" */}
            </div>

            <div className="flex w-full items-end justify-end">
              <ProjectUsing p={p} />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

function ProjectUsing(props: { p: (typeof PROJECTS)[0] }) {
  const { p } = props

  return (
    <div className="flex gap-2">
      {p.using.map((icon, i) =>
        p.usingPubIdx?.includes(i) ? (
          <Image
            key={p.title + icon}
            width={30}
            alt={'icon using project'}
            src={icon}
          />
        ) : (
          <Icon key={p.title + icon} path={icon} size={1} />
        ),
      )}
    </div>
  )
}

function ProjectTypeIcon(p: { projType: ProjType }) {
  return p.projType === ProjType.app ? (
    <div className="flex min-w-unit-12 justify-around">
      <Icon path={mdiApple} size={1} />
      <Icon path={mdiAndroid} size={1} />
    </div>
  ) : (
    <Icon path={mdiWeb} size={1} />
  )
}

enum ProjType {
  web,
  app,
}
const PROJECTS = [
  {
    title: 'Inout box',
    desc: '의류 소/도매 플랫폼',
    projType: ProjType.web,
    titleImg: '/iobox/inout-login.png',
    using: [mdiVuejs, mdiLanguageGo, mdiLanguageTypescript],
    to: '/projects/inout-box',
  },
  {
    title: 'Inout uncle',
    desc: '의류 배송 플랫폼',
    projType: ProjType.app,
    titleImg: '/iobox/app-store.jpeg',
    using: ['/icon/flutter-logo.svg', mdiGoogleCloud, mdiGoogleAnalytics],
    usingPubIdx: [0],
    to: '/projects/inout-uncle',
  },
  {
    title: 'Campi',
    desc: '캠핑 플랫폼',
    projType: ProjType.app,
    titleImg: '/campi/my-page.jpg',
    using: ['/icon/flutter-logo.svg', mdiFirebase, mdiGoogleCloud],
    usingPubIdx: [0],
    whiteImg: true,
    to: '/projects/campi',
  },
  {
    title: 'Virtual try on backend',
    desc: 'AI 부서로 부터 제작된 모델을 바탕으로, 웹 서비스 제작(국가 과제)',
    projType: ProjType.web,
    titleImg: '/image/try-on.png',
    using: [mdiAws, mdiLanguagePython],
  },
  {
    title: 'CJ 크롤러 제작',
    desc: '각종 쇼핑플랫폼에서 판매중인 CJ 제일제당 상품데이터 수집 및 ETL to cj',
    projType: ProjType.web,
    titleImg: '/image/try-on.png',
    using: [mdiAws, mdiKubernetes, mdiLanguagePython],
  },
  {
    title: 'LOTTE 추천 어드민 페이지',
    desc: '롯데 홈쇼핑 추천서비스 어드민 페이지 제작',
    projType: ProjType.web,
    titleImg: '/image/try-on.png',
    using: [mdiAws, mdiKubernetes, mdiVuejs, mdiLanguagePython],
  },
  {
    title: '회사 홈페이지 제작',
    desc: 'PM & 개발 & 유지보수',
    projType: ProjType.web,
    titleImg: '/image/try-on.png',
    using: [mdiNodejs, mdiVuejs],
  },
]
