import xhr from './xhr/'
class mycoupons {
  couponsStatusList(status,current,size=5) {
    return xhr({
      url: '/userReceive/getAgentCouponsByStatus',
      body: {
        status,
        current,
        size
      }
    })
  }

  getMyCoupons(linkerId, mon, current=0, size=0) {
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