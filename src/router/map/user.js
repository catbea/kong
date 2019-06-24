export default [
  {
    path: '/user',
    name: 'user',
    component: resolve => require(['@/views/user/index.vue'], resolve),
    meta: {
      title: '我的',
      tabbar: {
        show: true
      }
    }
  },
  {
    path: '/user/share-business-card',
    name: 'share-business-card',
    component: resolve => require(['@/views/user/shareBusinessCard.vue'], resolve),
    meta: {
      title: '分享名片'
    }
  },
  {
    path: '/user/share-card',
    name: 'share-card',
    component: resolve => require(['@/views/user/share/index.vue'], resolve),
    meta: {
      title: '分享名片'
    }
  },
  {
    path: '/user/edit',
    name: 'user-edit',
    component: resolve => require(['@/views/user/edit/userEdit.vue'], resolve),
    meta: {
      title: '个人资料'
    }
  },
  {
    path: '/user/edit/avatar',
    name: 'user-edit-avatar',
    component: resolve => require(['@/views/user/edit/userEditAvatar.vue'], resolve),
    meta: {
      title: '修改头像'
    }
  },
  {
    path: '/user/edit/userPortrait',
    name: 'userPortrait',
    component: resolve => require(['@/views/user/edit/userPortrait.vue'], resolve),
    meta: {
      title: '修改头像'
    }
  },
  {
    path: '/user/edit/username',
    name: 'user-edit-username',
    component: resolve => require(['@/views/user/edit/userEditUsername.vue'], resolve),
    meta: {
      title: '修改姓名'
    }
  },
  {
    path: '/user/edit/phone',
    name: 'user-edit-phone',
    component: resolve => require(['@/views/user/edit/userEditPhone.vue'], resolve),
    meta: {
      title: '修改联系电话'
    }
  },
  {
    path: '/user/edit/userWechat',
    name: 'user-edit-userWechat',
    component: resolve => require(['@/views/user/edit/userWechat.vue'], resolve),
    meta: {
      title: '修改微信号'
    }
  },
  {
    path: '/user/edit/userCompany',
    name: 'user-edit-userCompany',
    component: resolve => require(['@/views/user/edit/userCompany.vue'], resolve),
    meta: {
      title: '修改平台公司'
    }
  },
  {
    path: '/user/edit/userPlatform',
    name: 'user-edit-userPlatform',
    component: resolve => require(['@/views/user/edit/userPlatform.vue'], resolve),
    meta: {
      title: '修改我的机构'
    }
  },
  {
    path: '/user/edit/userMechanism',
    name: 'userMechanism',
    component: resolve => require(['@/views/user/edit/userMechanism.vue'], resolve),
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
    path: '/user/edit/editLabel',
    name: 'editLabel',
    component: resolve => require(['@/views/user/edit/editUserLabel.vue'], resolve),
    meta: {
      title: '编辑标签'
    }
  },
  {
    path: '/user/edit/userIntroduction',
    name: 'userIntroduction',
    component: resolve => require(['@/views/user/edit/userIntroduction.vue'], resolve),
    meta: {
      title: '修改个人介绍'
    }
  },
  //历史文章
  {
    path: '/user/articles/historicalArticles',
    name: 'historicalArticles',
    component: resolve => require(['@/views/user/articles/historicalArticles.vue'], resolve),
    meta: {
      title: '我的写一写'
    }
  },
  //我的写一写二级列表
  {
    path: '/user/articles/easyLookChildList',
    name: 'easyLookChildList',
    component: resolve => require(['@/views/user/articles/easyLookChildList.vue'], resolve),
    meta: {
      title: '我的写一写'
    }
  },
  {
    path: '/user/articles/easyLookList',
    name: 'easyLookList',
    component: resolve => require(['@/views/user/articles/easyLookList.vue'], resolve)
  },
  {
    path: '/user/articles/updateArticles',
    name: 'updateArticles',
    component: resolve => require(['@/views/user/articles/updateArticles.vue'], resolve),
    meta: {
      title: '我的写一写'
    }
  },
  {
    path: '/user/collection/myCollection',
    name: 'myCollection',
    component: resolve => require(['@/views/user/collection/myCollection.vue'], resolve),
    meta: {
      title: '我的收藏'
    }
  },
  {
    path: '/user/consumption/consumptionBill',
    name: 'consumptionBill',
    component: resolve => require(['@/views/user/consumption/consumptionBill.vue'], resolve),
    meta: {
      title: '消费账单'
    }
  },
  {
    path: '/user/myReport',
    name: 'myreport',
    component: resolve => require(['@/views/user/myReport/index.vue'], resolve),
    meta: {
      title: '我的报备'
    }
  },
  {
    path: '/user/myReport/reportInfo',
    name: 'reportInfo',
    component: resolve => require(['@/views/user/myReport/reportInfo.vue'], resolve),
    meta: {
      title: '我的报备'
    }
  },
  {
    path: '/user/myReport/addReport',
    name: 'addReport',
    component: resolve => require(['@/views/user/myReport/addReport.vue'], resolve),
    meta: {
      title: '我的报备'
    }
  },
  {
    path: '/user/myReport/addReport/reportMarket',
    name: 'reportMarket',
    component: resolve => require(['@/views/user/myReport/addReport/reportMarket/index.vue'], resolve),
    meta: {
      title: '报备楼盘'
    }
  },
  {
    path: '/user/myReport/reportPhone',
    name: 'reportPhone',
    component: resolve => require(['@/views/user/myReport/reportPhone.vue'], resolve),
    meta: {
      title: '我的报备'
    }
  },
  {
    path: '/user/myReport/reportCustomer',
    name: 'reportCustomer',
    component: resolve => require(['@/views/user/myReport/reportCustomer.vue'], resolve),
    meta: {
      title: '我的报备'
    }
  },
  {
    path: '/user/myReport/reportCustomerEdit',
    name: 'reportCustomerEdit',
    component: resolve => require(['@/views/user/myReport/reportCustomerEdit.vue'], resolve),
    meta: {
      title: '我的报备'
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
    path: '/user/myMember/selectedDisk',
    name: 'selected-disk',
    component: resolve => require(['@/views/user/myMember/selectedDisk/index.vue'], resolve),
    meta: {
      title: '添加楼盘',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/mypreference',
    name: 'mypreference',
    component: resolve => require(['@/views/user/mypreference/index.vue'], resolve),
    meta: {
      title: '特惠套餐',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/mypreference/openPreference',
    name: 'open-preference',
    component: resolve => require(['@/views/user/mypreference/openPreference/index.vue'], resolve),
    meta: {
      title: '套餐支付',
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
    path: '/user/reply',
    name: 'reply',
    component: resolve => require(['@/views/user/reply/reply.vue'], resolve),
    meta: {
      title: '请选择欢迎语',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/reply/replyContent',
    name: 'replyContent',
    component: resolve => require(['@/views/user/reply/replyContent.vue'], resolve),
    meta: {
      title: '编辑内容',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/reply/editReply',
    name: 'editReply',
    component: resolve => require(['@/views/user/reply/editReply.vue'], resolve),
    meta: {
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
  },
  {
    path: '/user/invitation/awWelfare',
    name: 'awWelfare',
    component: resolve => require(['@/views/user/invitation/awWelfare.vue'], resolve),
    meta: {
      title: '邀请有礼',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/invitation/teammateList',
    name: 'teammateList',
    component: resolve => require(['@/views/user/invitation/teammateList.vue'], resolve),
    meta: {
      title: '邀请有礼',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/talk',
    name: 'talk',
    component: resolve => require(['@/views/user/Talk.vue'], resolve),
    meta: {
      title: '拓客关系',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/edit/cutImg',
    name: 'cutImg',
    component: resolve => require(['@/views/user/edit/cutImg.vue'], resolve),
    meta: {
      title: '照片裁剪',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/remark',
    name: 'remark',
    component: resolve => require(['@/views/user/remark/index.vue'], resolve),
    meta: {
      title: '我的点评'
    }
  },
  {
    path: '/user/questionAnswers',
    name: 'questionAnswers',
    component: resolve => require(['@/views/user/questionAnswers/index.vue'], resolve),
    meta: {
      title: '我的问答'
    }
  },
  {
    path: '/user/viplist',
    name: 'viplist',
    component: resolve => require(['@/views/user/vipList/index.vue'], resolve),
    meta: {
      title: '开通城市',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/ai',
    name: 'ai',
    component: resolve => require(['@/views/user/ai/index.vue'], resolve),
    meta: {
      title: 'AI客服',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/set',
    name: 'set',
    component: resolve => require(['@/views/user/set/index.vue'], resolve),
    meta: {
      title: '设置',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/learn',
    name: 'learn',
    component: resolve => require(['@/views/user/learn/index.vue'], resolve),
    meta: {
      title: 'AW大师培训学院',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/learn/record',
    name: 'learnRecord',
    component: resolve => require(['@/views/user/learn/record.vue'], resolve),
    meta: {
      title: '学习记录',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/learn/search',
    name: 'learnRecord',
    component: resolve => require(['@/views/user/learn/search/index.vue'], resolve),
    meta: {
      title: '搜索楼盘',
      tabbar: {
        show: false
      }
    }
  },
  {

    path: '/user/learn/secondPage/arecProduct',
    name: 'arecProduct',
    component: resolve => require(['@/views/user/learn/secondPage/arecProduct.vue'], resolve),
    meta: {
      title: '区域竞品分析',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/learn/secondPage/commissionRule',
    name: 'commissionRule',
    component: resolve => require(['@/views/user/learn/secondPage/commissionRule.vue'], resolve),
    meta: {
      title: '佣金结算规则',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/learn/secondPage/contorlTime',
    name: 'contorlTime',
    component: resolve => require(['@/views/user/learn/secondPage/contorlTime.vue'], resolve),
    meta: {
      title: '实时销控表',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/learn/secondPage/marker',
    name: 'marker',
    component: resolve => require(['@/views/user/learn/secondPage/marker.vue'], resolve),
    meta: {
      title: '市场政策与对策',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/learn/secondPage/customerPortrait',
    name: 'customerPortrait',
    component: resolve => require(['@/views/user/learn/secondPage/customerPortrait.vue'], resolve),
    meta: {
      title: '目标客户画像',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/learn/secondPage/salesAsk',
    name: 'salesAsk',
    component: resolve => require(['@/views/user/learn/secondPage/salesAsk.vue'], resolve),
    meta: {
      title: '销售百问',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/learn/secondPage/floor',
    name: 'floor',
    component: resolve => require(['@/views/user/learn/secondPage/floor.vue'], resolve),
    meta: {
      title: '楼盘标准化价值点',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/learn/secondPage/salesVideo',
    name: 'salesVideo',
    component: resolve => require(['@/views/user/learn/secondPage/salesVideo.vue'], resolve),
    meta: {
      title: '销售培训视频列表',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/learn/thirdPage/pdf',
    name: 'pdf',
    component: resolve => require(['@/views/user/learn/thirdPage/pdf.vue'], resolve),
    meta: {
      title: 'pdf',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/learn/thirdPage/h5',
    name: 'h5',
    component: resolve => require(['@/views/user/learn/thirdPage/h5.vue'], resolve),
    meta: {
      title: 'h5',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/user/learn/thirdPage/img',
    name: 'img',
    component: resolve => require(['@/views/user/learn/thirdPage/img.vue'], resolve),
    meta: {
      title: 'img',
      tabbar: {
        show: false
      }
    }
  },
]
