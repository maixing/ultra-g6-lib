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
					const model = item._cfg.model;
					model.selected = false;
					this.graph.updateItem(item, model);
				});
				this.preSelectNodes.splice(0);
			}
		});
	};
	initNodeEvent = () => {
		this.graph.on("node:click", ev => {
			const model = ev.item._cfg.model;
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
				if (this.preSelectNode) {
					this.preSelectNode._cfg.model.selected = false;
					this.graph.updateItem(this.preSelectNode, this.preSelectNode._cfg.model);
				}
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
	initEdgeEvent = () => {};
	initGlobalEvent = () => {};
	initBehavior = () => {
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
						target: point
					});
					this.addingEdge = true;
				}
			},
			onMousemove(ev) {
				console.log("onMousemove---->>%o", ev);
				const point = { x: ev.x, y: ev.y };
				if (this.addingEdge && this.edge) {
					this.graph.updateItem(this.edge, {
						target: point
					});
				}
			},
			onEdgeClick(ev) {
				console.log("onEdgeClick---->>%o", ev);
				const currentEdge = ev.item;
				if (this.addingEdge && this.edge == currentEdge) {
					this.graph.removeItem(this.edge);
					this.edge = null;
					this.addingEdge = false;
				}
			}
		});
		G6.registerBehavior("addNode",{

		})
		this.graph.addBehaviors("addEdge","addEdge");
		this.graph.addBehaviors("addNode","addNode");
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
}
export default GraphEventUtil;
