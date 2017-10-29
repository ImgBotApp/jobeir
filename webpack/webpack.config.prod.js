const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

// prettier-ignore
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsConfig = require('./webpack.config.isomorphic');
const path = require('path');

module.exports = {
  devtool: 'hidden-source-map',

  entry: {
    app: [
      'eventsource-polyfill',
      'babel-polyfill',
      'isomorphic-fetch',
      path.join(__dirname, '../client/index.js')
    ],
    vendor: ['react', 'react-dom', 'draft-js', 'react-draft-wysiwyg']
  },

  output: {
    path: path.join(__dirname, '../public/static/dist/client'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/public/static/dist/client/'
  },

  // target: 'node',

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['client', 'node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      }
    ]
  },

  plugins: [
    new webpack.IgnorePlugin(/\/iconv-loader$/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        CLIENT: JSON.stringify(true),
        STRIPE_PUBLIC: JSON.stringify(process.env.STRIPE_PUBLIC)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].[chunkhash].js'
    }),
    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig),
    new ExtractTextPlugin({
      filename: '[name].font.[chunkhash].css'
    }),
    new ManifestPlugin({
      basePath: '/'
    }),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'gost',
      filename: 'sw.js',
      filepath: path.join(__dirname, '../dist/sw.js'),
      staticFileGlobs: [path.join(__dirname, '../public/static/dist/**/*')],
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      maximumFileSizeToCacheInBytes: 4194304,
      navigateFallback: 'index.html'
    })
  ]
};
