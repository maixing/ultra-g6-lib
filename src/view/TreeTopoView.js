/**
 *
 * Created by maixing on 2019/08/26 11:00:07
 *
 */
import React from "react";
import PropTypes from "prop-types";
import G6 from "@antv/g6";
import { GRAPH_MOUSE_EVENTS, ITEM_EVENTS, GRAPH_MOUSE_REACT_EVENTS, ITEM_REACT_EVENTS } from "@/consts/EventConsts";
import G6Api from "@/util/G6Api";
import RegisterUtil from "@/util/RegisterUtil";
require("@/view/style.less");

export default class TreeTopoView extends React.Component {
	constructor(props) {
		super(props);
		this.graph = null;
		this.g6Api = new G6Api();
		this.registerUtil = new RegisterUtil();
		this.sourceRect = {
			width: 0,
			height: 0,
			left: 0,
			top: 0,
			datas: []
		};
		this.levelColos = ["#FF0000", "#FF0000", "#FFA500", "#FFFF00", "#0000FF"];
	}
	state = {
		...this.props
	};
	static defaultProps = {
		el: "topoEl",
		datas: [],
		baseUrl: "./demo/assets/",
		model: "multiselect",
		imageType: "png",
		nodeMenu: [],
		edgeMenu: [],
		showToolBar: true,
		nodeSep: 5,
		rankSep: 400,
		radial: true
	};
	static propTypes = {
		el: PropTypes.string.isRequired,
		datas: PropTypes.array.isRequired
	};
	destroy = () => {
		if (this.graph) {
			this.graph.destroy();
		}
	};
	clear = ()=>{
		if (this.graph) {
			this.graph.clear();
		}
	}
	shouldComponentUpdate = (nextProps, nextState) => {
		let change = false;
		Object.keys(nextProps).forEach(key => {
			if (this.props.hasOwnProperty(key) && nextProps[key] != this.props[key]) {
				change = true;
			}
		});
		if (this.props.datas != nextProps.datas) {
			const rect = this.topoWrap.getBoundingClientRect();
			if (this.graph) {
				this.graph.clear();
				this.graph.changeData(nextProps.datas);
			}
		}
		return change;
	};
	componentDidMount() {
		const rect = this.topoWrap.getBoundingClientRect();
		if (rect) {
			const layouts = {
				dendrogram: {
					type: "dendrogram",
					direction: "LR", // H / V / LR / RL / TB / BT
					nodeSep: this.state.nodeSep,
					rankSep: this.state.rankSep,
					radial: this.state.radial
				}
			};
			this.graph = new G6.TreeGraph({
				container: this.props.el,
				width: rect.width,
				height: rect.height - 4,
				pixelRatio: 2,
				modes: {
					default: ["drag-canvas", "zoom-canvas","collapse-expand"]
				},
				fitView: true,
				animate: true,
				linkCenter: false,
				layout: layouts.dendrogram
			});
			let data = this.state.datas;
			// if (this.state.radial) {
			// 	G6.Util.traverseTree(data, node => {
			// 		node.id = Math.random() * new Date().getTime();
			// 		node.w = 30;
			// 		node.h = 30;
			// 		node.index = 3;
			// 		node.alarm = 1;
			// 		node.imageName = "bbnode";
			// 	});
			// }
			this.registerUtil.baseUrl = this.state.baseUrl;
			this.registerUtil.initTreeGraph(this.graph);
			this.graph.node(node => {
				return {
					shape: "treenodeStyle",
					label: node.name,
					size: [node.w, node.h],
					id:node.id,
					img: this.state.baseUrl + node.imageName + "." + this.state.imageType,
					style: {
						cursor: "pointer"
					},
					labelCfg: {
						position: "bottom",
						style: {
							fill: "#00FFFF",
							fontSize: 20
						}
					}
				};
			});
			let i = 0;
			this.graph.edge(() => {
				i++;
				return {
					color: "#fcfdfd",
					label: "",
					shape:"edgeStyle"
				};
			});
			this.initEvent();
			this.g6Api.init(this.graph);
			this.graph.data(data);
			this.graph.render();
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
			</div>
		);
	}
}
