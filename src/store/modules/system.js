import * as types from '@/store/mutation-types'

const state = {
  versions: '0.1',
  tabbar: {
    show: false,
    items: [
      {
        name: '数据',
        icon: require('IMG/tabbar/Rectangle 13@2x.png'),
        icon_atc: require('IMG/tabbar/Rectangle 13 Copy 6@2x.png'),
        path: '/dynamics',
        info: 0
      },
      {
        name: '楼盘',
        icon: require('IMG/tabbar/Rectangle 13@2x(1).png'),
        icon_atc: require('IMG/tabbar/Rectangle 13@2x(5).png'),
        path: '/market',
        info: 0
      },
      {
        name: '发现',
        icon: require('IMG/tabbar/Rectangle 13@2x(2).png'),
        icon_atc: require('IMG/tabbar/Rectangle 13 Copy 5@2x.png'),
        path: '/discover',
        info: 0
      },
      {
        name: '客户',
        icon: require('IMG/tabbar/Rectangle 13@2x(3).png'),
        icon_atc: require('IMG/tabbar/Rectangle 13@2x(6).png'),
        path: '/custom',
        info: 0
      },
      {
        name: '名片',
        icon: require('IMG/tabbar/Rectangle 13@2x(4).png'),
        icon_atc: require('IMG/tabbar/Rectangle 13@2x(7).png'),
        path: '/user',
        info: 0
      }
    ]
  },
  newMsgStatus: false,
  newMsgContent: null
}

const getters = {
  versions: state => state.versions,
  tabbar: state => state.tabbar,
  newMsgStatus: state => state.newMsgStatus,
  newMsgContent: state => state.newMsgContent
}

const actions = {}

const mutations = {
  [types.VERSIONS](state, data) {
    state.versions = data
  },
  [types.TABBAR](state, data) {
    state.tabbar = Object.assign(state.tabbar, data)
  },
  [types.NEW_MSG_STATUS](state, newMsgStatus) {
    state.newMsgStatus = newMsgStatus
  },
  [types.NEW_MSG_CONTENT](state, newMsgContent) {
    state.newMsgContent = newMsgContent
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
