import * as types from '@/store/mutation-types'
const state = {
  currMyWriteTab: '2'
}

const getters = {
  currMyWriteTab: state => {
    return state.currMyWriteTab
  }
}

const actions = {}

const mutations = {
  [types.MYWRITE_TAB](state, currMyWriteTab) {
    state.currMyWriteTab = currMyWriteTab
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
