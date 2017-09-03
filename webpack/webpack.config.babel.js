let cssModulesIdentName = '[name]__[local]__[hash:base64:5]';
if (process.env.NODE_ENV === 'production') {
  cssModulesIdentName = '[hash:base64]';
}

module.exports = {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['client', 'node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'url-loader?limit=10000'
      }
    ]
  }
};
