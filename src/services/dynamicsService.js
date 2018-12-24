import xhr from './xhr/'
class DynamicsService {
  /**
   * 首页数据中心统计数据、5条动态、是否有未读消息
   */
  getDynamicsCollect() {
    return xhr({
      url: '/homepage/getDataCenterInfo'
    })
  }

  /**
   * 更新首页数据中心的统计数据
   */
  updateDynamicsCollect() {
    return xhr({
      method: 'POST',
      url: '/homepage/updateDataCenterInfo'
    })
  }

  /**
   * 首页AI荐盘、我的楼房
   */
  getEstateInfo() {
    return xhr({
      url: '/homepage/getBuildingInfo'
    })
  }
  /**
   * 消息列表和未读消息数量
   */
  getAgentMsgAndTotal() {
    return xhr({
      url: '/cpIM/agentMsgAndTotal'
    })
  }

  /**
   * 查询经纪人的系统消息列表
   * @param {*} current
   * @param {*} size
   */
  getSystemMessage(current, size ) {
    return xhr({
      url: '/cpIM/getSystemMessageList',
      body: {
        current,
        size
      }
    })
  }
  /**
   * 【企业微信】全部数据动态统计
   */
  getAllDynamicCount() {
    return xhr({
      url: '/dataDynamic/getAllDynamicCount'
    })
  }
  /**
   * 【企业微信】全部数据动态列表
   * @param {*} current
   * @param {*} size
   */
  getAllDynamicList() {
    return xhr({
      url: '/dataDynamic/getAllDynamicList',
   
    })
  }
  /**
   * 【企业微信】文章数据动态统计
   */
  getArticleDynamicCount() {
    return xhr({
      url: '/dataDynamic/getArticleDynamicCount'
    })
  }
  /**
   * 【企业微信】文章数据动态列表
   * @param {*} current
   * @param {*} size
   */
  getArticleDynamicList(current, size = 10) {
    return xhr({
      url: '/dataDynamic/getArticleDynamicList',
      body: {
        current,
        size
      }
    })
  }
  /**
   * 【企业微信】名片数据动态统计
   */
  getCardDynamicCount() {
    return xhr({
      url: '/dataDynamic/getCardDynamicCount'
    })
  }
  /**
   * 【企业微信】名片数据动态列表
   * @param {*} current
   * @param {*} size
   */
  getCardDynamicList(current, size = 10) {
    return xhr({
      url: '/dataDynamic/getCardDynamicList',
      body: {
        current,
        size
      }
    })
  }
  /**
   * 【企业微信】楼盘数据动态统计
   */
  getHouseDynamicCount() {
    return xhr({
      url: '/dataDynamic/getHouseDynamicCount'
    })
  }
  /**
   * 【企业微信】楼盘动态列表
   * @param {*} current
   * @param {*} size
   */
  getHouseDynamicList(current, size = 10) {
    return xhr({
      url: '/dataDynamic/getHouseDynamicList',
      body: {
        current,
        size
      }
    })
  }
  /**
   * 【企业微信】单个文章数据动态统计
   */
  getSingleArticleCount(articleId) {
    return xhr({
      url: '/dataDynamic/getSingleArticleDynamicCount',
      body: {
        articleId
      }
    })
  }
  /**
   * 【企业微信】查询单个文章客户访问数据动态列表
   * @param {*} current
   * @param {*} size
   */
  getSingleArticleList(current, size = 10, articleId) {
    return xhr({
      url: '/dataDynamic/getSingleArticleDynamicList',
      body: {
        current,
        size,
        articleId
      }
    })
  }
  /**
   * 【企业微信】单个楼盘数据动态统计
   */
  getSingleHouseDynamicCount(linkerId) {
    return xhr({
      url: '/dataDynamic/getSingleHouseDynamicCount',
      body: {
        linkerId
      }
    })
  }
  /**
   * 【企业微信】查询单个楼盘数据动态列表
   * @param {*} current
   * @param {*} size
   */
  getSingleHouseDynamicList(current, size = 10, linkerId) {
    return xhr({
      url: '/dataDynamic/getSingleHouseDynamicList',
      body: {
        current,
        size,
        linkerId
      }
    })
  }
  /**
   * 关注
   * @param {*} clientId
   * @param {*} isFollow
   */
  getupdateCustomerInfo(clientId, isFollow) {
    return xhr({
      method: 'POST',
      url: '/customerInfo/updateCustomerInfo',
      body: {
        clientId,
        isFollow
      }
    })
  }
}
export default new DynamicsService()
