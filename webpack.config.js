const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssPlugin = new ExtractTextPlugin('[name].css');

module.exports = {
    entry: [ 'webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080', __dirname + '/src/app.js' ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                }],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader!css-loader',
                }],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        query: { minimize: true }
                    }
                }]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true
    },
    node: {
        hot: true,
        inline: true,
        progress: true,
        colors: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            pkg: require('./package.json'),
            template: './index.html',
            inject: 'body'
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        cssPlugin
    ]
};
