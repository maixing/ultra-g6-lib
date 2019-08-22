/**
 *
 * Created by maixing on 2019/08/14 17:23:13
 *
 */
import BaseUtil from "@/util/BaseUtil";
class ToolbarUtil extends BaseUtil{
	constructor() {
		super();
	}
	onDrag = (item)=>{
		console.log('onDrag---->>%o',this.graph);
	}
	onEdit = (item)=>{
		
	}
	onSelect = (item)=>{
		
	}
	onZoomin = (item)=>{
		console.log('onZoomin---->>%o',item);
		if(this.graph){
			const zoom = this.graph.getZoom()
			this.graph.zoomTo(zoom+0.5);
		}
	}
	onZoomout = (item)=>{
		console.log('onZoomout---->>%o',item);
		if(this.graph){
			const zoom = this.graph.getZoom()
			this.graph.zoomTo(zoom-0.5);
		}
	}
	onCancel = (item)=>{
		
	}
}
export default ToolbarUtil;
