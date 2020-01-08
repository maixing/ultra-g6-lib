/**
 *
 * Created by maixing on 2019/08/14 15:20:11
 * 节点、连线样式注册
 */
import G6 from "@antv/g6";
import modelConsts from "@/appconsts/ModelConsts";
import BaseUtil from "@/util/BaseUtil";
import { simplifyPolyline, getPolylinePoints, getPathWithBorderRadiusByPolyline } from "./polyline-util";
let Util = G6.Util;
let Global = G6.Global;
const CLS_SHAPE_SUFFIX = "-shape";
const CLS_LABEL_SUFFIX = "-label";

const anchorPoints = [
	[0, 0],
	[0.25, 0],
	[0.5, 0],
	[0.75, 0],
	[1, 0],
	[0, 0.25],
	[1, 0.25],
	[0, 0.5],
	[1, 0.5],
	[0, 0.75],
	[1, 0.75],
	[0, 1],
	[0.25, 1],
	[0.5, 1],
	[0.75, 1],
	[1, 1]
];
const levelColos = ["#FF0000", "#FF0000", "#FFA500", "#FFFF00", "#0000FF"];
class RegisterUtil extends BaseUtil {
	constructor() {
		super();
		this.selectGap = 5;
	}
	g6Api = null;
	init(graph) {
		super.init(graph);
		this.registerNode();
		this.registerEdge();
	}
	initTreeGraph = graph => {
		super.init(graph);
		this.registerTreeEdge();
		this.registerTreeNode();
	};
	baseUrl = "./demo/assets/";
	imageType = "png";
	multiSelectFilter = [];
	collapsed = false;
	registerEdge = () => {
		G6.registerEdge(
			"edgeStyle",
			{
				options: {
					stateStyles: {
						// 鼠标hover状态下的配置
						hover: {
							lineWidth: 3
						},
						// 选中边状态下的配置
						selected: {
							lineWidth: 5
						}
					}
				},
				draw: (cfg, group) => {
					const startPoint = cfg.startPoint;
					const endPoint = cfg.endPoint;
					const model = this.graph.getCurrentMode();
					let color = "#08BD09";
					const shape = group.addShape("path", {
						attrs: {
							stroke: cfg.selected?'#d3adf7':color,
							lineWidth: 4,
							cursor: "pointer",
							path: [
								["M", startPoint.x, startPoint.y],
								["L", endPoint.x, endPoint.y]
							]
						}
					});
					return shape;
				},
				afterDraw: (cfg, group) => {
					const model = this.graph.getCurrentMode();
					if (modelConsts.MODEL_MULTI_SELECT != model) {
						const shape = group.get("children")[0];
						const startPoint = shape.getPoint(0);
						const circle = group.addShape("circle", {
							attrs: {
								x: startPoint.x,
								y: startPoint.y,
								fill: "#fff",
								r: 2
							}
						});
						circle.animate(
							{
								onFrame(ratio) {
									const tmpPoint = shape.getPoint(ratio);
									return {
										x: tmpPoint.x,
										y: tmpPoint.y
									};
								},
								repeat: true
							},
							3000
						);
					}
				}
			}
		);
		G6.registerEdge(
			"runedge",
			{
				afterDraw(cfg, group) {
					// 获得当前边的第一个图形，这里是边本身的 path
					const shape = group.get("children")[0];
					// 边 path 的起点位置
					const startPoint = shape.getPoint(0);
					// 添加红色 circle 图形
					const circle = group.addShape("circle", {
						attrs: {
							x: startPoint.x,
							y: startPoint.y,
							fill: "#ffffff",
							r: 2
						}
					});

					// 对红色圆点添加动画
					circle.animate(
						{
							// 动画重复
							repeat: true,
							// 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
							onFrame(ratio) {
								// 根据比例值，获得在边 path 上对应比例的位置。
								const tmpPoint = shape.getPoint(ratio);
								// 返回需要变化的参数集，这里返回了位置 x 和 y
								return {
									x: tmpPoint.x,
									y: tmpPoint.y
								};
							}
						},
						3000
					); // 一次动画的时间长度
				}
			},
			"polyline"
		);
		G6.registerEdge(
			"polyline1",
			{
				options: {
					color: "red",
					style: {
						stroke: "red",
						lineWidth: 1,
						radius: 0,
						offset: 5,
						x: 0,
						y: 0
					},
					// 文本样式配置
					labelCfg: {
						style: {
							fill: "#595959"
						}
					},
					stateStyles: {
						// 鼠标hover状态下的配置
						hover: {
							lineWidth: 3
						},
						// 选中边状态下的配置
						selected: {
							lineWidth: 5
						}
					}
				},
				shapeType: "polyline",
				// 文本位置
				labelPosition: "center",
				drawShape(cfg, group) {
					const shapeStyle = this.getShapeStyle(cfg);
					const keyShape = group.addShape("path", {
						className: "edge-shape",
						attrs: shapeStyle
					});
					return keyShape;
				},
				getShapeStyle(cfg) {
					const customOptions = this.getCustomConfig(cfg) || {};
					const { style: defaultStyle } = this.options;
					const { style: customStyle } = customOptions;

					const strokeStyle = {
						stroke: cfg.color
					};

					const style = Util.deepMix({}, defaultStyle, customStyle, strokeStyle, cfg.style);
					cfg = this.getPathPoints(cfg);
					this.radius = style.radius;
					this.offset = style.offset;
					const startPoint = cfg.startPoint;
					const endPoint = cfg.endPoint;
					const controlPoints = this.getControlPoints(cfg);
					let points = [startPoint]; // 添加起始点
					// 添加控制点
					if (controlPoints) {
						points = points.concat(controlPoints);
					}
					// 添加结束点
					points.push(endPoint);
					const source = cfg.sourceNode;
					const target = cfg.targetNode;
					let routeCfg = { radius: style.radius };
					if (!controlPoints) {
						routeCfg = { source, target, offset: style.offset, radius: style.radius };
					}
					const path = this.getPath(points, routeCfg);
					const attrs = Util.deepMix(
						{},
						Global.defaultEdge.style,
						style,
						{
							lineWidth: cfg.size
						},
						{ path }
					);
					return attrs;
				},
				getPath(points, routeCfg) {
					const { source, target, offset, radius } = routeCfg;
					if (!offset) {
						let path = [];
						if (radius) {
							path = getPathWithBorderRadiusByPolyline(points, radius);
						} else {
							Util.each(points, (point, index) => {
								if (index === 0) {
									path.push(["M", point.x, point.y]);
								} else {
									path.push(["L", point.x, point.y]);
								}
							});
						}
						return path;
					}
					if (radius) {
						const polylinePoints = simplifyPolyline(
							getPolylinePoints(points[0], points[points.length - 1], source, target, offset)
						);
						return getPathWithBorderRadiusByPolyline(polylinePoints, radius);
					}
					const polylinePoints = getPolylinePoints(points[0], points[points.length - 1], source, target, offset);
					return Util.pointsToPolygon(polylinePoints);
				},

				update(cfg, item) {
					const group = item.getContainer();
					const shapeClassName = this.itemType + CLS_SHAPE_SUFFIX;
					const shape = group.findByClassName(shapeClassName);
					if (!cfg.style) {
						cfg.style = {};
					}
					const oriShapeAttrs = shape.attr();
					cfg.style.radius = cfg.style.radius || oriShapeAttrs.radius;
					cfg.style.offset = cfg.style.offset || oriShapeAttrs.offset;
					const shapeStyle = this.getShapeStyle(cfg);
					shape.attr(shapeStyle);
					const labelClassName = this.itemType + CLS_LABEL_SUFFIX;
					const label = group.findByClassName(labelClassName);
					// 此时需要考虑之前是否绘制了 label 的场景存在三种情况
					// 1. 更新时不需要 label，但是原先存在 label，此时需要删除
					// 2. 更新时需要 label, 但是原先不存在，创建节点
					// 3. 如果两者都存在，更新
					if (!cfg.label) {
						label && label.remove();
					} else {
						if (!label) {
							const newLabel = this.drawLabel(cfg, group);
							newLabel.set("className", labelClassName);
						} else {
							const { labelCfg: defaultLabelCfg } = this.options;
							const { labelCfg: customLabelCfg } = this.getCustomConfig(cfg) || {};

							const labelCfg = Util.deepMix({}, defaultLabelCfg, customLabelCfg, cfg.labelCfg);
							const labelStyle = this.getLabelStyle(cfg, labelCfg, group);
							/**
							 * fixme g中shape的rotate是角度累加的，不是label的rotate想要的角度
							 * 由于现在label只有rotate操作，所以在更新label的时候如果style中有rotate就重置一下变换
							 * 后续会基于g的Text复写一个Label出来处理这一类问题
							 */
							label.resetMatrix();
							label.attr(labelStyle);
						}
					}
				}
			},
			"single-line"
		);
	};
	registerNode = () => {
		G6.registerNode("nodeStyle", {
			afterDraw(cfg, group) {
				if (parseInt(cfg.alarm) > 0) {
					const w = parseFloat(cfg.w || 60) * 1.2;
					const r = w / 2;
					const radio = 1.5;
					const back1 = group.addShape("circle", {
						zIndex: -3,
						attrs: {
							x: 0,
							y: 0,
							r,
							fill: levelColos[parseInt(cfg.alarm)],
							opacity: 0.6
						}
					});
					const back2 = group.addShape("circle", {
						zIndex: -2,
						attrs: {
							x: 0,
							y: 0,
							r,
							fill: levelColos[parseInt(cfg.alarm)],
							opacity: 0.6
						}
					});

					const back3 = group.addShape("circle", {
						zIndex: -1,
						attrs: {
							x: 0,
							y: 0,
							r,
							fill: levelColos[parseInt(cfg.alarm)],
							opacity: 0.6
						}
					});
					group.sort();
					back1.animate(
						{
							r: r * radio,
							opacity: 0.1,
							repeat: true
						},
						3000,
						"easeCubic",
						null,
						0
					);

					back2.animate(
						{
							r: r * radio,
							opacity: 0.1,
							repeat: true
						},
						3000,
						"easeCubic",
						null,
						1000
					);

					back3.animate(
						{
							r: r * radio,
							opacity: 0.1,
							repeat: true
						},
						3000,
						"easeCubic",
						null,
						2000
					);
				}
			},
			draw: (cfg, group) => {
				const w = parseFloat(cfg.w || 60);
				const h = parseFloat(cfg.h || 60);
				const model = this.graph.getCurrentMode();
				if (cfg.selected) {
					if (modelConsts.MODEL_MULTI_SELECT == model) {
						group.addShape("image", {
							attrs: {
								x: w / 2,
								y: -h / 1.2,
								width: 48,
								height: 48,
								img: this.baseUrl + "ck.svg",
								cursor: "pointer"
							}
						});
					} else if (
						modelConsts.MODEL_SELECT == model ||
						modelConsts.MODEL_SHOW == model ||
						modelConsts.MODEL_BREAK_POINT == model
					) {
						group.addShape("rect", {
							attrs: {
								x: -w / 2 - this.selectGap,
								y: -h / 2 - this.selectGap,
								width: w + 2 * this.selectGap,
								height: h + 2 * this.selectGap,
								stroke: "red"
							}
						});
					}
				} else {
					if (modelConsts.MODEL_MULTI_SELECT == model) {
						group.addShape("image", {
							attrs: {
								x: w / 2,
								y: -h / 1.2,
								width: 48,
								height: 48,
								img: this.baseUrl + "uck.svg"
							}
						});
					}
				}
				if (cfg.hasOwnProperty("search") && cfg.search) {
					group.addShape("rect", {
						attrs: {
							x: -w / 2 - this.selectGap,
							y: -h / 2 - this.selectGap,
							width: w + 2 * this.selectGap,
							height: h + 2 * this.selectGap,
							fill: "red"
						}
					});
				}
				if (parseInt(cfg.alarm) > 0) {
				}
				const image = group.addShape("image", {
					attrs: {
						x: -w / 2,
						y: -h / 2,
						width: w,
						height: h,
						cursor: "pointer",
						img: this.baseUrl + cfg.neType + ".svg",
						shadowColor: levelColos[parseInt(cfg.alarm)],
						shadowBlur: parseInt(cfg.alarm) > 0 ? 0 : 0,
						shadowOffsetX: 0,
						shadowOffsetY: 0
					}
				});
				group.addShape("text", {
					attrs: {
						x: 0,
						y: h * 1.1,
						textAlign: "center",
						text: cfg.label,
						fontSize: 14,
						fill: "#00FFFF"
					}
				});
				//锚点呈现
				// const aw = image._attrs.width;
				// const ah = image._attrs.height;
				// anchorPoints.forEach((item, index) => {
				// 	const outerCircle = group.addShape("circle", {
				// 		attrs: {
				// 			x: -aw / 2 + aw * item[0],
				// 			y: -ah / 2 + ah * item[1],
				// 			fill: "blue",
				// 			r: 7,
				// 			opacity: 0.5,
				// 			type: "outer",
				// 			cursor: "pointer",
				// 			index: index
				// 		}
				// 	});
				// 	const innerCircle = group.addShape("circle", {
				// 		attrs: {
				// 			x: -aw / 2 + aw * item[0],
				// 			y: -ah / 2 + ah * item[1],
				// 			fill: "#fff",
				// 			r: 2,
				// 			cursor: "pointer",
				// 			type: "inner",
				// 			outer: outerCircle,
				// 			index: index
				// 		}
				// 	});
				// });
				return image;
			},
			getAnchorPoints(cfg) {
				if (cfg.neType == "gd") {
					return [];
				}
				return anchorPoints;
			}
		});
	};
	registerTreeNode = () => {
		G6.registerNode("treenodeStyle", {
			afterDraw: (cfg, group) => {
				let alarm = cfg.alarm;
				if (this.g6Api && this.g6Api.cacheMap.has(cfg.id)) {
					alarm = this.g6Api.cacheMap.get(cfg.id);
				}
				if (parseInt(alarm) > 0) {
					const w = parseFloat(cfg.w || 30) * 1.2;
					const r = w / 2;
					const radio = 1.5;
					const back1 = group.addShape("circle", {
						zIndex: -3,
						attrs: {
							x: 0,
							y: 0,
							r,
							fill: levelColos[parseInt(cfg.alarm)],
							opacity: 0.6
						}
					});
					const back2 = group.addShape("circle", {
						zIndex: -2,
						attrs: {
							x: 0,
							y: 0,
							r,
							fill: levelColos[parseInt(cfg.alarm)],
							opacity: 0.6
						}
					});

					const back3 = group.addShape("circle", {
						zIndex: -1,
						attrs: {
							x: 0,
							y: 0,
							r,
							fill: levelColos[parseInt(cfg.alarm)],
							opacity: 0.6
						}
					});
					group.sort();
					back1.animate(
						{
							r: r * radio,
							opacity: 0.1,
							repeat: true
						},
						3000,
						"easeCubic",
						null,
						0
					);

					back2.animate(
						{
							r: r * radio,
							opacity: 0.1,
							repeat: true
						},
						3000,
						"easeCubic",
						null,
						1000
					);

					back3.animate(
						{
							r: r * radio,
							opacity: 0.1,
							repeat: true
						},
						3000,
						"easeCubic",
						null,
						2000
					);
				}
			},
			draw: (cfg, group) => {
				const w = parseFloat(cfg.w || 30);
				const h = parseFloat(cfg.h || 30);
				const image = group.addShape("image", {
					attrs: {
						x: -w / 2,
						y: -h / 2,
						width: w,
						height: h,
						cursor: "pointer",
						img: this.baseUrl + cfg.imageName + "." + this.imageType
					}
				});
				let levelFont = ["", 40, 35, 30];
				let levelFont1 = ["", 40, 35, 30];
				let f = this.collapsed ? levelFont1 : levelFont;
				console.log("cfg.index?levelFont[cfg.index]:12---->>%o,%o,%o", cfg, f, this.collapsed);
				let fontsize = cfg.index ? levelFont[cfg.index] : 20;
				if (!fontsize) {
					fontsize = f[3];
				}
				group.addShape("text", {
					attrs: {
						x: 0,
						y: cfg.index == 3 ? h * 1.1 : h,
						textAlign: "center",
						text: cfg.label,
						fill: "#00FFFF",
						fontSize: fontsize
					}
				});
				return image;
			}
		});
	};
	registerTreeEdge = () => {
		G6.registerEdge("edgeStyle", {
			draw: (cfg, group) => {
				const startPoint = cfg.startPoint;
				const endPoint = cfg.endPoint;
				const shape = group.addShape("path", {
					attrs: {
						stroke: "#008000",
						lineWidth: 2,
						cursor: "pointer",
						endArrow: cfg.endArrow,
						sourceAnchor: null,
						targetAnchor: null,
						path: [
							["M", startPoint.x, startPoint.y],
							["L", endPoint.x, endPoint.y]
						]
					}
				});
				const shape1 = group.addShape("path", {
					attrs: {
						stroke: "#008000",
						lineWidth: 2,
						cursor: "pointer",
						endArrow: cfg.endArrow,
						sourceAnchor: null,
						targetAnchor: null,
						path: [
							["M", endPoint.x, endPoint.y],
							["L", startPoint.x, startPoint.y]
						]
					}
				});
				return shape;
			},
			afterDraw(cfg, group) {
				const shape = group.get("children")[0];
				const startPoint = shape.getPoint(0);
				const circle = group.addShape("circle", {
					attrs: {
						x: startPoint.x,
						y: startPoint.y,
						fill: "#fff",
						r: 3
					}
				});
				circle.animate(
					{
						onFrame(ratio) {
							const tmpPoint = shape.getPoint(ratio);
							return {
								x: tmpPoint.x,
								y: tmpPoint.y
							};
						},
						repeat: true
					},
					3000
				);
			}
		});
	};
}

export default RegisterUtil;
