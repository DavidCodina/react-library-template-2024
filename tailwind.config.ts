import type { Config } from 'tailwindcss'
import { library } from './src/plugins'

const config: Config = {
  // prefix: 'xx-',
  darkMode: 'selector',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [library.plugin]
}

export default config
