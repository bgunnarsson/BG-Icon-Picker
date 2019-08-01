// webpack v4
const path = require('path');
const CURRENT_WORKING_DIR = process.cwd();
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		styles: './src/styles/styles.scss'
	},
	output: {
		path: path.resolve(__dirname, 'build/css/'),
		filename: '[name].scss'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.s[c|a]ss$/,
				use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
			}
		]
	},
	plugins: [
		// new CleanWebpackPlugin('build', {}),

		// Copy to the build folder and umbraco location
		new CopyWebpackPlugin([
			{
				from: path.resolve(`${CURRENT_WORKING_DIR}/src/scripts/`),
				to: path.resolve(`${CURRENT_WORKING_DIR}/build/`)
			},
			{
				from: path.resolve(`${CURRENT_WORKING_DIR}/src/actions/`),
				to: path.resolve(`${CURRENT_WORKING_DIR}/build/actions/`)
			},
			{
				from: path.resolve(`${CURRENT_WORKING_DIR}/src/views/`),
				to: path.resolve(`${CURRENT_WORKING_DIR}/build/`)
			},
			{
				from: path.resolve(`${CURRENT_WORKING_DIR}/src/assets/`),
				to: path.resolve(`${CURRENT_WORKING_DIR}/build/`)
			},
			{
				from: path.resolve(`${CURRENT_WORKING_DIR}/build/`),
				to: path.resolve('../Umbraco.Web/App_Plugins/bgIconPicker')
			},
		]),

		new MiniCssExtractPlugin({
			filename: 'styles.css',
		}),
		new WebpackMd5Hash(),
	]
};
