import echarts from 'echarts'
import 'echarts/map/js/china'
import 'echarts/map/js/province/jiangsu'
import 'echarts/map/js/world'
import jsmap from "echarts/map/json/province/jiangsu";
import ahmap from "echarts/map/json/province/anhui";
import zj from "echarts/map/json/province/zhejiang";
import sh from "echarts/map/json/province/shanghai";
const csjmapfea = [
    ...jsmap.features,
    ...ahmap.features,
    ...zj.features,
    ...sh.features,
];
var csjmap = {
    UTF8Encoding: true,
    features: csjmapfea,
    type: "FeatureCollection",
};
export default {
    install(Vue) {
        echarts.registerMap("csjmap", csjmap);
        console.log(echarts);
        Vue.prototype.$echarts = echarts
    }
}
