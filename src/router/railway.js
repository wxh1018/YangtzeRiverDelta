export default [
    // 基础设施
    {
        path: '/railway/Railway_Facilities',
        name: 'Railway_Facilities',
        component: () => import('@/components/Railway/basis/Railway_Facilities.vue')
    },
    {//货重
        path: '/railway/goodsod',
        name: 'railway_goodsod',
        component: () => import('@/components/Railway/GoodsOd.vue')
    },
    {//货类
        path: '/railway/goodsod/kind',
        name: 'railway_goodsod_kind',
        component: () => import('@/components/Railway/kind.vue')
    },
    {
        path: '/railway/classline',
        name: 'classline',
        component: () => import('@/components/Railway/classline.vue')
    },
    {//客流OD
        path: '/railway/person/customer',
        name: '/railway/person/customer',
        component: () => import('@/components/Railway/person/customer.vue')
    },
    //报告
    {
        path: '/railway/report',
        name: 'railway_report',
        component: () => import('@/components/Railway/report/contactTime.vue')
    }
]