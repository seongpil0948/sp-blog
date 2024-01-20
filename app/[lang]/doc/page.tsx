import { AVAIL_LOCALES, LANDING_PATH, TAvailLocale } from '@/config/system'
import DocCtgrCards from './_components/client-only/DocCtgrCards'
import { Suspense } from 'react'
import CommonNavbar from '@/app/_components/server-client/navbar'
import { docWrapper } from '@/app/_components/server-only/primitives'
import { ResolvingMetadata, Metadata } from 'next'
import { getDictionary } from '../dictionaries'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

type Props = {
  params: { lang: TAvailLocale }
  searchParams: { [key: string]: string | string[] | undefined }
}
// FIXME: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const dict = await getDictionary(props.params.lang)
  return {
    title: dict['doc']['title'],
    description: dict['doc']['description'],
    openGraph: {
      images: ['/image/logo.png'],
    },
  }
}

export default async function SSGPage({ params: { lang } }: Props) {
  // const tree = getTree('app/[lang]/doc/kubernetes', { extensions: /\.mdx$/ })
  return (
    <div className="relative flex h-screen flex-col">
      <CommonNavbar leftTreeOptions={{ dir: 'app/[lang]/doc' }} />
      <main className={docWrapper()}>
        <section className="flex-center-col">
          <h1 className="text-4xl font-bold">Documentation</h1>
          <Suspense fallback={null}>
            hi, welcome to the documentation page
            {/* <DocCtgrCards lang={lang} links={tree?.children ?? []} /> */}
          </Suspense>
        </section>
      </main>
    </div>
  )
}
