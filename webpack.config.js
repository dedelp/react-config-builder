var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: [
		'react-hot-loader/patch',
		'./example/index.tsx'
	],
	output: {
		filename: 'bundle.js',
		publicPath: "/",
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
				loader: ['react-hot-loader/webpack','babel-loader', 'ts-loader']
			},
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader']
			},
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			template: 'example/index.html'
		})
	],
	devServer: {
		hot: true
		//Enable this if you want to never refresh (this allows hot-reloading app.tsx, but won't auto-refresh if you change index.tsx)
		//hotOnly: true
	}
};