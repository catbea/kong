import * as types from '@/store/mutation-types'

const state = {
  currSelectedCoupon: null,
  projectCoupons: null
}

const getters = {
  projectCoupons: state => {
    return state.projectCoupons
  },
  currSelectedCoupon: state => {
    return state.currSelectedCoupon
  }
}

const actions = {
  setProjectCoupons({ commit }, projectCoupons) {
    commit(types.PROJECT_COUPONS, projectCoupons)
  },

  setCurrSelectedCoupon({ commit }, currSelectedCoupon) {
    commit(types.CURR_SELECTED_COUPON, currSelectedCoupon)
  }
}

const mutations = {
  [types.PROJECT_COUPONS](state, projectCoupons) {
    state.projectCoupons = projectCoupons
  },

  [types.CURR_SELECTED_COUPON](state, currSelectedCoupon) {
    state.canUseCouponsNum = currSelectedCoupon
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
