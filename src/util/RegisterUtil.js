/**
 *
 * Created by maixing on 2019/08/14 15:20:11
 * 节点、连线样式注册
 */
import G6 from "@antv/g6";
import modelConsts from "@/consts/ModelConsts";
import BaseUtil from "@/util/BaseUtil";

const anchorPoints = [[0, 0], [0.5, 0], [1, 0], [0, 0.5], [1, 0.5], [0, 1], [0.5, 1], [1, 1]];
const levelColos = ["#FF0000", "#FF0000", "#FFA500", "#FFFF00", "#0000FF"];
class RegisterUtil extends BaseUtil {
	constructor() {
		super();
		this.selectGap = 5;
	}
	init(graph) {
		super.init(graph);
		this.registerNode();
		this.registerEdge();
	}
	initTreeGraph = (graph)=>{
		super.init(graph);
		this.registerTreeEdge();
		this.registerTreeNode();
	}
	baseUrl = "./demo/assets/";
	imageType = "png";
	registerEdge = () => {
		G6.registerEdge("edgeStyle", {
			draw: (cfg, group) => {
				const startPoint = cfg.startPoint;
				const endPoint = cfg.endPoint;
				const model = this.graph.getCurrentMode();
				let color = "#008000";
				if (model == modelConsts.MODEL_SELECT) {
					if (cfg.selected) {
						color = "blue";
					}
				}
				const shape = group.addShape("path", {
					attrs: {
						stroke: color,
						lineWidth: 2,
						cursor: "pointer",
						endArrow: cfg.endArrow,
						path: [["M", startPoint.x, startPoint.y], ["L", endPoint.x, endPoint.y]]
					}
				});
				return shape;
			},
			afterDraw(cfg, group) {
				const shape = group.get('children')[0];
				const startPoint = shape.getPoint(0);
				const circle = group.addShape('circle', {
					attrs: {
						x: startPoint.x,
						y: startPoint.y,
						fill: '#fff',
						r: 3
					}
				});
				circle.animate({
					onFrame(ratio) {
						const tmpPoint = shape.getPoint(ratio);
						return {
							x: tmpPoint.x,
							y: tmpPoint.y
						};
	
					},
					repeat: true
				}, 3000);
			}
		});
	};
	registerNode = () => {
		G6.registerNode("nodeStyle", {
			afterDraw(cfg, group) {
				if (parseInt(cfg.alarm) > 0) {
					const w = parseFloat(cfg.w) * 1.2;
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
							r: r*radio,
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
							r: r*radio,
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
							r: r*radio,
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
				const w = parseFloat(cfg.w);
				const h = parseFloat(cfg.h);
				let aw = w * 1;
				let ah = h * 1;
				const model = this.graph.getCurrentMode();
				if (cfg.selected) {
					if (modelConsts.MODEL_MULTI_SELECT == model) {
						group.addShape("image", {
							attrs: {
								x: w / 2,
								y: -h / 1.2,
								width: 16,
								height: 16,
								img: this.baseUrl + "ck.svg",
								cursor: "pointer"
							}
						});
					} else {
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
								width: 16,
								height: 16,
								img: this.baseUrl + "uck.svg"
							}
						});
					}
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
						y: h*0.7,
						textAlign: "center",
						text: cfg.label,
						fontSize:14,
						fill: "#00FFFF"
					}
				});
				//锚点呈现
				// aw = image._attrs.width;
				// ah = image._attrs.height;
				// anchorPoints.forEach((item,index) => {
				// 	const outerCircle = group.addShape("circle", {
				// 		attrs: {
				// 			x: -aw / 2+aw*item[0],
				// 			y: -ah / 2+ah*item[1],
				// 			fill: 'blue',
				// 			r:  7,
				// 			opacity:0.5,
				// 			type:"outer",
				// 			cursor:'pointer',
				// 			index:index
				// 		}
				// 	});
				// 	const innerCircle = group.addShape("circle", {
				// 		attrs: {
				// 			x: -aw / 2+aw*item[0],
				// 			y: -ah / 2+ah*item[1],
				// 			fill: '#fff',
				// 			r:  2,
				// 			cursor:'pointer',
				// 			type:"inner",
				// 			outer:outerCircle,
				// 			index:index
				// 		}
				// 	});
				// });
				return image;
			},
			getAnchorPoints(cfg) {
				return anchorPoints;
			}
		});
	};
	registerTreeNode = ()=>{
		G6.registerNode("treenodeStyle", {
			afterDraw:(cfg, group)=>{
				if (parseInt(cfg.alarm) > 0) {
					const w = parseFloat(cfg.w) * 1.2;
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
							r: r*radio,
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
							r: r*radio,
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
							r: r*radio,
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
				console.log('cfg---->>%o',cfg);
				const w = parseFloat(cfg.w);
				const h = parseFloat(cfg.h);
				const model = this.graph.getCurrentMode();
				const image = group.addShape("image", {
					attrs: {
						x: -w / 2,
						y: -h / 2,
						width: w,
						height: h,
						cursor: "pointer",
						img: this.baseUrl + cfg.imageName+"."+this.imageType
					}
				});
				group.addShape("text", {
					attrs: {
						x: 0,
						y: cfg.index==1?h*0.8:h*0.8,
						textAlign: "center",
						text: cfg.label,
						fill: "#00FFFF",
						fontSize: cfg.index?14+2*(4-cfg.index):12
					}
				});
				return image;
			}
		});
	};
	registerTreeEdge = ()=>{
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
						sourceAnchor:null,
						targetAnchor:null,
						path: [["M", startPoint.x, startPoint.y], ["L", endPoint.x, endPoint.y]]
					}
				});
				const shape1 = group.addShape("path", {
					attrs: {
						stroke: "#008000",
						lineWidth: 2,
						cursor: "pointer",
						endArrow: cfg.endArrow,
						sourceAnchor:null,
						targetAnchor:null,
						path: [["M", endPoint.x, endPoint.y], ["L", startPoint.x, startPoint.y]]
					}
				});
				return shape;
			},
			afterDraw(cfg, group) {
				const shape = group.get('children')[0];
				const startPoint = shape.getPoint(0);
				const circle = group.addShape('circle', {
					attrs: {
						x: startPoint.x,
						y: startPoint.y,
						fill: '#fff',
						r: 3
					}
				});
				circle.animate({
					onFrame(ratio) {
						const tmpPoint = shape.getPoint(ratio);
						return {
							x: tmpPoint.x,
							y: tmpPoint.y
						};
	
					},
					repeat: true
				}, 3000);
			}
		});
	}
}

export default RegisterUtil;
