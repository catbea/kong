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
    path: '/evaluate/standard',
    name: 'evaluate-standard',
    component: resolve => require(['@/views/market/evaluateStandard.vue'], resolve),
    meta: {
      title: '用户点评行为规范',
      tabbar: {
        show: false
      }
    }
  }
]
