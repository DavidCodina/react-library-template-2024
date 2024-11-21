import type { Config } from 'tailwindcss'
import { library } from 'dc-react-ts-test-library'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',

    ///////////////////////////////////////////////////////////////////////////
    //
    // This won't catch dynamic classes like hover:bg-blue-500
    // ❌ './node_modules/dc-react-ts-test-library/dist/main.css'
    //
    // This assumes your tailwind.config.ts is a sibling to node_modules:
    // './node_modules/dc-react-ts-test-library/dist/esm/index.js'
    // If it's not, then construct the path manually.
    //
    ///////////////////////////////////////////////////////////////////////////
    library.content
  ],
  theme: {
    extend: {}
  },
  plugins: [library.plugin]
}

export default config
