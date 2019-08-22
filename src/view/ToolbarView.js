/**
 *
 * Created by maixing on 2019/08/21 14:59:06
 *
 */

import React from "react";

export default class ToolbarView extends React.Component {
	constructor(props) {
		super(props);
		this.icons = [
			{
				name: "拖动",
				icon: "drag",
				eventType: "Drag",
				index: 1
			},
			{
				name: "编辑",
				icon: "edit",
				eventType: "Edit",
				index: 2
			},
			{
				name: "选择",
				icon: "select",
				eventType: "Select",
				index: 3
			},
			{
				name: "放大",
				icon: "zoomin",
				eventType: "Zoomin",
				index: 4
			},
			{
				name: "缩小",
				icon: "zoomout",
				eventType: "Zoomout",
				index: 5
			},
			{
				name: "取消",
				icon: "cancel",
				eventType: "Cancel",
				index: 6
			}
		];
	}
	state = {
		currentIndex: -1
	};
	toolbar = null;
	componentDidMount() {}
	onIconClick = (item, evt) => {
		let currentIndex = -1;
		if (item.index != this.state.currentIndex) {
			currentIndex = item.index;
		}
		currentIndex = item.index;
		this.setState({
			currentIndex
		});
		if (this.toolbar) {
			this.toolbar[`on${item.eventType}`](item);
		}
	};
	render() {
		return (
			<div className="toolbar-wrap">
				{this.icons.map((item, index) => {
					return (
						<span
							className={`toolbaricon ${
								this.state.currentIndex == item.index ? "toolbaricon-select" : "toolbaricon-unselect"
							}`}
							onClick={this.onIconClick.bind(this, item)}
						>
							<span className={`icon ${item.icon}`} title={item.name} />
						</span>
					);
				})}
			</div>
		);
	}
}
