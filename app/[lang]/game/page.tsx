import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import { getDictionary } from '../dictionaries'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { main } from '@/app/_components/server-only/primitives'
import { clsx } from 'clsx'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}

export default async function SSGPage({ params: { lang } }: Param) {
  const dict = await getDictionary(lang)

  return (
    <main
      id="content-container"
      className={clsx(main(), 'justify-center gap-3')}
    >
      hi
      <Button className="ma-4">
        <Link href="/game/world">World</Link>
      </Button>
      <Button className="ma-4">
        <Link href="/game/onemin">onemin</Link>
      </Button>
      <Button>
        <Link href="/game/domino">domino</Link>
      </Button>
    </main>
  )
}
