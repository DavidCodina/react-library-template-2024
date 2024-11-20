import type { Config } from 'tailwindcss'
import { squarePlugin } from './plugins/squarePlugin'

const config: Config = {
  // prefix: 'xx-',
  darkMode: 'selector',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [squarePlugin]
}

export default config
