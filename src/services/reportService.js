import xhr from './xhr/'
class reportService {
  /**
   *  我的报备列表
   * @param {*} current
   * @param {*} size
   */
  reportList(current, size = 10) {
    return xhr({
      url: '/customerFilling/getFilingList',
      body: {
        current,
        size
      }
    })
  }

  /**
   * 报备审核列表
   * @param {*} reportId
   */
  reportAuditList(reportId) {
    return xhr({
      url: '/customerFilling/getFilingAuditList',
      body: {
        reportId
      }
    })
  }

  /**
   *
   * @param {*} clientId
   * @param {*} clientName
   * @param {*} clientId
   * @param {*} linkerId
   * @param {*} linkerName
   * @param {*} distributorId 分销商Id
   * @param {*} institutionId 所属机构Id
   */
  addReportInfo(data) {
    return xhr({
      method: 'POST',
      url: '/customerFilling/addFilingInfo',
      body: data
    })
  }

  /**
   * 获取可报备的楼盘
   * @param {*} obj
   */
  getReportBuildingList(obj) {
    return xhr({
      url: '/customerFilling/getFilingHouseList',
      body: obj
    })
  }

  /**
   * 根据楼盘id查询，经纪人的类型
   */
  getAgentTypeByLinkerId(data) {
    return xhr({
      url: '/user/getAgentTypeByLinkerId',
      body: data
    })
  }

  /**
   * 根据楼盘查询渠道列表
   */
  getChannelListByLinkerId (data) {
    return xhr({
      url: '/channel/getChannelListByLinkerId',
      body: data
    })
  }

}
export default new reportService()
