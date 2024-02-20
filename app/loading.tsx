import { Spinner } from '@nextui-org/spinner'
import { docWrapper } from './_components/server-only/primitives'
import clsx from 'clsx'

export default function Loading() {
  // Or a custom loading skeleton component
  console.log('Loading...')
  return (
    <main
      className={clsx(
        docWrapper(),
        'flex-center-col min-h-screen justify-center',
      )}
    >
      <section className="">
        <Spinner label="Loading..." color="primary" labelColor="primary" />
      </section>
    </main>
  )
}
