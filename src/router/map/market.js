export default [
  {
    path: '/market',
    name: 'market',
    component: resolve => require(['@/views/market/index.vue'], resolve),
    meta:{
      title: '楼盘'
    }
  }
]
