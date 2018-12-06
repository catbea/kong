<template>
  <div class="market-open-page">
   <market-describe :itemInfo="projectInfo" :dredge="dredge" :borderBottom="borderBottom"></market-describe>
   <market-priceSurface :priceList="priceList" @couponClick="couponClickHandle" @priceItemClick="priceItemClickHandle"></market-priceSurface>
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
    this.linkerId = this.$route.params.id
    this.getMarketDescribeInfo()
    this.getLinkerAmountList()
  },
  data: () => ({
    linkerId: '',
    projectInfo: {},
    priceList: [],
    currPriceListIndex: 0,
    submitPayInfo: { value: 0, coupon: 0 },
    describeInfo: [{ dredgeFlag: false, borderBottom: false }],
    show: false,
    dredge: false,
    borderBottom: false
  }),
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    skipAgreement() {
      this.$router.push('/marketDetail/open/agreement')
    },
    priceItemClickHandle(index) {
      this.currPriceListIndex = index
      let priceItem = this.priceList[this.currPriceListIndex]
      this.submitPayInfo = {
        value: priceItem.subscribeAmount,
        coupon: 0
      }
    },

    couponClickHandle() {
      console.log('couponClickHandle========')
    },

    async paySubmit() {
      let priceItem = this.priceList[this.currPriceListIndex]
      let param = {
        linkerId: this.linkerId,
        linkerName: this.projectInfo.linkerName,
        costType: 2, //1、开通vip 2、楼盘开通 3：套盘套餐开通 4：一天体验
        subscribeNum: priceItem.subscribeNum,
        amountId: priceItem.id,
        payOpenid: this.userInfo.payOpenId
      }
      const res = await commonService.payForProject(param)
      if (res.isPay) {
        console.log('调起支付')
        wx.chooseWXPay({
          //弹出支付
          timestamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.packageValue,
          signType: 'MD5',
          paySign: res.paySign,
          success: function(res) {
            console.log('支付suss')
          },
          cancel: function(res) {
            //用户付钱失败。没钱，密码错误，取消付款
          },
          fail: function(res) {
            console.log('支付取消了')
          }
        })
      }
    },

    async getMarketDescribeInfo() {
      const res = await marketService.getLinkerDetail(this.linkerId)
      console.log(res, 'getMarketDescribeInfo')
      this.projectInfo = {
        linkerImg: res.headImgUrl,
        linkerAddress: `${res.city} ${res.county}`,
        linkerTags: res.projectTagList,
        linkerPrice: res.averagePrice,
        linkerName: res.linkerName,
        openTimes: res.openTimes,
        commission: res.commission
      }
    },
    async getLinkerAmountList() {
      const res = await marketService.getLinkerAmountList()
      this.priceList = res
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
