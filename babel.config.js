module.exports = api => {
  const isTest = api.env('test');

  return {
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 3,
        },
      ],
      isTest ? 'babel-plugin-dynamic-import-node' : null,
    ].filter(Boolean),
    presets: [['@babel/preset-env', { modules: isTest ? 'commonjs' : false }]],
  };
};
