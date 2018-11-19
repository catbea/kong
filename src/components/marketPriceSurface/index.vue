<template>
  <div class="market-price-surface-page">
    <ul class="price-box">
      <li>
        <p>1天体验</p>
        <p>¥2</p>
        <p>限购一次</p>
      </li>
      <li>
        <p>1个月</p>
        <p>¥60</p>
        <p>111</p>
      </li>
      <li>
        <p>3个月</p>
        <p>¥180</p>
        <p>限时立减¥120</p>
      </li>
      <li>
        <p>6个月</p>
        <p>¥99</p>
        <p>限购一次</p>
      </li>
      <li>
        <p>12个月</p>
        <p>¥150</p>
        <p>¥720</p>
      </li>
      <li>
        <p>VIP会员</p>
        <p>¥300</p>
        <p>立即开通</p>
        <span>不限量</span>
      </li>
      <div class="coupon-box">
        <div>优惠劵</div>
        <div>
          <p>-￥120</p>
          <p :style="{'background':'url('+backImg+') no-repeat'}"></p>
        </div>
      </div>
      <div class="balance-payment">
        <div>
        <p>余额支付 （￥</p>
        <p>23:0011111</p>
        <p>）</p>
        </div>
        <div>
        <p>-￥2322</p>
        </div>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  data: _ => ({
    backImg: require('IMG/discountCoupon/arrow.png')
  })
}
</script>
<style lang="less">
.market-price-surface-page {
  width: 375px;
  padding: 20px 0 0 0;
  background: rgba(255, 255, 255, 1);
  .price-box {
    display: flex;
    flex-wrap: wrap;
    li {
      margin-left: 16px;
      width: 104px;
      height: 98px;
      padding-top: 16px;
      border-radius: 6px;
      border: 1px solid #dddddd;
      text-align: center;
      position: relative;
      margin-bottom: 16px;
      span {
        display: block;
        border-radius: 6px;
        width: 64px;
        height: 15px;
        position: absolute;
        right: 0;
        top: -7.5px;
        background: rgba(234, 77, 46, 1);
        font-size: 11px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 16px;
        text-align: center;
      }
      p:nth-child(1) {
        font-size: 15px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
      }
      p:nth-child(2) {
        font-size: 24px;
        font-family: DIN-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 36px;
        margin: 4px 0 4px 0;
      }
      p:nth-child(3) {
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
      }
    }
    .coupon-box {
      width: 360px;
      margin-left: 15px;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      justify-content: space-between;
      line-height: 22px;
      padding: 14px 0 16px 0;
      div:nth-child(1) {
        font-size: 15px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
      }
      div:nth-child(2) {
        display: flex;
        p:nth-child(1) {
          font-size: 15px;
          font-family: PingFang-SC-Semibold;
          font-weight: 600;
          color: rgba(234, 77, 46, 1);
        }
        p:nth-child(2) {
          width: 16px;
          height: 16px;
          margin: 3px 15px 0 4px;
        }
      }
    }
    .balance-payment {
      display: flex;
      width: 375px;
      justify-content: space-between;
      line-height: 22px;
      margin: 0 0 0 15px;
      border-bottom: 1px solid #e6e6e6;
      padding: 18px 0 16px 0;
      div:nth-of-type(1) {
        display: flex;
        p {
          font-size: 15px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
      div:nth-of-type(2) {
        p {
          font-size: 15px;
          font-family: PingFang-SC-Semibold;
          font-weight: 600;
          color: rgba(234, 77, 46, 1);
          margin-right: 35px;
        }
      }
    }
  }
}
</style>
