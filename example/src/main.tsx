// import 'dc-react-ts-test-library/dist/main.css'

// This must come first in order to prevent preflight attribute selectors with equal
// specificity like [type='button'] from overriding certain class selectors.
import 'styles/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
