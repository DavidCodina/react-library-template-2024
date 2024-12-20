import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
//! import postcssImport from 'postcss-import'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'
import image from '@rollup/plugin-image'
import autoprefixer from 'autoprefixer'

// In Tailwind v3 we simply did: import tailwindcss from 'tailwindcss'.
// Nowe we need to do this:
import tailwindcss from '@tailwindcss/postcss'

// https://stackoverflow.com/questions/70106880/err-import-assertion-type-missing-for-import-of-json-file
// Use `with` NOT `assert`
import packageJson from './package.json' with { type: 'json' }

/* ========================================================================

======================================================================== */

const config = [
  /* ======================
          Tailwind
  ====================== */
  ///////////////////////////////////////////////////////////////////////////
  //
  // https://www.npmjs.com/package/rollup-plugin-postcss
  // Usage in consuming app that doesn't use Tailwind:
  //
  //   import 'dc-react-ts-test-library/dist/main.css'
  //   import 'styles/main.css' // (i.e., app's primary stylesheet)
  //
  /////////////////////////
  //
  // Alternatively, you could add this to the consuming app's tailwind.config.ts:
  //
  //   import type { Config } from 'tailwindcss'
  //   import { library } from 'dc-react-ts-test-library'
  //
  //   const config: Config = {
  //     content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', library.content],
  //     theme: { extend: {} },
  //     plugins: [library.plugin]
  //   }
  //
  //   export default config
  //
  // This is the most idiomatic appproach, but it means that the use of @import for importing
  // other CSS files into src/styles/main.css is no longer an option. Why? Because we're no
  // longer using the library's dist/main.css. Instead, we're relying entirely on the
  // libary.plugin + library.content path. See Flowbite and Preline UI:
  //
  //    https://flowbite-react.com/docs/getting-started/introduction
  //    https://preline.co/docs/index.html
  //
  //
  /////////////////////////
  //
  // There is a third approach that I think Ripple UI takes, where it doesn't even require
  // the user to set the content string. When one installs the Ripple UI plugin in their tailwind
  // config, it automatically includes the necessary Tailwind classes used by Ripple UI components.
  // This way, the consuming application doesn't need to manually import a stylesheet or add
  // anything to the content configuration. It looks like this is accomplished through having
  // a safelist within the Ripple UI plugin:
  //
  //   https://github.com/Siumauricio/rippleui/blob/main/config/utils/safeList.ts
  //
  // Again, one can no longer use @import syntax to merge CSS files into the library's main.css.
  // Moreover, you have to carefully manage the safelist. That's very tedious, which is why for now
  // I'm preferring approach 2.
  //
  ///////////////////////////////////////////////////////////////////////////

  {
    input: 'src/styles/main.css',

    output: [{ file: 'dist/main.css', format: 'es' }], //^'es' or 'esm'
    plugins: [
      postcss({
        extract: true,
        // config: false, // This prevents reading postcss.config.mjs
        // minimize: true,
        // Don't forget to add 'postcss-import': {}, to the postcss.config.mjs,
        // which is used within .storybook/main.ts
        plugins: [
          // postcssImport(), // Should already be baked into tailwindcss()
          tailwindcss(),
          autoprefixer()
        ]
      })
    ]
  },

  /* ======================
  libraryPlugin configuration
  ====================== */

  {
    input: 'src/plugins/masterPlugin.ts',

    output: [
      {
        file: 'dist/libraryPlugin.js',
        format: 'esm'
        // sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json'
        // sourceMap: true,
        // inlineSources: true
      }),
      terser()
    ]
  },

  /* ======================
    JS files configuration
  ====================== */

  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main, // 'dist/cjs/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: packageJson.module, // 'dist/esm/index.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      ///////////////////////////////////////////////////////////////////////////
      //
      // Docs indicate to 'preferably set as first plugin'
      // This plugin looks at the package.json's peerDependencies and then
      // omits them from the bundle. While react and react-dom are almost always
      // added as peer dependencies, there's mixed opinions on whether to add
      // other packages (e.g., framer-motion, react-select, etc.).
      //
      // Generally, it's better to include almost everything as a peer dependency.
      // With modern npm (version 7 and above), peer dependencies are installed automatically by default.
      // This is a significant improvement from earlier versions where developers had to manually install
      // peer dependencies. There's essentially no drawback to being liberal with peer dependencies.
      // Adding peer dependencies has a SIGNIFICANT impact on bundle size!
      // Here's how I'm currently handling peer dependencies:
      //
      //   "peerDependencies": {
      //     "react": ">= 18.x",
      //     "react-dom": ">= 18.x",
      //     "tailwind-merge": "^2.x"
      //   },
      //
      // react and react-dom use >= syntax because I'm confident I will be able to keep the
      // library up to date and watch for breaking changes. Other packages, however, I may
      // not be able to keep up with so regularly, so I'm using ^ syntax to limit the range
      // the the major versions.
      //
      ///////////////////////////////////////////////////////////////////////////
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
      // that can quickly get way too large. Solution: use postcss-import and @import
      // all .css files into main.css - DO NOT import them directly into the components!
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
      image(),
      json(),

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
      }),
      terser()
    ]
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
