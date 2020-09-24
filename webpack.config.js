const { mode } = require('webpack-nano/argv');

const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');

module.exports = {
  mode,
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: 'Webpack demo',
      },
    }),
  ],
};
