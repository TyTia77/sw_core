// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const {
    devPort,
    fileManageEnd,
    fileManageStart,
    jsUgly,
    postCssLoader,
    sassLoader,
}                       = require('./src/js/setup')
const autoprefixer      = require('autoprefixer')
const debug             = process.env.npm_lifecycle_script.includes('production') ? false : true
const FileManagerPlugin = require('filemanager-webpack-plugin')
const path              = require('path')
const webpack           = require('webpack')

module.exports = {
    devtool: debug ? "inline-sourcemap" : false,

    entry: path.resolve(__dirname, 'src/js/index.jsx'),

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',

        /*
            tells webpack where to serve bundle in memory
            instead of having it at /build/, set it to /

            virtual bundle needs to be on root directory
            when running on server, we target src=./bundle
            as the server is running on root, but serving
            /build directory
        */
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test    : /\.jsx?$/,
                exclude : [/(node_modules)/, path.resolve(__dirname, 'js/vendor/')],
                loader  : 'babel-loader',
                options : {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties']
                }
            },
            {
                test: /\.s?css$/,
                exclude: /(node_modules)/,
                use: [
                    'style-loader',
                    'css-loader',
                    postCssLoader(autoprefixer),
                    sassLoader
                ]
            },

            // NOTE: external stylesheet
            // {
            //     test: /\.scss$/,
            //     exclude: /(node_modules)/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: [
            //             'css-loader',
            //             'sass-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            //         ]
            //     })
            // },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: 'url-loader?limit=100000'
            }
        ]
    },

    resolve: {

        // you can now require('file') instead of require('file.jsx/js')
        extensions: [' ', '.js', '.jsx', '.es6', '.css', '.scss'],

        // absolute paths, we can now import varName from 'Helpers/helper'
        alias: {
            Components : path.resolve(__dirname, 'src/js/app/components'),
            Helpers    : path.resolve(__dirname, 'src/js/helpers'),
            StylePath  : path.resolve(__dirname, 'src/scss'),
            FontPath   : path.resolve(__dirname, 'src/fonts'),
        }
    },

    devServer: {
        contentBase: path.resolve(__dirname, "src"),
        port: devPort,
        // noInfo: true,
        compress: true,

        // opens in browser
        open: true,

        // watches everything inside contentBase = '/'
        watchContentBase: true
    },

    plugins: debug ?
        [new FileManagerPlugin({onStart: fileManageStart,})] : [
            new webpack.optimize.UglifyJsPlugin(jsUgly),

            new FileManagerPlugin({
                onStart : fileManageStart,
                onEnd   : fileManageEnd,
            }),

            // extractSCSS
            // new ExtractTextPlugin('style.css')
        ]
}