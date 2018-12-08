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
   * @param {*} distClientId
   */
  reportAuditList(distClientId) {
    return xhr({
      url: '/customerFilling/getFilingAuditList',
      body: {
        distClientId
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
  addReportInfo(clientId, clientName, clientMobile, linkerId, linkerName, distributorId, institutionId) {
    return xhr({
      url: '/customerFilling/addFilingInfo',
      body: {
        clientId,
        clientName,
        clientMobile,
        linkerId,
        linkerName,
        distributorId,
        institutionId
      }
    })
  }
}
export default new reportService()
