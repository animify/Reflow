const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;
const path = require('path');
const webpack = require('webpack');
const nib = require('nib');
const jeet = require('jeet');
const rupture = require('rupture');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        vendor: ['babel-polyfill', 'react', 'react-dom', 'redux'],
        main: './client/index.js'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../test'),
    },

    devtool: 'none',

    mode: 'production',

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true
                },
            }
        },
        runtimeChunk: true,
        minimize: true
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'dist/assets/',
                    publicPath: 'assets',
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'stylus-loader'
                    },
                ],
            }
        ],
    },

    resolve: {
        extensions: ['*', '.js', '.jsx']
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'test/template.html',
            filename: 'index.html',
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                stylus: {
                    use: [nib(), jeet(), rupture()]
                },
                context: '/'
            }
        }),
    ]
};
