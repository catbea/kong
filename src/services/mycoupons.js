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
}
export default new mycoupons()