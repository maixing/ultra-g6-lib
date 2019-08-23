/**
 *
 * Created by maixing on 2019/08/14 15:26:29
 * 事件管理
 */
import BaseUtil from "@/util/BaseUtil";
import G6 from "@antv/g6";
import modelConsts from "@/consts/ModelConsts";
import { addAppEventListener } from "@/util/EventBusUtil";
import toolBarConsts from "@/consts/ToolBarConsts";

class GraphEventUtil extends BaseUtil {
	constructor() {
		super();
	}
	preSelectNode = null;
	preSelectNodes = [];
	preSelectEdge = null;
	edge = null;
	addingEdge = false;
	init(graph) {
		super.init(graph);
		if (this.graph) {
			this.initNodeEvent();
			this.initEdgeEvent();
			this.initGlobalEvent();
			this.initBehavior();
			this.initToolBarEvent();
		}
	}
	initToolBarEvent = () => {
		addAppEventListener(toolBarConsts.TOOLBAR_MULTI_SELECT, state => {
			if (!state) {
				const nodes = this.graph.findAll("node", node => {
					return node.get("model").x;
				});
				nodes.forEach(item => {
					const model = item.getModel();
					model.selected = false;
					this.graph.updateItem(item, model);
				});
				this.preSelectNodes.splice(0);
			}
		});
	};
	initNodeEvent = () => {
		this.graph.on("node:click", ev => {
			const model = ev.item.getModel();
			model.selected = !model.selected;
			const currentModel = this.graph.getCurrentMode();
			if (modelConsts.MODEL_MULTI_SELECT == currentModel) {
				if (model.selected) {
					this.preSelectNodes.push(model);
				} else {
					let preNodeIndex = null;
					this.preSelectNodes.forEach((item, index) => {
						if (item.id == model.id) {
							preNodeIndex = index;
						}
					});
					if (preNodeIndex) {
						this.preSelectNodes.splice(preNodeIndex, 1);
					}
				}
			} else {
				this.clearSelect();
				this.preSelectNode = ev.item;
			}
			this.graph.updateItem(ev.item, model);
		});
		this.graph.on("node:mouseover", ev => {
			//经过锚点处理
			this.changeAnchor(ev, true);
		});
		this.graph.on("node:mouseout", ev => {
			//移除锚点处理
			this.changeAnchor(ev, false);
		});
	};
	initEdgeEvent = () => {
		this.graph.on("edge:click", ev => {
			const model = ev.item.getModel();
			model.selected = !model.selected;
			const edge = ev.item;
			this.clearSelect();
			if (this.preSelectEdge != edge) {
				this.graph.updateItem(edge, model);
				this.preSelectEdge = edge;
			} else {
				this.preSelectEdge = null;
			}
		});
	};
	initGlobalEvent = () => {
		this.graph.on("canvas:click", ev => {
			this.clearSelect();
		});
	};
	initBehavior = () => {
		console.log("initBehavior---->>%o");
		G6.registerBehavior("addNode", {
			getEvents() {
				return {
					"canvas:click": "onClick"
				};
			},
			onClick(ev) {
				const graph = this.graph;
				const node = graph.addItem("node", {
					w: 48,
					h: 48,
					type: "default",
					shape: "nodeStyle",
					label: "ellipse",
					img: "../demo/assets/123.svg",
					selected: false,
					x: ev.x,
					y: ev.y,
					id: G6.Util.uniqueId()
				});
			}
		});
		G6.registerBehavior("addEdge", {
			getEvents() {
				return {
					"node:click": "onClick",
					mousemove: "onMousemove",
					"edge:click": "onEdgeClick"
				};
			},
			onClick(ev) {
				console.log("onClick---->>%o", ev);
				const node = ev.item;
				const point = { x: ev.x, y: ev.y };
				const model = node.getModel();
				if (this.addingEdge && this.edge) {
					this.graph.updateItem(this.edge, {
						target: model.id
					});
					this.edge = null;
					this.addingEdge = false;
				} else {
					this.edge = this.graph.addItem("edge", {
						source: model.id,
						target: point,
						shape: "edgeStyle",
						selected: false,
						endArrow: true
					});
					this.addingEdge = true;
				}
			},
			onMousemove(ev) {
				const point = { x: ev.x, y: ev.y };
				if (this.addingEdge && this.edge) {
					this.graph.updateItem(this.edge, {
						target: point
					});
				}
			},
			onEdgeClick(ev) {
				const currentEdge = ev.item;
				if (this.addingEdge && this.edge == currentEdge) {
					this.graph.removeItem(this.edge);
					this.edge = null;
					this.addingEdge = false;
				}
			}
		});
		this.graph.addBehaviors("addEdge", "addEdge");
		this.graph.addBehaviors("addNode", "addNode");
	};
	changeAnchor = (ev, show) => {
		//没有iskeyShape，说明是锚点
		if (!ev.target.isKeyShape) {
			const attr = ev.target._attrs;
			attr.cursor = "crosshair";
			let outer = ev.target._cfg;
			if (attr.type == "inner") {
				outer = attr.outer;
			} else {
				outer = ev.target;
			}
			outer.animate(
				{
					r: show ? 10 : 7,
					repeat: false
				},
				500,
				"easeCubic",
				null,
				0
			);
		}
	};
	clearSelect = () => {
		if (this.preSelectNode) {
			const preModel = this.preSelectNode.getModel();
			preModel.selected = false;
			this.graph.updateItem(this.preSelectNode, preModel);
			this.preSelectNode = null;
		}
		if (this.preSelectEdge) {
			const preModel = this.preSelectEdge.getModel();
			preModel.selected = false;
			this.graph.updateItem(this.preSelectEdge, preModel);
			this.preSelectEdge = null;
		}
	};
}
export default GraphEventUtil;
