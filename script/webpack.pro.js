const path = require("path");
const baseWebpack = require("./webpack.base");
const merge = require("webpack-merge");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve(url) {
	return path.resolve(__dirname, "../" + url);
}
const pro = {
	devtool: false,
	mode: "production",
	entry: {
		app: resolve("src/index.js")
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				include: [resolve("src")],
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 1
						}
					},
					{
						loader: "postcss-loader",
						options: {
							config: {
								path: path.resolve(__dirname, "./postcss.config.js")
							}
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
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader"
					},
					{
						loader: "postcss-loader",
						options: {
							config: {
								path: path.resolve(__dirname, "./postcss.config.js")
							}
						}
					}
				]
			}
		]
	},
	output: {
		path: resolve("lib"),
		filename: "g6lib.min.js",
		libraryTarget: "umd",
		library: "g6lib.min.js"
	},
	externals: [
		{
			"react": {
				root: "React",
				commonjs2: "react",
				commonjs: "react",
				amd: "react"
			},
			"@antv/g6": {
				root: "@antv/g6",
				commonjs2: "@antv/g6",
				commonjs: "@antv/g6",
				amd: "@antv/g6"
			},
			"lodash": {
				root: "lodash",
				commonjs2: "lodash",
				commonjs: "lodash",
				amd: "lodash"
			}
		}
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				parallel: 10,
				uglifyOptions: {
					ie8: true,
					warnings: true,
					output: {
						comments: false,
						beautify: false
					},
					compress: {
						drop_console: false,
						passes: 2
					}
				}
			})
		],
		minimize: true,
		mangleWasmImports: true
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename:"g6lib.min.css"	
		})
	]
};
module.exports = merge(baseWebpack, pro);
