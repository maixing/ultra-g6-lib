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
		datas: topo1.data.data
	};

	componentDidMount() {
		// setInterval(()=>{
		// 	this.setState({
		// 		datas:Math.random()>0.5?data1:data2
		// 	});
		// },5000);
	}
	render() {
		console.log('---->>%o',this.state.datas);
		return (
			<TopoLib.TopoView
				datas={this.state.datas}
				showToolBar={true}
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
