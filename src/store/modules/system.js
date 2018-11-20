import * as types from '@/store/mutation-types'

const state = {
  versions: '0.1',
  tabbar: {
    show: false,
    items: [
      {
        name: '数据',
        icon: require('IMG/tabbar/message.png'),
        icon_atc: require('IMG/tabbar/message_atc.png'),
        path: '/dynamics',
        info: 10
      },
      {
        name: '楼盘',
        icon: require('IMG/tabbar/market.png'),
        icon_atc: require('IMG/tabbar/market_atc.png'),
        path: '/market',
        info: 0
      },
      {
        name: '发现',
        icon: require('IMG/tabbar/client.png'),
        icon_atc: require('IMG/tabbar/client_atc.png'),
        path: '/discover',
        info: 0
      },
      {
        name: '客户',
        icon: require('IMG/tabbar/business_card.png'),
        icon_atc: require('IMG/tabbar/business_card_atc.png'),
        path: '/custom',
        info: 0
      },
      {
        name: '名片',
        icon: require('IMG/tabbar/business_card.png'),
        icon_atc: require('IMG/tabbar/business_card_atc.png'),
        path: '/user',
        info: 0
      }
    ]
  }
}

const getters = {
  versions: state => state.versions,
  tabbar: state => state.tabbar
}

const actions = {}

const mutations = {
  [types.VERSIONS](state, data) {
    state.versions = data
  },
  [types.TABBAR](state, data) {
    state.tabbar = Object.assign(state.tabbar, data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
