const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = (options) => ({
    ...options,
    entry: options.entry,
    
    output: Object.assign(
        {
          path: path.resolve(process.cwd(), 'build'),
          publicPath: '/',
        },
        options.output,
    ),
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
                /* Place to add loaders to app .css files(e.g. sass/less etc.) */
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader', /* The style-loader adds CSS to the DOM by injecting a <style> tag */
                    'css-loader' /* The css-loader interprets @import and url() like import/require() and will resolve them. */
                ]
            },
            {
                /* Preprocess .css files located in node_modules */
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    'style-loader', 
                    'css-loader'
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader', /* The file-loader resolves import/require() on a file into a url and emits the file into the output directory */
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                          mozjpeg: {
                            enabled: false, /* mozjpeg is disabled as it causes errors in some Linux environments */
                          },
                          optipng: {
                            optimizationLevel: 7,
                          }
                        }
                    }
                ]
            },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader', /* A webpack loader which loads SVG file as utf-8 encoded DataUrl string */ 
                    options: {
                        noquotes: true,
                    },
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },

    plugins: options.plugins.concat([
        /* A webpack plugin to remove/clean your build folder(s) before building */
        new CleanWebpackPlugin(['build'], {
            root: path.join(__dirname, '..')
        }),

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
                    sizes: [192, 512],
                }
            ]
        }),


        new WorkboxPlugin.GenerateSW()
    ]),

    optimization: Object.assign(
        {
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
        },
        options.optimization
    )
});

