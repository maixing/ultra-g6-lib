/**
 *
 * Created by maixing on 2019/08/13 15:42:08
 * 事件类型
 */

export const GRAPH_MOUSE_REACT_EVENTS = {
	click: "Click",
	contextmenu: "ContextMenu",
	dblclick: "DoubleClick",
	drag: "Drag",
	dragend: "DragEnd",
	dragenter: "DragEnter",
	dragleave: "DragLeave",
	dragstart: "DragStart",
	drop: "Drop",
	mousedown: "MouseDown",
	mouseenter: "MouseEnter",
	mouseleave: "MouseLeave",
	mouseover: "MouseMover",
	mouseup: "MouseUp",
	mouseout: "MouseOut"
};

export const ITEM_REACT_EVENTS = {
	beforeadditem: "onBeforeadditem",
	afteradditem: "onAfteradditem",
	beforeremoveitem: "onBeforeremoveitem",
	afterremoveitem: "onAfterremoveitem",
	beforeupdateitem: "onBeforeupdateitem",
	afterupdateitem: "onAfterupdateitem",
	beforeitemvisibilitychange: "onBeforeitemvisibilitychange",
	afteritemvisibilitychange: "onAfteritemvisibilitychange",
	beforeitemstatechange: "onBeforeitemstatechange",
	afteritemstatechange: "onAfteritemstatechange",
	beforeitemrefresh: "onBeforeitemrefresh",
	afteritemrefresh: "onAfteritemrefresh",
	beforeitemstatesclear: "onBeforeitemstatesclear",
	afteritemstatesclear: "onAfteritemstatesclear"
};

export const GRAPH_MOUSE_EVENTS = Object.keys(GRAPH_MOUSE_REACT_EVENTS);
export const ITEM_EVENTS = Object.keys(ITEM_REACT_EVENTS);
