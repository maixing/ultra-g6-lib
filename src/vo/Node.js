/**
* 
* Created by maixing on 2019/08/12 14:37:21
* 节点实体类
*/
class Node {
	constructor() {}
	/**
	 * 节点唯一id
	 */
	id = null;
	/**
	 * 节点名称
	 */
	label = null;
	/**
	 * 网元id
	 */
	neId = null;
	/**
	 * 网元名称
	 */
	neName = null;
	/**
	 * 网元类型
	 */
	neType = null;
	/**
	 * 是否下载
	 */
	drill = null;
	/**
	 * 节点图片路径
	 */
	img = null;
	/**
	 * 节点宽度
	 */
	w = null;
	/**
	 * 节点高度
	 */
	h = null;
	/**
	 * 节点x坐标
	 */
	x = null;
	/**
	 * 节点y坐标
	 */
	y = null;
	/**
	 * 节点当前告警
	 */
	alarm = null;
	/**
	 * 分组id
	 */
	groupId = null;
	/**
	 * 分组名称
	 */
    groupName = null;
    /**
     * 图形类型
     */
	shape = null;
	/**
	 * 是否选中状态
	 */
	selected = null;
	/**
	 * 其他信息
	 */
	infor = null;
}
export default Node;
