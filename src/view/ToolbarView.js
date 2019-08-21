/**
 *
 * Created by maixing on 2019/08/21 14:59:06
 *
 */

import React from "react";

export default class ToolbarView extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {}
	render() {
		return (
			<div className="toolbar-wrap">
				<img className="toolbaricon" src="./assets/drag.svg" />
				<img className="toolbaricon" src="./assets/edit.svg" />
				<img className="toolbaricon" src="./assets/select.svg" />
				<img className="toolbaricon" src="./assets/zoomin.svg" />
				<img className="toolbaricon" src="./assets/zoomout.svg" />
			</div>
		);
	}
}
