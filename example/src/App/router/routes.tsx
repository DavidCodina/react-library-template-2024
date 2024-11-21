// Third-party imports
import { createRoutesFromElements, Route, Navigate } from 'react-router-dom'

// Custom imports
import { RootLayout, MainLayout } from 'layouts'
import PageHome from 'pages/PageHome'
// import PageNotFound from 'pages/PageNotFound'
// import PageUnauthorized from 'pages/PageUnauthorized'

/* ========================================================================
                                   Routes      
======================================================================== */

export const routes = createRoutesFromElements(
  <Route element={<RootLayout />}>
    <Route element={<MainLayout />}>
      <Route path='/' element={<PageHome />} />

      <Route path='/home' element={<Navigate to='/' replace />} />
      {/* <Route path='/unauthorized' element={<PageUnauthorized />} />
      <Route path='*' element={<PageNotFound />} /> */}
    </Route>

    <Route
      path='/outlier'
      element={
        <div className='w-screen'>
          <h1 className='py-6 text-center font-black text-blue-500'>Outlier</h1>
          <p className='text-center'>
            This content exists outside of <code>MainLayout</code>.
          </p>
        </div>
      }
    />
  </Route>
)
