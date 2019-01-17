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
  getArticleType(data) {
    return xhr({
      url: '/dictionary/queryListByClassify',
      body: data
    })
  }

  /**
   * 文章点赞
   */
  updateLike(data) {
    return xhr({
      url: '/cpInformation/updateLikeNum',
      method: 'post',
      body: data
    })
  }

  /**
   * 文章评论
   */

  insertComment(data) {
    return xhr({
      url: '/comment/insertComment',
      method: 'post',
      body: data
    })
  }

  /**
   * 删除评论
   */

  updateCommentStatus(data) {
    return xhr({
      url: '/comment/updateCommentStatus',
      method: 'post',
      body: data
    })
  }

  /**
   * 认为好看的列表 userType 0-经纪人，1-客户
   * @param {*} current
   * @param {*} clientId
   * @param {*} userType
   * @param {*} size
   */
  queryLikeArticleList(current, clientId, userType, size = 10) {
    return xhr({
      url:'/cpInformation/queryLikeArticleList',
      body:{
        current,
        clientId,
        userType
      }
    })
  }

  /**
   * 文章解析
   * @param {*} data 
   */
  articleAnalysis(data){
    return xhr({
      method: 'post',
      url:'/cpInformationShare/articleAnalysis',
      body:data
    })
  }
  
}

export default new ArticleService()
