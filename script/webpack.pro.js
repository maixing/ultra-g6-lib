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
	optimization: {
		splitChunks: {
			chunks: "all",
			name: "vender",
			minSize: 10,
			minChunks: 5,
			cacheGroups: {
				common: {
					name: "common",
					chunks: "all",
					minChunks: 4,
					reuseExistingChunk: true,
					enforce: true
				},
				antd: {
					name: "antd",
					chunks: "all",
					test: /[\\/]node_modules[\\/antd]/,
					minChunks: 3,
					reuseExistingChunk: true,
					enforce: true
				},
				echarts: {
					name: "echarts",
					chunks: "all",
					test: /[\\/]node_modules[\\/echarts]/,
					minChunks: 3,
					reuseExistingChunk: true,
					enforce: true
				},
				styles: {
					name: "styles",
					test: /(\.less|\.css)$/,
					chunks: "all",
					reuseExistingChunk: true,
					enforce: true
				}
			}
		},
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
			}),
			new OptimizeCSSAssetsPlugin({})
		],
		minimize: true,
		mangleWasmImports: true
	},
	plugins: []
};
module.exports = merge(baseWebpack, pro);
