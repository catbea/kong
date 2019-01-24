// 微信相关
import * as types from '@/store/mutation-types'
import commonService from '@/services/commonService'
const state = {
  jssdkConfig: null,
  wxLocaltion: {}
}

const getters = {
  jssdkConfig: state => state.jssdkConfig
}

const actions = {
  async setJssdkConfig({ commit }, data) {
    const url = window.location.href.split('#')[0]
    // alert('wxTicket get url:'+url)
    let result = ''
    if (data.agentId) {
      result = await commonService.wxTicketByAgentid(url, data.agentId)
    } else {
      result = await commonService.wxTicket(url)
    }
    // alert('wxTicket get done'+result.appId)
    const conf = {
      beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      debug: false, // __DEV__ 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: result.appId, // 必填，公众号的唯一标识
      timestamp: result.timestamp, // 必填，生成签名的时间戳
      nonceStr: result.nonceStr, // 必填，生成签名的随机串
      signature: result.signature, // 必填，签名，见附录1
      jsApiList: data.jsApiList
    }
    commit(types.WX_JSSDK, conf)
  },
  async setWxLocation({ commit }, data) {
    const result = await commonService.getLocation(data.longitude, data.latitude)
    commit(types.USER_AREA, {
      longitude: log,
      latitude: lat,
      city: result
    })
  }
}

const mutations = {
  [types.WX_JSSDK](state, data) {
    state.jssdkConfig = data
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
