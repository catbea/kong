import xhr from './xhr/'
class UserService {
  /**
   * 获取用户信息
   * @param {*} agentId 用户id
   */
  getUserInfo(agentId) {
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
  getUserVipInfo(agentId) {
    return xhr({
      method: 'post',
      url: '/userPackage/vipPackage',
      body: {
        agentId
      }
    })
  }

  /**
   * 获取经纪人标签列表
   * @param {*} Authorization   用户token
   */
  getAgentLabelList(Authorization) {
    return xhr({
      url: '/dictionary/getAgentLabel',
      body: {
        Authorization
      }
    })
  }
  /**
   * 新增经纪人标签基础信息
 
   */
  // getupdateByUser() {
  //   return xhr({
  //     method:'POST',
  //     url: '/user/updateAgentByUserId',
  //   })
  // }
/**
 * 获取经纪人个性签名列表
 * @param {*} Authorization 
 * @param {*} current 
 * @param {*} size 
 */

  getupdateByUser() {
    return xhr({
      method: 'POST',
      url: '/user/updateAgentByUserId',
    })
  }
  /**
   * 获取经纪人个性签名列表
   * @param {*} Authorization 
   * @param {*} current 
   * @param {*} size 
   */
  getAgentSignaturePage(Authorization, current, size = 10) {
    return xhr({
      url: '/dictionary/getAgentSignaturePage',
      body: {
        Authorization,
        current,
        size
      }
    })
  }
  /**获取个人头像列表 */
  getAgentImgList() {
    return xhr({
      url: '/dictionary/getAgentHeadImgList',
     
    })
  }

  /**
   * 获取分享图片
   * @param {*} shareType
   * @param {*} shareId
   * @param {*} agentId
   */
  getShareInfo(shareType, shareId, agentId) {
    return xhr({
      url: '/shareImg/user',
      body: {
        shareType,
        shareId,
        agentId
      }
    })
  }
 
  /**
   * 【企业微信】文章收藏列表
   * @param {*} current 
   * @param {*} size 
   */
  getqueryInfoList(current, size = 10) {
    return xhr({
      url: '/cpCollect/queryInfoList',
      body: {
        current,
        size
      }
    })
  }

  /**
   * 【企业微信】楼盘收藏列表
   * @param {*} current 
   * @param {*} size 
   */
  getqueryLinkerList(current, size = 10) {
    return xhr({
      url: '/cpCollect/queryLinkerList',
      body: {
        current,
        size
      }
    })
  }
  /**
   * 经纪人楼盘收藏 
   * @param {*} linkerId 
   * @param {*} status 
   * @param {*} type 
   */
  getlinkerDynamics(linkerId, status, type = 1) {
    return xhr({
      method: 'POST',
      url: '/cpCollect/linkerCollection',
      body: {
        linkerId,
        status,
        type
      }
    })
  }
  /**
   * 文章收藏
   * @param {*} infoId 
   * @param {*} deleteFlag 
   * @param {*} type 
   */

  getlinkerCollection(infoId, deleteType, type = 1) {
    return xhr({
      method: 'POST',
      url: '/cpInformationCollect/insertInfo',
      body: {
        infoId,
        deleteType,
        type
      }
    })
  }
  /**
   * 历史文章
   * @param {*} current 
   * @param {*} size 
   */
  gethistoryList(current, size = 10) {
    return xhr({
      url: '/cpInformation/historyList',
      body: {
        current,
        size
      }
    })
  }

  /**
   * 我的账单
   * @param {*} agentId 
   * @param {*} current 
   * @param {*} size 
   */
  getMyBillList(current, size = 4) {
    return xhr({
      url: '/account/purchaseHistory',
      body: {
        current,
        size
      }
    })
  }
  /**
   * 历史浏览列表
   * @param {*} agentId 
   * @param {*} current 
   * @param {*} size 
   */
  getBrowseHistoryList(agentId, current, size = 10) {
    return xhr({
      url: '/cpInformation/historyList',
      body: {
        agentId,
        current,
        size
      }
    })
  }

  /**
   * 删除文章
   * @param {*} agentId 
   * @param {*} infoIds 
   */
  deleHistoryArticle(infoIds) {
    return xhr({
      method: 'POST',
      url: '/cpInformation/batchDelete',
      body: {
        infoIds
      }
    })
  }

  /**
   * 获取热门楼盘
   */
  getHotLinker(){
    return xhr({
      url: '/linker/getLinkerHot',
      body: {
        
      }
    })
  }

}
export default new UserService()
