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
import { Button, Radio, Icon } from "antd";
export default class Demo extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		datas: {
			nodes: [
				{ id: "yizhuang", label: "", shape: "nodeStyle", neType: "yizhuang", w: 890, h: 505 },
				{ id: "yangqiao", label: "", shape: "nodeStyle", neType: "yangqiao", w: 796, h: 455 },
				{ id: "dongsi", label: "", shape: "nodeStyle", neType: "dongsi", w: 554, h: 335 },
				{ id: "changping", label: "", shape: "nodeStyle", neType: "changping", w: 554, h: 335 },
				{ id: "center", label: "", shape: "nodeStyle", neType: "center", w: 804, h: 459 },
				{ id: "8784038480339916906", label: "NFV vIMS(RH2288)-yq", shape: "nodeStyle", neType: "A" },
				{ id: "5260284526204451339", label: "BJ-BJ-YZHYH-CE-2.VoLTE", shape: "nodeStyle", neType: "A" },
				{ id: "-5716953770206006381", label: "BJ-BJ-YQ-CE-6.VoLTE", shape: "nodeStyle", neType: "A" },
				{ id: "-1983672940887260532", label: "BJ-BJ-YQ-CE-5.VoLTE", shape: "nodeStyle", neType: "A" },
				{ id: "-5632352890870368844", label: "CN2云", shape: "nodeStyle", neType: "cn2" },
				{ id: "-7241879535865106100", label: "163云", shape: "nodeStyle", neType: "163" },
				{ id: "4619743518772544772", label: "BJ-BJ-DS-MCE-1.MCN.NE40E", shape: "nodeStyle", neType: "A" },
				{ id: "-6282889389391157834", label: "BJ-BJ-DS-MCE-2.MCN.NE40E", shape: "nodeStyle", neType: "A" },
				{ id: "-2359872188827206498", label: "BJ-BJ-WLKJC-MCE-2.MCN.NE40E", shape: "nodeStyle", neType: "A" },
				{ id: "-5538733537525649406", label: "BJ-BJ-WLKJC-MCE-1.MCN.NE40E", shape: "nodeStyle", neType: "A" },
				{ id: "2977296786501480018", label: "BJ-BJ-YZHYH-MCE-1.MCN.NE40E", shape: "nodeStyle", neType: "A" },
				{ id: "3683561550664927112", label: "BJ-BJ-YZHYH-MCE-2.MCN.NE40E", shape: "nodeStyle", neType: "A" },
				{ id: "-3572360678739797503", label: "SRV-EOR01-yz", shape: "nodeStyle", neType: "A" },
				{ id: "-3716198034596573591", label: "SRV-EOR02-yz", shape: "nodeStyle", neType: "A" },
				{ id: "-4420576647613457599", label: "MGNT-EOR01-yz", shape: "nodeStyle", neType: "A" },
				{ id: "-4311876678426440141", label: "MGNT-EOR02-yz", shape: "nodeStyle", neType: "A" },
				{ id: "-8137881224353739309", label: "BJ-BJ-YZHYH-CE-1.VoLTE", shape: "nodeStyle", neType: "A" },
				{ id: "7783678799634628414", label: "SRV-EOR01-yq", shape: "nodeStyle", neType: "A" },
				{ id: "6462173375031171282", label: "SRV-EOR02-yq", shape: "nodeStyle", neType: "A" },
				{ id: "-5872535295187736602", label: "MGNT-EOR01-yq", shape: "nodeStyle", neType: "A" },
				{ id: "8708782183548932749", label: "MGNT-EOR02-yq", shape: "nodeStyle", neType: "A" }
			],
			edges: [
				{
					source: "-8137881224353739309",
					target: "5260284526204451339",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-1983672940887260532",
					target: "-5716953770206006381",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-8137881224353739309",
					target: "-1983672940887260532",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-8137881224353739309",
					target: "-5716953770206006381",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "5260284526204451339",
					target: "-1983672940887260532",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "5260284526204451339",
					target: "-5716953770206006381",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-8137881224353739309",
					target: "-5632352890870368844",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "5260284526204451339",
					target: "-5632352890870368844",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-1983672940887260532",
					target: "-5632352890870368844",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-5716953770206006381",
					target: "-5632352890870368844",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-8137881224353739309",
					target: "-7241879535865106100",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "5260284526204451339",
					target: "-7241879535865106100",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-1983672940887260532",
					target: "-7241879535865106100",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-5716953770206006381",
					target: "-7241879535865106100",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-8137881224353739309",
					target: "4619743518772544772",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "5260284526204451339",
					target: "-6282889389391157834",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-1983672940887260532",
					target: "-2359872188827206498",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-5716953770206006381",
					target: "-5538733537525649406",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-8137881224353739309",
					target: "2977296786501480018",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "5260284526204451339",
					target: "3683561550664927112",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-1983672940887260532",
					target: "2977296786501480018",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-5716953770206006381",
					target: "3683561550664927112",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "2933989865653711859",
					target: "-3572360678739797503",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "2933989865653711859",
					target: "-3716198034596573591",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "2933989865653711859",
					target: "-4420576647613457599",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "2933989865653711859",
					target: "-4311876678426440141",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-3572360678739797503",
					target: "-3716198034596573591",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-4420576647613457599",
					target: "-4311876678426440141",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-3572360678739797503",
					target: "-8137881224353739309",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-3716198034596573591",
					target: "5260284526204451339",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-4420576647613457599",
					target: "5260284526204451339",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-4311876678426440141",
					target: "5260284526204451339",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "8784038480339916906",
					target: "7783678799634628414",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "8784038480339916906",
					target: "6462173375031171282",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "8784038480339916906",
					target: "-5872535295187736602",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "8784038480339916906",
					target: "8708782183548932749",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "7783678799634628414",
					target: "6462173375031171282",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-5872535295187736602",
					target: "8708782183548932749",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "7783678799634628414",
					target: "-1983672940887260532",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "6462173375031171282",
					target: "-5716953770206006381",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "-5872535295187736602",
					target: "-5716953770206006381",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				},
				{
					source: "8708782183548932749",
					target: "-5716953770206006381",
					shape: "runedge",
					style: { stroke: "#08BD09", lineWidth: 4, radius: 20, offset: 0, lineDash: [] },
					controlPoints: []
				}
			],
			groups: []
		}
	};

	componentDidMount() {}
	showControl = () => {
		this.topo.g6Api.controllPoint(true);
	};
	hideControl = () => {
		this.topo.g6Api.controllPoint(false);
	};
	render() {
		let data = this.state.datas;
		return (
			<div style={{ width: "100%", height: "100%", position: "relative", background: "darkslategray" }}>
				<TopoLib.TopoView
					datas={data}
					showToolBar={false}
					model={"addCPoint"}
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
				<div style={{ position: "absolute", left: 20, top: 20 }}>
					<Radio.Group>
						<Radio.Button value="large" onClick={this.showControl}>
							显示
						</Radio.Button>
						<Radio.Button value="default" onClick={this.hideControl}>
							隐藏
						</Radio.Button>
					</Radio.Group>
				</div>
			</div>
		);
	}
}
