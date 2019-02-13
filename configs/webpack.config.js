const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = (options) => ({
    ...options,
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './app/index.js',
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../build'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
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
        new CleanWebpackPlugin(['build'], {
            root: path.join(__dirname, '..')
        }),

        /* Plugin that simplifies creation of HTML files to serve your bundles */
        new HtmlWebpackPlugin({
            title: 'Personal React Boilerplate',
            template: 'app/index.html',
            inject: true
        }),

        /* Tell webpack we want hot reloading */
        new webpack.HotModuleReplacementPlugin(),

        /* 
        * webpack-pwa-manifest is a webpack plugin that generates a 'manifest.json' for your Progressive Web Application, 
        * with auto icon resizing and fingerprinting support 
        */
        new WebpackPwaManifest({
            name: 'React Boilerplate',
            theme_color: "#fafafa",
            background_color: '#ffffff',
            start_url: "/",
            crossorigin: null, 
            display: "standalone",
            icons: [
                {
                    src: "app/assets/images/logo.png",
                    sizes: [192],
                }
            ]
        })
    ],
    optimization: {
        /* 
        * Finds modules which are shared between chunk and splits them into separate chunks 
        * to reduce duplication or separate vendor modules from application modules 
        */
		splitChunks: {
			/* The name of the split chunk. Providing true will automatically generate a name based on chunks and cache group key */
			name: true,
			chunks: 'all',

			/* Cache groups can inherit and/or override any options from splitChunks */
			cacheGroups: {
				vendors: {
					name: 'vendors',
					test: /[\\/]node_modules[\\/]/,

					/* A module can belong to multiple cache groups. The optimization will prefer the cache group with a higher priority */
					priority: -10
				},
				default: {
					/* Minimum number of chunks that must share a module before splitting. */
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	}
});

