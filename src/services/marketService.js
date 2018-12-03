import xhr from './xhr/'
class MarketService {
  /**
   * 楼盘数据
   */
  getMarketDescribe(payload) {
    // let body = Object.assign({
    //   projectName: '',
    //   province: '',
    //   ...
    // },payload)
    return xhr({
      url: '/linker/getLinkerList',
      body: {
        payload
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
}
export default new MarketService()
