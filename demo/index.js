import React from "react";
import { render } from "react-dom";
import TopoLib from "../dist/g6lib.min";

render(<TopoLib.TopoView />, document.getElementById("app"));

if (module.hot) {
	module.hot.accept();
}
