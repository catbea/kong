import xhr from './xhr/'
class DiscoverService {
  /**
   * 发现-轮播新闻和文章分类
   * @param {*} agentId
   * @param {*} city
   */
  informationCarousel(city) {
    return xhr({
      url: '/cpInformation/informationCarousel',
      body: {
        city
      }
    })
  }

  /**
   * 获取发现列表
   * @param {*} city 城市
   * @param {*} classify 房产-0，攻略-1，政策-2，娱乐-3,军事-4,(热门 -传空值)
   * @param {*} current 当前页
   * @param {*} size 页大小
   */
  getDiscoverList(city, classify, current, size = 10) {
    return xhr({
      url: '/cpInformation/discoverList',
      body: {
        city,
        classify,
        current,
        size
      }
    })
  }

  /**
   *
   * @param {*} infoId
   * @param {*} city
   * @param {*} enterpriseId
   * @param {*} agentId
   * @param {*} type  1-游客 2-经纪人
   */
  getDiscoverDetail(infoId, city, enterpriseId, agentId, type) {
    return xhr({
      url: '/cpInformation/informationPreview',
      body: {
        infoId,
        city,
        enterpriseId,
        agentId,
        type
      }
    })
  }

  /**
   * 文章分享
   * @param {*} param 
   */
  articleShare(param) {
    return xhr({
      method: 'POST',
      url: '/cpInformationShare/insertInfo',
      body: param
    })
  }
}
export default new DiscoverService()
