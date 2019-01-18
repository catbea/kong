<template>
  <div class="van-hairline--top open-Payment-page">
    <div class="open-Payment-page-top">
    <ul>
      <li>￥{{payInfo.value | priceFormart}}</li>
      <li>已优惠 {{payInfo.coupon | priceFormart}}</li>
    </ul>
    <ol>
      <li v-show="!isPayLoading" @click="payClickHandler">立即支付</li>
      <li v-show="isPayLoading" class="pay-loading">支付中...</li>
    </ol>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    show: false
  }),
  props: {
    isPayLoading: false,
    payInfo: {
      type: Object,
      default: function() {
        return {
          value: 0,
          coupon: 0
        }
      }
    }
  },
  methods: {
    vant() {
      this.show = true
    },
    payClickHandler() {
      this.$emit('paySubmit')
    }
  }
}
</script>
<style lang="less">
.open-Payment-page {
  background: #ffffff;
  // border-top: 1px solid #e6e6e6;
  width: 100%;
  .open-Payment-page-top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 8px 0 8px 16px;
    ul {
      li:nth-child(1) {
        margin-bottom: 5px;
        font-size: 18px;

        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
      }
      li:nth-child(2) {
        font-size: 12px;

        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
      }
    }
  }
  ol {
    li {
      margin-right: 16px;
      width: 125px;
      height: 44px;
      background: rgba(0, 122, 230, 1);
      border-radius: 22px;
      font-size: 15px;

      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 44px;
      text-align: center;
    }
    .pay-loading {
      margin-right: 16px;
      width: 125px;
      height: 44px;
      background: #ddd;
      border-radius: 22px;
      font-size: 15px;

      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 44px;
      text-align: center;
    }
  }
}
</style>
