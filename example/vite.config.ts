import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    port: 3000,

    //^ This doesn't always work. Or rather, the dev script in the library's
    //^ package.json doesn't always sync with this: "dev": "rollup -c --watch",
    //^ I've noticed it works better on component changes and less with plugin changes.
    //^ On top of that, the new Tailwind v4 won't actually pick up new changes from
    //^ the libary until we save again here, or possibly even restart the dev server.
    //^ I tried doing this in mainc.css:
    //^ @source '../../../node_modules/dc-react-ts-test-library/dist/esm/index.js';
    //^
    //^ It didn't help. This issue could be this:
    //^ https://github.com/tailwindlabs/tailwindcss/issues/14800
    //^ It seems like there's issues with the automatic recompilation process
    //^ Even when just making a change in this app.
    //^
    //^ Conversely, when I'm prototyping with Storybook, the components update immediately.
    //^ This suggests that there's still some bugs in the beta version of Tailwind v4,
    //^ and its Vite integration.

    watch: {
      ignored: ['!**/node_modules/dc-react-ts-test-library/**']
    }
  }
})
