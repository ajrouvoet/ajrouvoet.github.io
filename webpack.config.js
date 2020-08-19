var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');
var fs = require('fs');

module.exports = {
    entry: "./src/app.jsx",

    output: {
        path: path.resolve(__dirname, './build/'),
        filename: "bundle.js"
    },

    devtool: 'inline-source-map',
    devServer: {
        contentBase: './',
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // compile js with babel
            {
                test: /\.js|\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.yaml$/,
                loader: 'json-loader!yaml-loader'
            },
            // style from our source base
            {
                test: /\.css$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules/'),
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: 1,
                                importLoaders: 1,
                                root: path.resolve(__dirname, './src/style/'),
                                localIdentName: '[name]__[local]__[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {}
                        },
                    ]
                })
            },
            // style loader for compiled assets from node_modules
            {
                test: /.*\.css$/,
                loader: 'style-loader!css-loader',
                include: [
                    path.resolve(__dirname, 'node_modules/')
                ]
            },
            // fonts and svg
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.pdf$/,
                use: [{
                    loader: "file-loader"
                }]
            }
        ],
    },

    plugins: [
        new ExtractTextPlugin("style.css"),
        new HtmlWebpackPlugin({
            title: 'AJ Rouvoet',
            template: './src/index.pug'
        })
    ]
}
