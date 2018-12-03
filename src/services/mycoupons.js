import xhr from './xhr/'
class mycoupons {
  couponsStatusList(agentId,status,current,size=5) {
    return xhr({
      url: '/userReceive/getAgentCouponsByStatus',
      body: {
        agentId,
        status,
        current,
        size
      }
    })
  }
}
export default new mycoupons()