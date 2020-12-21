function lazy(path) {
    return () => import('@/components/Management/' + path)
}
export default [
    {
        path: '/management',
        name: 'management',
        component: () => import('../components/Management/Index.vue')
    },
    {
        path: '/mana/highway',
        component: lazy('highway/statistics')
    }
]