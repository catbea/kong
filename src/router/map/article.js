export default [
  {
    path: '/article',
    name: 'custom-edit-phone',
    component: resolve => require(['@/views/article/index.vue'], resolve),
    meta: {
      title: '写一写',
      tabbar: {
        show: true
      }
    }
  }
]