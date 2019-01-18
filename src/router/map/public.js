export default [
  {
    path: '/public/area-select',
    name: 'area-select',
    component: resolve => require(['@/views/public/areaSelect.vue'], resolve),
    meta: {
      title: '城市选择'
    }
  },
  {
    path: '/public/map-Search',
    name: 'map-Search',
    component: resolve => require(['@/views/public/mapSearch.vue'], resolve),
    meta: {
      title: '地图看房'
    }
  },
  {
    path: '/public/complete-info',
    name: 'complete-info',
    component: resolve => require(['@/views/public/completeInfo.vue'], resolve),
    meta: {
      title: '请完善信息'
    }
  }
]
