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
      url: '/qywx/cpIM/agentMsgAndTotal'
    })
  }

   /**
    * 查询经纪人的系统消息列表
    * @param {*} current 
    * @param {*} size 
    */
  getSystemMessage(current, size=10) {
    return xhr({
      url: '/qywx/cpIM/getSystemMessageList',
      body: {
        current,
        size
      }
    })
  }
}
export default new DynamicsService()
