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
<<<<<<< HEAD
  {
    path: '/discover/edit-help',
    name: 'discover-edit-help',
    component: resolve => require(['@/views/discover/help.vue'], resolve)
  },
  {
    path: '/discover/edit/:id/:city',
    name: 'discover-edit',
    component: resolve => require(['@/views/discover/edit.vue'], resolve)
  },
  {
    path: '/discover/reportFeedback',
    name: 'reportFeedback',
    component: resolve => require(['@/views/discover/reportFeedback.vue'], resolve),
    meta: {
      title: '文章举报反馈',
=======
    {
    path: '/discover/discoverHelp',
    name: 'discoverHelp',
    component: resolve => require(['@/views/discover/discoverHelp.vue'], resolve),
    meta: {
      title: '帮助',
>>>>>>> v3.0.3
      tabbar: {
        show: false
      }
    }
  }

]
