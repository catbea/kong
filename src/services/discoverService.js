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
  getDiscoverList(city, classify, current, infoIds, size = 10) {
    return xhr({
      url: '/cpInformation/discoverList',
      body: {
        city,
        classify,
        current,
        infoIds,
        size
      }
    })
  }

  /**
   * 文章详情预览
   * @param {*} infoId
   */
  getDiscoverDetail(infoId) {
    return xhr({
      url: '/cpInformation/informationPreviewByToken',
      body: {
        infoId
      }
    })
  }

  /**
   * 文章详情预览白名单(h5)
   * @param {*} infoId
   * @param {*} enterpriseId
   * @param {*} agentId
   * @param {*} clientId
   */
  getDiscoverDetailForH5(infoId, enterpriseId, agentId, clientId) {
    return xhr({
      url: '/cpInformation/informationPreview',
      body: {
        infoId,
        enterpriseId,
        agentId,
        clientId
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
  commentList(current, size = 5, infoId) {
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
  commentListForH5(current, size = 5, infoId, enterpriseId) {
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
   * H5使用-文章详情好看列表
   * @param {*} infoId
   * @param {*} enterpriseId
   */
  queryLikeListForH5(infoId, enterpriseId) {
    return xhr({
      url: '/cpInformation/queryLikeList',
      body: {
        infoId,
        enterpriseId
      }
    })
  }

  /**
   * 文章详情好看列表
   * @param {*} infoId
   */
  queryLikeListByToken(infoId) {
    return xhr({
      url: '/cpInformation/queryLikeListByToken',
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
      url: '/informationfeedback/feedbackOptions'
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
   * H5使用-推荐房源列表
   * @param {*} shareUuid
   * @param {*} enterpriseId
   */
  queryLinkerListByIdsForH5(shareUuid, enterpriseId) {
    return xhr({
      url: '/myLinker/queryLinkerListByIdsForWhite',
      body: {
        shareUuid,
        enterpriseId
      }
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

  /**
   * H5使用-获取楼盘小程序码(白名单)
   * @param {*} agentId
   * @param {*} linkerId
   * @param {*} enterpriseId
   */
  queryLinkerQrcodeForH5(agentId, linkerId, enterpriseId) {
    return xhr({
      url: '/cpShare/queryLinkerQrcode',
      body: {
        agentId,
        linkerId,
        enterpriseId
      }
    })
  }

  /**
   * 获取楼盘小程序码
   * @param {*} linkerId
   */
  queryLinkerQrcodeByToken(linkerId) {
    return xhr({
      url: '/cpShare/queryLinkerQrcodeByToken',
      body: {
        agentId,
        linkerId,
        enterpriseId
      }
    })
  }

  /**
   * H5使用-获取文章小程序码(白名单)
   * @param {*} agentId
   * @param {*} infoId
   * @param {*} enterpriseId
   */
  queryArticleQrcodeForH5(agentId, infoId, enterpriseId) {
    return xhr({
      url: '/cpShare/queryArticleQrcode',
      body: {
        agentId,
        infoId,
        enterpriseId
      }
    })
  }

  /**
   * H5使用-查询楼盘信息
   * @param {*} agentId  必传
   * @param {*} enterpriseId  必传
   * @param {*} shareUuid  原文章分享必传,编辑文章分享不必传
   * @param {*} linkerIds  编辑文章分享必传
   */
  queryLinkerInfoForH5(agentId, enterpriseId, shareUuid, linkerIds) {
    return xhr({
      url: '/myLinker/queryLinkerListByIdsForWhite',
      body: {
        agentId,
        enterpriseId,
        shareUuid,
        linkerIds
      }
    })
  }

  /**
   * 获取文章小程序码
   * @param {*} infoId
   */
  queryArticleQrcodeByToken(infoId) {
    return xhr({
      url: '/cpShare/queryArticleQrcodeByToken',
      body: {
        agentId,
        infoId,
        enterpriseId
      }
    })
  }

  /**
   * 查询多个楼盘信息
   * @param {*} linkerIds 楼盘id,多个逗号隔开
   */
  queryLinkerListByIds(linkerIds) {
    return xhr({
      url: '/myLinker/queryLinkerListByIds',
      body: {
        linkerIds
      }
    })
  }
}
export default new DiscoverService()
