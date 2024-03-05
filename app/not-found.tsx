import Link from 'next/link'
import CmTitle from './_components/server-only/title'
import { layout, main } from './_components/server-only/primitives'
import CommonNavbar from './_components/server-client/navbar'
import clsx from 'clsx'
import { CmFooter } from './_components/server-only/footers'

export default function NotFound() {
  return (
    <div className={clsx(layout())}>
      <CommonNavbar leftTreeOptions={{ dir: 'app/[lang]' }} />
      <main className={clsx(main(), 'text-center', 'justify-center')}>
        <CmTitle>Not Found</CmTitle>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </main>
      <CmFooter />
    </div>
  )
}
