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
		path: path.resolve(__dirname, "dist"),
		libraryTarget:'umd'
	},
	context: path.resolve(__dirname, 'src'),
	resolve: {
		extensions: ['.ts', '.tsx', '.js', 'json', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.(ts|tsx)$/,
				use: ['babel-loader','ts-loader']
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'sass-loader']})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
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
		new ExtractTextPlugin("[name].css"),
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