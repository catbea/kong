export default [
  {
    path: '/public/area-select',
    name: 'area-select',
    component: resolve => require(['@/views/public/areaSelect.vue'], resolve),
    meta: {
      title: '地域选择'
    }
  },
  {
    path: '/public/map-Search',
    name: 'map-Search',
    component: resolve => require(['@/views/public/mapSearch.vue'], resolve),
    meta: {
      title: '地图看房'
    }
  }
]
