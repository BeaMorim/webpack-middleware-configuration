const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = require('./webpack.config')({
    mode: 'production',
    /* devtool: 'source-map', */
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Personal React Boilerplate',
            template: 'app/index.html',
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
    ]
})