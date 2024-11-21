import plugin from 'tailwindcss/plugin'
import type { PluginAPI } from 'tailwindcss/types/config'

/* ========================================================================

======================================================================== */

export const squarePluginFunction = (pluginApi: PluginAPI) => {
  const { addComponents, theme } = pluginApi

  addComponents({
    '.square': {
      border: '5px dashed theme(colors.red.800)',
      color: '#fff',
      fontSize: '20px',
      height: '150px',
      width: '150px',
      backgroundColor: theme('colors.red.500'),
      borderRadius: '25px'
    }
  })
}

const squarePlugin = plugin(function (pluginApi) {
  squarePluginFunction(pluginApi)
})

export { squarePlugin }
