import send from './send'

import base from './base'

import echarts from './echarts'

function install(Vue) {
    Vue.prototype.$em = send
    Vue.prototype.base = base
    Vue.prototype.$setEch = echarts
}
export default install