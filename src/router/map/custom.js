export default [
  {
    path: '/custom',
    name: 'custom',
    component: resolve => require(['@/views/custom/index.vue'], resolve),
    meta: {
      title: '我的客户',
      tabbar: {
        show: true
      }
    }
  },
  {
    path: '/custom/:id',
    name: 'custom-detail',
    component: resolve => require(['@/views/custom/detail.vue'], resolve),
    meta: {
      title: '我的客户'
    }
  },
  {
    path: '/custom/edit/remarkName',
    name: 'custom-edit-remarkName',
    component: resolve => require(['@/views/custom/remarkName.vue'], resolve),
    meta: {
      title: '我的客户'
    }
  },
  {
    path: '/custom/edit/phone',
    name: 'custom-edit-phone',
    component: resolve => require(['@/views/custom/phone.vue'], resolve),
    meta: {
      title: '我的客户'
    }
  },
  {
    path: '/custom/message/message',
    name: 'message',
    component: resolve => require(['@/views/custom/message.vue'], resolve),
    meta: {
      title: '聊天'
    }
  },
  {
    path: '/custom/message/messageProjects',
    name: 'messageProjects',
    component: resolve => require(['@/views/custom/messageProjects.vue'], resolve),
    meta: {
      title: '楼盘发送'
    }
  },
  {
    path: '/custom/message/activityDetail',
    name: 'activityDetail',
    component: resolve => require(['@/views/custom/activityDetail.vue'], resolve),
    meta: {
      title: '活动报名客户'
    }
  }
]
