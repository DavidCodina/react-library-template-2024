import type { Config } from 'tailwindcss'
import { library } from 'dc-react-ts-test-library'

//import plugin from 'tailwindcss/plugin'
// In Tailwind v3 we used to be able to do this:
// import type { PluginAPI } from 'tailwindcss/types/config'
// That seems to no longer work in v4, but we can still derive PluginAPI manually.
// type PluginFn = Parameters<typeof plugin>[0]
// type PluginAPI = Parameters<PluginFn>[0]

// type Plugins = Config['plugins']
// type Plugin = NonNullable<Plugins>[number]

/* ========================================================================

======================================================================== */

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
  // theme: {
  //   extend: {
  //     colors: {
  //       // This is a Tailwind color generator tool: https://www.tints.dev/
  //       // https://www.simeongriggs.dev/using-the-tailwind-css-palette-generator-and-api

  //       // Lighter than the default (less of a mustard color).
  //       yellow: {
  //         50: '#FFFBE5',
  //         100: '#FFF7CC',
  //         200: '#FFF099',
  //         300: '#FFE866',
  //         400: '#FFE033',
  //         500: '#FFD700',
  //         600: '#CCAD00',
  //         700: '#998200',
  //         800: '#665700',
  //         900: '#332B00',
  //         950: '#191600'
  //       },

  //       olive: {
  //         50: '#F9FCE4',
  //         100: '#F3F9CD',
  //         200: '#E7F39B',
  //         300: '#DCED68',
  //         400: '#D0E736',
  //         500: '#B5CC18',
  //         600: '#91A413',
  //         700: '#6D7B0F',
  //         800: '#48520A',
  //         900: '#242905',
  //         950: '#101202'
  //       },

  //       green: {
  //         50: '#EAFAEA',
  //         100: '#D6F5D6',
  //         200: '#ADEBAD',
  //         300: '#84E184',
  //         400: '#5BD75B',
  //         500: '#32CD32',
  //         600: '#28A428',
  //         700: '#1E7B1E',
  //         800: '#145214',
  //         900: '#0A290A',
  //         950: '#051505'
  //       },

  //       // Very bright!
  //       pink: {
  //         50: '#FFE5F3',
  //         100: '#FFD1EA',
  //         200: '#FFA3D4',
  //         300: '#FF70BC',
  //         400: '#FF42A7',
  //         500: '#FF1493',
  //         600: '#DB0075',
  //         700: '#A30057',
  //         800: '#70003C',
  //         900: '#38001E',
  //         950: '#19000E'
  //       },

  //       brown: {
  //         50: '#F7EEE9',
  //         100: '#EFE0D6',
  //         200: '#E0C2AE',
  //         300: '#D0A385',
  //         400: '#C1855D',
  //         500: '#A5673F',
  //         600: '#855433',
  //         700: '#643F26',
  //         800: '#422A19',
  //         900: '#21150D',
  //         950: '#0F0906'
  //       },

  //       light: 'rgb(248, 249, 250)',
  //       // Bootstrap uses  #212529 / rgb(33, 37, 41). However,
  //       // I prefer to go just a little lighter with charcoal.
  //       dark: '#333'
  //     },

  //     fontFamily: {
  //       sans: [
  //         'Poppins',
  //         'ui-sans-serif',
  //         'system-ui',
  //         '-apple-system',
  //         'BlinkMacSystemFont',
  //         '"Segoe UI"',
  //         'Roboto',
  //         '"Helvetica Neue"',
  //         'Arial',
  //         '"Noto Sans"',
  //         'sans-serif',
  //         '"Apple Color Emoji"',
  //         '"Segoe UI Emoji"',
  //         '"Segoe UI Symbol"',
  //         '"Noto Color Emoji"'
  //       ]
  //     }

  //     ///////////////////////////////////////////////////////////////////////////
  //     //
  //     // Note: you can do this sort of thing:
  //     //
  //     // boxShadow: ({ theme }) => {
  //     //   return {
  //     //     'focus-green': `0 0 0 0.25rem ${theme('colors.green.500 / 50%')}`,
  //     //     ...
  //     //   }
  //     // }
  //     //
  //     // But there's actually an easier way. The theme() function can actually exist
  //     // inside of a string WITHOUT template literals:
  //     //
  //     // boxShadow: {
  //     //   'focus-green': "0 0 0 0.25rem theme('colors.green.500/50%')",
  //     // }
  //     //
  //     // Of course, we can still make this even better by doing programmatically.
  //     // In that case, we would probably need to use the function syntax instead.
  //     // See here for other box-shadow ideas: https://manuarora.in/boxshadows
  //     //
  //     ///////////////////////////////////////////////////////////////////////////
  //   }
  // },

  //! Type PluginCreator is not assignable to type PluginFn
  //! This may be resolved once I update the library to v4.
  plugins: [library.plugin as any]
}

export default config
