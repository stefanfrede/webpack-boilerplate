const presets = [
  [
    '@babel/preset-env',
    {
      corejs: 3.6,
      modules: false,
      useBuiltIns: 'usage',
    },
  ],
];

const plugins = [['@babel/plugin-transform-runtime']];

module.exports = { presets, plugins };
