import xhr from './xhr/'
class mycoupons {
  /**
   * 我的优惠劵
   * @param {*} status//优惠劵状态
   * @param {*} current//页码
   * @param {*} size//每页显示数量
   */
  couponsStatusList(status, current, size = 5) {
    return xhr({
      url: '/userReceive/getAgentCouponsByStatus',
      body: {
        status,
        current,
        size
      }
    })
  }
  /**
   * 支付中使用的优惠劵
   * @param {*} linkerId
   * @param {*} mon
   * @param {*} current
   * @param {*} size
   */
  getMyCoupons(linkerId, mon, current = 0, size = 0) {
    return xhr({
      url: '/userReceive/getMyCoupons',
      body: {
        linkerId,
        mon,
        current,
        size
      }
    })
  }
}
export default new mycoupons()
