import React from "react";
import { render } from "react-dom";
import Demo from './Demo';

render(<Demo></Demo>, document.getElementById("app"));

if (module.hot) {
	module.hot.accept();
}
