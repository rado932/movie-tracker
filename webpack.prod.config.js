// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// Constant with our paths
const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    JS: path.resolve(__dirname, 'src'),
    PUBLIC: path.resolve(__dirname, 'public'),
};

// Webpack configuration
module.exports = {
    mode: "production",
    entry: path.join(paths.JS, 'index.js'),
    devtool: 'source-map',
    output: {
        path: paths.DIST,
        filename: 'app-prod.js'
    },
    performance: {
        hints: false
    },
    devServer: {
        contentBase: paths.PUBLIC,
        compress: true,
        port: 8080
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new UglifyJsPlugin({
            sourceMap: true
        }),
    ],
    // Loaders configuration
    // We are telling webpack to use "babel-loader" for .js and .jsx files
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
            // CSS loader to CSS files
            // Files will get handled by css loader and then passed to the extract text plugin
            // which will write it to the file we defined above
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }, {
                test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                use: [
                    {
                        loader: 'url-loader'
                    },
                ]
            }
        ],
    },
    // Enable importing JS files without specifying their's extenstion
    //
    // So we can write:
    // import MyComponent from './my-component';
    //
    // Instead of:
    // import MyComponent from './my-component.jsx';
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
