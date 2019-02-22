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
      url: '/dictionary/queryInformationClassify',
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
  queryLikeArticleList(current, userId, userType, size = 10) {
    return xhr({
      url: '/cpInformation/queryLikeArticleList',
      body: {
        current,
        userId,
        userType
      }
    })
  }

  /**
   * 文章解析
   * @param {*} data
   */
  articleAnalysis(data) {
    return xhr({
      method: 'post',
      url: '/cpInformationShare/articleAnalysis',
      body: data
    })
  }

  /**
   * 数据埋点上报
   * @param {*} data 
   * @param {*} sources H5/miniApp
   * @param {*} action 统计停留时间 REPORTED_BEGIN/REPORTED_END
   * @param {*} userActionType viewCard/viewHouse/viewNews/intention
   * @param {*} userActionCode HFCKLP
   */
  dataReport(data) {
    return xhr({
      method: 'POST',
      url: '/miniapp/common/data/report',
      body: data,
      headers: {}
    })
  }
}

export default new ArticleService()
