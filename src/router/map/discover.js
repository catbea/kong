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
  },
  {
    path: '/discover/edit-help',
    name: 'discover-edit-help',
    component: resolve => require(['@/views/discover/help.vue'], resolve)
  },
  {
    path: '/discover/edit/:id/:city',
    name: 'discover-edit',
    component: resolve => require(['@/views/discover/edit.vue'], resolve)
  }

]
