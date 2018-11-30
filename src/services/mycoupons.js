import xhr from './xhr/'
class mycoupons {
  couponsStatusList(agentId,status) {
    return xhr({
      url: '/userReceive/getAgentCouponsByStatus',
      body: {
        agentId,
        status
      }
    })
  }
}
export default new mycoupons()