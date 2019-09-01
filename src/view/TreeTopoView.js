/**
 *
 * Created by maixing on 2019/08/26 11:00:07
 *
 */
import React from "react";
import PropTypes from "prop-types";
import G6 from "@antv/g6";
// import hierarchy from "@antv/hierarchy";
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
		this.levelColos = ["0xFF0000","#FF0000","#FFA500","#FFFF00","#0000FF"];
	}
	state = {
		...this.props
	};
	static defaultProps = {
		el: "topoEl",
		datas: [],
		baseUrl: "../demo/assets/",
		model: "multiselect",
		imageType:"png",
		nodeMenu: [],
		edgeMenu: [],
		showToolBar: true,
		nodeSep:1000,
		rankSep:100,
	};
	static propTypes = {
		el: PropTypes.string.isRequired,
		datas: PropTypes.array.isRequired
	};
	destroy = ()=>{
		if(this.graph){
			this.graph.destroy();
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
			console.log('nextProps.datas---->>%o',nextProps.datas);
			const rect = this.topoWrap.getBoundingClientRect();
			if (this.graph) {
				this.graph.clear();
				if(nextProps.datas.hasOwnProperty('children') && nextProps.datas.children.length>0){
					this.graph.set('animate', true);
					// this.graph.fitView(true);
					this.graph.fitView([rect.height*30/100,rect.width*20/100]);
				}else{
					this.graph.set('animate', false);
					if(rect){
						this.graph.fitView([rect.height*40/100,rect.width*20/100]);
					}
				}
				this.graph.changeData(nextProps.datas);
			}
		}
		return change;
	};
	componentDidMount() {
		this.register();
		const rect = this.topoWrap.getBoundingClientRect();
		if (rect) {
			const layouts = {
				dendrogram: {
					type: "dendrogram",
					direction: "LR", // H / V / LR / RL / TB / BT
					nodeSep: this.state.nodeSep,
					rankSep: this.state.rankSep,
					radial: false
				}
			};
			this.graph = new G6.TreeGraph({
				container: this.props.el,
				width: rect.width,
				height: rect.height - 4,
				pixelRatio: 2,
				modes: {
					default: ["drag-canvas"]
				},
				fitView: true,
				animate:false,
				layout: layouts.dendrogram
			});
			this.graph.node(node => {
				return {
					shape: "nodeStyle",
					label: node.name,
					size: [node.w, node.h],
					img: this.state.baseUrl + node.imageName+"."+this.state.imageType,
					style:{
						cursor:"pointer"
					},
					labelCfg: {
						position: "bottom",
						style: {
							fill: '#fcfdfd',
							fontSize: node.index?6+2*(4-node.index):12
						  }
					}
				};
			});
			let i = 0;
			this.graph.edge(() => {
				i++;
				return {
					color: "#fcfdfd",
					label: ""
				};
			});
			this.initEvent();
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
	register = ()=>{
		G6.registerNode("nodeStyle", {
			draw: (cfg, group) => {
				const w = parseFloat(cfg.w);
				const h = parseFloat(cfg.h);
				let aw = w * 1;
				let ah = h * 1;
				const model = this.graph.getCurrentMode();
				const image = group.addShape("image", {
					attrs: {
						x: -w / 2,
						y: -h / 2,
						width: w,
						height: h,
						cursor: "pointer",
						img: this.state.baseUrl + cfg.imageName+"."+this.state.imageType,
						shadowColor:this.levelColos[parseInt(cfg.level)],
						shadowBlur:parseInt(cfg.level)>0?25:0,
						shadowOffsetX:0,
						shadowOffsetY:0,
					}
				});
				group.addShape("text", {
					attrs: {
						x: 0,
						y: cfg.index==1?h*0.6:h,
						textAlign: "center",
						text: cfg.label,
						fill: "#FFF",
						fontSize: cfg.index?6+2*(4-cfg.index):12
					}
				});
				return image;
			}
		});
	}
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
