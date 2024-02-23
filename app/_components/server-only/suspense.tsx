import { Suspense } from 'react'
import { Spinner, SpinnerProps } from '@nextui-org/spinner'
import clsx from 'clsx'
import { docWrapper } from './primitives'

export function LoadingComponent(props: SpinnerProps) {
  return <Spinner label="..." color="primary" labelColor="primary" {...props} />
}

export function LoadingSuspense({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingComponent />}>{children}</Suspense>
}

export function LoadingPage() {
  return (
    <main
      className={clsx(
        docWrapper(),
        'flex-center-col min-h-screen justify-center',
      )}
    >
      <section className="">
        <LoadingComponent />
      </section>
    </main>
  )
}
