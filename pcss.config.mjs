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

    ///////////////////////////////////////////////////////////////////////////
    //
    //^ This is needed for storybook.
    //
    // However, it causes problems with the example app.
    // Actually, it also caused problems when used in a normal React/Vite app.
    // It doesn't technically prevent the recompilation process from happening,
    // but somehow the styles don't update.
    //
    // One way to mitigate this for now is to ONLY use the postcss.config.mjs
    // when running storybook. By default, it seems like the logic in rollup-plugin-postcss.
    // is still reading it.
    //
    // In theory, we should be able to pass config:false to rollup-plugin-postcss.
    // However, that didn't work. It's possible that the tailwindcss() plugin
    // inside of the postcss() plugin is still picking up the postcss.config.mjs.
    // To prevent this, we can obscure the file name to pcss.config.mjs.
    // Then to make sure storybook reads from it we can do this: in .storybook/main.ts::
    //
    //   postcssOptions: {
    //     config: './pcss.config.mjs'
    //   }
    //
    // Hopefully, this is just a bug with the beta version of @tailwindcss/postcss for v4.
    //
    ///////////////////////////////////////////////////////////////////////////
    '@tailwindcss/postcss': {}
    // ❌ tailwindcss: {}
    // When building for production, Tailwind CSS v4.0 runs your CSS through Lightning CSS automatically,
    // which handles things like vendor prefixes, modern feature transpilation, minification, and more.
    // ❌ autoprefixer: {}
  }
}
