export default [
  {
    path: '/public/AreaSelection',
    name: 'AreaSelection',
    component: resolve => require(['@/views/public/areaSelection.vue'], resolve),
    meta: {
      title: '地域选择'
    }
  }
]
