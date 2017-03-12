/**
 * Entry Script
 */

 const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
 const webpackIsomorphicToolsConfig = require('./webpack/webpack.config.isomorphic');

if (process.env.NODE_ENV === 'production') {
  process.env.webpackAssets = JSON.stringify(require('./build/client/manifest.json'));
  process.env.webpackChunkAssets = JSON.stringify(require('./build/client/chunk-manifest.json'));
  // In production, serve the webpacked server file.
  require('./build/server/server.bundle.js');
} else {
  // Babel polyfill to convert ES6 code in runtime
  require('babel-register')({
    "plugins": [
      [
        "babel-plugin-webpack-loaders",
        {
          "config": "./webpack/webpack.config.babel.js",
          "verbose": true
        }
      ],
      "transform-es2015-modules-commonjs",
      "syntax-dynamic-import"
    ]
  });
  
  require('babel-polyfill');

  global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig)
    .server('./', () => {
      require('./server/server')
    });
}