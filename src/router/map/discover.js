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
    component: resolve => require(['@/views/discover/detail.vue'], resolve),
    meta: {
      title: 'AW大师写一写'
    }
  },
  {
    path: '/discover/edit-help',
    name: 'discover-edit-help',
    component: resolve => require(['@/views/discover/help.vue'], resolve)
  },
  {
    path: '/discover/edit/:id/:city',
    name: 'discover-edit',
    component: resolve => require(['@/views/discover/edit.vue'], resolve),
    meta: {
      title: 'AW大师写一写'
    }
  },
  {
    path: '/discover/reportFeedback',
    name: 'reportFeedback',
    component: resolve => require(['@/views/discover/reportFeedback.vue'], resolve),
    meta: {
      title: '文章举报反馈',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/discover/newlyAdded',
    name: 'addLinker',
    component: resolve => require(['@/views/discover/newlyAdded/index.vue'], resolve)
  },
  {
    path: '/discover/newlyAdded/analysis',
    name: 'analysis',
    component: resolve => require(['@/views/discover/newlyAdded/analysis.vue'], resolve),
    meta: {
      title: '文章数据爬取'
    }
  },
  {
    path: '/discover/agreement',
    name: 'agreement',
    component: resolve => require(['@/views/discover/newlyAdded/agreement.vue'], resolve),
    meta: {
      title: '责任声明及解析规则',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/discover/chooseMarket',
    name: 'chooseMarket',
    component: resolve => require(['@/views/discover/chooseMarket/index.vue'], resolve),
    meta: {
      title: '插入楼盘',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/discover/chooseCity',
    name: 'chooseCity',
    component: resolve => require(['@/views/discover/chooseMarket/writeMarket.vue'], resolve),
    meta: {
      title: '选择城市',
      tabbar: {
        show: false
      }
    }
  }
]
