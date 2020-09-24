const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');
const { WebpackPluginServe } = require('webpack-plugin-serve');

exports.devServer = () => ({
  watch: true,
  plugins: [
    new WebpackPluginServe({
      port: process.env.PORT || 8080,
      static: './dist', // Expose if output.path changes
      liveReload: true,
      waitForBuild: true,
    }),
  ],
});

exports.page = ({ title }) => ({
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title,
      },
    }),
  ],
});

exports.extractCSS = ({ options = {}, loaders = [] } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, options },
            'css-loader',
          ].concat(loaders),
          sideEffects: true,
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
  };
};
