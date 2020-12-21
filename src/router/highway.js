export default [
    // 基础设施
    {//公路设施
        path: '/highway/Highway_Facilities',
        name: 'Highway_Facilities',
        component: () => import('../components/Highway/basis/Highway_Facilities.vue')
    },
    {//收费站
        path: '/highway/toll',
        name: 'highway_toll',
        component: () => import('../components/Highway/Toll.vue')
    },
    {//货重OD
        path: '/highway/goods/goods',
        name: '/highway/goods/goods',
        component: () => import('../components/Highway/goods/goods.vue')
    },
    {//货流OD
        path: '/highway/goods/frequency',
        name: '/highway/goods/frequency',
        component: () => import('../components/Highway/goods/frequency.vue')
    },
    {//线路
        path: '/highway/line',
        name: 'highway_line',
        component: () => import('../components/Highway/Line.vue')
    },
    //联系强度
    {//班次分布
        path: '/highway/contact/shift',
        name: '/highway/contact/shift',
        component: () => import('../components/Highway/contactStrength/Shift.vue')
    },
    {//班次分布
        path: '/highway/contact/second',
        name: '/highway/contact/second',
        component: () => import('../components/Highway/contactStrength/Second.vue')
    },
    {//班次分布
        path: '/highway/contact/fullLoad',
        name: '/highway/contact/fullLoad',
        component: () => import('../components/Highway/contactStrength/fullLoad.vue')
    },
    {//饱和度
        path: '/highway/baohedu',
        name: '/highway/baohedu',
        component: () => import('../components/GIS/baohedu.vue')
    },
    {//报告
        path: '/highway/report_br',
        name: '/highway/report_br',
        component: () => import('@/components/Highway/report/bridge.vue')
    },
    {//毗邻公交
        path: '/highway/pilinBus',
        component: () => import('@/components/Highway/report/pilinBus.vue')
    },
    {//客运旅游OD
        path: '/highway/customerTravel',
        component: () => import('@/components/Highway/contactStrength/customer/travel.vue')
    },
    {//客运总量
        path: '/highway/customerTotal',
        component: () => import('@/components/Highway/contactStrength/customer/total.vue')
    },
    {//货运总量
        path: '/highway/goodsTotal',
        component: () => import('@/components/Highway/contactStrength/goods/total.vue')
    },

    // 运营效率
    {
        path: '/highway/effect/toll',
        component: () => import('@/components/Highway/effect/toll.vue')
    },
    {//客运站
        path: '/highway/effect/passenger',
        component: () => import('@/components/Highway/effect/passenger.vue')
    }
]