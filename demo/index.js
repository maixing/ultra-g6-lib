import React from "react";
import { render } from "react-dom";
import TopoLib from "../lib/g6lib.min";
// import TopoLib from "../src/index";
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
			type:"sr",
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
			type:"router",
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
			type:"b",
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
			type:"sdh",
			shape: "nodeStyle",
			img: "../demo/assets/123.svg",
			label: "image",
			selected: false
		}
	],
	edges:[
		{
			source: "1",
			target: "2",
			sourceAnchor: null,
			targetAnchor: null,
			style: {
			  endArrow: true
			}
		  },
		  {
			source: "3",
			target: "4",
			sourceAnchor: null,
			targetAnchor: null,
			style: {
			  endArrow: true
			}
		  }
	]
};

render(<TopoLib.TopoView datas={data} showToolBar={true}/>, document.getElementById("app"));

if (module.hot) {
	module.hot.accept();
}
