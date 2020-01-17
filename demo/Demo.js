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
					x: 53.328606623434666,
					y: 15.035384448022342,
					id: "yizhuang",
					label: "",
					neType: "yizhuang",
					selected: false
				},
				{
					shape: "nodeStyle",
					w: 796,
					h: 455,
					x: 1172.525265758358,
					y: 688.7054092662202,
					id: "yangqiao",
					label: "",
					neType: "yangqiao",
					selected: false
				},
				{
					shape: "nodeStyle",
					w: 554,
					h: 335,
					x: 141.9351909845384,
					y: 640.0807716790157,
					id: "dongsi",
					label: "",
					neType: "dongsi",
					selected: false
				},
				{
					shape: "nodeStyle",
					w: 554,
					h: 335,
					x: 1180.3969451200433,
					y: 81.3959721647976,
					id: "changping",
					label: "",
					neType: "changping",
					selected: false
				},
				{
					shape: "nodeStyle",
					w: 804,
					h: 459,
					x: 654.9048977518237,
					y: 393.2525053263217,
					id: "center",
					label: "",
					neType: "center",
					selected: false
				},
				{
					shape: "nodeStyle",
					w: 325,
					h: 175,
					x: -45.08879976698233,
					y: -71.24985389315626,
					id: "bd1",
					label: "",
					neType: "bd",
					selected: false
				},
				{
					shape: "nodeStyle",
					w: 325,
					h: 175,
					x: 1263.8461515258123,
					y: 729.0301636134657,
					id: "bd2",
					label: "",
					neType: "bd",
					selected: false
				},
				{
					shape: "nodeStyle",
					x: 899.3738963921883,
					y: 361.67522051785744,
					id: "-1983672940887260532",
					label: "BJ-BJ-YQ-CE-5.VoLTE",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 633.4857205509641,
					y: 513.8996123446335,
					id: "-5716953770206006381",
					label: "BJ-BJ-YQ-CE-6.VoLTE",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 681.1902494373594,
					y: 254.04545304712283,
					id: "-8137881224353739309",
					label: "BJ-BJ-YZHYH-CE-1.VoLTE",
					neType: "ROUTER",
					selected: false
				},
				{
					shape: "nodeStyle",
					x: 414.0419938605236,
					y: 406.7496507161325,
					id: "5260284526204451339",
					label: "BJ-BJ-YZHYH-CE-2.VoLTE",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 238.1702559876967,
					y: 688.001920469519,
					id: "-289730075106336434",
					label: "BJ-BJ-DS-MCE-1.MCN.NE40E-X16",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 294.3565001083964,
					y: 34.47096118201682,
					id: "6006376856756510153",
					label: "BJ-BJ-YZHYH-MCE-1.MCN.NE40E-X16",
					neType: "ROUTER",
					selected: false
				},
				{
					shape: "nodeStyle",
					x: 60.25765018554807,
					y: 573.6484038880542,
					id: "-2187129574821275524",
					label: "BJ-BJ-DS-MCE-2.MCN.NE40E-X16",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 90.01810178111748,
					y: 148.06602459655744,
					id: "-1472186057366456851",
					label: "BJ-BJ-YZHYH-MCE-2.MCN.NE40E-X16",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 1251.6112705268106,
					y: 151.90758588346011,
					id: "-5251573983464732696",
					label: "BJ-BJ-WLKJC-MCE-2.MCN.NE40E-X16",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 1047.6125894680142,
					y: 34.96390429215705,
					id: "-6696277708831662577",
					label: "BJ-BJ-WLKJC-MCE-1.MCN.NE40E-X16",
					neType: "ROUTER"
				},
				{
					shape: "nodeStyle",
					x: 724.8951254855115,
					y: 346.5421697749718,
					id: "-7241879535865106100",
					label: "163云",
					neType: "163",
					selected: false
				},
				{
					shape: "nodeStyle",
					x: 612.3553211780253,
					y: 413.0652415788214,
					id: "-5632352890870368844",
					label: "CN2云",
					neType: "CN2"
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: -62.35680581514873,
					y: -71.68616601719819,
					id: "2933989865653711859",
					label: "NFV vIMS(RH2288)",
					neType: "VM"
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 209.3892290834491,
					y: -72.93177541100584,
					id: "-3572360678739797503",
					label: "SRV-EOR01",
					neType: "SRV",
					selected: false
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: -80.97234228447883,
					y: 112.85809569029101,
					id: "-4420576647613457599",
					label: "MGNT-EOR01",
					neType: "SRV",
					selected: false
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 116.81677621539154,
					y: -10.193841387965378,
					id: "-3716198034596573591",
					label: "SRV-EOR02",
					neType: "SRV",
					selected: false
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 20.748222139618406,
					y: 47.80590536965914,
					id: "-4311876678426440141",
					label: "MGNT-EOR02",
					neType: "SRV",
					selected: false
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 1262.2492373386997,
					y: 729.5466463921824,
					id: "8784038480339916906",
					label: "NFV vIMS(RH2288)",
					neType: "VM"
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 1274.8044318226018,
					y: 559.3672656618386,
					id: "7783678799634628414",
					label: "SRV-EOR01",
					neType: "SRV",
					selected: false
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 986.5746552773222,
					y: 743.9889176994002,
					id: "-5872535295187736602",
					label: "MGNT-EOR01",
					neType: "SRV",
					selected: false
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 1170.7702004879368,
					y: 622.6053238074747,
					id: "6462173375031171282",
					label: "SRV-EOR02",
					neType: "SRV"
				},
				{
					shape: "nodeStyle",
					w: 40,
					x: 1070.7651903819133,
					y: 689.010569810685,
					id: "8708782183548932749",
					label: "MGNT-EOR02",
					neType: "SRV",
					selected: false
				}
			],
			edges: [
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-3572360678739797503",
					controlPoints: [],
					target: "-3716198034596573591"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-4420576647613457599",
					controlPoints: [],
					target: "-4311876678426440141"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "7783678799634628414",
					controlPoints: [],
					target: "6462173375031171282"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-5872535295187736602",
					controlPoints: [],
					target: "8708782183548932749"
				},
				{
					shape: "runedge",
					realNodeId: "7783678799634628414&&-1983672940887260532",
					style: { offset: 0, radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "7783678799634628414",
					target: "-1983672940887260532"
				},
				{
					shape: "runedge",
					realNodeId: "-5716953770206006381&&5260284526204451339",
					style: { offset: 0, radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-5716953770206006381",
					selected: false,
					target: "5260284526204451339"
				},
				{
					shape: "runedge",
					realNodeId: "-1983672940887260532&&-8137881224353739309",
					style: { offset: 0, radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-1983672940887260532",
					target: "-8137881224353739309"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-8137881224353739309",
					controlPoints: [
						{ x: 589.7576842692757, y: 200.9140961250635 },
						{ x: 192.1437047513255, y: 417.81321962135786 },
						{ x: 399.5631334478496, y: 534.3700501908565 },
						{ x: 304.2581061794196, y: 596.8687875122317 },
						{ x: 352.25824913354404, y: 622.5792303069159 }
					],
					target: "-289730075106336434"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-1983672940887260532",
					controlPoints: [
						{ x: 918.5859267231142, y: 324.55565841212615 },
						{ x: 1009.5189511665905, y: 272.4311778104508 },
						{ x: 425.7128719721526, y: -35.76333696447432 }
					],
					target: "6006376856756510153"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-5716953770206006381",
					controlPoints: [
						{ x: 588.3803544454069, y: 513.2845596612419 },
						{ x: 456.38021153113334, y: 596.4761709976531 },
						{ x: -104.1826215579841, y: 290.206492053625 },
						{ x: 78.03913532966419, y: 187.56512528909892 }
					],
					target: "-1472186057366456851"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-5872535295187736602",
					controlPoints: [
						{ x: 849.8543645322688, y: 661.9255450735569 },
						{ x: 730.8115268666361, y: 731.4705331775368 },
						{ x: 484.1831926121715, y: 606.3677364821436 }
					],
					target: "-5716953770206006381"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "8708782183548932749",
					controlPoints: [
						{ x: 903.1788883260094, y: 601.0158630068851 },
						{ x: 729.6368373169513, y: 702.3334843852554 },
						{ x: 528.0961413229544, y: 602.6652185552211 },
						{ x: 610.174521962185, y: 550.5268238784042 }
					],
					target: "-5716953770206006381"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "6462173375031171282",
					controlPoints: [
						{ x: 995.4373268202135, y: 519.0809498498404 },
						{ x: 729.8859210357857, y: 672.9523055695291 },
						{ x: 572.5306553178573, y: 596.2947355533195 },
						{ x: 646.0092484649632, y: 550.58392675487 }
					],
					target: "-5716953770206006381"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-5716953770206006381",
					controlPoints: [
						{ x: 669.339901151935, y: 515.853714261675 },
						{ x: 766.0422144074616, y: 555.9738478717082 },
						{ x: 1085.9755031169163, y: 369.9790612987205 },
						{ x: 769.163190430273, y: 205.26444176951594 }
					],
					target: "-8137881224353739309"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-5716953770206006381",
					controlPoints: [
						{ x: 698.5296753103609, y: 545.9034423645518 },
						{ x: 619.1409548452006, y: 592.6276218053209 },
						{ x: 732.0670640962089, y: 644.9204106339998 },
						{ x: 1221.076608323695, y: 359.60468835593065 },
						{ x: 904.7791611950629, y: 189.1260324051575 },
						{ x: 1024.396545907264, y: 125.41677315626794 },
						{ x: 951.410877789637, y: 90.0152194236438 }
					],
					target: "-6696277708831662577"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-1983672940887260532",
					controlPoints: [
						{ x: 886.5230223513543, y: 319.3441676476763 },
						{ x: 964.6448629468438, y: 274.6205919137565 },
						{ x: 653.8599311556932, y: 110.4161879395463 },
						{ x: 297.84626808787164, y: 299.551232313313 },
						{ x: 413.52907214577215, y: 362.3794806057352 }
					],
					target: "5260284526204451339"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-3716198034596573591",
					controlPoints: [
						{ x: 360.95326269942507, y: 135.7646989162302 },
						{ x: 152.0696371514631, y: 252.9697568618741 },
						{ x: 384.9230568214385, y: 377.7691844413816 }
					],
					target: "5260284526204451339"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-4311876678426440141",
					controlPoints: [
						{ x: 237.16665246142253, y: 182.23330888941138 },
						{ x: 104.53932782670245, y: 252.75796949616563 },
						{ x: 373.5053863980227, y: 398.71980510558853 }
					],
					target: "5260284526204451339"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "5260284526204451339",
					controlPoints: [
						{ x: 383.3690076511884, y: 413.3987369300894 },
						{ x: 228.6169078133197, y: 501.4431770979728 },
						{ x: -153.45699111511738, y: 289.48985742932325 }
					],
					target: "-1472186057366456851"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-4420576647613457599",
					controlPoints: [
						{ x: 3.1220955342211596, y: 165.9661318518143 },
						{ x: -205.5497670833984, y: 288.8528815307003 },
						{ x: 227.77949621238918, y: 530.1156953829817 },
						{ x: 396.5792183214378, y: 438.6968782352836 }
					],
					target: "5260284526204451339"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "5260284526204451339",
					controlPoints: [
						{ x: 430.5822851831774, y: 444.7151661548844 },
						{ x: 222.3537067342387, y: 558.8001477695916 },
						{ x: 166.5482067674178, y: 524.8145581876518 }
					],
					target: "-2187129574821275524"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-8137881224353739309",
					controlPoints: [
						{ x: 740.339200503377, y: 187.49721852941067 },
						{ x: 493.99123864989957, y: 52.52529512069144 },
						{ x: 406.20458895335537, y: 97.60765862820611 }
					],
					target: "6006376856756510153"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "5260284526204451339",
					controlPoints: [
						{ x: 455.27878401841616, y: 399.86945167706625 },
						{ x: 546.8640924588747, y: 445.13211119618 }
					],
					target: "-5632352890870368844"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-5716953770206006381",
					controlPoints: [
						{ x: 628.8297575044554, y: 480.90880620983984 },
						{ x: 571.7369827117215, y: 452.90442227136026 }
					],
					target: "-5632352890870368844"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-8137881224353739309",
					controlPoints: [
						{ x: 727.4746104345352, y: 291.45938579705347 },
						{ x: 752.7546721771445, y: 306.21086254926024 }
					],
					target: "-7241879535865106100"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-1983672940887260532",
					controlPoints: [
						{ x: 838.2232183257169, y: 355.4810350148143 },
						{ x: 776.0120108568993, y: 322.94326868369745 }
					],
					target: "-7241879535865106100"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "5260284526204451339",
					controlPoints: [
						{ x: 450.79289098938824, y: 398.7349771748049 },
						{ x: 643.3588985224823, y: 301.37479583387636 },
						{ x: 707.3495069742698, y: 336.5781436536006 }
					],
					target: "-7241879535865106100"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-8137881224353739309",
					controlPoints: [
						{ x: 699.772942547, y: 292.3539663682215 },
						{ x: 536.1274264303098, y: 378.3419055612736 }
					],
					target: "-5632352890870368844"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-8137881224353739309",
					controlPoints: [
						{ x: 640.5003581644288, y: 261.0982954317944 },
						{ x: 432.0256479974465, y: 370.54245903408935 }
					],
					target: "5260284526204451339"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-1983672940887260532",
					controlPoints: [
						{ x: 850.110422442138, y: 367.46050879045333 },
						{ x: 679.9341693864646, y: 448.56917843765365 }
					],
					target: "-5632352890870368844"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-1983672940887260532",
					controlPoints: [
						{ x: 888.0040249663771, y: 397.2170957286539 },
						{ x: 675.5564648886962, y: 510.69122098341444 }
					],
					target: "-5716953770206006381"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-5716953770206006381",
					controlPoints: [
						{ x: 680.3667231279065, y: 472.7765748881917 },
						{ x: 716.5271323895104, y: 453.72569671447025 },
						{ x: 823.4799047113191, y: 397.2221800610045 }
					],
					target: "-7241879535865106100"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "2933989865653711859",
					controlPoints: [{ x: -242.3795675508726, y: 26.0339603749251 }],
					target: "-4420576647613457599"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "2933989865653711859",
					controlPoints: [{ x: 77.48175174872404, y: -149.91650158471876 }],
					target: "-3572360678739797503"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "2933989865653711859",
					controlPoints: [
						{ x: -53.231840663743014, y: -60.211110307979226 },
						{ x: 2.69163739746989, y: -24.350564296572855 },
						{ x: -51.081979278598226, y: 3.816347154660093 }
					],
					target: "-4311876678426440141"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "2933989865653711859",
					controlPoints: [
						{ x: -38.69862011530722, y: -71.58912147414753 },
						{ x: 16.015410194442552, y: -35.4175154377905 },
						{ x: 47.080212975240954, y: -54.57802637673215 }
					],
					target: "-3716198034596573591"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "8784038480339916906",
					controlPoints: [{ x: 1423.089648061981, y: 643.0761694900184 }],
					target: "7783678799634628414"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "8784038480339916906",
					controlPoints: [{ x: 1109.7839841456628, y: 820.4170989883273 }],
					target: "-5872535295187736602"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "8784038480339916906",
					controlPoints: [
						{ x: 1219.964057418949, y: 741.2445844025433 },
						{ x: 1167.362032839227, y: 706.7612925818955 },
						{ x: 1131.28035752254, y: 730.3240514382675 }
					],
					target: "8708782183548932749"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "8784038480339916906",
					controlPoints: [
						{ x: 1197.3839589663762, y: 685.1479526802697 },
						{ x: 1239.670613959625, y: 665.4407745864338 }
					],
					target: "6462173375031171282"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-3572360678739797503",
					controlPoints: [
						{ x: 647.6378750091723, y: 167.37899946002975 },
						{ x: 696.5069327668688, y: 195.77826302533455 }
					],
					target: "-8137881224353739309"
				},
				{
					shape: "runedge",
					style: { offset: 0, lineDash: [], radius: 0.5, stroke: "#08BD09", lineWidth: 4 },
					source: "-1983672940887260532",
					controlPoints: [
						{ x: 1039.2183634583498, y: 283.79917617962747 },
						{ x: 1081.2144689059749, y: 256.3679548048212 },
						{ x: 1026.334310270648, y: 222.68989476950773 },
						{ x: 1101.2565507870531, y: 174.61981322055343 },
						{ x: 1162.2812165828602, y: 208.22458688284473 }
					],
					target: "-5251573983464732696"
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
	onChangeNodeProperty = () => {
		let obj = {};
		Object.assign(obj, this.state.nodeProperty);
		this.topo.g6Api.updateNodeById(this.state.nodeProperty.id, obj);
	};
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
