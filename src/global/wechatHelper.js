import store from '@/store/'
import wx from 'weixin-js-sdk'

const jsApiList = [
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

class WechatHelper {
  constructor() {
    this.wx = wx
    // this.queue = new Map()  
    // this.counter = 0
    // this.initTimer = null
    // this.queueTimer = null
    // this.initCount = 0
    // this.ready = false
    // this.init()
  }


  async init() {
    console.log('init');
    await store.dispatch('setJssdkConfig', jsApiList)
    this.wx.config(store.state.wx.jssdkConfig)
    this.getUserArea()
  }

  /**
   * 获取定位,并根据定位的经纬值,更新store存储的位置
   */
  async getUserArea() {
    this.wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: res => {
        store.dispatch('setWxLocation', res)
      },
      fail: () => {
        console.log('wx location fail')
      },
      cancel: res => {
        console.log(res, 'wx location cancel')
      }
    })
  }

  /**
   * 设置分享设置
   * @param {*} conf 
   */
  _setShare(conf) {
    const defaultConf = {
      
    }
  }
}
export default new WechatHelper()