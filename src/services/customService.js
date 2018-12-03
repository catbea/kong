import xhr from './xhr/'
class CustomService {
  /**
   * 我的[全部]客户列表
   * @param {*} clientName 客户名称
   * @param {*} current 当前页
   * @param {*} size 每页条目数
   * @param {*} sortField 排序顺序 intention：意向度，createTime：客户新增时间
   */
  getCustomerAll(clientName, current, size = 10, sortField = 'intention') {
    return xhr({
      url: '/customer/getCustomerAll',
      body: {
        clientName,
        current,
        size,
        sortField
      }
    })
  }

  /**
   * 我的[关注]客户列表
   * @param {*} clientName 客户名称
   * @param {*} current 当前页
   * @param {*} size 每页条目数
   * @param {*} sortField 排序顺序 intention：意向度，createTime：客户新增时间
   */
  getCustomerFollow(clientName, current, size = 10, sortField = 'intention') {
    return xhr({
      url: '/customer/getCustomerFollow',
      body: {
        clientName,
        current,
        size,
        sortField
      }
    })
  }

  /**
   * 我的[访客]客户列表
   * @param {*} clientName 客户名称
   * @param {*} current 当前页
   * @param {*} size 每页条目数
   * @param {*} sortField 排序顺序 intention：意向度，createTime：客户新增时间
   */
  getCustomerVisitor(clientName, current, size = 10, sortField = 'intention') {
    return xhr({
      url: '/customer/getCustomerVisitor',
      body: {
        clientName,
        current,
        size,
        sortField
      }
    })
  }

  /**
   * 我的[意向]客户列表
   * @param {*} clientName 客户名称
   * @param {*} current 当前页
   * @param {*} size 每页条目数
   * @param {*} sortField 排序顺序 intention：意向度，createTime：客户新增时间
   */
  getCustomerIntention(clientName, current, size = 10, sortField = 'intention') {
    return xhr({
      url: '/customer/getCustomerIntention',
      body: {
        clientName,
        current,
        size,
        sortField
      }
    })
  }

  /**
   * 我的[新增]客户列表
   * @param {*} clientName 客户名称
   * @param {*} current 当前页
   * @param {*} size 每页条目数
   * @param {*} sortField 排序顺序 intention：意向度，createTime：客户新增时间
   */
  getCustomerAdd(clientName, current, size = 10, sortField = 'intention') {
    return xhr({
      url: '/customer/getCustomerAdd',
      body: {
        clientName,
        current,
        size,
        sortField
      }
    })
  }

  /**
   * 客户详情-客户基础信息
   * @param {*} clientId
   */
  getClientInfo(clientId) {
    return xhr({
      url: '/customerInfo/queryClientInfo',
      body: {
        clientId
      }
    })
  }
}
export default new CustomService()
