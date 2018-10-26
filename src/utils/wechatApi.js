// const wx = require('weixin-js-sdk')
// import wx from 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js'
import commonService from '@/services/commonService'
class WechatApi {
  constructor() {
    this.wx = wx
    // this.queue = new Map()
    // this.counter = 0
    // this.initTimer = null
    // this.queueTimer = null
    // this.initCount = 0
    // this.ready = false
  }

  async init() {
    const ticket = await this._getTicket()
    this.wx.config(ticket)
  }

  /**
   * 获取微信Ticket
   */
  async _getTicket() {
    let url = window.location.href.split('#')[0]
    let res = await commonService.wxTicket(url ,1)
    let conf = {
      debug: false, // __DEV__ 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.data.appId, // 必填，公众号的唯一标识
      timestamp: res.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
      signature: res.data.signature, // 必填，签名，见附录1
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'showAllNonBaseMenuItem'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    }
    return conf
  }
}
export default new WechatApi()
