const path = require("path");
const baseWebpack = require("./webpack.base");
const merge = require("webpack-merge");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

function resolve(url) {
	return path.resolve(__dirname, "../" + url);
}
const pro = {
	devtool: false,
	mode: "production",
	entry: {
		app: resolve("src/index.js")
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
						drop_console: true,
						passes: 2
					}
				}
			})
		],
		minimize: true,
		mangleWasmImports: true
	},
	plugins: []
};
module.exports = merge(baseWebpack, pro);
