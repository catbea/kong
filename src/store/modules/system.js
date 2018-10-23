import * as types from '@/store/mutation-types'

const state = {
  versions: '0.1',
  tabbar: {
    show: true
  }
}

const getters = {
  versions: state => state.versions,
  tabbar: state => state.tabbar
}

const actions = {

}

const mutations = {
  [types.VERSIONS](state, data) {
    state.versions = data
  },
  [types.TABBAR](state, data) {
    state.tabbar = data
  }
}

export default {
  state,
  getters,
  actions,
mutations}
