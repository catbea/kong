import * as types from '@/store/mutation-types'
import commonService from '@/services/commonService'
const state = {
  cityMap:{}
}

const getters = {
  cityMap: state => state.cityMap
}

const actions = {
  async getAllCity({commit}) {
    const res = await Promise.all([commonService.getHotCityList(),commonService.getCityList()])
    let tempResult = []
    tempResult.push ({
      character: '热',
      city:res[0]
    })
    tempResult = tempResult.concat(res[1])
    commit(types.CITY_LIST, tempResult)
  }
}

const mutations = {
  [types.CITY_LIST](state, data) {
    state.cityMap = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}