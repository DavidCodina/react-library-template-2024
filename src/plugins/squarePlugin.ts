import plugin from 'tailwindcss/plugin'

// In Tailwind v3 we used to be able to do this:
// import type { PluginAPI } from 'tailwindcss/types/config'
// That seems to no longer work in v4, but we can still derive PluginAPI manually.
type PluginFn = Parameters<typeof plugin>[0]
type PluginAPI = Parameters<PluginFn>[0]
type PluginWithConfig = ReturnType<typeof plugin>

/* ========================================================================

======================================================================== */

export const squarePluginFunction = (pluginApi: PluginAPI) => {
  const { addComponents /* , theme */ } = pluginApi

  addComponents({
    '.square': {
      // border: '5px dashed theme(colors.red.800)',
      border: '5px dashed var(--color-red-800)',
      color: '#fff',
      fontSize: '20px',
      height: '150px',
      width: '150px',
      // backgroundColor: theme('colors.red.500'),
      backgroundColor: 'var(--color-red-500)',
      borderRadius: '25px'
    }
  })
}

export const squarePlugin: PluginWithConfig = plugin(function (pluginApi) {
  squarePluginFunction(pluginApi)
})

export default squarePlugin
