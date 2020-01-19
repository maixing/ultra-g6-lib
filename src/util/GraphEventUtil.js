/**
 *
 * Created by maixing on 2019/08/14 15:26:29
 * 事件管理
 */
import BaseUtil from "@/util/BaseUtil";
import G6 from "@antv/g6";
import modelConsts from "@/appconsts/ModelConsts";
import { addAppEventListener } from "@/util/EventBusUtil";
import toolBarConsts from "@/appconsts/ToolBarConsts";
import CacheUtil from "./CacheUtil";

class GraphEventUtil extends BaseUtil {
	constructor() {
		super();
	}
	preSelectNode = null;
	preSelectNodes = [];
	preSelectEdge = null;
	edge = null;
	addingEdge = false;
	canvasClickTime = 0;
	nodeClickTime = 0;
	ctrlKey = false;
	edgeSelected = null;
	view = null;
	init(graph, view = null) {
		super.init(graph);
		this.view = view;
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
			console.log("initNodeEvent---->>%o", ev);
			const model = ev.item.getModel();
			model.selected = !model.selected;
			if (model.hasOwnProperty("search")) {
				model.search = 0;
			}
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
				this.clearSelect(model);
				this.preSelectNode = ev.item;
			}
			this.graph.updateItem(ev.item, model);
		});
		this.graph.on("node:mouseover", ev => {
			//经过锚点处理
			// this.changeAnchor(ev, true);
		});
		this.graph.on("node:mouseout", ev => {
			//移除锚点处理
			// this.changeAnchor(ev, false);
		});
	};
	initEdgeEvent = () => {
		this.graph.on("edge:click", ev => {
			console.log("initEdgeEvent---->>%o", ev);
			const model = ev.item.getModel();
			model.selected = model.selected ? 0 : 1;
			const edge = ev.item;
			this.clearSelect(model);
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
			this.clearSelect(null);
			const nodes = this.graph.getNodes();
			let result = [];
			nodes.forEach(element => {
				const model = element.getModel();
				if (model.hasOwnProperty("search")) {
					model.search = 0;
					this.graph.updateItem(element, model);
				}
			});
		});
	};
	initBehavior = () => {
		/**
		 * 控制点添加
		 */
		G6.registerBehavior("addCPoint", {
			getEvents() {
				return {
					"edge:click": "onEdgeClick",
					"edge:mouseover": "onEdgeMouseOver",
					"edge:mouseout": "onEdgeMouseOut",
					keydown: "onKeyEventDown",
					keyup: "onKeyEventUp",
					"canvas:click": "onCanvasClick"
				};
			},
			onEdgeMouseOver: evt => {
				const attr = evt.target._attrs;
				attr.cursor = "pointer";
			},
			onEdgeMouseOut: evt => {
				const attr = evt.target._attrs;
				attr.cursor = "pointer";
			},
			onCanvasClick: ev => {
				const graph = this.graph;
				if (this.edgeSelected && this.edgeSelected._cfg.states) {
					graph.setItemState(this.edgeSelected, "selected", false);
				}
				if (this.ctrlKey && this.edgeSelected) {
					let nodeId = G6.Util.uniqueId();
					let gdNode = {
						w: 20,
						h: 20,
						shape: "nodeStyle",
						neType: "gd",
						label: nodeId,
						x: ev.x,
						y: ev.y,
						id: nodeId
					};
					this.graph.addItem("node", gdNode);
					let edgeModel = this.edgeSelected.getModel();
					let sourceItem = edgeModel.source;
					let targetItem = edgeModel.target;
					let realBothEnd = "";
					if (sourceItem && targetItem) {
						const sourceNode = this.graph.findById(sourceItem).getModel();
						const targetNode = this.graph.findById(targetItem).getModel();
						if (sourceNode && targetNode) {
							if (sourceNode.neType != "gd" && targetNode.neType != "gd") {
								realBothEnd = sourceNode.id + CacheUtil.CONTROLL_PRE + targetNode.id;
							} else {
								if (edgeModel.hasOwnProperty("realNodeId")) {
									realBothEnd = edgeModel["realNodeId"];
								}
							}
						}
						let cedgeSorce = {
							source: sourceItem,
							target: nodeId,
							realNodeId: realBothEnd,
							shape: "runedge"
						};
						let cedgeTarget = {
							source: nodeId,
							target: targetItem,
							realNodeId: realBothEnd,
							shape: "runedge"
						};
						let controlPoints = [];
						if (realBothEnd != "") {
							if (CacheUtil.cacheMap.has(CacheUtil.CONTROLL + realBothEnd)) {
								controlPoints = CacheUtil.cacheMap.get(CacheUtil.CONTROLL + realBothEnd);
							}
							let index = -1;
							controlPoints.forEach((element, i) => {
								if (element.id == targetItem) {
									index = i;
								}
							});
							if (index == -1) {
								controlPoints.push(gdNode);
							} else {
								controlPoints.splice(index, 0, gdNode);
							}
							CacheUtil.cacheMap.set(CacheUtil.CONTROLL + realBothEnd, controlPoints);
						}
						console.log("controlPoints---->>%o", controlPoints);
						this.graph.addItem("edge", cedgeSorce);
						this.graph.addItem("edge", cedgeTarget);
						this.graph.removeItem(this.edgeSelected);
					}
					this.edgeSelected = null;
				}
			},
			onKeyEventDown: ev => {
				this.ctrlKey = ev.ctrlKey;
				const graph = this.graph;
				if (ev.keyCode == 46 && this.preSelectNode) {
					let node = this.preSelectNode;
					let selectedNodeModel = node.getModel();
					if (selectedNodeModel.neType != "gd") {
						return;
					}
					const edges = node.getEdges();
					let realBothEnd = "";
					let sourceNodeId = "";
					let targetNodeId = "";
					edges.forEach(edge => {
						const edgeModel = edge.getModel();
						if (edgeModel.hasOwnProperty("realNodeId")) {
							realBothEnd = edgeModel["realNodeId"];
						}
						if (selectedNodeModel.id == edgeModel.target) {
							sourceNodeId = edgeModel.source;
						}
						if (selectedNodeModel.id == edgeModel.source) {
							targetNodeId = edgeModel.target;
						}
					});
					let controlPoints = [];
					if (CacheUtil.cacheMap.has(CacheUtil.CONTROLL + realBothEnd)) {
						controlPoints = CacheUtil.cacheMap.get(CacheUtil.CONTROLL + realBothEnd);
						let index = -1;
						controlPoints.forEach((node, i) => {
							if (node.id == selectedNodeModel.id) {
								index = i;
							}
						});
						if (index != -1) {
							controlPoints.splice(index, 1);
						}
						graph.removeItem(node);
						console.log("delete controlPoints---->>%o", controlPoints);
					}
					let cedgeSorce = {
						source: sourceNodeId,
						target: targetNodeId,
						realNodeId: realBothEnd,
						shape: "runedge"
					};
					this.graph.addItem("edge", cedgeSorce);
				}
			},
			onKeyEventUp: ev => {
				this.ctrlKey = ev.ctrlKey;
			},
			onEdgeClick: ev => {
				const graph = this.graph;
				const edge = ev.item;
				const edgeModel = edge.getModel();
				const startNode = this.graph.findById(edgeModel.source).getModel();
				const endNode = this.graph.findById(edgeModel.target).getModel();
				if (this.edgeSelected && this.edgeSelected._cfg) {
					graph.setItemState(this.edgeSelected, "selected", false);
				}
				if (edge._cfg.states.indexOf("selected") != -1) {
					this.edgeSelected = null;
					graph.setItemState(edge, "selected", false);
				} else {
					graph.setItemState(edge, "selected", true);
					this.edgeSelected = edge;
				}
				console.log('startNode---->>%o',startNode);
				console.log('endNode---->>%o',endNode);
				if (this.view.g6Api.showControll && startNode.neType!='gd' && endNode.neType!='gd') {
					this.view.g6Api.controllPoint(false);
					setTimeout(() => {
						this.view.g6Api.controllPoint(true);
					}, 500);
				}
			}
		});
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
	clearSelect = nodeModel => {
		if (this.preSelectNode) {
			try {
				const preModel = this.preSelectNode.getModel();
				if (nodeModel && nodeModel.hasOwnProperty("id")) {
					preModel.selected = preModel.id == nodeModel.id ? true : false;
				} else {
					preModel.selected = false;
				}
				this.graph.updateItem(this.preSelectNode, preModel);
			} catch (error) {}
			this.preSelectNode = null;
		}
		if (this.preSelectEdge) {
			try {
				const preModel = this.preSelectEdge.getModel();
				preModel.selected = false;
				this.graph.updateItem(this.preSelectEdge, preModel);
			} catch (error) {}
			this.preSelectEdge = null;
		}
	};
}
export default GraphEventUtil;
