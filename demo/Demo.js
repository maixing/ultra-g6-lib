/**
 *
 * Created by maixing on 2019/08/23 15:54:46
 *
 */

import React from "react";
// import TopoLib from "../lib";
import TopoLib from "../src/index";
import mockData from "./mock.json";
import group from "./group.json";
import flare from "./flare.json";
import flare1 from "./flare1.json";
import topo1 from "./topo1.json";
import { Button, Radio, Icon, Modal, Row, Col, Input, InputNumber } from "antd";
export default class Demo extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		datas: {
			nodes: [
				{
					shape: "nodeStyle",
					w: 890,
					h: 505,
					x: 469.1756208641095,
					y: 639.8755121818324,
					id: "yizhuang",
					label: "",
					neType: "yizhuang"
				},
				{
					shape: "nodeStyle",
					w: 796,
					h: 455,
					x: 391.0944193833336,
					y: 131.28325215493714,
					id: "yangqiao",
					label: "",
					neType: "yangqiao"
				},
				{
					shape: "nodeStyle",
					w: 554,
					h: 335,
					x: 514.1499288068717,
					y: 234.78964892304194,
					id: "dongsi",
					label: "",
					neType: "dongsi"
				},
				{
					shape: "nodeStyle",
					w: 554,
					h: 335,
					x: 346.70522000430634,
					y: 256.9049636267979,
					id: "changping",
					label: "",
					neType: "changping"
				},
				{
					shape: "nodeStyle",
					w: 804,
					h: 459,
					x: 374.44501689292423,
					y: 236.7435662250587,
					id: "center",
					label: "",
					neType: "center"
				},
				{
					shape: "nodeStyle",
					w: 325,
					h: 175,
					x: 640.1228993610846,
					y: 454.0151564177584,
					id: "bd1",
					label: "",
					neType: "bd"
				},
				{
					shape: "nodeStyle",
					w: 325,
					h: 175,
					x: 1298.8606305056721,
					y: 119.89590321460884,
					id: "bd2",
					label: "",
					neType: "bd"
				},
				{
					shape: "nodeStyle",
					x: 400.539448588855,
					y: 279.4604086206306,
					id: "-1983672940887260532",
					label: "BJ-BJ-YQ-CE-5.VoLTE",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 162.42511307742768,
					y: 296.82936746609363,
					id: "-5716953770206006381",
					label: "BJ-BJ-YQ-CE-6.VoLTE",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 830.7106167513731,
					y: 433.12069983274046,
					id: "-8137881224353739309",
					label: "BJ-BJ-YZHYH-CE-1.VoLTE",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 951.7855212400177,
					y: 299.3997171012678,
					id: "5260284526204451339",
					label: "BJ-BJ-YZHYH-CE-2.VoLTE",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 1048.2770460257304,
					y: 327.9212375012614,
					id: "-289730075106336434",
					label: "BJ-BJ-DS-MCE-1.MCN.NE40E-X16",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 1061.3104044986871,
					y: 255.59960765062507,
					id: "6006376856756510153",
					label: "BJ-BJ-YZHYH-MCE-1.MCN.NE40E-X16",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 1412.5713007714114,
					y: 537.913509820039,
					id: "-2187129574821275524",
					label: "BJ-BJ-DS-MCE-2.MCN.NE40E-X16",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 642.2832731276987,
					y: 330.3783536611193,
					id: "-1472186057366456851",
					label: "BJ-BJ-YZHYH-MCE-2.MCN.NE40E-X16",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 679.497767346551,
					y: 457.7568613395301,
					id: "-5251573983464732696",
					label: "BJ-BJ-WLKJC-MCE-2.MCN.NE40E-X16",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 786.5314521686098,
					y: 198.49015459977423,
					id: "-6696277708831662577",
					label: "BJ-BJ-WLKJC-MCE-1.MCN.NE40E-X16",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 419.691737524109,
					y: 663.474698028818,
					id: "-7241879535865106100",
					label: "163云",
					neType: "163"
				},
				{
					shape: "nodeStyle",
					x: 259.2553673933269,
					y: 178.9273842924291,
					id: "-5632352890870368844",
					label: "CN2云",
					neType: "CN2"
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 245.4222338518914,
					y: 376.59247494649253,
					id: "2933989865653711859",
					label: "NFV vIMS(RH2288)",
					neType: "VM"
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 419.3620244731738,
					y: 312.06747183568785,
					id: "-3572360678739797503",
					label: "SRV-EOR01",
					neType: "SRV"
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 279.1454600317378,
					y: 586.9361137123926,
					id: "-4420576647613457599",
					label: "SRV-EOR01",
					neType: "SRV"
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 786.1576573797396,
					y: 242.83198478480486,
					id: "-3716198034596573591",
					label: "SRV-EOR02",
					neType: "SRV"
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 1221.5150761808281,
					y: 513.2807721111201,
					id: "-4311876678426440141",
					label: "SRV-EOR02",
					neType: "SRV"
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 1267.8959946606874,
					y: 524.0689993864953,
					id: "8784038480339916906",
					label: "NFV vIMS(RH2288)",
					neType: "VM"
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 510.87902838106663,
					y: 680.3709794325672,
					id: "7783678799634628414",
					label: "SRV-EOR01",
					neType: "SRV"
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 594.4064912816447,
					y: 488.40828899050854,
					id: "-5872535295187736602",
					label: "SRV-EOR01",
					neType: "SRV"
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 1140.954461007961,
					y: 973.5473544741803,
					id: "6462173375031171282",
					label: "SRV-EOR02",
					neType: "SRV"
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 993.0128333105077,
					y: 60.09310116242159,
					id: "8708782183548932749",
					label: "SRV-EOR02",
					neType: "SRV"
				}
			],
			edges: [
				{
					endPoint: { anchorIndex: 5, x: 800.7106167513731, y: 418.12069983274046, index: 5 },
					shape: "runedge",
					startPoint: { anchorIndex: 10, x: 430.539448588855, y: 294.4604086206306, index: 10 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-1983672940887260532",
					controlPoints: [],
					target: "-8137881224353739309"
				},
				{
					endPoint: { anchorIndex: 8, x: 192.42511307742768, y: 296.82936746609363, index: 8 },
					shape: "runedge",
					startPoint: { anchorIndex: 7, x: 370.539448588855, y: 279.4604086206306, index: 7 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-1983672940887260532",
					controlPoints: [],
					target: "-5716953770206006381"
				},
				{
					endPoint: { anchorIndex: 7, x: 921.7855212400177, y: 299.3997171012678, index: 7 },
					shape: "runedge",
					startPoint: { anchorIndex: 8, x: 430.539448588855, y: 279.4604086206306, index: 8 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-1983672940887260532",
					controlPoints: [],
					target: "5260284526204451339"
				},
				{
					endPoint: { anchorIndex: 7, x: 921.7855212400177, y: 299.3997171012678, index: 7 },
					shape: "runedge",
					startPoint: { anchorIndex: 8, x: 192.42511307742768, y: 296.82936746609363, index: 8 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-5716953770206006381",
					controlPoints: [],
					target: "5260284526204451339"
				},
				{
					endPoint: { anchorIndex: 7, x: 800.7106167513731, y: 433.12069983274046, index: 7 },
					shape: "runedge",
					startPoint: { anchorIndex: 8, x: 192.42511307742768, y: 296.82936746609363, index: 8 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-5716953770206006381",
					controlPoints: [],
					target: "-8137881224353739309"
				},
				{
					endPoint: { anchorIndex: 11, x: 921.7855212400177, y: 329.3997171012678, index: 11 },
					shape: "runedge",
					startPoint: { anchorIndex: 4, x: 860.7106167513731, y: 403.12069983274046, index: 4 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-8137881224353739309",
					controlPoints: [],
					target: "5260284526204451339"
				},
				{
					endPoint: { anchorIndex: 9, x: 1018.2770460257304, y: 342.9212375012614, index: 9 },
					shape: "runedge",
					startPoint: { anchorIndex: 6, x: 860.7106167513731, y: 418.12069983274046, index: 6 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-8137881224353739309",
					controlPoints: [],
					target: "-289730075106336434"
				},
				{
					endPoint: { anchorIndex: 11, x: 1031.3104044986871, y: 285.5996076506251, index: 11 },
					shape: "runedge",
					startPoint: { anchorIndex: 4, x: 860.7106167513731, y: 403.12069983274046, index: 4 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-8137881224353739309",
					controlPoints: [],
					target: "6006376856756510153"
				},
				{
					endPoint: { anchorIndex: 5, x: 1382.5713007714114, y: 522.913509820039, index: 5 },
					shape: "runedge",
					startPoint: { anchorIndex: 10, x: 981.7855212400177, y: 314.3997171012678, index: 10 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "5260284526204451339",
					controlPoints: [],
					target: "-2187129574821275524"
				},
				{
					endPoint: { anchorIndex: 8, x: 672.2832731276987, y: 330.3783536611193, index: 8 },
					shape: "runedge",
					startPoint: { anchorIndex: 7, x: 921.7855212400177, y: 299.3997171012678, index: 7 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "5260284526204451339",
					controlPoints: [],
					target: "-1472186057366456851"
				},
				{
					endPoint: { anchorIndex: 7, x: 1031.3104044986871, y: 255.5996076506251, index: 7 },
					shape: "runedge",
					startPoint: { anchorIndex: 8, x: 430.539448588855, y: 279.4604086206306, index: 8 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-1983672940887260532",
					controlPoints: [],
					target: "6006376856756510153"
				},
				{
					endPoint: { anchorIndex: 5, x: 649.497767346551, y: 442.7568613395301, index: 5 },
					shape: "runedge",
					startPoint: { anchorIndex: 10, x: 430.539448588855, y: 294.4604086206306, index: 10 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-1983672940887260532",
					controlPoints: [],
					target: "-5251573983464732696"
				},
				{
					endPoint: { anchorIndex: 7, x: 612.2832731276987, y: 330.3783536611193, index: 7 },
					shape: "runedge",
					startPoint: { anchorIndex: 8, x: 192.42511307742768, y: 296.82936746609363, index: 8 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-5716953770206006381",
					controlPoints: [],
					target: "-1472186057366456851"
				},
				{
					endPoint: { anchorIndex: 7, x: 756.5314521686098, y: 198.49015459977423, index: 7 },
					shape: "runedge",
					startPoint: { anchorIndex: 8, x: 192.42511307742768, y: 296.82936746609363, index: 8 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-5716953770206006381",
					controlPoints: [],
					target: "-6696277708831662577"
				},
				{
					endPoint: { anchorIndex: 6, x: 449.691737524109, y: 648.474698028818, index: 6 },
					shape: "runedge",
					startPoint: { anchorIndex: 9, x: 800.7106167513731, y: 448.12069983274046, index: 9 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-8137881224353739309",
					controlPoints: [],
					target: "-7241879535865106100"
				},
				{
					endPoint: { anchorIndex: 6, x: 449.691737524109, y: 648.474698028818, index: 6 },
					shape: "runedge",
					startPoint: { anchorIndex: 9, x: 921.7855212400177, y: 314.3997171012678, index: 9 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "5260284526204451339",
					controlPoints: [],
					target: "-7241879535865106100"
				},
				{
					endPoint: { anchorIndex: 2, x: 419.691737524109, y: 633.474698028818, index: 2 },
					shape: "runedge",
					startPoint: { anchorIndex: 13, x: 400.539448588855, y: 309.4604086206306, index: 13 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-1983672940887260532",
					controlPoints: [],
					target: "-7241879535865106100"
				},
				{
					endPoint: { anchorIndex: 1, x: 404.691737524109, y: 633.474698028818, index: 1 },
					shape: "runedge",
					startPoint: { anchorIndex: 14, x: 177.42511307742768, y: 326.82936746609363, index: 14 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-5716953770206006381",
					controlPoints: [],
					target: "-7241879535865106100"
				},
				{
					endPoint: { anchorIndex: 10, x: 289.2553673933269, y: 193.9273842924291, index: 10 },
					shape: "runedge",
					startPoint: { anchorIndex: 5, x: 800.7106167513731, y: 418.12069983274046, index: 5 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-8137881224353739309",
					controlPoints: [],
					target: "-5632352890870368844"
				},
				{
					endPoint: { anchorIndex: 8, x: 289.2553673933269, y: 178.9273842924291, index: 8 },
					shape: "runedge",
					startPoint: { anchorIndex: 7, x: 921.7855212400177, y: 299.3997171012678, index: 7 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "5260284526204451339",
					controlPoints: [],
					target: "-5632352890870368844"
				},
				{
					endPoint: { anchorIndex: 10, x: 289.2553673933269, y: 193.9273842924291, index: 10 },
					shape: "runedge",
					startPoint: { anchorIndex: 5, x: 370.539448588855, y: 264.4604086206306, index: 5 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-1983672940887260532",
					controlPoints: [],
					target: "-5632352890870368844"
				},
				{
					endPoint: { anchorIndex: 11, x: 229.25536739332688, y: 208.9273842924291, index: 11 },
					shape: "runedge",
					startPoint: { anchorIndex: 4, x: 192.42511307742768, y: 266.82936746609363, index: 4 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-5716953770206006381",
					controlPoints: [],
					target: "-5632352890870368844"
				},
				{
					endPoint: { anchorIndex: 7, x: 399.3620244731738, y: 312.06747183568785, index: 7 },
					shape: "runedge",
					startPoint: { anchorIndex: 8, x: 265.4222338518914, y: 376.59247494649253, index: 8 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "2933989865653711859",
					controlPoints: [],
					target: "-3572360678739797503"
				},
				{
					endPoint: { anchorIndex: 7, x: 766.1576573797396, y: 242.83198478480483, index: 7 },
					shape: "runedge",
					startPoint: { anchorIndex: 8, x: 265.4222338518914, y: 376.59247494649253, index: 8 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "2933989865653711859",
					controlPoints: [],
					target: "-3716198034596573591"
				},
				{
					endPoint: { anchorIndex: 2, x: 279.1454600317378, y: 556.9361137123926, index: 2 },
					shape: "runedge",
					startPoint: { anchorIndex: 13, x: 245.4222338518914, y: 406.59247494649253, index: 13 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "2933989865653711859",
					controlPoints: [],
					target: "-4420576647613457599"
				},
				{
					endPoint: { anchorIndex: 7, x: 1201.5150761808281, y: 513.2807721111201, index: 7 },
					shape: "runedge",
					startPoint: { anchorIndex: 8, x: 265.4222338518914, y: 376.59247494649253, index: 8 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "2933989865653711859",
					controlPoints: [],
					target: "-4311876678426440141"
				},
				{
					endPoint: { anchorIndex: 7, x: 766.1576573797396, y: 242.83198478480483, index: 7 },
					shape: "runedge",
					startPoint: { anchorIndex: 8, x: 439.3620244731738, y: 312.06747183568785, index: 8 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-3572360678739797503",
					controlPoints: [],
					target: "-3716198034596573591"
				},
				{
					endPoint: { anchorIndex: 7, x: 1201.5150761808281, y: 513.2807721111201, index: 7 },
					shape: "runedge",
					startPoint: { anchorIndex: 8, x: 299.1454600317378, y: 586.9361137123926, index: 8 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-4420576647613457599",
					controlPoints: [],
					target: "-4311876678426440141"
				},
				{
					endPoint: { anchorIndex: 5, x: 800.7106167513731, y: 418.12069983274046, index: 5 },
					shape: "runedge",
					startPoint: { anchorIndex: 8, x: 439.3620244731738, y: 312.06747183568785, index: 8 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-3572360678739797503",
					controlPoints: [],
					target: "-8137881224353739309"
				},
				{
					endPoint: { anchorIndex: 5, x: 921.7855212400177, y: 284.3997171012678, index: 5 },
					shape: "runedge",
					startPoint: { anchorIndex: 8, x: 806.1576573797396, y: 242.83198478480483, index: 8 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-3716198034596573591",
					controlPoints: [],
					target: "5260284526204451339"
				},
				{
					endPoint: { anchorIndex: 9, x: 921.7855212400177, y: 314.3997171012678, index: 9 },
					shape: "runedge",
					startPoint: { anchorIndex: 6, x: 299.1454600317378, y: 571.9361137123926, index: 6 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-4420576647613457599",
					controlPoints: [],
					target: "5260284526204451339"
				},
				{
					endPoint: { anchorIndex: 15, x: 981.7855212400177, y: 329.3997171012678, index: 15 },
					shape: "runedge",
					startPoint: { anchorIndex: 5, x: 1201.5150761808281, y: 498.2807721111201, index: 5 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-4311876678426440141",
					controlPoints: [],
					target: "5260284526204451339"
				},
				{
					endPoint: { anchorIndex: 8, x: 530.8790283810666, y: 680.3709794325672, index: 8 },
					shape: "runedge",
					startPoint: { anchorIndex: 7, x: 1247.8959946606874, y: 524.0689993864953, index: 7 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "8784038480339916906",
					controlPoints: [],
					target: "7783678799634628414"
				},
				{
					endPoint: { anchorIndex: 8, x: 614.4064912816447, y: 488.4082889905085, index: 8 },
					shape: "runedge",
					startPoint: { anchorIndex: 7, x: 1247.8959946606874, y: 524.0689993864953, index: 7 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "8784038480339916906",
					controlPoints: [],
					target: "-5872535295187736602"
				},
				{
					endPoint: { anchorIndex: 15, x: 1013.0128333105077, y: 90.09310116242159, index: 15 },
					shape: "runedge",
					startPoint: { anchorIndex: 0, x: 1247.8959946606874, y: 494.0689993864953, index: 0 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "8784038480339916906",
					controlPoints: [],
					target: "8708782183548932749"
				},
				{
					endPoint: { anchorIndex: 5, x: 1120.954461007961, y: 958.5473544741803, index: 5 },
					shape: "runedge",
					startPoint: { anchorIndex: 10, x: 530.8790283810666, y: 695.3709794325672, index: 10 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "7783678799634628414",
					controlPoints: [],
					target: "6462173375031171282"
				},
				{
					endPoint: { anchorIndex: 9, x: 973.0128333105077, y: 75.09310116242159, index: 9 },
					shape: "runedge",
					startPoint: { anchorIndex: 6, x: 614.4064912816447, y: 473.40828899050854, index: 6 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-5872535295187736602",
					controlPoints: [],
					target: "8708782183548932749"
				},
				{
					endPoint: { anchorIndex: 14, x: 415.539448588855, y: 309.4604086206306, index: 14 },
					shape: "runedge",
					startPoint: { anchorIndex: 1, x: 500.87902838106663, y: 650.3709794325672, index: 1 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "7783678799634628414",
					controlPoints: [],
					target: "-1983672940887260532"
				},
				{
					endPoint: { anchorIndex: 10, x: 192.42511307742768, y: 311.82936746609363, index: 10 },
					shape: "runedge",
					startPoint: { anchorIndex: 5, x: 1120.954461007961, y: 958.5473544741803, index: 5 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "6462173375031171282",
					controlPoints: [],
					target: "-5716953770206006381"
				},
				{
					endPoint: { anchorIndex: 10, x: 192.42511307742768, y: 311.82936746609363, index: 10 },
					shape: "runedge",
					startPoint: { anchorIndex: 5, x: 574.4064912816447, y: 473.40828899050854, index: 5 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "-5872535295187736602",
					controlPoints: [],
					target: "-5716953770206006381"
				},
				{
					endPoint: { anchorIndex: 6, x: 192.42511307742768, y: 281.82936746609363, index: 6 },
					shape: "runedge",
					startPoint: { anchorIndex: 7, x: 973.0128333105077, y: 60.09310116242159, index: 7 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "8708782183548932749",
					controlPoints: [],
					target: "-5716953770206006381"
				},
				{
					endPoint: { anchorIndex: 6, x: 1160.954461007961, y: 958.5473544741803, index: 6 },
					shape: "runedge",
					startPoint: { anchorIndex: 10, x: 1287.8959946606874, y: 539.0689993864953, index: 10 },
					style: { offset: 0, lineDash: [], radius: 20, stroke: "#08BD09", lineWidth: 4 },
					source: "8784038480339916906",
					controlPoints: [{ x: 1589.4317881193624, y: 765.790854920135 }],
					target: "6462173375031171282"
				}
			],
			groups: []
		},
		nodeProperty: {
			label: "",
			id: "",
			x: "",
			y: ""
		}
	};

	componentDidMount() {}
	showControl = () => {
		this.topo.g6Api.controllPoint(true);
	};
	hideControl = () => {
		this.topo.g6Api.controllPoint(false);
	};
	onShowModal = () => {
		const nodes = this.topo.g6Api.getSelectsNode();
		const nodeProperty = this.state.nodeProperty;
		if (nodes && nodes.length > 0) {
			Object.assign(nodeProperty, nodes[0]);
			this.setState({
				showModal: true,
				nodeProperty
			});
		}
	};
	onHideModal = () => {
		this.setState({
			showModal: false
		});
	};
	onChangeNodeProperty = ()=>{
		let obj = {
		}
		Object.assign(obj,this.state.nodeProperty);
		this.topo.g6Api.updateNodeById(this.state.nodeProperty.id,obj);
	}
	changeNodeProperty = (key, evt) => {
		const { value } = evt.target;
		const nodeProperty = this.state.nodeProperty;
		nodeProperty[key] = value;
		this.setState({
			nodeProperty
		});
	};
	changeNodeProperty1 = (key, evt) => {
		const nodeProperty = this.state.nodeProperty;
		nodeProperty[key] = evt;
		this.setState({
			nodeProperty
		});
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
						<Radio.Button value="default" onClick={this.hideControl}>
							保存
						</Radio.Button>
						<Radio.Button value="showmodal" onClick={this.onShowModal}>
							修改节点
						</Radio.Button>
					</Radio.Group>
				</div>
				<Modal
					title="节点属性修改"
					visible={this.state.showModal}
					onCancel={this.onHideModal}
					onOk={this.onChangeNodeProperty}
					okText="保存"
					cancelText="取消"
				>
					<Row>
						<Col span={8}>节点id:</Col>
						<Col span={16}>
							<Input value={this.state.nodeProperty.id} disabled></Input>
						</Col>
					</Row>
					<Row>
						<Col span={8}>节点名称:</Col>
						<Col span={16}>
							<Input
								value={this.state.nodeProperty.label}
								onChange={this.changeNodeProperty.bind(this, "label")}
							></Input>
						</Col>
					</Row>
					<Row>
						<Col span={8}>节点x坐标:</Col>
						<Col span={16}>
							<InputNumber
								style={{ width: "10rem" }}
								value={this.state.nodeProperty.x}
								onChange={this.changeNodeProperty1.bind(this, "x")}
							></InputNumber>
						</Col>
					</Row>
					<Row>
						<Col span={8}>节点y坐标:</Col>
						<Col span={16}>
							<InputNumber
								style={{ width: "10rem" }}
								value={this.state.nodeProperty.y}
								onChange={this.changeNodeProperty1.bind(this, "y")}
							></InputNumber>
						</Col>
					</Row>
				</Modal>
			</div>
		);
	}
}
