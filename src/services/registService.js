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

  /**
   * 查询分销商列表
   * @param {*} enterpriseId
   * @param {*} city
   * @param {*} searchData
   */
  queryRegisterDistributor(enterpriseId, city, searchData) {
    return xhr({
      url: '/register/queryRegisterDistributor',
      body: {
        enterpriseId,
        city,
        searchData
      }
    })
  }

  /**
   * 查询注册推荐人信息
   * @param {*} enterpriseId
   * @param {*} registerType
   * @param {*} parentUserId
   */
  queryRegisterRecommendInfo(enterpriseId, registerType, parentUserId) {
    return xhr({
      url: '/register/queryRecommendInfo',
      body: {
        enterpriseId,
        registerType,
        parentUserId
      }
    })
  }
}
export default new registService()
