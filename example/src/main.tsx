import 'styles/main.css'
import 'material-symbols'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

/* ========================================================================
                           
======================================================================== */

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement as Element)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
