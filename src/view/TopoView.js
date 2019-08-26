/**
 *
 * Created by maixing on 2019/08/09 17:06:57
 *
 */

import React from "react";
import PropTypes from "prop-types";
import G6 from "@antv/g6";
import RegisterUtil from "@/util/RegisterUtil";
import GraphEventUtil from "@/util/GraphEventUtil";
import ToolbarUtil from "@/util/ToolbarUtil";
import G6Api from "@/util/G6Api";
import { GRAPH_MOUSE_EVENTS, ITEM_EVENTS, GRAPH_MOUSE_REACT_EVENTS, ITEM_REACT_EVENTS } from "@/consts/EventConsts";
import ToolbarView from "./ToolbarView";
require("@/view/style.less");

export default class TopoView extends React.Component {
	constructor(props) {
		super(props);
		this.graph = null;
		this.registerUtil = new RegisterUtil();
		this.graphEventUtil = new GraphEventUtil();
		this.toolbarUtil = new ToolbarUtil();
		this.g6Api = new G6Api();
		this.resizeTimer = 0;
		this.sourceRect = {
			width: 0,
			height: 0,
			left: 0,
			top: 0,
			datas: []
		};
	}
	state = {
		...this.props
	};
	static defaultProps = {
		el: "topoEl",
		datas: [],
		baseUrl:"../demo/assets/",
		model:"multiselect",
		nodeMenu: [],
		edgeMenu: [],
		showToolBar: true
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
				height: rect.height - 4,
				render:"svg",
				fitView: false,
				modes: {
					addEdge: ["addEdge", "drag-node"],
					addNode: ["addNode", "drag-node"],
					edite: ["drag-node", "addEdge", "addNode"],
					show: ["drag-canvas", "zoom-canvas"],
					multiselect: ["drag-node"],
					select: ["drag-node"],
					drag: ["drag-canvas"]
				}
			});
			this.sourceRect = {
				...rect,
				datas: this.state.datas
			};
			this.initUtil();
			this.initEvent();
			if (this.toolbar) {
				this.toolbar.toolbar = this.toolbarUtil;
			}
			this.graph.setMode(this.state.model);
			this.graph.data(this.state.datas);
			this.graph.render();
			this.graph.setAutoPaint(true);
		}
	}
	componentWillUnmount = () => {
		window.removeEventListener("resize", this.resize);
	};
	initUtil = () => {
		this.g6Api.init(this.graph);
		this.toolbarUtil.init(this.graph);
		this.graphEventUtil.init(this.graph);
		this.registerUtil.init(this.graph);
		this.registerUtil.baseUrl = this.state.baseUrl;
	};
	initResizeEvent = () => {
		window.addEventListener("resize", this.resize);
	};
	initEvent() {
		const { addListener } = this;

		GRAPH_MOUSE_EVENTS.forEach(event => {
			const eventName = GRAPH_MOUSE_REACT_EVENTS[event];
			addListener(this.graph, `node:${event}`, this.props[`onNode${eventName}`]);
			addListener(this.graph, `edge:${event}`, this.props[`onEdge${eventName}`]);
			addListener(this.graph, `canvas:${event}`, this.props[`onCanvas${eventName}`]);
		});

		ITEM_EVENTS.forEach(event => {
			addListener(this.page, [event], this.props[ITEM_REACT_EVENTS[event]]);
		});
	}
	resize = () => {
		clearTimeout(this.resizeTimer);
		this.resizeTimer = setTimeout(() => {}, 500);
	};
	addListener = (target, eventName, handler) => {
		if (typeof handler === "function") target.on(eventName, handler);
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
				{this.state.showToolBar ? (
					<ToolbarView
						ref={component => {
							this.toolbar = component;
						}}
					/>
				) : null}
			</div>
		);
	}
}
