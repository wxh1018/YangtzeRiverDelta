import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import LeftList from './LeftList'
import getAllcitys from './allcity_lnglat'

const store = new Vuex.Store({
  state: {
    title: '长三角区域交通一体化大数据平台',
    topActive: '1',
    options: [
      {
        value: "长三角",
        label: "长三角"
      },
      {
        value: "江苏省",
        label: "江苏省"
      },
      {
        value: "安徽省",
        label: "安徽省"
      },
      {
        value: "浙江省",
        label: "浙江省"
      },
      {
        value: "上海",
        label: "上海市"
      },
      {
        value: "江苏",
        label: "江苏",
        children: [
          { value: "南京市", label: "南京市", },
          { value: "无锡市", label: "无锡市", children: [{ value: "进口", label: "进口" }, { value: "出口", label: "出口" }] },
          { value: "徐州市", label: "徐州市", children: [{ value: "进口", label: "进口" }, { value: "出口", label: "出口" }] },
          { value: "常州市", label: "常州市", children: [{ value: "进口", label: "进口" }, { value: "出口", label: "出口" }] },
          { value: "苏州市", label: "苏州市", children: [{ value: "进口", label: "进口" }, { value: "出口", label: "出口" }] },
          { value: "南通市", label: "南通市", children: [{ value: "进口", label: "进口" }, { value: "出口", label: "出口" }] },
          { value: "连云港市", label: "连云港市", children: [{ value: "进口", label: "进口" }, { value: "出口", label: "出口" }] },
          { value: "淮安市", label: "淮安市", children: [{ value: "进口", label: "进口" }, { value: "出口", label: "出口" }] },
          { value: "盐城市", label: "盐城市", children: [{ value: "进口", label: "进口" }, { value: "出口", label: "出口" }] },
          { value: "扬州市", label: "扬州市", children: [{ value: "进口", label: "进口" }, { value: "出口", label: "出口" }] },
          { value: "镇江市", label: "镇江市", children: [{ value: "进口", label: "进口" }, { value: "出口", label: "出口" }] },
          { value: "泰州市", label: "泰州市", children: [{ value: "进口", label: "进口" }, { value: "出口", label: "出口" }] },
          { value: "宿迁市", label: "宿迁市", children: [{ value: "进口", label: "进口" }, { value: "出口", label: "出口" }] }
        ]
      },
      {
        value: "安徽",
        label: "安徽",
        children: [
          { value: "合肥市", label: "合肥市" },
          { value: "芜湖市", label: "芜湖市" },
          { value: "蚌埠市", label: "蚌埠市" },
          { value: "淮南市", label: "淮南市" },
          { value: "马鞍山市", label: "马鞍山市" },
          { value: "淮北市", label: "淮北市" },
          { value: "铜陵市", label: "铜陵市" },
          { value: "安庆市", label: "安庆市" },
          { value: "黄山市", label: "黄山市" },
          { value: "滁州市", label: "滁州市" },
          { value: "阜阳市", label: "阜阳市" },
          { value: "宿州市", label: "宿州市" },
          { value: "六安市", label: "六安市" },
          { value: "州市", label: "州市" },
          { value: "池州市", label: "池州市" },
          { value: "宣城市", label: "宣城市" }
        ]
      },
      {
        value: "浙江",
        label: "浙江",
        children: [
          { value: "杭州市", label: "杭州市" },
          { value: "宁波市", label: "宁波市" },
          { value: "温州市", label: "温州市" },
          { value: "嘉兴市", label: "嘉兴市" },
          { value: "湖州市", label: "湖州市" },
          { value: "绍兴市", label: "绍兴市" },
          { value: "金华市", label: "金华市" },
          { value: "衢州市", label: "衢州市" },
          { value: "舟山市", label: "舟山市" },
          { value: "台州市", label: "台州市" },
          { value: "丽水市", label: "丽水市" }
        ]
      }
    ],
  },
  mutations: {
    setTopActive(state, v) {
      state.topActive = v
    }
  },
  modules: {
    LeftList,
    getAllcitys
  }
})

export default store