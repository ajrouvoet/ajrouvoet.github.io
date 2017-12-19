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
        contentBase: './'
    },

    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader'
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
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
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

/*

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'index.js',
    path: path.resolve('./dist'),
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },
      { test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
    ]
  },

  postcss: [
    require('autoprefixer-core'),
    require('postcss-color-rebeccapurple')
  ],

  resolve: {
    modulesDirectories: ['node_modules', 'components']
  },

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new ReactToHtmlPlugin('index.html', 'index.js', {
      static: true,
      template: ejs.compile(fs.readFileSync(__dirname + '/src/template.ejs', 'utf-8'))
    })
  ]
};
*/
