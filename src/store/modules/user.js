import * as types from '@/store/mutation-types'
import userService from '@/services/userService'

const state = {
  userInfo: {
    "agentId": "705",
    "avatarUrl": "http://720ljq2test-10037467.file.myqcloud.com/ljqzs/user_head_img/male_001.png",
    "distributorId": "123",
    "distributorName": "青岛佳乐分销商SIT测试2",
    "labelList": [
      {
        "id": "",
        "labelId": "113",
        "labelName": "恋爱专家",
        "userId": ""
      },
      {
        "id": "",
        "labelId": "112",
        "labelName": "撩妹高手",
        "userId": ""
      },
      {
        "id": "",
        "labelId": "111",
        "labelName": "情场屠夫",
        "userId": ""
      }
    ],
    "majorCity": "深圳市",
    "majorRegion": "广东省/深圳市/福田区",
    "name": "123",
    "organizationId": "90",
    "organizationName": "",
    "registerMobile": "18907437200",
    "signature": "创造价值，赢得尊重\n",
    "tempPhone": "13714860003",
    "wechatAccount": "string"
  },
  userVipInfo: {},
  userArea: {
    city: '深圳市'
  },
  reportAddInfo: {
    linkerId: '',
    linkerName: '',
    clientName: '',
    clientPhone: ''
  }
}

const getters = {
  userInfo: state => state.userInfo,
  userVipInfo: state => state.userVipInfo,
  userArea: state => state.userArea,
  reportAddInfo: state => state.reportAddInfo
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
  },
  getReportAddInfo({ commit }, data) {
    commit(types.REPORT_INFO, data)
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
  },
  [types.REPORT_INFO](state, data) {
    state.reportAddInfo = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
