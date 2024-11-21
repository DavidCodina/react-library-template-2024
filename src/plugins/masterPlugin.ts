import plugin from 'tailwindcss/plugin'
// import type { PluginAPI } from 'tailwindcss/types/config'
import { squarePluginFunction } from './squarePlugin'

/* ========================================================================

======================================================================== */

const masterPlugin = plugin(
  function (pluginApi) {
    squarePluginFunction(pluginApi)
  },
  { safelist: [] }
)

export const library = {
  plugin: masterPlugin,
  //This assumes your tailwind.config.ts is a sibling to node_modules.
  // If it's not, then the consumer must construct the path manually.
  content: './node_modules/dc-react-ts-test-library/dist/esm/index.js'
}
