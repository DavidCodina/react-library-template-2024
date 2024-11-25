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
    //^ package.json doens't always sync with this: "dev": "rollup -c --watch",
    //^ I've noticed it works better on component changes and less with plugin changes.
    watch: {
      ignored: ['!**/node_modules/dc-react-ts-test-library/**']
    }
  }
})
