// Third-party imports
import { Fragment, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Custom imports
import { useThemeContext } from 'contexts'

import {
  Menu,
  FixedGlobalSpinner,
  // GlobalSpinner,
  SuspenseFallback
  //
} from './components'

import PageError from 'pages/PageError'

/* ========================================================================
                              MainLayout
======================================================================== */

export const MainLayout = () => {
  const { mode } = useThemeContext()

  /* ======================
        handleError()
  ====================== */

  const handleError = (_error: any, _errorInfo: any) => {
    // This is where you'd call your logging service.
    // console.log('Error: ', error)
    // console.log('Error Info: ', errorInfo)
  }

  /* ======================
        handleReset()
  ====================== */

  const handleReset = () => {
    // console.log('handleReset() was called.')
  }

  /* ======================
          return
  ====================== */

  return (
    <Fragment>
      <ToastContainer
        autoClose={3000}
        theme={mode === 'dark' ? 'dark' : 'light'}
      />

      <div
        className={`flex w-full flex-1 transition-[background] duration-300 ease-linear dark:bg-[var(--tw-dark-body-color)] dark:text-[var(--tw-dark-text-color)]`}
      >
        <ErrorBoundary
          FallbackComponent={PageError}
          onError={handleError}
          onReset={handleReset}
        >
          <FixedGlobalSpinner delay={750} />
          <Suspense fallback={<SuspenseFallback />}>
            <Outlet context={{ test: 'Outlet value!' }} />
          </Suspense>
          {/* </GlobalSpinner> */}
        </ErrorBoundary>
        <Menu />
      </div>
    </Fragment>
  )
}

export default MainLayout
