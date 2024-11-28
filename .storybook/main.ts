import type { StorybookConfig } from '@storybook/react-webpack5'

/* ========================================================================

======================================================================== */

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    // For Tailwind dark mode support of components.
    // Not related to Storybook dark mode.
    '@storybook/addon-themes',
    // https://storybook.js.org/addons/@storybook/addon-styling-webpack
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          // Replaces existing CSS rules to support PostCSS
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: { importLoaders: 1 }
              },
              {
                // Gets options from `postcss.config.js` in your project root
                // Do not omit postcss.config.mjs, or pcss.config.mjs
                loader: 'postcss-loader',
                options: {
                  implementation: require.resolve('postcss'),
                  postcssOptions: {
                    config: './pcss.config.mjs'
                  }
                }
              }
            ]
          }
        ]
      }
    }
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  // By default it was docs: { autodocs: 'tag'}
  // That setting would mean that any .stories.tsx file that had tags: ['autodocs'],
  // in the meta would get docs. However, I actually always want the docs.
  docs: {
    autodocs: true // 'tag'
  }
}
export default config
