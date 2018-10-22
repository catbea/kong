export default [
  {
    path: '/dynamics',
    name: 'dynamics',
    component: resolve => require(['@/views/dynamics/index.vue'], resolve),
    meta:{
      title: '客户动态'
    }
  }
]
