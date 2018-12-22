import xhr from './xhr/'
class MarketService {
  /**
   * 楼盘数据
   */
  getMarketDescribe(current, size = 10) {
    return xhr({
      url: '/linker/getLinkerList',
      body: {
        current,
        size
      }
    })
  }
  
  /**
   * 楼盘详情新手引导
   */
  getMarketUpdateIsOne() {
    return xhr({
      url: '/user/updateIsOne',
      body: {
      }
    })
  }
  /**
   * 楼盘列表
   * 由于参数过多,参数交由控制层组装
   */
  getHouseList(payload) {
    return xhr({
      url: '/linker/getLinkerList',
      body: payload
    })
  }

  /**
   * 首页请求经纪人id返已开通楼盘
   */
  getBrokerMarket() {
    return xhr({
      url: '/linker/getAgentSubscribeCount'
    })
  }

  /**
   * 获取楼盘价格列表
   */
  getLinkerAmountList(linkerId) {
    return xhr({
      url: '/linkerAmount/getLinkerAmountList',
      body: {
        linkerId
      }
    })
  }

  /**
   * 楼盘详情-楼盘信息
   * @param {*} linkerId
   */
  getLinkerDetail(linkerId) {
    return xhr({
      url: '/linkerDetail/getLinkerDetail',
      body: {
        linkerId
      }
    })
  }
  /** 
   * 楼盘详情-该楼盘相册
  */
  getMarketDetailPhoto(linkerId) {
    return xhr({
      url: '/linkerDetail/getHouseBannerTypeList',
      body: {
        linkerId
      }
    })
  }

  /** 
   * 楼盘详情-经纪人楼盘收藏
  */
 changeLinkerCollect(linkerId,status,type) {
  return xhr({
    url: '/cpCollect/linkerCollection',
    method: 'post',
    body: {
      linkerId,
      status,
      type
    }
  })
}

/**
   * 修改楼盘详情数据
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
   * 楼盘-楼盘信息-楼盘开通调用
   * @param {*} linkerId
   */
  getLinkerSimpleDetail(linkerId) {
    return xhr({
      url: '/linkerDetail/getLinkerSimpleDetail',
      body: {
        linkerId
      }
    })
  }

  /**
   * 楼盘详情-楼盘未显示的全部户型
   * @param {*} linkerId
   */
  getHouseType(linkerId) {
    return xhr({
      url: '/linkerDetail/getHouseType',
      body: {
        linkerId
      }
    })
  }
  /**
   * 楼盘详情-楼盘未显示的全部楼盘动态
   * @param {*} linkerId
   */
  getAllDynamicList(linkerId) {
    return xhr({
      url: '/linkerDetail/getHouseDynamicList',
      body: {
        linkerId
      }
    })
  }
  /*
   * 楼盘详情-佣金信息
   * @param {*} linkerId 
   */
  getHouseCommissionList(linkerId) {
    return xhr({
      url: '/linkerDetail/houseCommissionList',
      body: {
        linkerId
      }
    })
  }

  /**
   * 楼盘详情-位置周边
   * @param {*} linkerId
   */
  getHouseAroundType(linkerId) {
    return xhr({
      url: '/linkerDetail/getHouseAroundType',
      body: {
        linkerId
      }
    })
  }
  /**
   * 楼盘详情-显示楼盘详情纠错
   *
   */
  getCorrection() {
    return xhr({
      url: '/linkerDetail/houseErrorTionSelect',
      body: {}
    })
  }

  /**
   * 楼盘详情-提交楼盘详情纠错
   *
   */
  submitCorrection(linkerId, errorType, content, appType) {
    return xhr({
      url: '/linkerDetail/houseErrorCorrection',
      method: 'post',
      body: {
        linkerId,
        errorType,
        content,
        appType
      }
    })
  }
  /**
   * 获取vip开通的信息
   *
   */
  vipInfo() {
    return xhr({
      url: '/brokerVip/vipInfo',
      body: {}
    })
  }

  /**
   * 分享我的楼盘信息
   */
  shareBuildingCard(linkerId) {
    return xhr({
      url: '/linkerDetail/share',
      body: {
        linkerId
      }
    })
  }


  /* 获取vip楼盘
  *
  */
  vipLinkerList(parm) {
    return xhr({
      url: '/brokerVip/vipLinkerList',
      body: parm
    })
  }

  /* 获取vip楼盘
  *
  */
  packageLinkerList(parm) {
    return xhr({
      url: '/userPackage/packageLinkerList',
      body: parm
    })
  }

  /**
   * 分享楼盘需要的楼盘图片列表
   * @param {*} linkerId 
   */
  getBannerList(linkerId) {
    return xhr({
      url: '/linkerDetail/getLinkerBannerList',
      body: {
        linkerId
      }
    })
  }

	/* VIP楼盘开通
   *
   */
  addHouseByVip(isCheckLinkerIds, isCheckAll = false) {
    return xhr({
      url: '/brokerVip/addHouseByVip',
      method: 'post',
      body: {
        isCheckLinkerIds: isCheckLinkerIds,
        isCheckAll: isCheckAll
      }
    })
  }

  /**
   * 楼盘套餐信息
   *
   */
  userPackageSituation() {
    return xhr({
      url: '/userPackage/userPackageSituation'
    })
  }

  /**
   * 获取最后一次开通的套餐信息
   */
  queryLastInfoByAgentId() {
    return xhr({
      url: '/userPackage/queryLastInfoByAgentId'
    })
  }

  /**
   * 获取套餐信息-包括总共能添加多少楼盘、已添加的楼盘列表
   */
  userPackageAddHouse(linkerIds, purchaseId) {
    return xhr({
      url: '/userPackage/userPackageAddHouse',
      method: 'post',
      body: {
        linkerIds,
        purchaseId
      }
    })
  }

  /**
   * 获取套餐信息-包括总共能添加多少楼盘、已添加的楼盘列表
   */
  packPageHouseQuery(purchaseId) {
    return xhr({
      url: '/userPackage/packPageHouseQuery',
      body: {
        purchaseId
      }
    })
  }

  /**
   * 更新vip城市
   */
  updateCityByAgentId(city) {
    return xhr({
      url: '/brokerVip/updateCityByAgentId',
      method: 'post',
      body: {
        city
      }
    })
  }

}
export default new MarketService()
