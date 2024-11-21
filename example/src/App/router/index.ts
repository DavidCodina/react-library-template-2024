// Third-party imports
import { createBrowserRouter } from 'react-router-dom'

// Custom imports
import { routes } from './routes'
export * from './RouterFallback'

/* ========================================================================
                                router                 
======================================================================== */

export const router = createBrowserRouter(routes)
