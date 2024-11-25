import plugin from 'tailwindcss/plugin'
import { squarePluginFunction } from './squarePlugin'

type PluginWithConfig = ReturnType<typeof plugin>

/* ========================================================================

======================================================================== */

const masterPlugin: PluginWithConfig = plugin(function (pluginApi) {
  squarePluginFunction(pluginApi)
})

export const library = {
  plugin: masterPlugin as PluginWithConfig,
  //This assumes your tailwind.config.ts is a sibling to node_modules.
  // If it's not, then the consumer must construct the path manually.
  content: './node_modules/dc-react-ts-test-library/dist/esm/index.js'
}

export default masterPlugin
