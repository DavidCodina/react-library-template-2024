import { Fragment } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router, RouterFallback } from './router'

/* ========================================================================

======================================================================== */

function App() {
  return (
    <Fragment>
      <RouterProvider router={router} fallbackElement={<RouterFallback />} />
    </Fragment>
  )
}

export default App
