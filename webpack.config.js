const { mode } = require('webpack-nano/argv');

const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = {
  mode,
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: 'Webpack demo',
      },
    }),
    new WebpackBar(),
  ],
};
