/**
 *
 * Created by maixing on 2019/08/23 15:54:46
 *
 */

import React from "react";
// import TopoLib from "../lib/g6lib.min";
import TopoLib from "../src/index";
const data = {
	nodes: [
		{
			id: "1",
			x: 100,
			y: 100,
			w: 48,
			h: 48,
			shape: "nodeStyle",
			label: "circle",
			type: "sr",
			img: "../demo/assets/123.svg",
			selected: false,
			labelCfg: {
				position: "bottom"
			}
		},
		{
			id: "2",
			x: 200,
			y: 200,
			w: 48,
			h: 48,
			type: "router",
			shape: "nodeStyle",
			label: "rect",
			img: "../demo/assets/123.svg",
			selected: false
		},
		{
			id: "3",
			x: 300,
			y: 300,
			w: 48,
			h: 48,
			type: "b",
			shape: "nodeStyle",
			label: "ellipse",
			img: "../demo/assets/123.svg",
			selected: false
		},
		{
			id: "4",
			x: 400,
			y: 400,
			w: 48,
			h: 48,
			type: "sdh",
			shape: "nodeStyle",
			img: "../demo/assets/123.svg",
			label: "image",
			selected: false
		}
	],
	edges: [
		{
			source: "1",
			target: "2",
			sourceAnchor: null,
			targetAnchor: null,
			shape: "edgeStyle",
			selected: false,
			endArrow: true
		},
		{
			source: "3",
			target: "4",
			sourceAnchor: null,
			targetAnchor: null,
			selected: false,
			endArrow: true,
			shape: "edgeStyle"
		}
	]
};
const data2 = {
	isRoot: true,
	id: "Root123",
	imgName: "bb.png",
	w: 60,
	h: 70,
	children: [
		{
			id: "SubTreeNode1",
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			children: [
				{
					imgName: "bbnode.png",
					w: 30,
					h: 30,
					id: "SubTreeNode1.1"
				}
			]
		},
		{
			id: "SubTreeNode2",
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			children: [
				{
					imgName: "bbnode.png",
					w: 30,
					h: 30,
					id: "SubTreeNode2.1"
				}
			]
		},
		{
			id: "SubTreeNode3",
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			children: [
				{
					imgName: "bbnode.png",
					w: 30,
					h: 30,
					id: "SubTreeNode3.1"
				},
				{
					imgName: "bbnode.png",
					w: 30,
					h: 30,
					id: "SubTreeNode3.2"
				},
				{
					imgName: "bbnode.png",
					w: 30,
					h: 30,
					id: "SubTreeNode3.3"
				}
			]
		},
		{
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			id: "SubTreeNode4"
		},
		{
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			id: "SubTreeNode5"
		},
		{
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			id: "SubTreeNode6"
		},
		{
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			id: "SubTreeNode7"
		},
		{
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			id: "SubTreeNode8"
		},
		{
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			id: "SubTreeNode9"
		},
		{
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			id: "SubTreeNode10"
		},
		{
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			id: "SubTreeNode11"
		}
	]
};
const data1 = {
	isRoot: true,
	id: "Root",
	imgName: "bb.png",
	w: 60,
	h: 70,
	children: [
		{
			id: "SubTreeNode1",
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			children: [
				{
					imgName: "bbnode.png",
					w: 30,
					h: 30,
					id: "SubTreeNode1.1"
				}
			]
		},
		{
			id: "SubTreeNode2",
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			children: [
				{
					imgName: "bbnode.png",
					w: 30,
					h: 30,
					id: "SubTreeNode2.1"
				}
			]
		},
		{
			id: "SubTreeNode3",
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			children: [
				{
					imgName: "bbnode.png",
					w: 30,
					h: 30,
					id: "SubTreeNode3.1"
				},
				{
					imgName: "bbnode.png",
					w: 30,
					h: 30,
					id: "SubTreeNode3.2"
				},
				{
					imgName: "bbnode.png",
					w: 30,
					h: 30,
					id: "SubTreeNode3.3"
				}
			]
		},
		{
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			id: "SubTreeNode4"
		},
		{
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			id: "SubTreeNode5"
		},
		{
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			id: "SubTreeNode6"
		},
		{
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			id: "SubTreeNode7"
		},
		{
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			id: "SubTreeNode8"
		},
		{
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			id: "SubTreeNode9"
		},
		{
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			id: "SubTreeNode10"
		},
		{
			imgName: "bbgroup.png",
			w: 30,
			h: 30,
			id: "SubTreeNode11"
		}
	]
};
export default class Demo extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		datas:data1
	}

	componentDidMount() {
		setInterval(()=>{
			this.setState({
				datas:Math.random()>0.5?data1:data2
			});
		},5000);
	}
	render() {
		console.log('this.state---->>%o',this.state.datas);
		return (
			<TopoLib.TreeTopoView
				datas={this.state.datas}
				showToolBar={true}
				ref={component => {
					this.topo = component;
				}}
				onNodeClick={evt => {
					console.log("onNodeClick---->>%o",evt);
				}}
				onEdgeClick={evt => {
					console.log("onEdgeClick---->>%o",evt);
				}}
			/>
		);
	}
}
