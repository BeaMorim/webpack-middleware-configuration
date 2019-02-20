const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = require('./webpack.config.js')({
	mode: 'development',

	entry: [
        'webpack-hot-middleware/client?reload=true',
        path.resolve(process.cwd(), 'app/index.js')
	],

	output: {
		filename: '[name].js',
		chunkFilename: '[name].chunk.js',
	},

	plugins: [
		/* Tell webpack we want hot reloading */
		new webpack.HotModuleReplacementPlugin(),
		
		/* Plugin that simplifies creation of HTML files to serve your bundles */
        new HtmlWebpackPlugin({
            title: 'Personal React Boilerplate',
            template: 'app/index.html',
            inject: true
        }),
	],
	
	/* devtool: maps the compiled code back to your original source code to make easier to track errors and warnings */
	devtool: 'eval-source-map',
})