import isEmpty from 'lodash/isEmpty'

let defaultConf = {
  name: 'projectName',
  area: 'county',
  aveprice: [['priceTotalStart', 'priceTotalEnd'], ['projectPriceAvgStart', 'projectPriceAvgEnd']],
  popularity: ['togetherNumStart', 'togetherNumEnd'],
  areaSize: ['areaStart', 'areaEnd'],
  type: 'houseType',
  generalView: 'generalView',
  discountHouse: 'discountHouse',
  saleStatus: 'saleStatus',
  openStatus: 'openStatus',
  focusStatus: 'focusStatus',
  sort: 'orderBy'
}

export default (name, filters, conf = {}) => {
  conf = Object.assign(defaultConf, conf)
  let result = {}
  if (isEmpty(filters)) {
    result[conf.name] = name
    return result
  }
  // 项目名称
  result[conf.name] = name
  // 区域
  result[conf.area] = filters.area === '不限' ? '' : filters.area
  // 均价
  let avepriceTemp = filters.aveprice.split(',')
  if (avepriceTemp[0] !== '-1') {
    if (avepriceTemp[0] === '1') {
      if (avepriceTemp[1] !== '-1') result[conf.aveprice[0][0]] = avepriceTemp[1]
      if (avepriceTemp[2] !== '-1') result[conf.aveprice[0][1]] = avepriceTemp[2]
    } else if (avepriceTemp[0] === '2') {
      if (avepriceTemp[1] !== '-1') result[conf.aveprice[1][0]] = avepriceTemp[1] * 10000
      if (avepriceTemp[2] !== '-1') result[conf.aveprice[1][1]] = avepriceTemp[2] * 10000
    }
  }
  // 人气
  let popularityTemp = filters.popularity.split(',')
  if (popularityTemp[0] !== '-1') result[conf.popularity[0]] = popularityTemp[0]
  if (popularityTemp[1] !== '-1') result[conf.popularity[1]] = popularityTemp[1]
  // 面积
  if (filters.areaSize) {
    let areaSizeTemp = filters.areaSize.split(',')
    if (areaSizeTemp[0] !== '-1') result[conf.areaSize[0]] = areaSizeTemp[0]
    if (areaSizeTemp[1] !== '-1') result[conf.areaSize[1]] = areaSizeTemp[1]
  }
  // 户型
  if (filters.type && filters.type !== '-2') {
    result[conf.type] = filters.type
  }

  // 特色
  // 全景
  if (filters.hasOwnProperty('generalView') && typeof filters.generalView === 'boolean') {
    if (filters.generalView) {
      result[conf.generalView] = '1'
    } else {
      result[conf.generalView] = '0'
    }
  }

  // 优惠
  if (filters.hasOwnProperty('discountHouse') && typeof filters.discountHouse === 'boolean') {
    if (filters.discountHouse) {
      result[conf.discountHouse] = '1'
    } else {
      result[conf.discountHouse] = '0'
    }
  }
  // 销售状态
  if (filters.saleStatus && filters.saleStatus !== '-1') result[conf.saleStatus] = filters.saleStatus
  // 开通状态
  if (filters.openStatus && filters.openStatus !== '-1') result[conf.openStatus] = filters.openStatus

  // 关注状态
  if (filters.focusStatus && filters.focusStatus !== '-1') result[conf.focusStatus] = filters.focusStatus
  //排序
  if (filters.sort && filters.sort !== '-1') result[conf.sort] = filters.sort
  return result
}
