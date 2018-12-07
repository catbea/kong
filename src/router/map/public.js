export default [
  {
    path: '/public/area-selection',
    name: 'AreaSelection',
    component: resolve => require(['@/views/public/areaSelection.vue'], resolve),
    meta: {
      title: '地域选择'
    }
  },
  {
    path: '/public/map-Search',
    name: 'AreaSelection',
    component: resolve => require(['@/views/public/mapSearch.vue'], resolve),
    meta: {
      title: '地域选择'
    }
  }
]
