export default [
  {
    path: '/market',
    name: 'market',
    component: resolve => require(['@/views/market/index.vue'], resolve),
    meta: {
      title: '楼盘'
    }
  },
  {
    path: '/market/marketDetail/:userId',
    name: 'marketDetailNotOpen',
    component: resolve => require(['@/views/market/marketDetail/index.vue'], resolve),
    meta: {
      title: '楼盘详情'
    }
  },
  {
    path: '/marketDetail/commission',
    name: 'marketDetail-commission',
    component: resolve => require(['@/views/market/marketDetail/commission/index.vue'], resolve),
    meta: {
      title: '楼盘佣金'
    }
  },
  {
    path: '/marketDetail/info',
    name: 'marketDetail-info',
    component: resolve => require(['@/views/market/marketDetail/marketDetailInfo/index.vue'], resolve),
    meta: {
      title: '楼盘详细信息'
    }
  },{
    path: '/marketDetail/open',
    name: 'marketDetail-open',
    component: resolve => require(['@/views/market/marketDetail/marketOpen/index.vue'], resolve),
    meta: {
      title: '开通楼盘'
    }
  },
  {
    path: '/marketDetail/share',
    name: 'marketDetail-share',
    component: resolve => require(['@/views/market/marketDetail/marketShare/index.vue'], resolve),
    meta: {
      title: '楼盘分享'
    },
    children:[
     {
      path: 'save',
      name: 'save-poster',
      component: resolve => require(['@/views/market/marketDetail/marketShare/savePoster/index.vue'], resolve),
      meta: {
        title: '保存海报'
      }
     }
    ]
  }
]
