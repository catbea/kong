<template>
  <div class="market-open-page">
   <market-describe class="project-info" :itemInfo="projectInfo" :dredge="dredge" :borderBottom="borderBottom"></market-describe>
   <market-priceSurface :priceList="priceList" :payInfo="priceSurfacePayInfo" :currAct='currPriceAct'
    @onVipClick="vipClickHandle"
    @couponClick="couponClickHandle"
    @priceItemClick="priceItemClickHandle"></market-priceSurface>
   <div class="agreement-box" v-if="true">
      <span>点击立即支付，即表示已阅读并同意</span>
      <span class="agreement" @click="skipAgreement">《AW大师付费协议》</span>
    </div>
   <open-payment class="pay-submit-info" :isPayLoading="isPayLoading" :payInfo="submitPayInfo" @paySubmit="paySubmit"></open-payment>
  </div>
</template>
<script>
import marketService from 'SERVICE/marketService'
import commonService from 'SERVICE/commonService'
import mycoupons from 'SERVICE/mycoupons'
import MarketDescribe from 'COMP/MarketDescribe/'
import MarketPriceSurface from 'COMP/MarketPriceSurface/'
import OpenPayment from 'COMP/OpenPayment/'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
import { Dialog } from 'vant'
export default {
  components: {
    MarketDescribe,
    MarketPriceSurface,
    OpenPayment
  },
  created() {
    this.linkerId = this.$route.params.id
    if(this.marketOpenCache && this.marketOpenCache.linkerId && this.marketOpenCache.linkerId == this.linkerId) {
      console.log(this.marketOpenCache)
      this.priceList = this.marketOpenCache.priceList
      this.projectInfo = this.marketOpenCache.projectInfo
      // this.priceItemClickHandle(this.marketOpenCache.currPriceListIndex)
      this.initSelectedInfo()
      return
    }
    this.getMarketDescribeInfo()
    this.getLinkerAmountList()
  },
  data: () => ({
    currPriceAct: 0,
    costType: 2, //1、开通vip 2、楼盘开通 3：套盘套餐开通 4：一天体验
    isPayLoading: false,
    linkerId: '',
    projectInfo: {},
    priceList: [],
    priceSurfacePayInfo: { balanceAmount: 0, balancePay: 0, coupon: 0, isShowCoupon: false },
    currPriceListIndex: 0,
    submitPayInfo: { value: 0, coupon: 0 },
    describeInfo: [{ dredgeFlag: false, borderBottom: false }],
    show: false,
    dredge: false,
    borderBottom: false
  }),
  computed: {
    ...mapGetters(['userInfo', 'marketOpenCache', 'currSelectedCoupon'])
  },
  methods: {
    skipAgreement() {
      this.$router.push('/open/agreement')
    },
    vipClickHandle() {
      this.$router.push('/user/myMember')
    },
    initSelectedInfo() {
      let couponStr = ''
      let priceItem = this.priceList[this.marketOpenCache.currPriceListIndex]
      let balancePay = 0
      this.currPriceAct = this.marketOpenCache.currPriceListIndex
      let submitPrice = priceItem.subscribeAmount
      let coupon = 0

      if(this.marketOpenCache && this.marketOpenCache.currSelectedCoupon) {
        this.priceSurfacePayInfo = { balanceAmount: this.userInfo.price, balancePay: 0, coupon: 0 }
        let currCunpon = this.marketOpenCache.currSelectedCoupon
        if(currCunpon.type == 20) {
          let couponValue = (Number(priceItem.subscribeAmount)) * Number(1 - currCunpon.discountsLimit/10)
          submitPrice = submitPrice - couponValue
          couponStr = '-¥ ' + (couponValue/100)
          coupon = couponValue
        } else {
          couponStr = '-¥ ' + currCunpon.discountsLimit
          submitPrice = submitPrice - currCunpon.discountsLimit * 100
          coupon = currCunpon.discountsLimit * 100
        }
        this.priceSurfacePayInfo = Object.assign(this.priceSurfacePayInfo, { coupon: couponStr, isShowCoupon: true })
      }

      submitPrice =  submitPrice - this.userInfo.price
      balancePay = this.userInfo.price
      console.log(submitPrice, balancePay+'submitPrice======')
      if(submitPrice < 0) {
        balancePay = this.userInfo.price + submitPrice
        submitPrice = 0
      } else {
        if(balancePay > this.userInfo.price) {
          balancePay = this.userInfo.price
          submitPrice = balancePay - this.userInfo.price
        }
      }
      balancePay = balancePay < 0 ? balancePay =0  : balancePay
      this.submitPayInfo = { value: submitPrice, coupon: coupon }
      this.priceSurfacePayInfo = Object.assign(this.priceSurfacePayInfo, { balancePay: balancePay })
    },
    priceItemClickHandle(index) {
      this.$store.commit(types.SET_MARKET_OPEN_CACHE, Object.assign(this.marketOpenCache, {currPriceListIndex: index}) )
      this.currPriceAct = index
      this.priceSurfacePayInfo = { balanceAmount: this.userInfo.price, balancePay: 0, coupon: 0 }
      this.currPriceListIndex = index
      let priceItem = this.priceList[this.currPriceListIndex]
      let submitPrice = priceItem.subscribeAmount
      if (submitPrice < 0) submitPrice = 0
      let balancePay = 0
      submitPrice =  submitPrice - this.userInfo.price
      balancePay = this.userInfo.price
      console.log(submitPrice, 'balancePay')
      if(submitPrice < 0) {
        submitPrice = 0
        balancePay = priceItem.subscribeAmount
      }

      this.submitPayInfo = { value: submitPrice, coupon: 0 }
      this.priceSurfacePayInfo = Object.assign(this.priceSurfacePayInfo, { balancePay: balancePay })
      this.getCoupan()
    },

    couponClickHandle() {
      this.$router.push('/market/couponSelect/'+this.linkerId)
    },

    async getCoupan() {
      let priceItem = this.priceList[this.currPriceListIndex]
      let res = await mycoupons.getMyCoupons(this.linkerId, priceItem.subscribeAmount, 1, 1000)
      let couponStr = res.canUseNum + '张可用'
      this.priceSurfacePayInfo = Object.assign(this.priceSurfacePayInfo, { coupon: couponStr, isShowCoupon: res.canUseNum > 0 ? true : false })
      this.$store.dispatch('setProjectCoupons', res.page.records)
    },

    async paySubmit() {
      let priceItem = this.priceList[this.currPriceListIndex]
      let param = {
        linkerId: this.linkerId,
        linkerName: this.projectInfo.linkerName,
        costType: this.costType, //1、开通vip 2、楼盘开通 3：套盘套餐开通 4：一天体验
        subscribeNum: priceItem.subscribeNum,
        amountId: priceItem.id,
        payOpenid: this.userInfo.payOpenId
      }
      this.isPayLoading = true
      const res = await commonService.payForProject(param)
      this.isPayLoading = false
      if(res.prepayStatus){
        if (res.isPay) {
          wx.chooseWXPay({
            //弹出支付
            timestamp: res.timestamp,
            nonceStr: res.nonceStr,
            package: res.packageId,
            signType: 'MD5',
            paySign: res.signature,
            success: res => {
              this.paySuss()
            },
            cancel: res => {
              this.$toast('支付取消')
              this.cancelPayment(res.purchaseId)
            },
            fail: res => {
              this.$toast('支付失败')
              this.cancelPayment(res.purchaseId)
            }
          })
        } else {
          this.paySuss()
        }
      } else {
        this.$toast('支付失败')
      }
    },

    cancelPayment(purchaseId) {
      commonService.cancelPayment(purchaseId)
    },

    paySuss() {
      Dialog.confirm({
        title: '开通成功',
        message: '你已经成功开通楼盘'+this.projectInfo.linkerName+'，快去推荐给身边的小伙伴',
        cancelButtonText: '取消'
      }).then(() => {
        let _pirce = this.userInfo.price - priceSurfacePayInfo.balancePay
        this.$store.commit(types.USER_INFO, Object.assign(this.userInfo, {price: _pirce} )) 
        this.$router.replace("/market/share/"+this.linkerId)
      }).catch(() => {

      })
    },

    async getMarketDescribeInfo() {
      const res = await marketService.getLinkerSimpleDetail(this.linkerId)
      this.projectInfo = {
        linkerImg: res.headImgUrl,
        linkerAddress: `${res.city} ${res.county}`,
        linkerTags: res.projectTagList,
        linkerPrice: res.averagePrice,
        linkerName: res.linkerName,
        openTimes: res.openTimes,
        sale: res.sale,
        commission: res.commission
      }
      this.$store.commit(types.SET_MARKET_OPEN_CACHE, Object.assign(this.marketOpenCache, {linkerId: this.linkerId, projectInfo: this.projectInfo}) )
    },
    async getLinkerAmountList() {
      const res = await marketService.getLinkerAmountList(this.linkerId)
      this.priceList = res
      this.$store.commit(types.SET_MARKET_OPEN_CACHE, Object.assign(this.marketOpenCache, {priceList: this.priceList}) )
      this.priceItemClickHandle(0)
    }
  }
}
</script>
<style lang="less">
.market-open-page {
  width: 100%;
  background: #f7f9fa;
  .project-info {
    padding-top: 16px;
    padding-bottom: 0px;
    margin-top: -13px;
    margin-bottom: 10px;
  }
  .pay-submit-info {
    position: fixed;
    bottom: 0px;
    z-index: 9;
  }
  .agreement-box {
    height: 65px;
    line-height: 65px;
    text-align: center;
    margin: 0px 0 66px 0;
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
