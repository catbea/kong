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
    path: '/public/city-list',
    name: 'city-list',
    component: resolve => require(['@/views/public/cityList.vue'], resolve),
    meta: {
      title: '城市选择'
    }
  },
  {
    path: '/public/vip-market',
    name: 'vip-market',
    component: resolve => require(['@/views/public/vipMarket.vue'], resolve),
    meta: {
      title: '城市选择'
    }
  },
  {
    path: '/public/map-Search',
    name: 'map-Search',
    component: resolve => require(['@/views/public/mapSearch.vue'], resolve),
    meta: {
      title: '位置周边'
    }
  },
  {
    path: '/public/complete-info',
    name: 'complete-info',
    component: resolve => require(['@/views/public/completeInfo.vue'], resolve),
    meta: {
      title: '请完善信息'
    }
  },
  {
    path: '/public/easy-photo',
    name: 'easy-photo',
    component: resolve => require(['@/views/public/easyPhoto.vue'], resolve),
    meta: {
      title: '拍一拍下载'
    }
  }
]
