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
    // this.queue = new Map()
    // this.counter = 0
    // this.initTimer = null
    // this.queueTimer = null
    // this.initCount = 0
    // this.ready = false
    // this.init()
  }

  hideItems() {
    this.wx.hideOptionMenu()
  }

  async init() {
    console.log('init')
    // this.wx.hideAllNonBaseMenuItem()

    // wx.hideMenuItems({
    //   menuList: ['menuItem:share:appMessage', 'menuItem:share:wechat', 'menuItem:share:timeline', 'menuItem:copyUrl', 'menuItem:openWithSafari', 'menuItem:share:email'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    // })
    // alert('init'+location.href)
    await store.dispatch('setJssdkConfig', jsApiList)
    // alert('setJssdkConfig done')
    await this.wx.config(store.state.wx.jssdkConfig)
    // alert('wx.config')
    // this.wx.success(() => {
    //   console.log(success);
    //   alert('wechat-success')
    // })
    // this.wx.fail((err) => {
    //   alert('wechat-fail')
    // })
    await this.getUserArea()
  }

  /**
   * 获取定位,并根据定位的经纬值,更新store存储的位置
   */
  async getUserArea() {
    this.wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: res => {
        // alert('location')
        store.dispatch('setWxLocation', res)
      },
      fail: () => {
        // alert('location fail')
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
  async setShare(conf) {
    const defaultConf = {
      title: '',
      desc: '',
      link: '',
      imgUrl: '',
      success: () => {}
    }
    this._universalShare(conf)
    // return new Promise ((resolve, reject) => {
    //   this._universalShare(conf)
    //   // this.wx.updateAppMessageShareData({

    //   // })
    // })
  }
  /**
   * 设置分享泛方法
   * @param {*} conf
   */
  _universalShare(conf) {
    console.log('_universalShare', conf)
    // alert(conf)
    this.wx.onMenuShareAppMessage(conf)
    this.wx.onMenuShareTimeline(conf)
    this.wx.showOptionMenu()

    // this.wx.updateAppMessageShareData(conf)
    // this.wx.updateTimelineShareData(conf)
    // this.wx.showAllNonBaseMenuItem()
  }

  _apiCheck() {
    this.wx.checkJsApi({
      jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function(res) {
        console.log('api可用情况')
        console.log(res)

        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      }
    })
  }
}
export default new WechatHelper()
