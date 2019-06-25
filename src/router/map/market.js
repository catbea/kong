export default [
  {
    path: '/market',
    name: 'market',
    component: resolve => require(['@/views/market/index.vue'], resolve),
    meta: {
      title: '楼盘',
      tabbar: {
        show: true
      }
    }
  },
  {
    path: '/market/search',
    name: 'market-search',
    component: resolve => require(['@/views/market/search.vue'], resolve),
    meta: {
      title: '楼盘搜索'
    }
  },
  {
    path: '/market/search2',
    name: 'market-search2',
    component: resolve => require(['@/views/market/search2.vue'], resolve),
    meta: {
      title: '楼盘搜索'
    }
  },
  {
    path: '/market/:id',
    name: 'market-detail',
    component: resolve => require(['@/views/market/detail.vue'], resolve),
    meta: {
      title: '楼盘详情'
    }
  },
  {
    path: '/market/map-surround/:id',
    name: 'market-map-surround',
    component: resolve => require(['@/views/market/mapSurround.vue'], resolve),
    meta: {
      title: '楼盘周边'
    }
  },
  {
    path: '/market/marketDetail/:id',
    name: 'marketDetail',
    component: resolve => require(['@/views/market/marketDetail/index.vue'], resolve),
    meta: {
      title: '楼盘详情',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/PreviewPicture/:arr',
    name: 'Preview-Picture',
    component: resolve => require(['COMP/PreviewPicture/index.vue'], resolve),
    meta: {
      title: '图片预览',
      tabbar: {
        show: false
      }
    }
  },
  {
    // TODO 准备移除
    path: '/marketDetail/perfect',
    name: 'marketDetailPerfect',
    component: resolve => require(['@/views/market/marketDetail/Perfect/index.vue'], resolve),
    meta: {
      title: '用户完善资料',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/marketDetail/correction/:id',
    name: 'marketDetailCorrection',
    component: resolve => require(['@/views/market/marketDetail/correction/index.vue'], resolve),
    meta: {
      title: '楼盘详情纠错',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/marketDetail/FamilyList/:id',
    name: 'FamilyList',
    component: resolve => require(['@/views/market/marketDetail/familyList/index.vue'], resolve),
    meta: {
      title: '户型列表',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/marketDetail/marketAllDynamic/:id',
    name: 'marketAllDynamic',
    component: resolve => require(['@/views/market/marketDetail/marketAllDynamic/index.vue'], resolve),
    meta: {
      title: '全部楼盘动态',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/marketDetail/marketDetail/allNear',
    name: 'marketAllNear',
    component: resolve => require(['@/views/market/marketDetail/marketAllNear/index.vue'], resolve),
    meta: {
      title: '楼盘全部周边',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/marketDetail/commission/:id',
    name: 'marketDetail-commission',
    component: resolve => require(['@/views/market/marketDetail/commission/index.vue'], resolve),
    meta: {
      title: '楼盘佣金'
    }
  },
  {
    path: '/inDetail/info/:id',
    name: 'marketDetail-info',
    component: resolve => require(['@/views/market/marketDetail/marketDetailInfo/index.vue'], resolve),
    meta: {
      title: '楼盘详细信息'
    }
  },
  {
    path: '/marketDetail/open/:id',
    name: 'marketDetail-open',
    component: resolve => require(['@/views/market/marketDetail/marketOpen/index.vue'], resolve),
    meta: {
      title: '开通楼盘'
    }
  },
  {
    path: '/open/agreement',
    name: 'marketDetail-open-agreement',
    component: resolve => require(['@/views/market/marketDetail/marketOpen/BuyAgreement/index.vue'], resolve),
    meta: {
      title: '付费协议'
    }
  },
  {
    path: '/market/share/:id',
    name: 'market-share',
    component: resolve => require(['@/views/market/share/index.vue'], resolve),
    meta: {
      title: '楼盘分享'
    }
  },
  {
    // TODO 准备移除
    path: '/marketDetail/share',
    name: 'marketDetail-share',
    component: resolve => require(['@/views/market/marketDetail/marketShare/index.vue'], resolve),
    meta: {
      title: '楼盘分享'
    }
  },
  {
    // TODO 准备移除
    path: '/marketDetail/share/save',
    name: 'save-poster',
    component: resolve => require(['@/views/market/marketDetail/marketShare/savePoster/index.vue'], resolve),
    meta: {
      title: '生成海报'
    }
  },
  {
    path: '/marketDetail/share/compile',
    name: 'compile-poster',
    component: resolve => require(['@/views/market/marketDetail/marketShare/compilePoster/index.vue'], resolve),
    meta: {
      title: '编辑海报'
    }
  },
  {
    path: '/market/inputSearch',
    name: 'searchMarket',
    component: resolve => require(['@/views/market/marketSearch/inputSearch/index.vue'], resolve),
    meta: {
      title: '搜索楼盘'
    }
  },
  {
    path: '/marketDetail/photo/:id',
    name: 'photoList',
    component: resolve => require(['@/views/market/marketDetail/marketPhoto/index.vue'], resolve),
    meta: {
      title: '楼盘相册',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/market/couponSelect/:id',
    name: 'couponSelect',
    component: resolve => require(['@/views/market/couponSelect.vue'], resolve),
    meta: {
      title: '优惠券选择',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/market/poster/:id',
    name: 'market-poster',
    component: resolve => require(['@/views/market/poster/index.vue'], resolve),
    meta: {
      title: '楼盘海报',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/market/comment/standard',
    name: 'market-comment-standard',
    component: resolve => require(['@/views/market/comment/evaluateStandard.vue'], resolve),
    meta: {
      title: '用户点评行为规范',
      tabbar: {
        show: false
      }
    }
  },
  // 楼盘评论
  {
    path: '/market/comment/list/:id',
    name: 'market-comment-list',
    component: resolve => require(['@/views/market/comment/list.vue'], resolve),
    meta: {
      title: '楼盘评论',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/market/comment/write/:id',
    name: 'market-comment-write',
    component: resolve => require(['@/views/market/comment/write.vue'], resolve),
    meta: {
      title: '评论楼盘',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/market/comment/detail/:id',
    name: 'market-comment-detail',
    component: resolve => require(['@/views/market/comment/detail.vue'], resolve),
    meta: {
      title: '评论详情',
      tabbar: {
        show: false
      }
    }
  },
  // 买房问问
  {
    path: '/marketDetail/asking/:id',
    name: 'market-asking-list',
    component: resolve => require(['@/views/market/marketDetail/marketAsking/index.vue'], resolve),
    meta: {
      title: '买房问问',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/marketDetail/askingDetail',
    name: 'market-asking-detail',
    component: resolve => require(['@/views/market/marketDetail/marketAsking/detail.vue'], resolve),
    meta: {
      title: '问答详情',
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/marketDetail/ask/:id',
    name: 'market-asking-ask',
    component: resolve => require(['@/views/market/marketDetail/marketAsking/ask.vue'], resolve),
    meta: {
      title: '提问',
      tabbar: {
        show: false
      }
    }
  },

  {
    path: '/marketDetail/marketEvaluating',
    name: 'market-marketEvaluating',
    component: resolve => require(['@/views/market/marketDetail/marketEvaluating/index.vue'], resolve),
    meta: {
      title: '楼盘评测',
      tabbar: {
        show: false
      }
    }
  },
  // 楼盘宣传海报
  {
    path: '/market/activity/poster/:id',
    name: 'market-activity-poster',
    component: resolve => require(['@/views/market/housePoster/index.vue'], resolve),
    meta: {
      title: '楼盘海报列表',
      tabbar: {
        show: false
      }
    }
  },
  // 生成楼盘宣传海报
  {
    path: '/market/activity/share/poster',
    name: 'market-activity-share',
    component: resolve => require(['@/views/market/housePoster/poster.vue'], resolve),
    meta: {
      title: '楼盘海报列表',
      tabbar: {
        show: false
      }
    }
  },
  // 切换渠道
  {
    path: '/change/channel',
    name: 'change-channel',
    component: resolve => require(['@/views/market/channel/index.vue'], resolve),
    meta: {
      title: '切换渠道',
      tabbar: {
        show: false
      }
    }
  },
  // 活动详情
  {
    path: '/market/rule/detail',
    name: 'rule-detail',
    component: resolve => require(['@/views/market/activity/index.vue'], resolve),
    meta: {
      title: '活动详情',
      tabbar: {
        show: false
      }
    }
  },
  // 所有楼盘
  {
    path: '/market/classify/allmarket',
    name: 'all-market',
    component: resolve => require(['@/views/market/allMarket.vue'], resolve),
    meta: {
      title: '全部楼盘',
      tabbar: {
        show: false
      }
    }
  },
  // 我的楼盘
  {
    path: '/market/classify/mymarket',
    name: 'my-market',
    component: resolve => require(['@/views/market/myMarket.vue'], resolve),
    meta: {
      title: '我的楼盘',
      tabbar: {
        show: false
      }
    }
  },
  // 免费楼盘
  {
    path: '/market/classify/freemarket',
    name: 'free-market',
    component: resolve => require(['@/views/market/freeMarket.vue'], resolve),
    meta: {
      title: '免费楼盘',
      tabbar: {
        show: false
      }
    }
  },
  // 热门楼盘
  {
    path: '/market/classify/hotmarket',
    name: 'hot-market',
    component: resolve => require(['@/views/market/hotMarket.vue'], resolve),
    meta: {
      title: '热门楼盘',
      tabbar: {
        show: false
      }
    }
  },
  // 地图找房
  {
    path: '/market/classify/mapmarket',
    name: 'hot-market',
    component: resolve => require(['@/views/market/mapMarket.vue'], resolve),
    meta: {
      title: '地图找房',
      tabbar: {
        show: false
      }
    }
  },
]
