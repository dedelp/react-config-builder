var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");

module.exports = {
	devtool: 'source-map',
	entry: [
		'./bundle.tsx'
	],
	output: {
		filename: '[name].js',
		publicPath: "",
		path: path.resolve(__dirname, "dist")
	},
	context: path.resolve(__dirname, 'src'),
	resolve: {
		extensions: ['.ts', '.tsx', '.js', 'json', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.(ts|tsx)$/,
				loader: ['babel-loader','ts-loader']
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({loader: ['style-loader', 'css-loader', 'sass-loader']})
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
			},
		]
	},
	externals: {
		// Use external version of React
		"react": "React",
		"react-dom": "ReactDOM"
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new ExtractTextPlugin("[name].[contenthash:8].css"),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				screw_ie8: true, // React doesn't support IE8
				warnings: false
			},
			mangle: {
				screw_ie8: true
			},
			output: {
				comments: false,
				screw_ie8: true
			}
		}),
	]
};