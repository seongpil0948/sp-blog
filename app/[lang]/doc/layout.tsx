import CommonNavbar from '@/app/_components/server-client/navbar'
import { CmFooter } from '@/app/_components/server-only/footers'
import { layout, main } from '@/app/_components/server-only/primitives'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={layout()}>
      <CommonNavbar leftTreeOptions={{ dir: 'app/[lang]/doc' }} />
      <main id="content-container" className={main()}>
        {children}
      </main>
      <CmFooter />
    </div>
  )
}
