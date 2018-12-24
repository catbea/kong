import * as types from '@/store/mutation-types'
const state = {
  currDataDynamicsTab: 0
}

const getters = {
  currDataDynamicsTab: state => {
    return state.currDataDynamicsTab
  }
}

const actions = {}

const mutations = {
  [types.CURR_DATA_DYNAMICS_TAB](state, currDataDynamicsTab) {
    state.currDataDynamicsTab = currDataDynamicsTab
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
