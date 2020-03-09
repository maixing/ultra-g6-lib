/**
 *
 * Created by maixing on 2019/08/23 11:17:19
 *
 */
import BaseUtil from "@/util/BaseUtil";
import CacheUtil from "@/util/CacheUtil";
import G6 from "@antv/g6";
const levelColos = ["#08BD09", "#FF0000", "#FFA500", "#FFFF00", "#0000FF"];
class G6Api extends BaseUtil {
	constructor() {
		super();
	}
	preSearch = null;
	cacheMap = new Map();
	showControll = false;
	/*-----------------全局api------------------*/
	/**
	 * @description 添加单条告警
	 */
	getNodes = () => {
		//获取所有节点
	};
	getLines = () => {
		//获取所有连线
		const edges = this.graph.getEdges();
		let result = [];
		console.log("getLines---->>%o", edges);
		edges.forEach(element => {
			console.log("getLines element---->>%o", element);
			if (element) {
				const model = element.getModel();
				result.push(model);
			}
		});
		return result;
	};
	updateDatas = data => {
		//更新数据
	};
	clearDatas = () => {
		//清空数据
	};
	getAllData = () => {
		//获取所有数据
		const nodes = this.graph.getNodes();
		let result = [];
		nodes.forEach(element => {
			const model = element.getModel();
			result.push(model);
		});
		return result;
	};
	/*-----------------告警api------------------*/
	/**
	 * @description 添加单条告警
	 * @param id 节点id
	 * @param level 告警级别
	 * @param type node|edge 节点|连线
	 */
	addAlarm = (id, level, type) => {
		console.log("---->>%o,%o", id, level);
		const item = this.graph.findById(id);
		if (item) {
			const model = item.getModel();
			model.alarm = level.toString();
			console.log("addAlarm---->>%o", model);
			this.graph.updateItem(item, model);
		} else {
			this.cacheMap.set(id, level);
		}
	};
	addEdgeAlarm = (source, target, level) => {
		const edges = this.graph.getEdges();
		edges.forEach(edge => {
			if(edge){
				const edgeModel = edge.getModel();
				if ((edgeModel.source == source && edgeModel.target == target)||(edgeModel.source == target && edgeModel.target == source)) {
					edgeModel.style.stroke = levelColos[parseInt(level)];
					debugger;
					this.graph.updateItem(edge, edgeModel);
				}
			}
		});
	};
	/**
	 * @description 添加多条告警
	 * @param id 节点id
	 * @param level 告警级别
	 * @param type node|edge 节点|连线
	 */
	addAlarms = (ids, levels, type) => {};
	/**
	 * @description 清除单条告警
	 * @param id 节点id
	 * @param type node|edge 节点|连线
	 */
	clearAlarm = (id, type) => {};
	/**
	 * @description 清除多条告警
	 * @param id 节点id
	 * @param type node|edge 节点|连线
	 */
	clearAlarms = (ids, type) => {};

	/*-----------------节点api------------------*/
	/**
	 * @description 获取当前选中节点
	 */
	getSelectsNode = () => {
		const nodes = this.graph.getNodes();
		let result = [];
		nodes.forEach(element => {
			const model = element.getModel();
			if (model.selected) {
				result.push(model);
			}
		});
		return result;
	};
	/**
	 * @description 更新选中节点
	 * @param type 节点Object
	 */
	updateSelectNode = node => {};
	/**
	 * @description 根据id更新节点
	 * @param id 节点id
	 * @param type 节点Object
	 */
	updateNodeById = (id, node) => {
		const item = this.graph.findById(id);
		if (item) {
			const nodeModel = item.getModel();
			Object.assign(nodeModel, node);
			this.graph.updateItem(item, nodeModel);
		}
	};
	/**
	 * @description 根据id删除节点
	 * @param id 节点id
	 */
	removeNodeById = () => {};
	/**
	 * @description 批量删除节点
	 * @param id 节点id集合
	 */
	removeNodeByIds = ids => {};
	/**
	 * @description 添加节点
	 * @param datas 节点id集合
	 */
	addNode = datas => {};
	/**
	 * @description 获取节点根据节点id
	 * @param datas 节点id集合
	 */
	getNodeById = id => {
		const item = this.graph.findById(id);
		if (item) {
			return item.getModel();
		}
	};
	selectNodeById = id => {
		const item = this.graph.findById(id);
		if (item) {
			if (this.preSearch) {
				let preModel = this.preSearch.getModel();
				preModel.search = 0;
				this.graph.updateItem(this.preSearch, preModel);
			}
			const model = item.getModel();
			model.search = 1;
			model.selected = 1;
			console.log("selectNodeById---->>%o", model);
			this.graph.updateItem(item, model);
			this.preSearch = item;
		}
	};
	/*-----------------连线api------------------*/
	getSelectLine = () => {
		const edges = this.graph.getEdges();
		let result = [];
		edges.forEach(element => {
			const model = element.getModel();
			if (model.selected) {
				result.push(model);
			}
		});
		return result;
	};
	updateLineStyle = (id, line) => {};
	removeLineById = id => {};
	controllPoint = showControll => {
		//连线动态改变controlPoints属性以及界面上节点
		console.log("showControll---->>%o", showControll);
		if (showControll) {
			const edges = this.graph.getEdges();
			const addEdges = [];
			const deleteEdges = [];
			edges.forEach(edge => {
				const edgeModel = edge.getModel();
				if (
					edgeModel.hasOwnProperty("controlPoints") &&
					edgeModel["controlPoints"].length > 0 &&
					edgeModel.hasOwnProperty("selected") &&
					edgeModel.selected
				) {
					const controlPoints = edgeModel["controlPoints"];
					const sourceNode = edgeModel.source;
					const targetNode = edgeModel.target;
					let preNode = null;
					let controlPointsMap = [];
					controlPoints.forEach((point, index) => {
						const nodeId = G6.Util.uniqueId();
						const gdNode = {
							w: 20,
							h: 20,
							shape: "nodeStyle",
							neType: "gd",
							label: nodeId,
							x: point.x,
							y: point.y,
							id: nodeId
						};
						controlPointsMap.push(gdNode);
						this.graph.addItem("node", gdNode);
					});
					controlPointsMap.forEach((node, index) => {
						const newEdge = {
							source: preNode ? preNode.id : sourceNode,
							target: node.id,
							shape: "runedge",
							realNodeId: sourceNode + CacheUtil.CONTROLL_PRE + targetNode,
							style: { stroke: "#08BD09", lineWidth: 4, radius: 0.5, offset: 0, lineDash: [] },
							controlPoints: []
						};
						preNode = node;
						addEdges.push(newEdge);
					});
					if (preNode) {
						const endEdge = {
							source: preNode.id,
							target: targetNode,
							shape: "runedge",
							realNodeId: sourceNode + CacheUtil.CONTROLL_PRE + targetNode,
							style: { stroke: "#08BD09", lineWidth: 4, radius: 0.5, offset: 0, lineDash: [] },
							controlPoints: []
						};
						preNode = null;
						addEdges.push(endEdge);
					}
					CacheUtil.cacheMap.set(
						CacheUtil.CONTROLL + sourceNode + CacheUtil.CONTROLL_PRE + targetNode,
						controlPointsMap
					);
					deleteEdges.push(edge);
				}
			});
			deleteEdges.forEach(dEdge => {
				this.graph.removeItem(dEdge);
			});
			addEdges.forEach(aEdge => {
				this.graph.addItem("edge", aEdge);
			});
			setTimeout(() => {
				const uedges = this.graph.getEdges();
				uedges.forEach(element => {
					element.toFront();
				});
				this.graph.paint();
			}, 500);
		} else {
			const controlKeys = CacheUtil.cacheMap.keys();
			for (let key of controlKeys) {
				const controlNodes = CacheUtil.cacheMap.get(key);
				const controlAc = [];
				controlNodes.forEach((node, nindex) => {
					let item = this.graph.findById(node.id);
					if (item) {
						this.graph.removeItem(item);
						const point = {
							x: node.x,
							y: node.y
						};
						controlAc.push(point);
					}
				});
				const bothId = key.replace(CacheUtil.CONTROLL, "");
				const source = bothId.split(CacheUtil.CONTROLL_PRE)[0];
				const target = bothId.split(CacheUtil.CONTROLL_PRE)[1];
				const newEdge = {
					source: source,
					target: target,
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 0.5, offset: 0, lineDash: [] },
					controlPoints: controlAc
				};
				CacheUtil.cacheMap.delete(key);
				this.graph.addItem("edge", newEdge);
			}
		}
	};
}

export default G6Api;
