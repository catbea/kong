export default [
  {
    path: '/custom',
    name: 'custom',
    component: resolve => require(['@/views/custom/index.vue'], resolve),
    meta: {
      title: '我的客户',
      tabbar: {
        show: true
      }
    }
  },
  {
    path: '/custom/:id',
    name: 'custom-detail',
    component: resolve => require(['@/views/custom/detail.vue'], resolve),
    meta: {
      title: '我的客户'
    }
  }
]
