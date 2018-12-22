import xhr from './xhr/'
class UserService {
  /**
   * 获取用户信息
   * @param {*} agentId 用户id
   */
  getUserInfo(agentId) {
    return xhr({
      url: '/user/queryInfo',
      body: {
        agentId
      }
    })
  }

  /**
   * 获取经纪人套餐、VIP到期情况
   */
  getVipAndPackage() {
    return xhr({
      url: '/user/getVipAndPackage'
    })
  }

  /**
   * 获取用户vip信息
   * @param {*} agentId
   */
  getUserVipInfo(agentId) {
    return xhr({
      method: 'post',
      url: '/userPackage/vipPackage',
      body: {
        agentId
      }
    })
  }

  /**
   * 获取经纪人标签列表
   * @param {*} Authorization   用户token
   */
  getAgentLabelList(Authorization) {
    return xhr({
      url: '/dictionary/getAgentLabel',
      body: {
        Authorization
      }
    })
  }
  /**
   * 新增经纪人标签基础信息
 
   */
  // getupdateByUser() {
  //   return xhr({
  //     method:'POST',
  //     url: '/user/updateAgentByUserId',
  //   })
  // }
  /**
   * 获取经纪人个性签名列表
   * @param {*} Authorization
   * @param {*} current
   * @param {*} size
   */

  getupdateByUser() {
    return xhr({
      method: 'POST',
      url: '/user/updateAgentByUserId'
    })
  }
  /**
   * 获取经纪人个性签名列表
   * @param {*} Authorization
   * @param {*} current
   * @param {*} size
   */
  getAgentSignaturePage(Authorization, current, size = 10) {
    return xhr({
      url: '/dictionary/getAgentSignaturePage',
      body: {
        Authorization,
        current,
        size
      }
    })
  }
  /**获取个人头像列表 */
  getAgentImgList() {
    return xhr({
      url: '/dictionary/getAgentHeadImgList'
    })
  }

  /**
   * 获取分享图片
   * @param {*} shareType
   * @param {*} shareId
   */
  getShareInfo(shareType, shareId) {
    return xhr({
      url: '/shareImg/user',
      body: {
        shareType,
        shareId
      }
    })
  }

  /**
   * 【企业微信】文章收藏列表
   * @param {*} current
   * @param {*} size
   */
  getqueryInfoList(current, size = 10) {
    return xhr({
      url: '/cpCollect/queryInfoList',
      body: {
        current,
        size
      }
    })
  }

  /**
   * 【企业微信】楼盘收藏列表
   * @param {*} current
   * @param {*} size
   */
  getqueryLinkerList(current, size = 10) {
    return xhr({
      url: '/cpCollect/queryLinkerList',
      body: {
        current,
        size
      }
    })
  }
  /**
   * 经纪人楼盘收藏
   * @param {*} linkerId
   * @param {*} status
   * @param {*} type
   */
  getlinkerDynamics(linkerId, status, type = 1) {
    return xhr({
      method: 'POST',
      url: '/cpCollect/linkerCollection',
      body: {
        linkerId,
        status,
        type
      }
    })
  }
  /**
   * 文章收藏
   * @param {*} infoId
   * @param {*} deleteFlag
   * @param {*} type
   */

  getlinkerCollection(infoId, deleteType, type = 1) {
    return xhr({
      method: 'POST',
      url: '/cpInformationCollect/insertInfo',
      body: {
        infoId,
        deleteType,
        type
      }
    })
  }

  /**
   * 收藏文章
   * @param {*} info 
   */
  articleCollection(info) {
    return xhr({
      method: 'POST',
      url: '/cpInformationCollect/insertInfo',
      body: info
    })
  }


  /**
   * 首页查看我的楼盘
   * @param {*} projectName 搜索的楼盘名称
   * @param {*} displayFlag 展示开关：展示-0，1-不展示
   * @param {*} projectName 搜索的楼盘名称
   */
  getMyMarket(obj) {
    //我的楼盘列表的数据
    return xhr({
      url: '/myLinker/myProject',
      body: obj
    })
  }

  getRecommend() {
    //推荐楼盘的数据
    return xhr({
      url: '/myLinker/displayRecommendLinker',
      body: {

      }
    })
  }
  /**
   * 修改我的楼盘数据
   * @param {*} linkerId 楼盘ID
   * @param {*} status 关注状态：0：已关注 1：未关注 
   * @param {*}  大师推荐 0：未推荐 1：大师推荐，2：普通推荐
   *             展示状态：0-展示，1-不展示； 置顶状态：0-否,10-置顶
   * @param {*} operationType  10-关注;  20-推荐;  30-展示;  40-置顶;
   */
  changeMarketData(linkerId, operationType, status) {
    return xhr({
      method: 'POST',
      url: '/linkerDetail/updateLinkerStatus',
      body: {
        linkerId,
        operationType,
        status
      }
    })
  }
  /**
   * 历史文章
   * @param {*} current
   * @param {*} size
   */
  gethistoryList(current, size = 10) {
    return xhr({
      url: '/cpInformation/historyList',
      body: {
        current,
        size
      }
    })
  }

  /**
   * 我的账单
   * @param {*} agentId
   * @param {*} current
   * @param {*} size
   */
  getMyBillList(current, size = 4) {
    return xhr({
      url: '/account/purchaseHistory',
      body: {
        current,
        size
      }
    })
  }
  /**
   * 历史浏览列表
   * @param {*} agentId
   * @param {*} current
   * @param {*} size
   */
  getBrowseHistoryList(agentId, current, size = 10) {
    return xhr({
      url: '/cpInformation/historyList',
      body: {
        agentId,
        current,
        size
      }
    })
  }

  /**
   * 删除文章
   * @param {*} agentId
   * @param {*} infoIds
   */
  deleHistoryArticle(infoIds) {
    return xhr({
      method: 'POST',
      url: '/cpInformation/batchDelete',
      body: {
        infoIds
      }
    })
  }

  /**
   * 获取热门楼盘
   * @param {Object} payload 组装参数 
   */
  getHotLinker(payload) {
    return xhr({
      url: '/linker/getLinkerHot',
      body: payload
    })
  }

  /**
   * 修改经纪人信息
   */
  upDateUserInfo(nameEditRq) {
    return xhr({
      method: 'POST',
      url: '/user/updateAgentByUserId',
      body: nameEditRq
    })
  }

  /**
   * 获取机构信息列表
   * @param {*} distributorId
   * @param {*} enterpriseId
   */
  obtainOrganizationInfo(distributorId, enterpriseId) {
    return xhr({
      url: '/cpDistributor/queryInstitutionTree',
      body: {
        distributorId,
        enterpriseId
      }
    })
  }

  /**
   * 查询是否设置过勿扰模式
   */
  checkDisturbSetting() {
    return xhr({
      url: '/disturbSetting/querySetting',
      body: {}
    })
  }

  /**
   * 更新勿扰模式
   * @param {*} disturbSetting
   */
  upDataDisturb(disturbSetting) {
    return xhr({
      method: 'POST',
      url: '/disturbSetting/insertSetting',
      body: disturbSetting
    })
  }

  /**
   * 更新头像
   * @param {*} nameEditRq
   */
  upHeaderImg(nameEditRq) {
    return xhr({
      method: 'POST',
      url: '/user/updateUserAavatarByUserId',
      body: nameEditRq
    })
  }

  /**
   * 获取cos签名
   */
  getCosAppSign() {
    return xhr({
      method: 'POST',
      url: '/cos/getCosSignature'
    })
  }

  /**
   * 获取分享二维码
   */
  getQrCode() {
    return xhr({
      url: '/cpShare/nameCardShare'
    })
  }
  /**
   * 邀请开通列表 -【企业微信
   * @param {*} current 
   * @param {*} size 
   */
  getopenRewards(current, size = 10) {
    return xhr({
      url: '/invitation/openRewards',
      body: {
        current,
        size
      }
    })
  }
  /**
   * 邀请注册列表
   * @param {*} current 
   * @param {*} size 
   */
  getregisterRewards(current, size = 10) {
    return xhr({
      url: '/invitation/registerRewards',
      body: {
        current,
        size
      }
    })
  }
  
  /**
   * 查询活动规则
   * @param {*} type 
   */
  getrules(type) {
    return xhr({
      url: '/invitation/rules',
      body: {
        type
      }
    })
  }
  /**
   * 邀请有礼二维码
   */
  getqueryInvitationUrl() {
    return xhr({
      url: '/user/queryInvitationUrl',
    })
  }

}
export default new UserService()
