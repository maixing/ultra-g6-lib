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

export default class Demo extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}
	render() {
		return (
			<TopoLib.TopoView
				datas={data}
				showToolBar={true}
				ref={component => {
					this.topo = component;
				}}
				onNodeClick={evt => {
					console.log("---->>%o", this.topo.g6Api.getSelectsNode());
				}}
				onEdgeClick={evt => {
					console.log("---->>%o", this.topo.g6Api.getSelectLine());
				}}
			/>
		);
	}
}
