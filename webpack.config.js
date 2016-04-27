var path = require('path'),
    webpack = require('webpack'),
    AssetsPlugin = require('assets-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');


var DEBUG = !(process.env.NODE_ENV === 'production');
var env = {
    NODE_ENV: process.env.NODE_ENV,
};

var config = {
    devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
    entry: {
        app: './app/app',
        vendor: [
            'angular',
            'angular-ui-router'
        ]
    },
    resolve: {
        root: [path.join(__dirname, 'app')]
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: DEBUG ? '[name].js' : '[name].[chunkhash].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(env)
        })
    ],
    module: {
        loaders: [{
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                include: __dirname + '/app',
                query: {
                    presets: ['es2015']
                }
            }, {
                test: /\.html$/,
                loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './app')) + '/!html',
                exclude: /node_modules/,
                // include: __dirname+'/app',
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }
            // { test: /\.html$/, loader: 'ng-cache?prefix=[dir]/[dir]' },
        ]
    }
};

if (DEBUG) {
    config.entry.dev = [
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/only-dev-server',
    ];

    config.plugins = config.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filname: 'vendor.js'
        }),
        new ExtractTextPlugin("style.css", {
            allChunks: true
        })

    ]);

    config.output.publicPath = 'http://localhost:3001/static/';

} else {
    config.output.path = path.join(__dirname, 'public/dist');
    config.plugins = config.plugins.concat([
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filname: '[name].[chunkhash].js'
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new AssetsPlugin({
            path: path.join(__dirname, 'public')
        }),
        new ExtractTextPlugin("style.[chunkhash].css", {
            allChunks: true
        })
    ]);
}

module.exports = config;
