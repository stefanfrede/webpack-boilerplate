const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const cssnano = require('cssnano');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const { WebpackPluginServe } = require('webpack-plugin-serve');

const path = require('path');
const glob = require('glob');

const ALL_FILES = glob.sync(path.join(__dirname, 'src/*.js'));
const APP_SOURCE = path.join(__dirname, 'src');

exports.clean = () => ({
  plugins: [new CleanWebpackPlugin()],
});

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
});

exports.devServer = () => ({
  watch: true,
  plugins: [
    new WebpackPluginServe({
      port: process.env.PORT || 8080,
      static: './dist',
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

exports.eliminateUnusedCSS = () => ({
  plugins: [
    new PurgeCSSPlugin({
      whitelistPatterns: [],
      paths: ALL_FILES,
      extractors: [
        {
          extractor: (content) =>
            content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
          extensions: ['html'],
        },
      ],
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
        filename: '[name].[contenthash:4].css',
      }),
    ],
  };
};

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});

exports.postcssImport = () => ({
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [require('postcss-import')],
    },
  },
});

exports.postcssPresetEnv = () => ({
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [require('postcss-preset-env')({ stage: 3 })],
    },
  },
});

exports.tailwind = () => ({
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [require('tailwindcss')()],
    },
  },
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|webp)$/i,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});

exports.loadJavaScript = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include: APP_SOURCE,
        use: 'babel-loader',
      },
    ],
  },
});

exports.minifyJavaScript = () => ({
  optimization: {
    minimizer: [new TerserPlugin({ sourceMap: true })],
  },
});

exports.loadSVGs = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.svg$/i,
        include,
        exclude,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'svgo-loader',
            options,
          },
        ],
      },
    ],
  },
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});
