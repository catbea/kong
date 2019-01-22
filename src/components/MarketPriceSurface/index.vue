<template>
  <div class="market-price-surface-page">
    <ul class="price-box">
      <li
        v-for="(item,index) in priceList"
        :key="index"
        @click="priceItemClickHandle(index)"
        :class="{active:currAct==index}"
      >
        <p>{{item.subscribeNum}} {{item.type==4 ? '天' : '个月'}}</p>
        <p>¥{{item.subscribeAmount | priceFormart}}</p>
        <p
          :class="item.subscribeNum == 3 || item.subscribeNum == 1 ? 'price-desc':'price-desc through'"
        >{{item.subscribeRemark}}</p>
      </li>
      <li @click="vipClickHandle">
        <p>VIP会员</p>
        <p>¥300</p>
        <p class="open-btn">立即开通</p>
        <!-- <span>不限量开通</span> -->
        <img :src="openLabel">
      </li>
      <div class="van-hairline--bottom coupon-box" v-show="payInfo.isShowCoupon" @click="couponClickHandle">
        <div>优惠劵</div>
        <div>
          <p>{{payInfo.coupon}}</p>
          <p class="bg_img" :style="{backgroundImage:'url('+backImg+')'}"></p>
        </div>
      </div>
      <div class="van-hairline--bottom balance-payment" v-show="payInfo.balanceAmount">
        <div>
          <p>余额支付 （￥</p>
          <p>{{payInfo.balanceAmount | priceFormart}}</p>
          <p>）</p>
        </div>
        <div>
          <p>-￥{{payInfo.balancePay | priceFormart}}</p>
        </div>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  data: () => ({
    backImg: require('IMG/discountCoupon/arrow@2x.png'),
    openLabel: require('IMG/user/open_label.png'),
    light: false
  }),
  props: {
    priceList: {
      type: Array,
      default: function() {
        return []
      }
    },
    currAct: 0,
    payInfo: {
      type: Object,
      default: function() {
        return {
          isShowCoupon: false,
          coupon: 0,
          balanceAmount: 0,
          balancePay: 0
        }
      }
    }
  },
  methods: {
    priceItemClickHandle(index) {
      this.$emit('priceItemClick', index)
    },

    vipClickHandle() {
      this.$emit('onVipClick')
    },

    couponClickHandle() {
      this.$emit('couponClick')
    }
  }
}
</script>
<style lang="less">
.through {
  text-decoration: line-through;
}
.market-price-surface-page {
  width: 375px;
  padding: 20px 0 0 0;
  margin-top: 10px;
  background: rgba(255, 255, 255, 1);
  .price-box {
    display: flex;
    flex-wrap: wrap;
    .active {
      background: rgba(0, 122, 230, 0.1);
      border: 1px solid #007ae6;
    }
    li {
      margin-left: 16px;
      width: 104px;
      height: 114px;
      padding-top: 17px;
      border-radius: 6px;
      border: 1px solid #dddddd;
      text-align: center;
      position: relative;
      margin-bottom: 20px;
      img {
        width: 64px;
        height: 18px;
        position: absolute;
        right: 0;
        top: -8px;
      }

      span {
        display: block;
        border-radius: 6px;
        width: 64px;
        height: 15px;
        position: absolute;
        right: 0;
        top: -8px;
        background: rgba(234, 77, 46, 1);
        font-size: 11px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 16px;
        text-align: center;
      }
      p:nth-child(1) {
        font-size: 15px;
        line-height: 22px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
        margin-top: -8px;
        font-family:PingFangSC-Regular;
      }
      p:nth-child(2) {
        font-size: 24px;
        font-weight: 500;
        line-height: 36px;
        color: rgba(51, 51, 51, 1);
        line-height: 36px;
        margin: 4px 0 4px 0;
        font-family:PingFangSC-Regular;
      }
      .price-desc {
        width: 104px;
        height: 18px;
        overflow: hidden;
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
      }
      .open-btn {
        width: 104px;
        height: 18px;
        font-size: 12px;
        font-weight: 400;
        color: #ea4d2e;
        line-height: 17px;
      }
    }
    .coupon-box {
      width: 360px;
      margin-left: 15px;
      // border-bottom: 1px solid #e6e6e6;
      display: flex;
      justify-content: space-between;
      line-height: 56px;
      align-items: center;
      margin-top: -5px;
      div:nth-child(1) {
        font-size: 15px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
      }
      div:nth-child(2) {
        display: flex;
        p:nth-child(1) {
          font-size: 15px;

          font-weight: 600;
          color: rgba(234, 77, 46, 1);
        }
        p:nth-child(2) {
          width: 16px;
          height: 16px;
          margin: 20px 15px 0 4px;
        }
      }
    }
    .balance-payment {
      display: flex;
      width: 375px;
      justify-content: space-between;
      line-height: 56px;
      margin: 0 0 0 15px;
      // border-bottom: 1px solid #e6e6e6;
      div:nth-of-type(1) {
        display: flex;
        p {
          font-size: 15px;

          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
      div:nth-of-type(2) {
        p {
          font-size: 15px;

          font-weight: 600;
          color: rgba(234, 77, 46, 1);
          margin-right: 35px;
        }
      }
    }
  }
}
</style>
