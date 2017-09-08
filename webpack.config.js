/**
 * Created by 贺小雷 on 2017-09-08.
 */
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
module.exports = {
	entry: {
		index: './src/js/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'static/js/[name]-[hash].js'
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'img/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: 'index.html'
		}),
		new ExtractTextPlugin({
			filename: 'static/css/[name]-[hash].css'
		}),
		new copyWebpackPlugin([{
			from: path.resolve(__dirname, './static'),
			to: path.resolve(__dirname, 'dist/static')
		}]),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function (module, count) {
				// any required modules inside node_modules are extracted to vendor
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					(module.resource.indexOf(
						path.join(__dirname, './src/js/lib')
					) === 0 || module.resource.indexOf(
						path.join(__dirname, './node_modules')
					) === 0)
				)
			}
		}),
		new webpack.ProvidePlugin({
			$: 'webpack-zepto'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			sourceMap: true
		}),
	]
};