const { mode } = require('webpack-nano/argv');

const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');
const WebpackBar = require('webpackbar');
const { WebpackPluginServe } = require('webpack-plugin-serve');

module.exports = {
  watch: mode === 'development',
  entry: ['./src', 'webpack-plugin-serve/client'],
  mode,
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: 'Webpack demo',
      },
    }),
    new WebpackBar(),
    new WebpackPluginServe({
      port: process.env.PORT || 8080,
      static: './dist',
      liveReload: true,
      waitForBuild: true,
    }),
  ],
};
