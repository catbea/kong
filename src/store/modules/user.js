import * as types from '@/store/mutation-types'
import userService from '@/services/userService'

const state = {
  userInfo: {},
  userVipInfo: {},
  userArea: {
    city: '深圳市'
  }
}

const getters = {
  userInfo: state => state.userInfo,
  userVipInfo: state => state.userVipInfo,
  userArea: state => state.userArea
}

const actions = {
  async getUserInfo({ commit }, payload) {
    const res = await userService.getUserInfo(payload)
    commit(types.USER_INFO, res.data)
  },
  async getUserVipInfo({ commit }, payload) {
    const res = await userService.getUserVipInfo(payload)
    // 后端坑爹,是vip时vipStatus为0,加入isvip区分
    res.data.isvip = res.data.vipStatus === 0
    commit(types.USER_VIP_INFO, res.data)
  }
}

const mutations = {
  [types.USER_INFO](state, data) {
    state.userInfo = data
  },
  [types.USER_VIP_INFO](state, data) {
    state.userVipInfo = data
  },
  [types.USER_AREA](state, data) {
    // state.userArea = Object.assign(state.userArea, data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
