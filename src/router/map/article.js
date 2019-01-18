export default [
  {
    path: '/write-article',
    name: 'write-article',
    component: resolve => require(['@/views/article/index.vue'], resolve),
    meta: {
      title: '写一写',
      tabbar: {
        show: true
      }
    }
  }
]
