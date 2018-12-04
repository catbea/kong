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
}
export default new MarketService()
