import CmTitle from '@/app/_components/server-only/title'
import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import { getDictionary } from '../dictionaries'
import { PROJECTS } from './projects'
import ProjectCard from './_components/ProjectCard'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}

export default async function SSGPage({ params: { lang } }: Param) {
  const dict = await getDictionary(lang)

  return (
    <section className="flex-center-col ">
      <div className="mb-6 mt-5 inline-block justify-center">
        <CmTitle className="mr-3" size="lg">
          SP
        </CmTitle>
        <CmTitle size="lg" gradient>
          Projects
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
