export default [
  {
    path: '/me',
    name: 'me',
    component: resolve => require(['@/views/me/index.vue'], resolve),
    meta:{
      title: '名片'
    }
  }
]
