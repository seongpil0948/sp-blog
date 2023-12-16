import { TAvailLocale } from '@/config/system'
import { Metadata, ResolvingMetadata } from 'next'

export const metadata: Metadata = {
  title: 'sp blog - Documentation',
  description: 'Documentation',
}

type Props = {
  lang: TAvailLocale
  // params: { id: string }
  // searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { lang }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: ,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div id="layout-doc">{children}</div>
}
