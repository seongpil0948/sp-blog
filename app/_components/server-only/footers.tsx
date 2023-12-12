import { Logo } from '@/app/_components/server-only/icons'
import { Link } from '@nextui-org/link'

export const CmFooter = () => {
  return (
    <footer>
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            color="foreground"
            href="https://github.com/seongpil0948"
            isExternal
            className="mb-4 flex items-center sm:mb-0"
          >
            <Logo />
            <p className="font-bold">Sp Blog</p>
          </Link>
          <div className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0">
            <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
              © 2023{' '}
              {/* <Link
              color="foreground"
              isExternal
              href="http://www.iabacus.co.kr/"
              className="hover:underline"
            >
              Abacus
            </Link> */}
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
