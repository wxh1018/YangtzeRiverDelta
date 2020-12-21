export default [
    {//航空
        path: '/aviation/conctact',
        name: 'aviation_conctact',
        component: () => import('../components/aviation/contact.vue')
    },
    {//基础设施
        path: '/aviation/basis',
        name: 'aviation_basis',
        component: () => import('../components/Aviation/Basis.vue')
    },
    {//旅客出行
        path: '/aviation/person/customer',
        name: 'aviation_person_customer',
        component: () => import('../components/Aviation/person/customer.vue')
    },
    {//满载率
        path: '/aviation/person/fillLoad',
        name: 'aviation_person_fillLoad',
        component: () => import('../components/Aviation/person/fullLoad.vue')
    },
    {//货运出行
        path: '/aviation/outbound',
        name: 'aviation_outbound',
        component: () => import('../components/Aviation/Outbound.vue')
    },
    // {
    //   path: '/aviation/outperson',
    //   name: 'aviation_outperson',
    //   component: () => import('../components/Aviation/Out_guest.vue')
    // },
    {//通达分析
        path: '/aviation/tongda',
        name: 'aviation_tongda',
        component: () => import('../components/Aviation/Tongda/tongda.vue')
    },
    {
        path: '/aviation/report',
        name: 'aviation_report',
        component: () => import('@/components/Aviation/report/js_pro.vue')
    }
]