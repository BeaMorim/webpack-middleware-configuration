const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = require('./webpack.config')({
    mode: 'production',
    
    entry: [
        path.resolve(process.cwd(), 'app/index.js')
    ],
    
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
    },

    module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
            }
        ]
	},
    
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
    ],
    
    devtool: 'source-map'
})