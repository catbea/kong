<template>
  <div class="coupon-select-page">
    <div class="van-hairline--bottom un-use-coupon">
        <span class="label">不使用优惠券</span>
        <span class="icon-check bg_img" @click="unUseCoupanhandle" :style="{backgroundImage:'url('+unCheckImg+')'}"></span>
    </div>
    <coupon-item v-for="(item,index) in couponList" @skipHandle="couponItemClickHandle(item)" :key="index" :info="item"></coupon-item>
  </div>
</template>
<script>
import mycoupons from 'SERVICE/mycoupons'
import CouponItem from 'COMP/User/myCoupon/CouponItem.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    CouponItem
  },
  computed: {
    ...mapGetters(['projectCoupons'])
  },
  data: () => ({
    couponList: [],
    unCheckImg: require('IMG/user/mealMarket/check@2x.png'),
    checkEndImg: require('IMG/user/mealMarket/checkColor@2x.png')
  }),

  created() {
    this.couponList = this.projectCoupons
    let _list = []
    for (let item of this.projectCoupons) {
      let obj = {}
    }
    // this.getCoupan()
  },

  methods: {
    unUseCoupanhandle() {
      this.$router.go('-1')
    },

    // async getCoupan() {
    //   let res = await mycoupons.getMyCoupons(0, 1, 1000)
    //   this.couponList = res.records
    // },

    couponItemClickHandle(item) {
      console.log(item)
      this.$router.go('-1')
    }
  }
}
</script>
<style lang="less">
.coupon-select-page {
  background: #fff;
  .un-use-coupon {
    display: flex;
    height: 32px;
    font-size: 14px;
    padding-left: 16px;
    padding-top: 12px;

    .label {
      flex: 1;
    }

    .icon-check {
      margin-top: 4px;
      width: 19px;
      height: 19px;
      margin: 0 40px 0 16px;
    }
  }
}
</style>
