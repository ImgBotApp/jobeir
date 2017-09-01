const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = {
  webpack_assets_file_path: 'webpack/webpack-assets.json',
  assets: {
    images: {
      extensions: ['jpg', 'png', 'gif', 'svg'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    }
  },
  modulesDirectories: ['node_modules'],
  patch_require: false
};
