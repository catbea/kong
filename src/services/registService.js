import xhr from './xhr/'
class registService {
  /**
   * 注册发送手机验证码
   * @param {*} mobile
   */
  sendMsgRegister(mobile) {
    return xhr({
      url: '/register/sendMsgRegister',
      body: {
        mobile
      }
    })
  }

  /**
   * 注册
   * @param {*} registerRequestVO
   */
  register(registerRequestVO) {
    return xhr({
      method: 'POST',
      url: '/register/register',
      body: registerRequestVO
    })
  }

  /**
   * 通过enterpriseId查询企业相关信息
   * @param {*} enterpriseId
   */
  queryByRegister(enterpriseId) {
    return xhr({
      url: '/register/queryByRegister',
      body: {
        enterpriseId
      }
    })
  }

  /**
   * 查询推荐人信息
   * @param {} aegntId
   */
  queryReferrerInfo(aegntId) {
    return xhr({
      url: '/register/queryInfo',
      body: {
        aegntId
      }
    })
  }
}
export default new registService()
