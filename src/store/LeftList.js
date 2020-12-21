import highway from "./leftmenu/highway"
import zh from "./leftmenu/zh"

var totallist = {
  state: {
    list1: [
      {//综合分析
        key: 1,
        list: zh,
      },
      {//公路分析
        key: 2,
        list: highway
      },
      {//铁路分析模块
        key: 3,
        list: [
          {
            name: "基础设施",
            router: "/ArcGis",
            gis: 'New_Railway_Overview',
            icon: "icon-tielu2",
            list: [
              {
                name: '现状', icon: 'icon-xianzhuang', router: '/123',
                list2: [
                  { name: "火车站", router: "/ArcGis", icon: "icon-huochezhan", gis: 'New_Node_TrainStation' },
                  {
                    name: "铁路网", router: "/ArcGis",
                    gis: 'New_Wire_Railway', icon: "icon-tielu2"
                  },
                ]
              },
              {
                name: '规划', icon: 'icon-guihua',
                list2: [
                  {
                    name: "铁路网", router: "/ArcGis",
                    gis: 'New_Wire_RailwayByGuiHua', icon: "el-icon-setting"
                  },
                ]
              },
            ]
          },
          // {
          //   name: "客货出行", router: "", icon: "", list: [
          //     { name: "线路流量", router: "", icon: "" },
          //     { name: "线路饱和度图", router: "", icon: "" },
          //   ]
          // },
          {
            name: "客运出行", router: "", icon: "el-icon-user",
            list: [
              // { name: "线路流量", router: "", icon: "el-icon-user" },
              { name: "客流OD", router: "/railway/person/customer", icon: "el-icon-user" },
            ]
          },
          {
            name: "货运出行", router: "", icon: "el-icon-goods",
            list: [
              // { name: "线路流量", router: "", icon: "el-icon-goods" },
              { name: "货重OD", router: "/railway/goodsod", icon: "el-icon-goods" },
              { name: "货类OD", router: "/railway/goodsod/kind", icon: "el-icon-goods" },
            ]
          },
          { name: "通达分析", router: "/Comprehensive/Mastery/byrailway", icon: "el-icon-setting" },
          { name: "联系强度", router: "/railway/classline", icon: "icon-cunzhentongdafangxiangzhuanti" },
          {
            name: '报告', router: '', icon: 'icon-guihu',
            list: [
              { name: "城市铁路联系时间", router: "/railway/report", icon: "el-icon-mobile-user" },
            ]
          }
        ]
      },
      {//水运分析模块
        key: 4,
        list: [
          {
            name: "基础设施",
            router: "/ArcGis",
            icon: "icon-jichusheshi",
            gis: 'New_WaterTransport_Overview',
            list: [
              { name: "港口", router: "/ArcGis", icon: "icon-gangkou", gis: 'New_Node_Port' },
              { name: "内河航道", router: "/ArcGis", icon: "icon-hangdao", gis: 'New_Wire_WaterTransport' },
              { name: "远洋航线", router: "/ArcGis", icon: "icon-zhongguoyuyechuanbojianyanjianduguanlixitongyuanyang", gis: 'New_Wire_WaterTransportByOcean' },
            ]
          },
          {
            name: "货运出行", router: "", icon: "el-icon-goods",
            list: [
              // { name: "航道流量", router: "", icon: "el-icon-goods" },
              // { name: "闸船舶通过量", router: "", icon: "el-icon-goods" },
              { name: "货运OD", router: "/water/goodsod", icon: "el-icon-goods" },
              // { name: "码头吞吐量", router: "", icon: "el-icon-goods" },
            ]
          },
          { name: "通达分析", router: "/Comprehensive/Mastery/watertransport", icon: "icon-cunzhentongdafangxiangzhuanti" },
          // { name: "联系强度", router: "/water/contact", icon: "el-icon-position" },
        ]
      },
      {//航空分析模块
        key: 5,
        list: [
          {
            name: "基础设施",
            router: "/ArcGis",
            icon: "icon-jichusheshi",
            gis: 'New_Aviation_Overview',
            list: [
              {
                name: '现状', icon: 'icon-xianzhuang',
                list2: [
                  { name: "机场", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Node_Airport' },
                  // { name: "航线", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Wire_Aviation' },
                ]
              },
              {
                name: '规划', icon: 'icon-guihua',
                list2: [
                  { name: "机场", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Node_AirportByGuiHua' },
                ]
              },

            ]
          },
          // {
          //   name: "客货出行", router: "", icon: "", list: [
          //     { name: "线路流量", router: "", icon: "" },
          //     { name: "线路饱和度图", router: "", icon: "" },
          //   ]
          // },
          {
            name: "客运出行", router: "", icon: "el-icon-user",
            list: [
              { name: "客流OD", router: "/aviation/person/customer", icon: "el-icon-mobile-user" },
            ]
          },
          {
            name: "货运出行", router: "", icon: "el-icon-goods",
            list: [
              { name: "出港货邮量", router: "/aviation/outbound", icon: "el-icon-goods" },
              // { name: "航班载运率", router: "", icon: "el-icon-goods" },
              // { name: '流量流向分布', router: '/aviation/outperson', icon: 'el-icon-goods' }
            ]
          },
          { name: "通达分析", router: "/aviation/tongda", icon: "icon-cunzhentongdafangxiangzhuanti" },
          {
            name: "联系强度", router: "", icon: "icon-guanlian",
            list: [
              { name: "航班班次", router: "/aviation/conctact", icon: "el-icon-mobile-user" },
              { name: "航班满载率", router: "/aviation/person/fillLoad", icon: "el-icon-mobile-user" },
            ]
          },
          {
            name: '报告', router: '', icon: 'icon-guihu',
            list: [
              { name: "江苏省机场出港旅客量分布", router: "/aviation/report", icon: "el-icon-mobile-user" },
            ]
          }
        ]
      },
      {//经济社会联系强度
        key: 6,
        list: [
          {
            name: '人口流',
            router: "/contactStrength",
            icon: 'icon-renkou_huabanfuben'
          },
          {
            name: '信息流',
            router: "/contactStrength/msg",
            icon: 'icon-icon-test'
          },
          {
            name: '金融流',
            router: "/contactStrength/financialflow",
            icon: 'icon-jinrong'
          },
          {
            name: '经济流',
            router: "/contactStrength/economic",
            icon: 'icon-tubiao-'
          },
        ]
      },
      {//数据分析模块
        key: 7,
        list: [
          {
            name: "数据共享",
            router: "/management",
            icon: "el-icon-place",
          },
          {
            name:'公路',
            router:'/mana/highway',
            icon: "el-icon-place",
          }
          // {
          //   name: "经济流图",
          //   router: "",
          //   icon: "el-icon-pie-chart",
          // },
        ]
      },
    ],
    leftActive: '1-1'
  },
  getters: {
    list1(state) {

      return state.list1
    }
  },
  mutations: {
    //设置左侧按钮
    setLeftActive(state, v) {
      state.leftActive = v
    }
  }
}
export default totallist