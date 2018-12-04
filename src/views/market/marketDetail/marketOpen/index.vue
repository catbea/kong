<template>
  <div class="market-open-page">
   <market-describe v-for="(item,index) in resInfo" :key="index" :itemInfo="item" 
    :dredge="dredge" :borderBottom="borderBottom"></market-describe>
   <market-priceSurface @priceItemClick="priceItemClick"></market-priceSurface>
   <div class="agreement-box" v-if="true">
      <span>点击立即支付，即表示已阅读并同意</span>
      <span class="agreement" @click="skipAgreement">《AW大师付费协议》</span>
    </div>
   <open-payment :payInfo="submitPayInfo" @paySubmit="paySubmit"></open-payment>
  </div>
</template>
<script>
import marketService from 'SERVICE/marketService'
import commonService from 'SERVICE/commonService'
import MarketDescribe from 'COMP/MarketDescribe/'
import MarketPriceSurface from 'COMP/MarketPriceSurface/'
import OpenPayment from 'COMP/OpenPayment/'
import { mapGetters } from 'vuex'
export default {
  components: {
    MarketDescribe,
    MarketPriceSurface,
    OpenPayment
  },
  created() {
    this.getMarketDescribeInfo()
    this.getLinkerAmountList()
  },
  data: () => ({
    submitPayInfo: { value: 0, coupon: 0 },
    describeInfo: [{ dredgeFlag: false, borderBottom: false }],
    show: false,
    resInfo: null,
    dredge: false,
    borderBottom: false
  }),
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    skipAgreement(){
      this.$router.push('/marketDetail/open/agreement')
    },
    priceItemClick(index) {
      // console.log(index)
    },
    async paySubmit() {
      let param = {
        linkerId: 'c387363940c04c6d83a45ee0ccad3d78',
        linkerName: '【中原地产】泰华明珠',
        costType: 2, //1、开通vip 2、楼盘开通 3：套盘套餐开通 4：一天体验
        subscribeNum: 3,
        amountId: 1064, //活动金额
        payOpenid: this.userInfo.pcOpenid
      }
      const res = await commonService.payForProject(param)
      console.log(res, 'paySubmit res')
    },
    async getMarketDescribeInfo() {
      const res = await marketService.getMarketDescribe()
      console.log(res.records, 'getMarketDescribeInfo')
      this.resInfo = res.records
    },
    async getLinkerAmountList() {
      const res = await marketService.getLinkerAmountList()
      console.log(res, 'getLinkerAmountList')
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
