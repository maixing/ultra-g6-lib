/**
 * Created by maixing on 2020/01/07 15:12:57
 * 缓存工具
 */
class CacheUtil {
	NODE = "node_";
	EDGE = "edge_";
	CONTROLL = "controll_"
	CONTROLL_PRE = "&&";
	cacheMap = new Map();
	put = (key, value) => {
		this.cacheMap.set(key, value);
	};
	get = key => {
		this.cacheMap.get(key);
	};
	remove = key => {
		this.cacheMap.delete(key);
	};
	removeAll = () => {
		this.cacheMap.clear();
	};
}
export default new CacheUtil();
