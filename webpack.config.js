const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const path = require('path');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'src'),
};

const commonConfig = merge([
  {
    output: {
      path: path.resolve(process.cwd(), 'dist'),
    },
    node: false,
    plugins: [
      new CaseSensitivePathsPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      new GenerateSW(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'Webpack Boilerplate',
      }),
    ],
    resolve: {
      mainFields: ['module', 'browser', 'main'],
    },
  },
  parts.loadFonts(),
  parts.loadSVGs({
    options: {
      classPrefix: true,
      idPrefix: true,
    },
  }),
  parts.loadJavaScript({
    include: PATHS.app,
  }),
  {
    optimization: {
      noEmitOnErrors: true,
    },
  },
]);

const productionConfig = merge([
  {
    performance: {
      hints: 'warning',
      maxEntrypointSize: 150000,
      maxAssetSize: 450000,
    },
  },
  {
    recordsPath: path.join(__dirname, 'records.json'),
    output: {
      chunkFilename: '[name].[chunkhash:4].js',
      filename: '[name].[chunkhash:4].js',
    },
  },
  parts.clean(),
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
      safe: true,
    },
  }),
  parts.extractCSS({
    use: ['css-loader', 'postcss-loader'],
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[hash:4].[ext]',
    },
  }),
  parts.generateSourceMaps({ type: 'source-map' }),
  {
    optimization: {
      splitChunks: {
        chunks: 'initial',
      },
      runtimeChunk: {
        name: 'manifest',
      },
    },
  },
  parts.attachRevision(),
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadImages(),
]);

module.exports = mode => {
  const config = mode === 'production' ? productionConfig : developmentConfig;

  return merge([commonConfig, config, { mode }]);
};
