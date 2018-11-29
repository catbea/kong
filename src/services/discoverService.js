import xhr from './xhr/'
class DiscoverService {
  /**
   * 发现-轮播新闻和文章分类
   * @param {*} agentId 
   * @param {*} city 
   */
  informationCarousel(agentId, city) {
    return xhr({
      url: '/cpInformation/informationCarousel',
      body: {
        agentId,
        city
      }
    })
  }
}
export default new DiscoverService()
