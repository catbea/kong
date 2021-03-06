import store from '@/store/'

const jsApiList = [
  'chooseWXPay', // 微信支付
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
  'translateVoice',
  'updateAppMessageShareData',
  'updateTimelineShareData',
  'hideAllNonBaseMenuItem',
  'showAllNonBaseMenuItem'
] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2

class WechatHelper {
  constructor() {
    this.wx = wx
  }

  hideItems() {
    this.wx.hideOptionMenu()
  }

  async init(agentId = '') {
    await store.dispatch('setJssdkConfig', { jsApiList: jsApiList, agentId: agentId })
    await this.wx.config(store.state.wx.jssdkConfig)
    // if (agentId.length == 0) await this.getUserArea()
    if (agentId.length == 0) {
      setTimeout(()=> {
        this.getUserArea()
      },500)
    }
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
   * @param {*} friendConf
   * @param {*} timelineConf
   */
  async setShare(friendConf, timelineConf) {
    const defaultConf = {
      title: '',
      desc: '',
      link: '',
      imgUrl: '',
      success: () => {},
      cancel: () => {}
    }
    this._universalShare(friendConf, timelineConf)
  }
  /**
   * 设置分享泛方法
   * @param {*} friendConf
   * @param {*} timelineConf
   */
  _universalShare(friendConf, timelineConf) {
    console.log('share share share')
    this.wx.onMenuShareAppMessage(friendConf)
    this.wx.onMenuShareTimeline(timelineConf)
    this.wx.showOptionMenu()
    this.wx.hideMenuItems({
      menuList: ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:facebook', 'menuItem:share:QZone', 'menuItem:copyUrl', 'menuItem:openWithSafari', 'menuItem:share:email']
    })
    this.wx.showMenuItems({
      menuList: ['menuItem:refresh', 'menuItem:share:appMessage', 'menuItem:share:timeline'] // 要隐藏的菜单项，所有menu项见附录3
    })
  }

  _apiCheck() {
    this.wx.checkJsApi({
      jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function(res) {
        alert(res + '_apiCheck')
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      }
    })
  }

  shareWechat(conf) {
    store.dispatch('setJssdkConfig', jsApiList)
    this.wx.config(store.state.wx.jssdkConfig)
    this.wx.ready(function() {
      var shareData = conf
      this.wx.onMenuShareAppMessage(shareData) // 分享给朋友
      this.wx.onMenuShareTimeline(shareData) // 分享到朋友圈
      alert('ready')
    })
    var shareData = conf
    this.wx.onMenuShareAppMessage(shareData) // 分享给朋友
    this.wx.onMenuShareTimeline(shareData) // 分享到朋友圈
  }
}
export default new WechatHelper()
