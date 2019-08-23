/**
 *
 * Created by maixing on 2019/08/14 17:23:13
 * 工具栏事件处理
 */
import BaseUtil from "@/util/BaseUtil";
class ToolbarUtil extends BaseUtil{
	constructor() {
		super();
	}
	onDrag = (item)=>{
		this.graph.setMode(item.model);
		this.graph.refresh();
	}
	onEdit = (item)=>{
		this.graph.setMode(item.model);
		this.graph.refresh();
	}
	onSelect = (item)=>{
		this.graph.setMode(item.model);
		this.graph.refresh();
	}
	onZoomin = (item)=>{
		if(this.graph){
			const zoom = this.graph.getZoom()
			this.graph.zoomTo(zoom+0.5);
		}
	}
	onZoomout = (item)=>{
		if(this.graph){
			const zoom = this.graph.getZoom()
			this.graph.zoomTo(zoom-0.5);
		}
	}
	onCancel = (item)=>{
		
	}
}
export default ToolbarUtil;
