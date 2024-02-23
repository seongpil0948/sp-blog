'use client'

import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { ReduxProvider } from '../_store'
import { LoadingProvider } from './loading'
import { ToastContainer } from 'react-toastify'
import { I18nProvider } from 'react-aria'
import { useRouter } from 'next/navigation'
import CommonProvider from './common'
import { AnimatePresence, motion } from 'framer-motion'
import { SearchProvider } from './search'
// import { ErrorBoundary } from '../_utils/exceptions'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const { theme } = useTheme()
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <I18nProvider locale="ko">
          <CommonProvider>
            <ReduxProvider>
              <SearchProvider>
                <LoadingProvider>
                  <AnimatePresence
                    mode="wait"
                    // initial={true}
                    // onExitComplete={() => window.scrollTo(0, 0)}
                  >
                    <motion.div
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 300, opacity: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                      }}
                    >
                      {children}
                    </motion.div>
                  </AnimatePresence>

                  <ToastContainer
                    position="top-right"
                    autoClose={false}
                    pauseOnHover={false}
                    hideProgressBar={false}
                    theme={theme === 'dark' ? 'dark' : 'light'}
                    newestOnTop={false}
                    rtl={false}
                  />
                </LoadingProvider>
              </SearchProvider>
            </ReduxProvider>
          </CommonProvider>
        </I18nProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
