export default [
  {
    path: '/discover',
    name: 'discover',
    component: resolve => require(['@/views/discover/index.vue'], resolve),
    meta: {
      title: '发现'
    }
  },
  {
    path: '/discover/headline',
    name: 'headline',
    component: resolve =>
      require(['@/views/discover/headline.vue'], resolve),
    meta: {
      title: '房产头条',
      tabbar: {
        show: false
      }
    }
  }
]