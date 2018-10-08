import * as types from '@/store/mutation-types'

const state = {
  versions: '0.1'
}

const getters = {
  versions: state => state.versions
}

const actions = {

}

const mutations = {
  [types.VERSIONS] (state, data) {
    state.versions = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
