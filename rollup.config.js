import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import terser from '@rollup/plugin-terser'

/* ========================================================================

======================================================================== */
// The rollup config is an array of config objects. For our library we will
// need two separate configuration objects. The first one will export the
// javascript files. The second one is for exporting our types.

const config = [
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
      // Allow for sass/scss usage out of the box. The docs say to
      // install node-sass, but don't do that. Just use npm i -D sass.
      postcss({
        plugins: [],
        minimize: true
      }),
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
    //# external: [
    //   'react',
    //   'react-dom',
    //   'prop-types',
    //   'styled-components',
    //   'bootstrap'
    //# ]
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
