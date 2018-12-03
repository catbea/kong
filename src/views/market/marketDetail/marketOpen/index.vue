<template>
  <div class="market-open-page">
   <market-describe v-for="(item,index) in resInfo" :key="index" :itemInfo="item" 
    :dredge="dredge" :borderBottom="borderBottom"></market-describe>
   <market-priceSurface></market-priceSurface>
   <div class="agreement-box" v-if="true">
      <span>点击立即支付，即表示已阅读并同意</span>
      <span class="agreement" @click="skipAgreement">《AW大师付费协议》</span>
    </div>
   <open-payment ></open-payment>
  </div>
</template>
<script>
import marketService from 'SERVICE/marketService'
import MarketDescribe from 'COMP/MarketDescribe/'
import MarketPriceSurface from 'COMP/MarketPriceSurface/'
import OpenPayment from 'COMP/OpenPayment/'
export default {
  components: {
    MarketDescribe,
    MarketPriceSurface,
    OpenPayment
  },
  created() {
    this.getMarketDescribeInfo()
  },
  data: () => ({
    describeInfo: [{ dredgeFlag: false, borderBottom: false }],
    show: false,
    resInfo: null,
    dredge: false,
    borderBottom: false
  }),
  methods: {
    skipAgreement(){
      this.$router.push('/marketDetail/open/agreement')
    },
    async getMarketDescribeInfo() {
      const res = await marketService.getMarketDescribe()
      console.log(res.records)
      this.resInfo = res.records
    }
  }
}
</script>
<style lang="less">
.market-open-page {
  width: 100%;
  background: #f7f9fa;
  .agreement-box {
    height: 65px;
    line-height: 65px;
    text-align: center;
    margin: 16px 0 16px 0;
    span:nth-child(1) {
      font-size: 10px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 14px;
    }
    .agreement {
      font-size: 12px;
      transform: scale(0.8);
      height: 14px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: #007ae6;
    }
  }
}
</style>
