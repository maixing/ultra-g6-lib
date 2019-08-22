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
				exclude: [resolve("node_modules"), resolve("node_modules/@antv")],
				use: "babel-loader"
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
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
