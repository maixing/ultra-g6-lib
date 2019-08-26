/**
 *
 * Created by maixing on 2019/08/26 11:00:07
 *
 */
import React from "react";
import PropTypes from "prop-types";
import G6 from "@antv/g6";
import hierarchy from "@antv/hierarchy";
import { GRAPH_MOUSE_EVENTS, ITEM_EVENTS, GRAPH_MOUSE_REACT_EVENTS, ITEM_REACT_EVENTS } from "@/consts/EventConsts";
require("@/view/style.less");

export default class TreeTopoView extends React.Component {
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
	shouldComponentUpdate = (nextProps, nextState) => {
        let change = false;
        Object.keys(nextProps).forEach((key)=>{
            if(this.props.hasOwnProperty(key) && nextProps[key] != this.props[key]){
                change = true;
            }
        });
        if(this.props.datas != nextProps.datas){
            if (this.graph) {
                this.graph.changeData(nextProps.datas);
            }
        }
		return change;
	};
	componentDidMount() {
		const rect = this.topoWrap.getBoundingClientRect();
		if (rect) {
			let currentLayout = "dendrogram";
			const layouts = {
				dendrogram: {
					type: "dendrogram",
					direction: "LR", // H / V / LR / RL / TB / BT
					nodeSep: 1000,
					rankSep: 100,
					radial: true,
					getId(d) {
						return d.id;
					}
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
				modes: {
					default: ["collapse-expand", "drag-canvas"]
				},
				fitView: true,
				layout: layouts.dendrogram
			});
			this.graph.node(node => {
				return {
					style: {
						fill: "#40a9ff",
						stroke: "#096dd9",
						cursor: "pointer"
					},
					shape: "image",
					label: node.id,
					size: [node.w, node.h],
					img: "../demo/assets/" + node.imgName,
					labelCfg: {
						position: "bottom"
					}
				};
			});
			this.graph.data(this.state.datas);
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
