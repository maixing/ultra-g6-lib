/**
 *
 * Created by maixing on 2019/08/14 15:20:11
 *
 */
import G6 from "@antv/g6";
import modelConsts from "@/consts/ModelConsts";
import BaseUtil from "@/util/BaseUtil";

const anchorPoints = [[0, 0], [0.5, 0], [1, 0], [0, 0.5], [1, 0.5], [0, 1], [0.5, 1], [1, 1]];
class RegisterUtil extends BaseUtil {
	constructor() {
		super();
		this.selectGap = 5;
	}
	init(graph) {
		super.init(graph);
		this.registerNode();
	}
	toolBarUtil = null;
	registerNode = () => {
		G6.registerNode("nodeStyle", {
			draw: (cfg, group) => {
				const w = cfg.w;
				const h = cfg.h;
				let aw = w * 1;
				let ah = h * 1;
				if (cfg.selected) {
					if (modelConsts.CANVAS_MULTI_MODEL == this.toolBarUtil.graphModel) {
						group.addShape("image", {
							attrs: {
								x: w / 2,
								y: -h / 1.2,
								width: 16,
								height: 16,
								img: "../demo/assets/ck.svg",
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
					if (modelConsts.CANVAS_MULTI_MODEL == this.toolBarUtil.graphModel) {
						group.addShape("image", {
							attrs: {
								x: w / 2,
								y: -h / 1.2,
								width: 16,
								height: 16,
								img: "../demo/assets/uck.svg"
							}
						});
					}
				}
				const image = group.addShape("image", {
					attrs: {
						x: -w / 2,
						y: -h / 2,
						width: w,
						height: h,
						cursor:'pointer',
						img: "../demo/assets/"+cfg.type+".svg"
					}
				});
				group.addShape("text", {
					attrs: {
						x: 0,
						y: h * 1.1,
						textAlign: "center",
						text: cfg.label,
						fill: "#000"
					}
				});
				aw = image._attrs.width;
				ah = image._attrs.height;
				anchorPoints.forEach((item,index) => {
					const outerCircle = group.addShape("circle", {
						attrs: {
							x: -aw / 2+aw*item[0],
							y: -ah / 2+ah*item[1],
							fill: 'blue',
							r:  7,
							opacity:0.5,
							type:"outer",
							cursor:'pointer',
							index:index
						}
					});
					const innerCircle = group.addShape("circle", {
						attrs: {
							x: -aw / 2+aw*item[0],
							y: -ah / 2+ah*item[1],
							fill: '#fff',
							r:  2,
							cursor:'pointer',
							type:"inner",
							outer:outerCircle,
							index:index
						}
					});
				});
				return image;
			},
			getAnchorPoints(cfg) {
				return anchorPoints;
			}
		});
	};
}

export default RegisterUtil;
