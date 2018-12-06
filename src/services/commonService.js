/**
 * 非业务内的service
 */
import xhr from './xhr'
class CommonService {
  wxTicket(url, agentId = '') {
    return xhr({
      url: '/cp/oauth2/signature/corp',
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
   * 通过code获取企业微信账户信息
   * @param code 微信跳转地址截取code
   * @param payCorpId 
   */
  getPayOpenId(code, corpId, pcOpenId) {
    return xhr({
      url: '/cp/oauth2/getPayOpenId',
      body: {
        code,
        corpId,
        pcOpenId
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
}
export default new CommonService()
