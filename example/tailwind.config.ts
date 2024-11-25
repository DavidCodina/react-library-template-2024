import type { Config } from 'tailwindcss'
import { library } from 'dc-react-ts-test-library'

// import plugin from 'tailwindcss/plugin'
// // In Tailwind v3 we used to be able to do this:
// // import type { PluginAPI } from 'tailwindcss/types/config'
// // That seems to no longer work in v4, but we can still derive PluginAPI manually.
// type PluginFn = Parameters<typeof plugin>[0]
// type PluginAPI = Parameters<PluginFn>[0]

// type Plugins = Config['plugins']
// type Plugin = NonNullable<Plugins>[number]

/* ========================================================================

======================================================================== */
//^ This tailwind.config.ts demonstrates how to use the library export.
//^ However, it's no longer necessary in Tailwind v4. In fact,
//^ The main.css file is not even using this file:
//^ /* @config "../../tailwind.config.ts"; */

const config: Config = {
  content: [
    // './index.html',
    // './src/**/*.{js,ts,jsx,tsx}',
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

  plugins: [library.plugin]
}

export default config
