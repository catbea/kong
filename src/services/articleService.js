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

  /**
   * 文章点赞
   */
  updateLike (data) {
    return xhr({
      url: '/cpInformation/updateLikeNum',
      method: 'post',
      body: data
    })
  }
  
}

export default new ArticleService()