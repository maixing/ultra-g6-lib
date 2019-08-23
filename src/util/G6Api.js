/**
 *
 * Created by maixing on 2019/08/23 11:17:19
 *
 */
import BaseUtil from "@/util/BaseUtil";

class G6Api extends BaseUtil {
	constructor() {
		super();
	}
	/*-----------------全局api------------------*/
	/**
	 * @description 添加单条告警
	 */
	getNodes = () => {
		//获取所有节点
	};
	getLines = () => {
		//获取所有连线
	};
	updateDatas = data => {
		//更新数据
	};
	clearDatas = () => {
		//清空数据
	};
	getAllData = () => {
		//获取所有数据
	};
	/*-----------------告警api------------------*/
	/**
	 * @description 添加单条告警
	 * @param id 节点id
	 * @param level 告警级别
	 * @param type node|edge 节点|连线
	 */
	addAlarm = (id, level, type) => {};
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
	updateNodeById = (id, node) => {};
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
	getNodeById = id => {};
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
}

export default G6Api;
