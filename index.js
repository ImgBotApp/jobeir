/**
 * Entry Script
 */

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const webpackIsomorphicToolsConfig = require('./webpack/webpack.config.isomorphic');
const projectBasePath = require('path').resolve(__dirname, './');

require('babel-register')({
  plugins: [
    [
      'babel-plugin-webpack-loaders',
      {
        config: './webpack/webpack.config.babel.js',
        verbose: true
      }
    ],
    'transform-es2015-modules-commonjs'
  ]
});

require('babel-polyfill');
require('es6-promise').polyfill();
require('isomorphic-fetch');

// prettier-ignore
if (process.env.NODE_ENV === 'production') {
  global.webpackIsomorphicTools = new WebpackIsomorphicTools(
    webpackIsomorphicToolsConfig
  ).server(projectBasePath, () => {
    require('./build/server/server.bundle');
  });
} else {
// Babel polyfill to convert ES6 code in runtime
  global.webpackIsomorphicTools = new WebpackIsomorphicTools(
    webpackIsomorphicToolsConfig
  ).server(projectBasePath, () => {
    require('./server/server');
  });
}
