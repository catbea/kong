/**
 * 非业务内的service
 */
import xhr from './xhr'
class CommonService {
  wxTicket(url) {
    return xhr({
      url: '/cp/oauth2/signature/corp',
      body: {
        url
      }
    })
  }

  wxTicketByAgentid(url,agentId) {
    return xhr({
      url: '/cp/oauth2/signature/passSignature',
      body: {
        url,
        agentId
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
   * 修改用户引导是否为首次
   * @param articleEditFlag: 随手编新手引导标志位，默认为0，0：未完成指引；1：已完成指引 ,
   * @param articleShareFlag: 文章分享引导标志位，默认为0，0：未完成指引；1：已完成指引 ,
   */
  updateUserExpandInfo(articleShareFlag, articleEditFlag) {
    return xhr({
      url: '/user/updateUserExpandInfo',
      method: 'post',
      body: {
        articleShareFlag,
        articleEditFlag
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
