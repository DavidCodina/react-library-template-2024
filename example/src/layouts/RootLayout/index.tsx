// Third-party imports
import { Outlet } from 'react-router-dom'

// Custom imports
import { Providers } from 'contexts'

/* ========================================================================
                              RootLayout                      
======================================================================== */

export const RootLayout = () => {
  return (
    <Providers>
      <Outlet />
    </Providers>
  )
}

export default RootLayout
