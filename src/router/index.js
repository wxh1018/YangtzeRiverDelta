import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import aviation from './aviation'
import railway from './railway'
import highway from './highway'
import management from './management'

Vue.use(Router)
var router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      component: () => import('../components/Login.vue')
    },

    //城市客运分析模块++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/other/home',
      name: 'other_home',
      component: () => import('../components/Other/Home.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../components/Home1.vue'),
      children: [
        // {
        //   path:'/App',
        //   component:()=>import('@/components/App.vue')
        // },
        //ArcGis 通用组件
        {
          path: '/ArcGis',
          component: () => import('../components/base/ArcGis.vue')
        },
        {//综合交通+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          path: '/Comprehensive/Infrastructure',
          name: 'Comprehensive_Infrastructure',
          component: () => import('../components/Comprehensive/Infrastructure.vue')
        },
        // 路网设施
        {
          path: '/gis/Wire_Overview',
          name: 'Wire_Overview',
          component: () => import('../components/GIS/Wire_Overview.vue')
        },
        //节点
        {
          path: '/gis/Node_Overview',
          name: 'Node_Overview',
          component: () => import('../components/GIS/Node_Overview.vue')
        },
        {//行政边界
          path: '/Comprehensive/boundary/Administrative_Node',
          name: 'Administrative_Node',
          component: () => import('../components/Comprehensive/boundary/cityinformation.vue')
        },
        {
          path: '/Comprehensive/Networkinfrastructure/highspeed',
          name: 'highspeed',
          component: () => import('../components/Comprehensive/Networkinfrastructure/highspeed.vue')
        },
        {
          path: '/Comprehensive/Networkinfrastructure/nationalroad',
          name: 'nationalroad',
          component: () => import('../components/Comprehensive/Networkinfrastructure/nationalroad.vue')
        },
        {
          path: '/Comprehensive/Networkinfrastructure/provincialhighway',
          name: 'provincialhighway',
          component: () => import('../components/Comprehensive/Networkinfrastructure/provincialhighway.vue')
        },
        {
          path: '/Comprehensive/Networkinfrastructure/railway',
          name: 'railway',
          component: () => import('../components/Comprehensive/Networkinfrastructure/railway.vue')
        },
        {
          path: '/Comprehensive/Networkinfrastructure/channel',
          name: 'channel',
          component: () => import('../components/Comprehensive/Networkinfrastructure/channel.vue')
        },
        //节点设施
        {
          path: '/Comprehensive/Nodefacilities/airport',
          name: 'airport',
          component: () => import('../components/Comprehensive/Nodefacilities/airport.vue')
        },
        {
          path: '/Comprehensive/Nodefacilities/trainstation',
          name: 'trainstation',
          component: () => import('../components/Comprehensive/Nodefacilities/trainstation.vue')
        },
        {
          path: '/Comprehensive/Nodefacilities/servicearea',
          name: 'servicearea',
          component: () => import('../components/Comprehensive/Nodefacilities/servicearea.vue')
        },
        {
          path: '/Comprehensive/Nodefacilities/toll',
          name: 'toll',
          component: () => import('../components/Comprehensive/Nodefacilities/toll.vue')
        },
        {
          path: '/Comprehensive/Nodefacilities/passengerstation',
          name: 'passengerstation',
          component: () => import('../components/Comprehensive/Nodefacilities/passengerstation.vue')
        },
        {
          path: '/Comprehensive/Nodefacilities/Administrative_Node',
          name: 'passengerstation',
          component: () => import('../components/Comprehensive/Nodefacilities/Administrative_Node.vue')
        },

        // ————等时圈
        {
          path: '/Comprehensive/Mastery/byhighway',
          name: 'byhighway',
          component: () => import('../components/Comprehensive/Mastery/byhighway.vue')
        },
        {
          path: '/Comprehensive/Mastery/byrailway',
          name: 'byrailway',
          component: () => import('../components/Comprehensive/Mastery/byrailway.vue')
        },
        {
          path: '/Comprehensive/Mastery/watertransport',
          name: 'watertransport',
          component: () => import('../components/Comprehensive/Mastery/watertransport.vue')
        },
        {//国省道
          path: '/Comprehensive/Mastery/ProvincialHighway',
          name: 'watertransport',
          component: () => import('../components/Comprehensive/Mastery/ProvincialHighway.vue')
        },
        {//公路总体
          path: '/Comprehensive/Mastery/HighwayOverall',
          name: 'watertransport',
          component: () => import('../components/Comprehensive/Mastery/HighwayOverall.vue')
        },
        //公路分析模块++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        ...highway,
        //铁路分析模块+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        ...railway,
        //水运++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // 基础设施
        {
          path: '/water/Waterway_Facilities',
          name: 'Waterway_Facilities',
          component: () => import('../components/Water/basis/Waterway_Facilities.vue')
        },
        {
          path: '/water/pier',
          name: 'water_pier',
          component: () => import('../components/Water/Pier.vue')
        },
        {//港口
          path: '/js/Port',
          name: 'js_port',
          component: () => import('../components/GIS/Port.vue')
        },
        {//货物OD
          path: '/water/goodsod',
          name: 'water_goodsod',
          component: () => import('../components/Water/GoodsOD.vue')
        },
        {//联系强度
          path: '/water/contact',
          name: 'water_contact',
          component: () => import('../components/Water/contact.vue')
        },
        //航空分析++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        ...aviation,
        // 数据管理模块+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        ...management,
        // 经济社会联系强度+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        {//人口流
          path: '/contactStrength',
          name: 'contactStrength',
          component: () => import('../components/ContactStrength/person1.vue')
        },
        {//信息流
          path: '/contactStrength/msg',
          name: 'contactStrength_msg',
          component: () => import('../components/ContactStrength/msg/msg.vue')
        },
        {//金融流
          path: '/contactStrength/financialflow',
          name: 'contactStrength_financialflow',
          component: () => import('../components/ContactStrength/financialflow/financialflow.vue')
        },
        {//经济流
          path: '/contactStrength/economic',
          name: 'contactStrength_economic',
          component: () => import('../components/ContactStrength/economic/economic.vue')
        },

      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  let token = localStorage.Longtoken
  if (token) {
    // if (to.name == 'home') {
    //   next({ path: '/Comprehensive/Infrastructure' })
    //   return
    // }
    next()
  } else {
    if (to.path !== '/login') {
      // if (to.path == '/') {
      //   next()
      // } else {
      next({ path: '/login' })
      // }
    } else {
      next()
    }

  }
})
export default router
