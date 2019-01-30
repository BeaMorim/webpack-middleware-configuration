const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (options) => ({
    ...options,
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', // The style-loader adds CSS to the DOM by injecting a <style> tag.
                    'css-loader' // The css-loader interprets @import and url() like import/require() and will resolve them.
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader' // The file-loader resolves import/require() on a file into a url and emits the file into the output directory.
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        /* A webpack plugin to remove/clean your build folder(s) before building */
        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, '..')
        }),

        /* Plugin that simplifies creation of HTML files to serve your bundles */
        new HtmlWebpackPlugin({
            title: 'Personal React Boilerplate',
            template: 'src/index.html',
            inject: true
        })

        // PRODUCTION
        /*
            new HtmlWebpackPlugin({
                title: 'Personal React Boilerplate',
                template: 'src/index.html',
                inject: true,
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true,
                    keepClosingSlash: true,
                    minifyCSS: true,
                    minifyJS: true,
                    minifyURLs: true,
                }
            })
        */
    ]
});

