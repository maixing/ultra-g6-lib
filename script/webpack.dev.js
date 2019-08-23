/**
 *
 * Created by maixing on 2019/08/09 16:02:26
 *
 */
const path = require("path");
const baseWebpack = require("./webpack.base");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");

function resolve(url) {
	return path.resolve(__dirname, "../" + url);
}

let dev = {
	mode: "development",
	entry: {
		app: resolve("demo/index.js")
	},
	output: {
		path: resolve("lib"),
		filename: "app.js",
		publicPath: ""
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				include: [resolve("src")],
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							importLoaders: 1
						}
					},
					{
						loader: "less-loader"
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					}
				]
			}
		]
	},
	devServer: {
		clientLogLevel: "warning",
		historyApiFallback: true,
		hot: true,
		hotOnly: true,
		compress: true,
		host: "0.0.0.0",
		port: parseInt(process.env.PORT),
		open: false,
		overlay: { warnings: false, errors: true },
		publicPath: "",
		quiet: true
	},
	node: {
		setImmediate: false,
		dgram: "empty",
		fs: "empty",
		net: "empty",
		tls: "empty",
		child_process: "empty"
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "title",
			template: resolve("demo/index.html"),
			inject: true,
			minify: {
				removeAttributeQuotes: true
			}
		}),
		new OpenBrowserPlugin({ url: "http://localhost:" + process.env.PORT })
	]
};
module.exports = merge(baseWebpack, dev);
