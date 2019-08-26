/**
* 
* Created by maixing on 2019/08/26 11:00:07
*
*/
import React from "react";
import PropTypes from "prop-types";
import G6 from "@antv/g6";
import hierarchy from "@antv/hierarchy";
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
		baseUrl: "../demo/assets/",
		model: "multiselect",
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
			let currentLayout = "dendrogram";
			const layouts = {
				dendrogram: {
					type: "dendrogram",
					direction: "LR", // H / V / LR / RL / TB / BT
					nodeSep: 50,
					rankSep: 100,
					radial: true
				},
				compactBox: {
					type: "compactBox",
					direction: "LR",
					getId(d) {
						return d.id;
					},
					getHeight() {
						return 16;
					},
					getWidth() {
						return 16;
					},
					getVGap() {
						return 50;
					},
					getHGap() {
						return 100;
					}
				},
				mindmap: {
					type: "mindmap",
					direction: "H",
					getHeight() {
						return 16;
					},
					getWidth() {
						return 16;
					},
					getVGap() {
						return 50;
					}
				}
			};
			this.graph = new G6.TreeGraph({
				container: this.props.el,
				width: rect.width,
				height: rect.height - 4,
				pixelRatio: 2,
				renderer: "svg",
				modes: {
					default: ["collapse-expand", "drag-canvas"]
				},
				fitView: true,
				layout: layouts.dendrogram
			});
			// this.initUtil();
			this.graph.node(node => {
				return {
					style: {
						fill: "#40a9ff",
						stroke: "#096dd9",
						cursor: "pointer"
					},
					shape: "image",
					label: node.id,
					width: 100,
					height: 100,
					img: "../demo/assets/sdh.svg",
					labelCfg: {
						position: "bottom"
					}
				};
			});
			let i = 0;
			// this.graph.edge(() => {
			// 	i++;
			// 	return {
			// 		shape: "cubic-horizontal",
			// 		color: "#A3B1BF",
			// 		label: i
			// 	};
			// });
			const data = {
				isRoot: true,
				id: "Root",
				style: {
					fill: "red"
				},
				children: [
					{
						id: "SubTreeNode1",
						raw: {},
						children: [
							{
								id: "SubTreeNode1.1"
							},
							{
								id: "SubTreeNode1.2",
								children: [
									{
										id: "SubTreeNode1.2.1"
									},
									{
										id: "SubTreeNode1.2.2"
									},
									{
										id: "SubTreeNode1.2.3"
									}
								]
							}
						]
					},
					{
						id: "SubTreeNode2",
						children: [
							{
								id: "SubTreeNode2.1"
							}
						]
					},
					{
						id: "SubTreeNode3",
						children: [
							{
								id: "SubTreeNode3.1"
							},
							{
								id: "SubTreeNode3.2"
							},
							{
								id: "SubTreeNode3.3"
							}
						]
					},
					{
						id: "SubTreeNode4"
					},
					{
						id: "SubTreeNode5"
					},
					{
						id: "SubTreeNode6"
					},
					{
						id: "SubTreeNode7"
					},
					{
						id: "SubTreeNode8"
					},
					{
						id: "SubTreeNode9"
					},
					{
						id: "SubTreeNode10"
					},
					{
						id: "SubTreeNode11"
					}
				]
			};
			this.graph.data(data);
			this.graph.render();
			setTimeout(() => {});
		}
	}
	componentWillUnmount = () => {
		window.removeEventListener("resize", this.resize);
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
