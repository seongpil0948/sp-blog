
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
  mdiLanguageJava,
} from '@mdi/js'
import type { IProject } from './types'

export const PROJECTS: IProject[] = [
  {
    title: 'LG 데이터 산업 플랫폼',
    desc: 'AI 모델 관리 및 서비스 제공 플랫폼',
    projType: 'web',
    using: [mdiAws, mdiVuejs, mdiLanguageTypescript, mdiLanguageJava],
    to: '/projects/b2b-platform',
  },
  {
    title: 'Inout box',
    desc: '의류 소/도매 플랫폼',
    projType: 'web',
    titleImg: '/iobox/inout-login.png',
    using: [mdiVuejs, mdiLanguageGo, mdiLanguageTypescript],
    to: '/projects/inout-box',
  },
  {
    title: 'Inout uncle',
    desc: '의류 배송 플랫폼',
    projType: 'app',
    titleImg: '/iobox/app-store.jpeg',
    using: ['/icon/flutter-logo.svg', mdiGoogleCloud, mdiGoogleAnalytics],
    usingPubIdx: [0],
    to: '/projects/inout-uncle',
  },
  {
    title: 'Campi',
    desc: '캠핑 플랫폼',
    projType: 'app',
    titleImg: '/campi/my-page.jpg',
    using: ['/icon/flutter-logo.svg', mdiFirebase, mdiGoogleCloud],
    usingPubIdx: [0],
    whiteImg: true,
    to: '/projects/campi',
  },
  {
    title: 'Virtual try on backend',
    desc: 'AI 부서로 부터 제작된 모델을 바탕으로, 웹 서비스 제작(국가 과제)',
    projType: 'web',
    using: [mdiAws, mdiLanguagePython],
  },
  {
    title: 'CJ 크롤러 제작',
    desc: '각종 쇼핑플랫폼에서 판매중인 CJ 제일제당 상품데이터 수집 및 ETL to cj',
    projType: 'web',
    using: [mdiAws, mdiKubernetes, mdiLanguagePython],
  },
  {
    title: 'LOTTE 추천 어드민 페이지',
    desc: '롯데 홈쇼핑 추천서비스 어드민 페이지 제작',
    projType: 'web',
    using: [mdiAws, mdiKubernetes, mdiVuejs, mdiLanguagePython],
  },
  {
    title: '회사 홈페이지 제작',
    desc: 'PM & 개발 & 유지보수',
    projType: 'web',
    titleImg: '/image/intellisys.png',
    using: [mdiNodejs, mdiVuejs],
  },
]

export default PROJECTS