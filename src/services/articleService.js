import xhr from './xhr'
class ArticleService {
  /**
   * 写一写文章列表
   */
  getArticleList(data) {
    return xhr({
      url: '/cpInformation/getBaseArticleList',
      body: data
    })
  }

  /**
   * 文章类型查询
   */
  getArticleType (data) {
    return xhr({
      url: '/cpInformation/informationCarousel',
      body: data
    })
  }
  
}

export default new ArticleService()