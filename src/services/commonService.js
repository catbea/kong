/**
 * 非业务内的service
 */
import xhr from './xhr'
class CommonService {
  wxTicket(url) {
    return xhr({
      url: '/cp/oauth2/signature/corp1',
      body: {
        url
      }
    })
  }

  /**
   * 通过code获取企业微信账户信息
   * @param code 微信跳转地址截取code
   */
  wxUserInfo(code, corpId) {
    return xhr({
      url: '/cp/oauth2/getUserInfoByCode',
      body: {
        code,
        corpId
      }
    })
  }

  /**
   * 通过code获取企业微信账户信息
   * @param code 微信跳转地址截取code
   * @param payCorpId
   */
  getPayOpenId(code, corpId, pcOpenid) {
    return xhr({
      url: '/cp/oauth2/getPayOpenId',
      body: {
        code,
        corpId,
        pcOpenid
      }
    })
  }

  /**
   *  vip开通
   * @param param
   */
  payForVip(param) {
    return xhr({
      url: '/weixinPay/vipPayment',
      method: 'post',
      body: param
    })
  }

  /**
   *  楼盘开通
   * @param param
   */
  payForProject(param) {
    return xhr({
      url: '/weixinPay/payment',
      method: 'post',
      body: param
    })
  }

  /**
   * 陶盘支付
   */
  packagePayment(param) {
    return xhr({
      url: '/weixinPay/packagePayment',
      method: 'post',
      body: param
    })
  }

  /**
   * 取消支付
   */
  cancelPayment(purchaseId) {
    return xhr({
      url: '/weixinPay/cancelPayment',
      method: 'post',
      body: { purchaseId }
    })
  }

  /**
   * 获取所有城市列表
   */
  getCityList() {
    return xhr({
      url: '/common/getCity'
    })
  }

  /**
   * 获取热门城市列表
   */
  getHotCityList() {
    return xhr({
      url: '/common/getCityHot'
    })
  }

  /**
   * 根据经纬度获取城市
   */
  getLocation(log, lat) {
    return xhr({
      url: '/common/getCityByXY',
      body: {
        log,
        lat
      }
    })
  }

  /**
   * 获取聊天
   */
  getUserSig() {
    return xhr({
      url: '/cpIM/getUserSig',
      body: {}
    })
  }

  /**
   * 版本更新查询
   * @param {*} type
   * @param {*} timeStamp
   */
  queryVersion(type, timeStamp) {
    return xhr({
      url: '/versionRecord/queryVersion',
      body: {
        type,
        timeStamp
      }
    })
  }
}
export default new CommonService()
