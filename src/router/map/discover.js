export default [
  {
    path: '/discover',
    name: 'discover',
    component: resolve => require(['@/views/discover/index.vue'], resolve),
    meta: {
      title: '发现',
      tabbar: {
        show: true
      }
    }
  },
  {
    path: '/discover/:id/:city',
    name: 'discover-detail',
    component: resolve => require(['@/views/discover/detail.vue'], resolve)
  }
  // ,{
  //   path: '/discover/headline',
  //   name: 'headline',
  //   component: resolve => require(['@/views/discover/headline.vue'], resolve),
  //   meta: {
  //     title: '房产头条',
  //     tabbar: {
  //       show: false
  //     }
  //   }
  // }
]
