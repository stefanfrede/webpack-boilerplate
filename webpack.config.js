const Dotenv = require('dotenv-webpack');
const { mode } = require('webpack-nano/argv');
const WebpackBar = require('webpackbar');
const { merge } = require('webpack-merge');

const parts = require('./webpack.parts');

const cssLoaders = [
  parts.postcssPresetEnv(),
  parts.tailwind(),
  parts.postcssImport(),
];

const commonConfig = merge([
  {
    plugins: [new Dotenv(), new WebpackBar()],
  },

  parts.clean(),
  parts.page({ title: 'Webpack demo' }),
  parts.loadFonts({
    options: {
      limit: 50000,
      mimetype: 'application/font-woff',
      name: '[name].[ext]',
    },
  }),
  parts.loadJavaScript(),
]);

const productionConfig = merge([
  {
    output: {
      chunkFilename: '[name].[contenthash:4].js',
      filename: '[name].[contenthash:4].js',
    },
  },
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      preset: ['default'],
    },
  }),
  parts.extractCSS({ loaders: cssLoaders }),
  parts.eliminateUnusedCSS(),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[contenthash:4].[ext]',
      loader: 'image-webpack-loader',
      mozjpeg: {
        progressive: true,
      },
      optipng: {
        enabled: false,
      },
      pngquant: {
        quality: [0.65, 0.9],
        speed: 4,
      },
      gifsicle: {
        interlaced: false,
      },
      webp: {
        quality: 75,
      },
    },
  }),
  parts.loadSVGs({
    options: {
      plugins: [
        { removeTitle: true },
        { convertColors: { shorthex: false } },
        { convertPathData: false },
      ],
    },
  }),
  parts.generateSourceMaps({ type: 'source-map' }),
  {
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  },
  parts.attachRevision(),
]);

const developmentConfig = merge([
  {
    entry: ['./src', 'webpack-plugin-serve/client'],
  },

  parts.devServer(),
  parts.extractCSS({ options: { hmr: true }, loaders: cssLoaders }),
  parts.loadImages(),
  parts.loadSVGs(),
]);

const getConfig = (mode) => {
  // Set global NODE_ENV
  process.env.NODE_ENV = mode;

  switch (mode) {
    case 'production':
      return merge(commonConfig, productionConfig, { mode });
    case 'development':
      return merge(commonConfig, developmentConfig, { mode });
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};

module.exports = getConfig(mode);
