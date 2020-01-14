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
import { GRAPH_MOUSE_EVENTS, ITEM_EVENTS, GRAPH_MOUSE_REACT_EVENTS, ITEM_REACT_EVENTS } from "@/appconsts/EventConsts";
import ToolbarView from "./ToolbarView";
import "@/view/style.less";
import CacheUtil from '@/util/CacheUtil';

export default class TopoView extends React.Component {
	constructor(props) {
		super(props);
		this.graph = null;
		this.registerUtil = new RegisterUtil();
		this.graphEventUtil = new GraphEventUtil();
		this.toolbarUtil = new ToolbarUtil();
		this.cacheUtil = CacheUtil;
		this.g6Api = new G6Api();
		this.resizeTimer = 0;
		this.ctrlKey = false;
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
		model: "addCPoint",
		nodeMenu: [],
		edgeMenu: [],
		multiSelectFilter: [],
		showToolBar: true,
		fitView: true,
		moveCenter: false,
		userLayout: false,
		fitGap: 100
	};
	static propTypes = {
		el: PropTypes.string.isRequired,
		datas: PropTypes.array.isRequired
	};
	destroy = () => {
		if (this.graph) {
			this.graph.stopAnimate();
			this.graph.destroy();
		}
	};
	shouldComponentUpdate = (nextProps, nextState) => {
		let change = false;
		Object.keys(nextProps).forEach(key => {
			if (this.props.hasOwnProperty(key) && nextProps[key] != this.props[key]) {
				change = true;
			}
		});
		if (this.props.datas != nextProps.datas) {
			if (this.graph) {
				this.setData(nextProps.datas, true);
			}
		}
		if(this.props.model != nextProps.model){
			this.graph.setMode(nextProps.model);
		}
		return change;
	};
	setData = (datas, clear = false) => {
		const rect = this.topoWrap.getBoundingClientRect();
		let maxY = 0;
		datas.nodes.forEach(item => {
			const y = parseInt(item.y);
			if (y > maxY) {
				maxY = y;
			}
		});
		if (clear) {
			this.graph.clear();
		}
		if (this.state.userLayout) {
			let num = datas.nodes.length;
			const cGap = 100;
			const rGap = 100;
			let rNum = rect.width / (num + 1);
			datas.nodes.forEach((node, index) => {
				let odd = index % 2 == 0 ? 100 : 0;
				node.x = rNum * (index + 1);
				node.y = rect.height / 3 + odd;
			});
		}
		if (!this.state.fitView) {
			this.graph.changeSize(
				this.sourceRect.width,
				maxY > this.sourceRect.height ? maxY * 1.05 : this.sourceRect.height
			);
		}
		this.graph.data(datas);
		this.graph.render();
		if (this.state.fitView) {
			this.graph.fitView(this.state.fitGap);
		}
	};
	componentDidMount() {
		const rect = this.topoWrap.getBoundingClientRect();
		if (rect) {
			this.graph = new G6.Graph({
				container: this.props.el,
				width: rect.width,
				renderer: "canvas",
				height: rect.height - 4,
				fitView: this.state.fitView,
				pixeRatio: 100,
				groupByTypes:false,
				defaultEdge: {
					shape:"runedge",
					style: {
						lineWidth: 4,
						stroke: "#08BD09",
						radius: 20,
						offset: 0,
					}
				},
				edgeStateStyles: {
					selected: {
						stroke: "#d3adf7",
						lineWidth: 4,
						lineDash: []
					}
				},
				modes: {
					default: [
						{
							type: "tooltip",
							formatText(model) {
								return model.label;
							},
							shouldUpdate: e => {
								return true;
							}
						}
					],
					addCPoint: ["addCPoint", "drag-node","zoom-canvas"],
					addEdge: [
						"addEdge",
						"drag-node",
						{
							type: "tooltip",
							formatText(model) {
								return model.label;
							},
							shouldUpdate: e => {
								return true;
							}
						}
					],
					addNode: [
						"addNode",
						"drag-node",
						{
							type: "tooltip",
							formatText(model) {
								return model.label;
							},
							shouldUpdate: e => {
								return true;
							}
						}
					],
					edite: [
						"drag-node",
						"addEdge",
						"addNode",
						{
							type: "tooltip",
							formatText(model) {
								return model.label;
							},
							shouldUpdate: e => {
								if (e.target.type !== "text") {
									return false;
								}
								return true;
							}
						}
					],
					show: [
						"drag-canvas",
						"zoom-canvas",
						{
							type: "tooltip",
							formatText(model) {
								return model.label;
							},
							shouldUpdate: e => {
								if (e.target.type !== "text") {
									return false;
								}
								return true;
							}
						}
					],
					multiselect: [
						"drag-node",
						"drag-canvas",
						"click-select",
						"zoom-canvas",
						{
							type: "tooltip",
							formatText(model) {
								return model.label;
							},
							shouldUpdate: e => {
								if (e.target.type !== "text") {
									return false;
								}
								if (this.ctrlKey) {
									return true;
								} else {
									return false;
								}
							}
						}
					],
					select: [
						"drag-node",
						{
							type: "tooltip",
							formatText(model) {
								return model.label;
							},
							shouldUpdate: e => {
								return true;
							}
						}
					],
					drag: [
						"drag-canvas",
						{
							type: "tooltip",
							formatText(model) {
								return model.label;
							},
							shouldUpdate: e => {
								if (e.target.type !== "text") {
									return false;
								}
								return true;
							}
						}
					]
				}
			});
			this.sourceRect = {
				width: rect.width,
				height: rect.height,
				datas: this.state.datas
			};
			this.initUtil();
			this.initEvent();
			if (this.toolbar) {
				this.toolbar.toolbar = this.toolbarUtil;
			}
			this.graph.setMode(this.state.model);
			this.setData(this.state.datas);
			this.graph.render();
			/** 
			 * 将连线置于所有节点之上
			*/
			setTimeout(() => {
				const edges = this.graph.getEdges();
				edges.forEach(element => {
					element.toFront();
				});
				this.graph.paint();
			}, 500);
		}
		document.onkeydown = evt => {
			this.ctrlKey = evt.ctrlKey;
		};
		document.onkeyup = evt => {
			this.ctrlKey = evt.ctrlKey;
		};
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
		this.initResizeEvent();
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
		this.resizeTimer = setTimeout(() => {
		}, 500);
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
