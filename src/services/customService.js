import xhr from './xhr/'
class CustomService {
  /**
   * 我的[全部]客户列表
   * @param {*} clientName 客户名称
   * @param {*} page 当前页
   * @param {*} pageSize 每页条目数
   * @param {*} sortOrder 排序顺序 DESC：降序，ASC：升序
   */
  getCustomerAll(clientName, page, pageSize = 10, sortOrder = 'DESC') {
    return xhr({
      url: '/customer/getCustomerAll',
      body: {
        clientName,
        page,
        pageSize,
        sortOrder
      }
    })
  }

  /**
   * 我的[关注]客户列表
   * @param {*} clientName 客户名称
   * @param {*} page 当前页
   * @param {*} pageSize 每页条目数
   * @param {*} sortOrder 排序顺序 DESC：降序，ASC：升序
   */
  getCustomerFollow(clientName, page, pageSize = 10, sortOrder = 'DESC') {
    return xhr({
      url: '/customer/getCustomerAll',
      body: {
        clientName,
        page,
        pageSize,
        sortOrder
      }
    })
  }

  /**
   * 我的[访客]客户列表
   * @param {*} clientName 客户名称
   * @param {*} page 当前页
   * @param {*} pageSize 每页条目数
   * @param {*} sortOrder 排序顺序 DESC：降序，ASC：升序
   */
  getCustomerVisitor(clientName, page, pageSize = 10, sortOrder = 'DESC') {
    return xhr({
      url: '/customer/getCustomerAll',
      body: {
        clientName,
        page,
        pageSize,
        sortOrder
      }
    })
  }

  /**
   * 我的[意向]客户列表
   * @param {*} clientName 客户名称
   * @param {*} page 当前页
   * @param {*} pageSize 每页条目数
   * @param {*} sortOrder 排序顺序 DESC：降序，ASC：升序
   */
  getCustomerIntention(clientName, page, pageSize = 10, sortOrder = 'DESC') {
    return xhr({
      url: '/customer/getCustomerAll',
      body: {
        clientName,
        page,
        pageSize,
        sortOrder
      }
    })
  }

  /**
   * 我的[新增]客户列表
   * @param {*} clientName 客户名称
   * @param {*} page 当前页
   * @param {*} pageSize 每页条目数
   * @param {*} sortOrder 排序顺序 DESC：降序，ASC：升序
   */
  getCustomerAdd(clientName, page, pageSize = 10, sortOrder = 'DESC') {
    return xhr({
      url: '/customer/getCustomerAll',
      body: {
        clientName,
        page,
        pageSize,
        sortOrder
      }
    })
  }
}
export default new CustomService()
