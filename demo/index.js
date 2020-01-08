import React from "react";
import { render } from "react-dom";
import Demo from './Demo';
import "antd/dist/antd.min.css";

render(<Demo></Demo>, document.getElementById("app"));

if (module.hot) {
	module.hot.accept();
}
