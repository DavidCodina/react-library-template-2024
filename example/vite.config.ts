import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()], // For path aliases or absolute paths to work.
  server: {
    port: 3000,

    //^ This doesn't always work...
    watch: {
      ignored: ['!**/node_modules/dc-react-ts-test-library/**']
    }
  }
})
