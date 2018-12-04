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
  wxUserInfo(code, cropId) {
    return xhr({
      url: '/cp/oauth2/getUserInfoByCode',
      body: {
        code,
        cropId
      }
    })
  }
}
export default new CommonService()
