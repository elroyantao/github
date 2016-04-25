var path = require('path'),
  webpack = require('webpack'),
  AssetsPlugin = require('assets-webpack-plugin');

var DEBUG = !(process.env.NODE_ENV === 'production');
var env = {
  NODE_ENV : process.env.NODE_ENV,
};

var config = {
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  entry : {
    app : './app/app',
    vendor : [
      'angular'
    ]
  },
  resolve: {
    root: [ path.join(__dirname, 'app') ]
  },
  output : {
    path: path.join(__dirname, 'dist'),
    filename: DEBUG ? '[name].js' : '[name].[chunkhash].js'
  },
  plugins : [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
};

if(DEBUG){
  config.entry.dev = [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
  ];

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filname: 'vendor.js'
    })
  ]);

  config.output.publicPath = 'http://localhost:3001/static/';

}else {
  config.plugins = config.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filname: '[name].[chunkhash].js'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new AssetsPlugin({ path: path.join(__dirname, 'dist') })
  ]);
}

module.exports = config;
