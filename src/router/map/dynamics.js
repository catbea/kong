export default [
  {
    path: '/',
    name: 'index',
    component: resolve => require(['@/views/public/index.vue'], resolve),
    meta: {
      title: 'AW大师',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/dynamics',
    name: 'dynamics',
    component: resolve => require(['@/views/dynamics/index.vue'], resolve),
    meta: {
      title: '数据',
      tabbar: {
        show: true
      }
    }
  },
  {
    path: '/dynamics/allDynamics',
    name: 'allDynamics',
    component: resolve => require(['@/views/dynamics/allDynamics.vue'], resolve),
    meta: {
      title: '数据动态',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/dynamics/dynamicsInfo',
    name: 'dynamics-info',
    component: resolve => require(['@/views/dynamics/dynamicsInfo.vue'], resolve),
    meta: {
      title: '动态详情',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/dynamics/articleInfo',
    name: 'articleInfo',
    component: resolve => require(['@/views/dynamics/articleInfo.vue'], resolve),
    meta: {
      title: '文章详情',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/dynamics/message/messageList',
    name: 'messageList',
    component: resolve => require(['@/views/dynamics/message/messageList.vue'], resolve),
    meta: {
      title: '消息',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/dynamics/message/sysMessage',
    name: 'sysMessage',
    component: resolve => require(['@/views/dynamics/message/sysMessage.vue'], resolve),
    meta: {
      title: '系统消息',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/dynamics/message/unreadMessage',
    name: 'unreadMessage',
    component: resolve => require(['@/views/dynamics/message/unreadMessage.vue'], resolve),
    meta: {
      title: '未读消息',
      tabbar: {
        show: false
      }
    }
  }
]
