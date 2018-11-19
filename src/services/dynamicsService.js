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
}
export default new DynamicsService()
