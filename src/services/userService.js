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

  /**
   * 获取用户vip信息
   * @param {*} agentId 
   */
  getUserVipInfo (agentId) {
    return xhr({
      method:'post',
      url:'/userPackage/vipPackage',
      body: {
        agentId
      }
    })
  }

  /**
   * 获取分享图片
   * @param {*} shareType 
   * @param {*} shareId 
   * @param {*} agentId 
   */
  getShareInfo (shareType, shareId, agentId) {
    return xhr({
      url: '/shareImg/user',
      body:{
        shareType,
        shareId,
        agentId
      }
    })
  }
}
export default new UserService()
