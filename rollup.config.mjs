import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import postcssImport from 'postcss-import'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import terser from '@rollup/plugin-terser'

import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

//! import packageJson from './package.json' assert { type: 'json' }

/* ========================================================================

======================================================================== */

// The rollup config is an array of config objects. For our library we will
// need two separate configuration objects. The first one will export the
// javascript files. The second one is for exporting our types.

const config = [
  /* ======================
          Tailwind
  ====================== */
  // https://www.npmjs.com/package/rollup-plugin-postcss
  // Usage in consuming app:
  // import 'dc-react-ts-test-library/dist/main.css'
  // import 'styles/main.css' // (i.e., app's Tailwind stylesheet)

  {
    input: 'src/styles/main.css',

    output: [{ file: 'dist/main.css', format: 'es' }], //^'es' or 'esm'
    plugins: [
      postcss({
        extract: true,
        // minimize: true,
        // Don't forget to add 'postcss-import': {}, to the postcss.config.mjs,
        // which is used within .storybook/main.ts
        plugins: [postcssImport(), tailwindcss(), autoprefixer()]
      })
    ]
  },

  /* ======================
    JS files configuration
  ====================== */

  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/cjs/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/esm/index.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      // Docs indicate to 'preferably set as first plugin'
      peerDepsExternal(),

      resolve(),
      ///////////////////////////////////////////////////////////////////////////
      //
      // ❌ Anti-Pattern: Colocating .css files with components when using Tailwind.
      //
      // Ultimately, we probably don't want to colocate CSS files with our components,
      // and subsequently bake it into the components themselves.
      //
      // Instead it would be better to bundle up all CSS files into main.css.
      // Otherwise, we might end up with specificity issues.
      //
      // However, even that gets tricky because normal CSS that is added
      // to a file after the Tailwind directives will have a higher specificity.
      // This is why the BEST solution is to ALWAYS use Tailwind component plugins
      // and NOT .css files.
      //
      // Alternatively, you could use @layer comonent { ... } in the main.css, but
      // that can quickly get way too large. Thus while this configuration is still
      // a possibility, I would prefer to NOT to do this, and may remove it in the futre.
      // For now, the takeaways is: DO NOT use any other .css files besides src/styles/main.css.
      //
      ///////////////////////////////////////////////////////////////////////////

      // postcss({
      //   minimize: true,
      //   ///////////////////////////////////////////////////////////////////////////
      //   //
      //   // If you do this here:
      //   //
      //   //   plugins: [tailwindcss, autoprefixer]
      //   //
      //   // It will bake the Tailwind styles into the components.
      //   // However, in the top-level index.ts, you also must do this:
      //   // import './styles/main.css'
      //   // Note: This will also enable the tailwind plugins to work.
      //   //
      //   // If you're using Tailwind classes in the components, it becomes very
      //   // important that you use twMerge. Otherwise, you'll end up aggressively
      //   // hardcoding styles.
      //   //
      //   // That said, if your app has a custom color that overwrites Tailwind's colors,
      //   // Then the component library's color palette seems to win out.
      //   // Even if we give the library Tailwind a prefix (e.g., 'xx-'), the library Tailwind
      //   // still wins out.
      //   //
      //   // Also if you use a plugin class that is now more aggressive.
      //   // Presumably because the plugin class now has a higher specificity when it's coming from the library.
      //   // Ultimately, this is a bad idea. The real way to handle Tailwind is to use the above Tailwind configuration.
      //   //  Then in the consuming app's main.tsx or primary layout etc. do this:
      //   //
      //   //   import 'dc-react-ts-test-library/dist/main.css'
      //   //   import 'styles/main.css'
      //   //
      //   // That way you will be getting the Tailwind styles from the library, but your own styles will
      //   // have a higher priority. Note: it's still crucial to use twMerge() in the components.
      //   // However, the best possible way to use Tailwind in this library is to build out the styles
      //   // as Tailwind component plugins then add them to the tailwind.config.ts here (No need to add them in the consuming app).
      //   // In that case, Tailwind utility classes in the consuming app will necessarily have higher precedence regardless of
      //   // whether or not twMerge() was implemented within the libary components. This is the way...
      //   //
      //   // ❌ plugins: [tailwindcss(), autoprefixer()]
      //   //
      //   ///////////////////////////////////////////////////////////////////////////
      // }),
      commonjs(),

      //^ Gotcha: https://github.com/rollup/plugins/issues/1813
      //^ Currently, I'm using  "^11.1.4" and this works.
      typescript({
        tsconfig: './tsconfig.json',

        ///////////////////////////////////////////////////////////////////////////
        //
        // https://github.com/codesyntax/ionic-react-photo-viewer/commit/78a97ad9cf1dcd691e397cc39ba0a7b9be6701a8
        // These next two lines may be a possible fix for the 'Failed to parse source map' bug.
        //
        //   sourceMap: true,
        //   inlineSources: true,
        //
        // This seemed to do the trick. Here is a stackoverflow with other possible solutions:
        // https://stackoverflow.com/questions/63218218/rollup-is-not-generating-typescript-sourcemap
        //
        ///////////////////////////////////////////////////////////////////////////
        sourceMap: true,
        inlineSources: true
        // Presumably, the exclusions are all relative to the src folder.
        // In any case, it does not seem to be including the example app,
        // so there's no need to add that here.

        // ???????????????????????????
        // exclude: [
        //   '**/__tests__',
        //   '**/tests',
        //   '**/__mocks__',
        //   '**/mocks',
        //   '**/jest-setup.*',
        //   '**/setupTests.*',
        //   '**/*.test.*',
        //   '**/*.stories.*',
        //   '**/story.*'
        // ]
      }),
      terser()
    ]
    // ???????????????????????????
    // external: [
    //   'react',
    //   'react-dom',
    //   'prop-types',
    //   'styled-components',
    //   'bootstrap'
    // ]
  },

  /* ======================
      types configuration
  ====================== */

  {
    ///////////////////////////////////////////////////////////////////////////
    //
    // The Alex Eagleson tutorial does this:
    // input: 'dist/esm/types/index.d.ts',
    // The /types part is related to our tsconfig.json declarationDir: "types"
    // However, in a previous version of this library I got the following error:
    //
    //   Error: Could not resolve entry module (dist/esm/types/index.d.ts).
    //
    // The solution was found here: https://stackoverflow.com/questions/73197460/error-could-not-resolve-entry-module-react-rollup
    // Basically, it says to change dist/esm/types/index.d.ts -> dist/esm/index.d.ts in rollup.config.js
    // And that's what I did in the initial version of this library. However, with the latest npm versions
    // of everything, that no longer seems necessary.
    //
    ///////////////////////////////////////////////////////////////////////////

    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    // https://www.youtube.com/watch?v=XHQi5a0TmMc at 53:00.
    // Define files that are not relevant to the generation of .d.ts files.
    external: [/\.s?css$/]
  }
]

export default config
