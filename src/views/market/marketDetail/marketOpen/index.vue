<template>
  <div class="market-open-page">
   <market-describe class="project-info" v-if="projectInfo" :itemInfo="projectInfo" :dredge="dredge" :borderBottom="borderBottom"></market-describe>
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
import userService from 'SERVICE/userService'
import mycoupons from 'SERVICE/mycoupons'
import MarketDescribe from 'COMP/MarketDescribe/'
import MarketPriceSurface from 'COMP/MarketPriceSurface/'
import OpenPayment from 'COMP/OpenPayment/'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
export default {
  components: {
    MarketDescribe,
    MarketPriceSurface,
    OpenPayment
  },
  created() {
    this.linkerId = this.$route.params.id
    if (this.marketOpenCache && this.marketOpenCache.linkerId && this.marketOpenCache.linkerId == this.linkerId) {
      this.priceList = this.marketOpenCache.priceList
      this.projectInfo = this.marketOpenCache.projectInfo
      this.initSelectedInfo()
      return
    }
    this.init()
  },
  data: () => ({
    currPriceAct: 0,
    costType: 2, //1、开通vip 2、楼盘开通 3：套盘套餐开通 4：一天体验
    isPayLoading: false,
    linkerId: '',
    projectInfo: null,
    priceList: [],
    priceSurfacePayInfo: { balanceAmount: 0, balancePay: 0, coupon: 0, isShowCoupon: false },
    currPriceListIndex: 0,
    submitPayInfo: { value: 0, coupon: 0 },
    describeInfo: [{ dredgeFlag: false, borderBottom: false }],
    show: false,
    dredge: false,
    userPrice: 0,
    borderBottom: false
  }),
  computed: {
    ...mapGetters(['userInfo', 'marketOpenCache', 'currSelectedCoupon'])
  },
  methods: {
    async init() {
      this.userPrice = this.userInfo.price
      this.getUserInfo()
      this.getLinkerAmountList()
      this.getMarketDescribeInfo()
    },
    async getUserInfo() {
      const res = await userService.getUserInfo()
      this.userPrice = res.price
      // this.$store.dispatch('userInfo', Object.assign(this.userInfo, { price: res.price }))
    },
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

      if (this.marketOpenCache && this.marketOpenCache.currSelectedCoupon) {
        this.priceSurfacePayInfo = { balanceAmount: this.userPrice, balancePay: 0, coupon: 0 }
        let currCunpon = this.marketOpenCache.currSelectedCoupon
        if (currCunpon.type == 20) {
          let couponValue = Number(priceItem.subscribeAmount) * Number(1 - currCunpon.discountsLimit / 10)
          submitPrice = submitPrice - couponValue
          couponStr = '-¥ ' + parseFloat(couponValue / 100).toFixed(2)
          coupon = couponValue
        } else {
          couponStr = '-¥ ' + parseFloat(currCunpon.discountsLimit).toFixed(2)
          submitPrice = submitPrice - currCunpon.discountsLimit * 100
          coupon = currCunpon.discountsLimit * 100
        }
        this.priceSurfacePayInfo = Object.assign(this.priceSurfacePayInfo, { coupon: couponStr, isShowCoupon: true })
      } else {
        if (this.marketOpenCache.projectCoupons) {
          let couponStr = this.marketOpenCache.projectCoupons.length + '张可用'
          this.priceSurfacePayInfo = Object.assign(this.priceSurfacePayInfo, { coupon: couponStr, isShowCoupon: true })
        } else {
          this.priceSurfacePayInfo = Object.assign(this.priceSurfacePayInfo, { isShowCoupon: false })
        }
      }

      submitPrice = submitPrice - this.userPrice
      balancePay = this.userPrice
      if (submitPrice < 0) {
        balancePay = this.userPrice + submitPrice
        submitPrice = 0
      } else {
        if (balancePay > this.userPrice) {
          balancePay = this.userPrice
          submitPrice = balancePay - this.userPrice
        }
      }
      balancePay = balancePay < 0 ? (balancePay = 0) : balancePay
      this.submitPayInfo = { value: submitPrice, coupon: coupon }
      this.priceSurfacePayInfo = Object.assign(this.priceSurfacePayInfo, { balanceAmount: this.userPrice, balancePay: balancePay })
    },
    priceItemClickHandle(index) {
      this.$store.commit(types.SET_MARKET_OPEN_CACHE, Object.assign(this.marketOpenCache, { currPriceListIndex: index }))
      this.currPriceAct = index
      this.priceSurfacePayInfo = { balanceAmount: this.userPrice, balancePay: 0, coupon: 0 }
      this.currPriceListIndex = index
      let priceItem = this.priceList[this.currPriceListIndex]
      let submitPrice = priceItem.subscribeAmount
      if (submitPrice < 0) submitPrice = 0
      let balancePay = 0
      submitPrice = submitPrice - this.userPrice
      balancePay = this.userPrice
      if (submitPrice < 0) {
        submitPrice = 0
        balancePay = priceItem.subscribeAmount
      }

      this.submitPayInfo = { value: submitPrice, coupon: 0 }
      this.priceSurfacePayInfo = Object.assign(this.priceSurfacePayInfo, { balancePay: balancePay })
      this.getCoupan()
    },

    couponClickHandle() {
      this.$router.push('/market/couponSelect/' + this.linkerId)
    },

    async getCoupan() {
      let priceItem = this.priceList[this.currPriceListIndex]
      let res = await mycoupons.getMyCoupons(this.linkerId, priceItem.subscribeAmount, 1, 1000)
      let couponStr = res.canUseNum + '张可用'
      this.priceSurfacePayInfo = Object.assign(this.priceSurfacePayInfo, { coupon: couponStr, isShowCoupon: res.canUseNum > 0 ? true : false })
      // this.$store.dispatch('setProjectCoupons', res.page.records)
      this.$store.commit(types.SET_MARKET_OPEN_CACHE, Object.assign(this.marketOpenCache, { projectCoupons: res.page.records }))
    },

    async paySubmit() {
      let priceItem = this.priceList[this.marketOpenCache.currPriceListIndex]
      let param = {
        linkerId: this.linkerId,
        linkerName: this.projectInfo.linkerName,
        costType: this.costType, //1、开通vip 2、楼盘开通 3：套盘套餐开通 4：一天体验
        subscribeNum: priceItem.subscribeNum,
        amountId: priceItem.id,
        payOpenid: this.userInfo.payOpenId
      }

      if (this.marketOpenCache.currSelectedCoupon) {
        param.couponsCodes = this.marketOpenCache.currSelectedCoupon.couponsCode
      }
      this.isPayLoading = true
      const res = await commonService.payForProject(param)
      const purchaseId = res.purchaseId
      this.isPayLoading = false
      if (res.prepayStatus) {
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
              this.cancelPayment(purchaseId)
            },
            fail: res => {
              this.$toast('支付失败')
              this.cancelPayment(purchaseId)
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
      let _pirce = this.userPrice - this.priceSurfacePayInfo.balancePay
      this.$store.commit(types.USER_INFO, Object.assign(this.userInfo, { price: _pirce }))
      this.getMarketDescribeInfo()
      this.getLinkerAmountList()
      this.$dialog
        .confirm({
          title: '开通成功',
          message: '你已成功开通楼盘' + '，快去推荐给身边的小伙伴',
          cancelButtonText: '取消',
          className: 'success-hint'
        })
        .then(() => {
          this.$router.replace('/market/' + this.linkerId)
        })
        .catch(() => {})
    },

    async getMarketDescribeInfo() {
      const res = await marketService.getLinkerSimpleDetail(this.linkerId)
      console.log(res, '开通数据', res.city, res.district)

      this.projectInfo = {
        linkerImg: res.headImgUrl,
        linkerAddress: `${res.city} ${res.county}`,
        city: res.city,
        district: res.district,
        linkerTags: res.projectTagList,
        linkerPrice: res.averagePrice,
        linkerName: res.linkerName,
        openTimes: res.openTimes,
        sale: res.sale,
        commission: res.commission,
        saleStatus: res.saleStatus
      }
      this.$store.commit(types.SET_MARKET_OPEN_CACHE, Object.assign(this.marketOpenCache, { linkerId: this.linkerId, projectInfo: this.projectInfo }))
    },
    async getLinkerAmountList() {
      const res = await marketService.getLinkerAmountList(this.linkerId)
      this.priceList = res
      this.$store.commit(types.SET_MARKET_OPEN_CACHE, Object.assign(this.marketOpenCache, { priceList: this.priceList }))
      this.priceItemClickHandle(0)
    }
  }
}
</script>
<style lang="less">
.market-open-page {
  width: 100%;
  background: #f7f9fa;
  .pay-submit-info {
    position: fixed;
    bottom: 0px;
    z-index: 9;
  }
  .agreement-box {
    text-align: center;
    margin: 5px 0 62px 0;

    span:nth-child(1) {
      font-size: 10px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .agreement {
      font-size: 12px;
      transform: scale(0.8);
      height: 14px;
      font-weight: 400;
      color: #007ae6;
    }
  }
}
.success-hint {
  width: 290px;
  height: 160px;
  background: rgba(255, 255, 255, 1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  .van-dialog__header {
    font-size: 18px;

    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    padding-top: 16px;
  }
  .van-dialog__message--has-title {
    font-size: 15px;
    line-height: 1.5 !important;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    width: 253px;
    padding: 0;
    margin: 9px 0 15px 15px;
  }
  .van-dialog__footer--buttons {
    flex: 1;
    .van-hairline--left {
      color: rgba(0, 122, 230, 1);
    }
  }
}
</style>
