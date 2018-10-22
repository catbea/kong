export default [
  {
    path: '/custom',
    name: 'custom',
    component: resolve => require(['@/views/custom/index.vue'], resolve),
    meta:{
      title: '我的客户'
    }
  }
]
