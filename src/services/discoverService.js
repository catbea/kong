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
  getDiscoverList(city, classify, current, size = 10,infoIds) {
    return xhr({
      url: '/cpInformation/discoverList',
      body: {
        city,
        classify,
        current,
        size,
        infoIds
      }
    })
  }

  /**
   * 文章详情预览
   * @param {*} infoId
   * @param {*} city
   */
  getDiscoverDetail(infoId, city) {
    return xhr({
      url: '/cpInformation/informationPreviewByToken',
      body: {
        infoId,
        city
      }
    })
  }

  /**
   * 文章详情预览白名单(h5)
   * @param {*} infoId
   * @param {*} city
   * @param {*} enterpriseId
   * @param {*} agentId
   * @param {*} type  1-游客 2-经纪人
   */
  getDiscoverDetailForH5(infoId, city, enterpriseId, agentId, type=1) {
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

  /**
   * 文章详情评论列表
   * @param {*} current 
   * @param {*} size 
   * @param {*} infoId 
   */
  commentList(current, size=5, infoId) {
    return xhr({
      url: '/comment/previewPage',
      body: {
        current,
        size,
        infoId
      }
    })
  }
  
  /**
   * h5文章详情评论列表
   * @param {*} current 
   * @param {*} size 
   * @param {*} infoId 
   * @param {*} enterpriseId 
   */
  commentListForH5(current, size=5, infoId, enterpriseId) {
    return xhr({
      url: '/comment/previewPageForWhite',
      body: {
        current,
        size,
        infoId,
        enterpriseId
      }
    })
  }

  /**
   * 修改评论的状态
   * @param {*} id 
   * @param {*} status 0-审核中，1-审核通过，2-审核不通过，3-删除
   */
  updateCommentStatus(id, status) {
    return xhr({
      method: 'POST',
      url: '/comment/updateCommentStatus',
      body: {
        id,
        status
      }
    })
  }

  /**
   * 文章新增评论
   * @param {*} param 
   */
  insertComment(param) {
    return xhr({
      method: 'POST',
      url: '/comment/insertComment',
      body: param
    })
  }

  /**
   * 文章详情好看列表
   * @param {*} infoId 
   */
  queryLikeList(infoId) {
    return xhr({
      url: '/cpInformation/queryLikeList',
      body: {
        infoId
      }
    })
  }

  /**
   * 企业微信-查询文章举报反馈选项 
   */
  getFeedbackOptions() {
    return xhr({
      url: '/informationfeedback/feedbackOptions',
    })
  }

  /**
   * 文章投诉举报
   * @param {*} param 
   */
  getInsertFeedback(param) {
    return xhr({
      method: 'POST',
      url: '/informationfeedback/insertFeedback',
      body: param
    })
  }

  /**
   * h5文章详情页面TA的写一写
   * @param {*} agentId 
   * @param {*} enterpriseId 
   * @param {*} infoIds 
   */
  queryArticleListForH5(agentId, enterpriseId, infoIds) {
    return xhr({
      url: '/cpInformation/queryShareArticleByAgentIdForWhite',
      body: {
        agentId,
        enterpriseId,
        infoIds
      }
    })
  }
}
export default new DiscoverService()
