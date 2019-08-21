/**
 *
 * Created by maixing on 2019/08/14 17:23:13
 *
 */
import BaseUtil from "@/util/BaseUtil";
import modelConsts from "@/consts/ModelConsts";

class ToolbarUtil extends BaseUtil{
	constructor() {
		super();
	}
	graphModel = modelConsts.CANVAS_MULTI_MODEL;

	changeGlobalModel = type => {};
}
export default ToolbarUtil;
