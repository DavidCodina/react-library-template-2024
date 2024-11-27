export default {
  plugins: {
    // https://tailwindcss.com/docs/using-with-preprocessors
    // Before v4.0, if you wanted to inline other CSS files using
    // @import you’d have to configure another plugin like postcss-import to handle it for you.
    // This is now baked into @tailwindcss/postcss.
    // ❌ 'postcss-import': {},
    // You no longer need to install @tailwindcss/nesting.
    // This works out of the box:
    // ❌  '@tailwindcss/nesting': {},
    //^ This IS needed for storybook.
    //^ However, in a React/Vite app, the beta version of @tailwindcss/postcss@next
    //^ may actually cause issues with the recompilation process.
    '@tailwindcss/postcss': {}
    // ❌ tailwindcss: {}
    // When building for production, Tailwind CSS v4.0 runs your CSS through Lightning CSS automatically,
    // which handles things like vendor prefixes, modern feature transpilation, minification, and more.
    // ❌ autoprefixer: {}
  }
}
