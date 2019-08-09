/**
 *
 * Created by maixing on 2019/08/09 15:52:01
 *
 */
const path = require("path");
const WebpackBar = require("webpackbar");

function resolve(url) {
	return path.resolve(__dirname, "../" + url);
}

module.exports = {
	resolve: {
		extensions: [".js", ".less", ".css"],
		alias: {
			"@": resolve("src")
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: "style-loader"
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
						loader: "css-loader"
					},
					{
						loader: "style-loader"
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
