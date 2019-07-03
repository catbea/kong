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
  getCustomerFollow(clientName, current, size = 10, sortField = 'intention', attentionStatus = 0) {
    return xhr({
      url: '/customer/getCustomerFollow',
      body: {
        clientName,
        current,
        size,
        sortField,
        attentionStatus
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
   * 客户详情-分析-客户基础信息以及购房意向度
   * @param {*} clientId
   */
  getClientInfo(agentId,clientId) {
    return xhr({
      url: '/customer/queryClientInfo',
      body: {
        agentId,
        clientId
      }
    })
  }

  /**
   * 客户详情-分析-客户报表饼图
   * @param {*} clientId
   */
  getCustomerPieChart(clientId) {
    return xhr({
      url: '/customer/pieChart',
      body: {
        clientId
      }
    })
  }

  /**
   * 客户详情-分析-客户报表7天趋势图
   * @param {*} clientId
   */
  getCustomerSevenDayTrendChart(clientId) {
    return xhr({
      url: '/customer/sevenDayTrendChart',
      body: {
        clientId
      }
    })
  }

  /**
   * 客户详情-分析-客户报表条形图
   * @param {*} clientId
   */
  getCustomerBarChart(clientId) {
    return xhr({
      url: '/customer/barChart',
      body: {
        clientId
      }
    })
  }

  /**
   * 客户详情-分析-楼盘分析分页列表
   * @param {*} clientId
   * @param {*} current
   * @param {*} size
   */
  getCustomerBuildingAnalysisList(clientId, current, size) {
    return xhr({
      url: '/customer/getBuildingAnalysisList',
      body: {
        clientId,
        current,
        size
      }
    })
  }

  /**
   * 客户详情-足迹-客户访问足迹统计
   * @param {*} clientId
   */
  getCustomerDynamicCount(clientId) {
    return xhr({
      url: '/customerInfo/customerDynamicCount',
      body: {
        clientId
      }
    })
  }

  /**
   * 客户详情-足迹-足迹列表
   * @param {*} clientId
   * @param {*} current
   * @param {*} size
   */
  getCustomerDynamicList(clientId, current, size) {
    return xhr({
      url: '/customerInfo/customerDynamicList',
      body: {
        clientId,
        current,
        size
      }
    })
  }

  /**
   * 客户详情-资料-客户资料
   * @param {*} clientId
   */
  getCustomerInfo(clientId) {
    return xhr({
      url: '/customerInfo/getCustomerInfo',
      body: {
        clientId
      }
    })
  }
  /**
   * 客户详情-资料-更新客户资料
   * @param {*} clientId
   * @param {*} remarkName
   * @param {*} sex  1：男 2：女
   * @param {*} age
   * @param {*} position  客户位置
   * @param {*} phone
   * @param {*} income
   * @param {*} industry
   * @param {*} buyBuildingPurpose
   * @param {*} isFollow  0：已关注 1：未关注
   */
  updateCustomerInfo(customerInfoRequestVO) {
    return xhr({
      method: 'post',
      url: '/customerInfo/updateCustomerInfo',
      body: customerInfoRequestVO
    })
  }

  /**
   * 获取消息列表
   * @param {*} params
   */
  appMsgDtlList(params) {
    return xhr({
      url: '/cpIM/appMsgDtlList',
      body: params
    })
  }

  /**
   * 设置消息已读
   * @param {*} clientId
   * @param type 1:小程序 2:经纪人
   */
  setMsgRead(clientId) {
    return xhr({
      url: '/cpIM/setMsgRead',
      body: {
        clientId
      }
    })
  }

  /**
   * 根据mediaid获取mp3地址
   * @param {*} mediaId
   * @param appId
   */
  mediaIdTransToMp3Url(mediaId, appId) {
    return xhr({
      url: '/cpIM/mediaIdTransToMp3Url',
      body: {
        mediaId,
        appId
      }
    })
  }
  getLinkerApplyListByAgentId(current, size = 10) {
    return xhr({
      url: '/user/getLinkerApplyListByAgentId',
      body: {
        current,
        size
      }
    })
  }
  /**
   * 查询楼盘报名活动
   * @param {*} linkerId
   */
  getLinker() {
    return xhr({
      url: '/activity/linker'
    })
  }
  /**
   * 删除我的客户
   * @param {*} clientId
   */
  deleteCustomer(data) {
    return xhr({
      method: 'post',
      url: '/customer/updateClientDelFlag',
      body: data
    })
  }
   /**
   *  客户关系查询
   */
  queryClientFlag (param) {
    return xhr({
      url: '/customer/queryClientDelFlag',
      body: param
    })
  }
}
export default new CustomService()
