const { mode } = require('webpack-nano/argv');
const { merge } = require('webpack-merge');

const WebpackBar = require('webpackbar');

const parts = require('./webpack.parts');

const commonConfig = merge([
  {
    plugins: [new WebpackBar()],
  },

  parts.page({ title: 'Webpack demo' }),
]);

const productionConfig = merge([]);

const developmentConfig = merge([
  {
    entry: ['./src', 'webpack-plugin-serve/client'],
  },

  parts.devServer(),
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
