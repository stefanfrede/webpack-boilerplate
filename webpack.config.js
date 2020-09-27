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
    plugins: [new WebpackBar()],
  },

  parts.page({ title: 'Webpack demo' }),
]);

const productionConfig = merge([
  parts.extractCSS({ loaders: cssLoaders }),
  parts.eliminateUnusedCSS(),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[ext]',
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
