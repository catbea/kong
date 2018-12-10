import * as types from '@/store/mutation-types'

const state = {
  versions: '0.1',
  tabbar: {
    show: false,
    items: [
      {
        name: '数据',
        icon: require('IMG/tabbar/data_tab.png'),
        icon_atc: require('IMG/tabbar/data_tab_act.png'),
        path: '/dynamics',
        info: 0
      },
      {
        name: '楼盘',
        icon: require('IMG/tabbar/project_tab.png'),
        icon_atc: require('IMG/tabbar/project_tab_act.png'),
        path: '/market',
        info: 0
      },
      {
        name: '发现',
        icon: require('IMG/tabbar/dis_tab.png'),
        icon_atc: require('IMG/tabbar/dis_tab_act.png'),
        path: '/discover',
        info: 0
      },
      {
        name: '客户',
        icon: require('IMG/tabbar/client_tab.png'),
        icon_atc: require('IMG/tabbar/client_tab_act.png'),
        path: '/custom',
        info: 0
      },
      {
        name: '名片',
        icon: require('IMG/tabbar/card_tab.png'),
        icon_atc: require('IMG/tabbar/card_tab_act.png'),
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
