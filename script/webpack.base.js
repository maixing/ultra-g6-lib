/**
 *
 * Created by maixing on 2019/08/09 15:52:01
 *
 */
const path = require("path");
const WebpackBar = require("webpackbar");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
function resolve(url) {
	return path.resolve(__dirname, "../" + url);
}

module.exports = {
	resolve: {
		modules: [path.resolve(__dirname, "../node_modules"),resolve("src")],
		extensions: [".js", ".less", ".css"],
		alias: {
			"@": resolve("src")
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [resolve("node_modules"), resolve("node_modules/@antv")],
				use: "babel-loader"
			},
			{
				test: /\.(png|jpg|gif|svg)$/i,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192000
						}
					}
				]
			}
		]
	},
	plugins: [
		new WebpackBar({
			minimal: false,
			profile: false,
			name: "任务执行进度"
		})
	]
};
