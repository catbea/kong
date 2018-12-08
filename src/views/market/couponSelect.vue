<template>
  <div class="user-myCoupon-page">
    <coupon-item v-for="(item,index) in couponList" :key="index" :info="item"></coupon-item>
  </div>
</template>
<script>
import mycoupons from 'SERVICE/mycoupons'
import CouponItem from 'COMP/User/myCoupon/CouponItem.vue'
export default {
  components: {
    CouponItem
  },
  data: () => ({
      couponList: []
  }),

  created() {

  },

  methods: {

  }
}
</script>