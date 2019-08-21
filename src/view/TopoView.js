/**
 *
 * Created by maixing on 2019/08/09 17:06:57
 *
 */

import React from "react";
import PropTypes from "prop-types";
import G6 from "@antv/g6";
import "./style.less";
import RegisterUtil from "@/util/RegisterUtil";
import GraphEventUtil from "@/util/GraphEventUtil";
import alarmUtil from "@/util/AlarmUtil";
import CacheUtil from "@/util/CacheUtil";
import ConvertUtil from "@/util/ConvertUtil";
import EventBusUtil from "@/util/EventBusUtil";
import ToolbarUtil from "@/util/ToolbarUtil";

export default class TopoView extends React.Component {
	constructor(props) {
		super(props);
		this.graph = null;
		this.registerUtil = new RegisterUtil();
		this.graphEventUtil = new GraphEventUtil();
		this.toolbarUtil = new ToolbarUtil();
	}
	state = {
		test: "123"
	};
	static defaultProps = {
		el: "topoEl",
		datas: [],
		nodeMenu: [],
		edgeMenu: []
	};
	static propTypes = {
		el: PropTypes.string.isRequired,
		datas: PropTypes.array.isRequired
	};
	static getDerivedStateFromProps(props, state) {
		if (props.test !== state.test) {
			return {
				test: props.test
			};
		}
		return null;
	}
	componentDidMount() {
		const rect = this.topoWrap.getBoundingClientRect();
		if (rect) {
			this.graph = new G6.Graph({
				container: this.props.el,
				width: rect.width,
				height: rect.height,
				fitView: false,
				modes: {
					default: [
						"drag-node"
					],
					edit: ["addEdge","drag-node"]
				}
			});
			this.initUtil();
			this.graph.data(this.props.datas);
			this.graph.render();
			this.graph.setMode("edit");
			this.graph.setAutoPaint(true);
			const node = this.graph.findById("1");
			if (node) {
				node._cfg.model.label = "test";
				this.graph.updateItem(node, node._cfg.model);
			}
		}
	}
	initUtil = () => {
		this.toolbarUtil.init(this.graph);
		this.graphEventUtil.toolBarUtil = this.toolbarUtil;
		this.graphEventUtil.init(this.graph);
		this.registerUtil.toolBarUtil = this.toolbarUtil;
		this.registerUtil.init(this.graph);
	};
	render() {
		return (
			<div
				className="topowrap"
				ref={component => {
					this.topoWrap = component;
				}}
			>
				<div className="topo-content" id={this.props.el} />
				<div className="topo-bar" />
			</div>
		);
	}
}
