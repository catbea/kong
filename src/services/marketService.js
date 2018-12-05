import xhr from './xhr/'
class MarketService {
  /**
   * 楼盘数据
   */
  getMarketDescribe(agentId) {
    return xhr({
      url: '/linker/getLinkerList',
      body: {
        agentId
      }
    })
  }

  /**
   * 首页请求经纪人id返已开通楼盘
   */
  getBrokerMarket(num) {
    return xhr({
      url: '/linker/getAgentSubscribeCount',
      body: {
        agentId: num
      }
    })
  }

  /**
   * 获取楼盘价格列表
   */
  getLinkerAmountList() {
    return xhr({
      url: '/linkerAmount/getLinkerAmountList',
      body: {
      }
    })
  }

  /**
   * 楼盘详情-楼盘信息
   * @param {*} linkerId 
   */
  getLinkerDetail(linkerId) {
    return xhr({
      url: '/linkerDetail/getLinkerDetail',
      body: {
        linkerId
      }
    })
  }

  /**
   * 楼盘详情-佣金信息
   * @param {*} linkerId 
   */
  getHouseCommissionList(linkerId) {
    return xhr({
      url: '/linkerDetail/houseCommissionList',
      body: {
        linkerId
      }
    })
  }
}
export default new MarketService()
