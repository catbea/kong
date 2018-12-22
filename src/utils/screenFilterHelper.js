import isEmpty from 'lodash/isEmpty'

let defaultConf = {
  name: 'projectName',
  area: 'county',
  aveprice: ['projectPriceAvgStart', 'projectPriceAvgEnd'],
  popularity: ['togetherNumStart', 'togetherNumEnd'],
  areaSize: ['areaStart', 'areaEnd'],
  type: 'houseType',
  generalView: 'generalView',
  discountHouse: 'discountHouse',
  saleStatus: 'saleStatus',
  openStatus: 'openStatus',
  focusStatus: 'focusStatus',
  sort:'orderBy'
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
  if (avepriceTemp[0] !== '-1') result[conf.aveprice[0]] = avepriceTemp[0]
  if (avepriceTemp[1] !== '-1') result[conf.aveprice[1]] = avepriceTemp[1]
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
  if (filters.generalView) result[conf.generalView] = filters.generalView
  if (filters.discountHouse) result[conf.discountHouse] = filters.discountHouse
  // 销售状态
  if (filters.saleStatus && filters.saleStatus !== '-1') result[conf.saleStatus] = filters.saleStatus
  // 开通状态
  if (filters.openStatus && filters.openStatus !== '-1') result[conf.openStatus] = filters.openStatus
  // 关注状态
  if (filters.focusStatus && filters.focusStatus !== '-1') result[conf.focusStatus] = filters.focusStatus
  //排序
  if(filters.sort && filters.sort !== '-1') result[conf.sort] = filters.sort
  return result
}