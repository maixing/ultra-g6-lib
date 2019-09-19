/**
 *
 * Created by maixing on 2019/08/23 15:54:46
 *
 */

import React from "react";
// import TopoLib from "../lib/g6lib.min";
import TopoLib from "../src/index";
import mockData from "./mock.json";
import group from "./group.json";
import flare from "./flare.json";
import flare1 from "./flare1.json";
import topo1 from "./topo1.json";
export default class Demo extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		datas: group.data
	};

	componentDidMount() {
		// setInterval(()=>{
		// 	this.setState({
		// 		datas:Math.random()>0.5?data1:data2
		// 	});
		// },5000);
	}
	render() {
		console.log("---->>%o", this.state.datas);
		let data = this.state.datas;
		if (data) {
			data.w = 90;
			data.h = 100;
			data.index = 1;
			if (data.hasOwnProperty("children")) {
				let groupChildrens = data["children"];
				if (groupChildrens) {
					groupChildrens.forEach(group => {
						if (group && group.hasOwnProperty("children")) {
							group.w = 90;
							group.h = 90;
							group.index = 2;
							group.collapsed = false;
							let nodes = group["children"];
							if (nodes) {
								nodes.forEach(node => {
									node.w = 60;
									node.h = 60;
									node.index = 3;
								});
							}
						}
					});
				}
			}
		}
		return (
			<TopoLib.TreeTopoView
				datas={data}
				showToolBar={false}
				model={"multiselect"}
				ref={component => {
					this.topo = component;
				}}
				onNodeClick={evt => {
					console.log("onNodeClick---->>%o", evt);
				}}
				onEdgeClick={evt => {
					console.log("onEdgeClick---->>%o", evt);
				}}
			/>
		);
	}
}
