const path = require('path');
const webpack = require('webpack');
const nib = require('nib');
const jeet = require('jeet');
const rupture = require('rupture');

module.exports = {
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?http://0.0.0.0:3001/',
        'webpack/hot/only-dev-server',
        './client/index.js',
    ],

    output: {
        filename: 'bundle.js',
        path: __dirname,
        publicPath: '/dist',
    },

    devtool: 'inline-source-map',

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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                stylus: {
                    use: [nib(), jeet(), rupture()]
                },
                context: '/'
            }
        }),
    ],

    devServer: {
        contentBase: [
            path.join(__dirname, 'dist'),
            path.join(__dirname, 'public'),
        ],
        host: 'localhost',
        port: 3001,
        historyApiFallback: true,
        hot: true,
    },
};
