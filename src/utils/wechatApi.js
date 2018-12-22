// const wx = require('weixin-js-sdk')
// import wx from 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js'
import store from '@/store/'
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
    store.dispatch('setJssdkConfig', ticket)
    this.wx.config(ticket)
    this.getUserArea()
  }

  async getUserArea() {
    this.wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: (res) => {
        console.log('wx getLocation')
        this.getLocation(res.longitude, res.latitude)
      },
      fail: () => {
        console.log('wx location fail')
      },
      cancel: (res) => {
        console.log(res, 'wx location cancel')
      }
    })
  }

  async getLocation(log, lat) {
    const userArea = await commonService.getLocation(log, lat)
    store.dispatch('userArea', Object.assign(store.getters.userArea, {
      longitude: log,
      latitude: lat,
      city: userArea
    }))
  }

  async wechatShare(shareData) {
    return new Promise((resolve, reject) => {
      // this.wx.ready(function () {
        // 分享到好友
        this.wx.onMenuShareWechat({
          title: shareData.title, // 分享标题
          link: shareData.link, // 分享链接
          imgUrl: shareData.image, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            resolve()
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            reject()
          }
        })
        // 分享到朋友圈
        this.wx.onMenuShareTimeline({
          title: shareData.title, // 分享标题
          link: shareData.link, // 分享链接
          imgUrl: shareData.image, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            resolve()
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            reject()
          }
        })
      // })
    })
  }

  /**
   * 获取微信Ticket
   */
  async _getTicket() {
    let url = window.location.href.split('#')[0]
    let res = await commonService.wxTicket(url, 1)
    let conf = {
      beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      debug: false, // __DEV__ 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.appId, // 必填，公众号的唯一标识
      timestamp: res.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.nonceStr, // 必填，生成签名的随机串
      signature: res.signature, // 必填，签名，见附录1
      jsApiList: [
        'chooseWXPay',
        'hideOptionMenu',
        'showOptionMenu',
        'hideMenuItems',
        'showMenuItems',
        'getLocation',
        'getNetworkType',
        'onMenuShareAppMessage',
        'onMenuShareWechat',
        'onMenuShareTimeline',
        'chooseImage',
        'getLocalImgData',
        'startRecord', // 录音开始api
        'stopRecord', // 录音结束api
        'onVoiceRecordEnd', // 超过一分钟自动停止api
        'playVoice', // 播放录音api
        'pauseVoice', // 暂停录音api
        'stopVoice', // 停止播放api
        'uploadVoice', // 上传语音api
        'onVoicePlayEnd', // 监听语音播放完毕api
        'translateVoice'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    }
    return conf
  }
}
export default new WechatApi()
