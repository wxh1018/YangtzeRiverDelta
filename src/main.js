// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import basecoms from './components/base'
import base from './utils'
import CsjMap from './utils/registCsjMap'

Vue.use(basecoms)
Vue.use(base)
Vue.use(CsjMap)
Vue.prototype.ifurl = 'http://120.27.227.253:3002/Home/'

Vue.config.productionTip = false
Vue.use(Element)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
