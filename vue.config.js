const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ['src/**/*.{vue,scss}'],
      }),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/sass/_variables.sass"`,
      },
      scss: {
        prependData: `@import "@/sass/_variables.scss";`,
      },
    },
  },
};
