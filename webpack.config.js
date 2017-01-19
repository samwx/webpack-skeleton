var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var cssPlugin = new ExtractTextPlugin('[name].css');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    __dirname + '/src/app.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'html', query: { minimize: true } }
    ]
  },
  devServer: {
    debug: true,
    watch: true,
    inline: true,
    progress: true,
    colors: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      pkg: require('./package.json'),
      template: './index.html',
      inject: 'body'
    }),
    cssPlugin
  ]
};
