export default [
  {
    path: '/user',
    name: 'user',
    component: resolve => require(['@/views/user/index.vue'], resolve),
    meta: {
      title: '名片',
      tabbar: {
        show: true
      }
    }
  },
  {
    path: '/user/share-business-card',
    name: 'share-business-card',
    component: resolve =>
      require(['@/views/user/shareBusinessCard.vue'], resolve),
    meta: {
      title: '分享名片'
    }
  },
  {
    path: '/user/edit',
    name: 'user-edit',
    component: resolve => require(['@/views/user/edit/userEdit.vue'], resolve),
    meta: {
      title: '名片编辑'
    }
  },
  {
    path: '/user/edit/avatar',
    name: 'user-edit-avatar',
    component: resolve =>
      require(['@/views/user/edit/userEditAvatar.vue'], resolve),
    meta: {
      title: '修改头像'
    }
  },
  {
    path: '/user/edit/userPortrait',
    name: 'userPortrait',
    component: resolve =>
      require(['@/views/user/edit/userPortrait.vue'], resolve),
    meta: {
      title: '修改头像'
    }
  },
  {
    path: '/user/edit/username',
    name: 'user-edit-username',
    component: resolve =>
      require(['@/views/user/edit/userEditUsername.vue'], resolve),
    meta: {
      title: '修改姓名'
    }
  },
  {
    path: '/user/edit/phone',
    name: 'user-edit-phone',
    component: resolve =>
      require(['@/views/user/edit/userEditPhone.vue'], resolve),
    meta: {
      title: '修改手机号'
    }
  },
  {
    path: '/user/edit/userWechat',
    name: 'user-edit-userWechat',
    component: resolve =>
      require(['@/views/user/edit/userWechat.vue'], resolve),
    meta: {
      title: '修改微信号'
    }
  },
  {
    path: '/user/edit/userMechanism',
    name: 'userMechanism',
    component: resolve =>
      require(['@/views/user/edit/userMechanism.vue'], resolve),
    meta: {
      title: '修改机构'
    }
  },
  {
    path: '/user/edit/userLabel',
    name: 'userLabel',
    component: resolve => require(['@/views/user/edit/userLabel.vue'], resolve),
    meta: {
      title: '修改标签'
    }
  },
  {
    path: '/user/edit/userIntroduction',
    name: 'userIntroduction',
    component: resolve =>
      require(['@/views/user/edit/userIntroduction.vue'], resolve),
    meta: {
      title: '修改个人介绍'
    }
  },
  //历史文章
  {
    path: '/user/articles/historicalArticles',
    name: 'historicalArticles',
    component: resolve =>
      require(['@/views/user/articles/historicalArticles.vue'], resolve),
    meta: {
      title: '历史文章'
    }
  },
  {
    path: '/user/articles/updateArticles',
    name: 'updateArticles',
    component: resolve =>
      require(['@/views/user/articles/updateArticles.vue'], resolve),
    meta: {
      title: '历史文章'
    }
  },
  {
    path: '/user/collection/myCollection',
    name: 'myCollection',
    component: resolve =>
      require(['@/views/user/collection/myCollection.vue'], resolve),
    meta: {
      title: '我的收藏'
    }
  },
  {
    path: '/user/consumption/consumptionBill',
    name: 'consumptionBill',
    component: resolve =>
      require(['@/views/user/consumption/consumptionBill.vue'], resolve),
    meta: {
      title: '消费账单'
    }
  },
  {
    path: '/user/myMarket',
    name: 'mymarket',
    component: resolve => require(['@/views/user/myMarket/index.vue'], resolve),
    meta: {
      title: '我的楼盘',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/myCoupon',
    name: 'myCoupon',
    component: resolve => require(['@/views/user/myCoupon/index.vue'], resolve),
    meta: {
      title: '我的优惠劵',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/myMember',
    name: 'myMember',
    component: resolve => require(['@/views/user/myMember/index.vue'], resolve),
    meta: {
      title: '我的vip会员',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/noDisturb',
    name: 'noDisturb',
    component: resolve => require(['@/views/user/noDisturb/index.vue'], resolve),
    meta: {
      title: '勿扰模式',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/opinionFeedback',
    name: 'opinionFeedback',
    component: resolve => require(['@/views/user/opinionFeedback/index.vue'], resolve),
    meta: {
      title: '意见反馈',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/opinionFeedback/describe',
    name: 'feedbackDescribe',
    component: resolve => require(['@/views/user/opinionFeedback/feedbackDescribe/index.vue'], resolve),
    meta: {
      title: '反馈问题描述',
      tabbar: {
        show: false
      }
    }
  }
]
