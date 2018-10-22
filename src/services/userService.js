import xhr from './xhr/'
class UserService {
  
  /**
   * 获取用户信息
   * @param {*} agentId 用户id
   */
  getUserInfo (agentId) {
    return xhr({
      url: '/user/queryInfo',
      body: {
        agentId
      }
    })
  }

  getUserVipInfo (agentId) {
    return xhr({
      method:'post',
      url:'/userPackage/vipPackage',
      body: {
        agentId
      }
    })
  }
}
export default new UserService()
