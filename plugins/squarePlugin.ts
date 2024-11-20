import plugin from 'tailwindcss/plugin'

/* ========================================================================

======================================================================== */

const squarePlugin = plugin(function (pluginApi) {
  const { addComponents, theme } = pluginApi

  addComponents({
    '.square': {
      color: '#fff',
      fontSize: '20px',
      height: '250px',
      width: '250px',
      backgroundColor: theme('colors.orange.500'),
      borderRadius: '25px'
    }
  })
})

export { squarePlugin }
