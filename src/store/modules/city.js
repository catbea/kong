import * as types from '@/store/mutation-types'
import commonService from '@/services/commonService'
const state = {
  cityMap: [],
  hotCityMap: []
}

const getters = {
  cityMap: state => state.cityMap,
  hotCityMap: state => state.hotCityMap
}

const actions = {
  async getAllCity({ commit }) {
    const res = await Promise.all([commonService.getHotCityList(), commonService.getCityList()])
    commit(types.HOT_CITY_CITY, res[0])
    commit(types.CITY_LIST, res[1])
  }
}

const mutations = {
  [types.CITY_LIST](state, data) {
    state.cityMap = data
  },
  [types.HOT_CITY_CITY](state, data) {
    state.hotCityMap = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
