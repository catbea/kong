<template>
  <div class="open-Payment-page">
    <div class="open-Payment-page-top">
    <ul>
      <li>￥7</li>
      <li>已优惠120</li>
    </ul>
    <ol>
      <li>立即支付</li>
    </ol>
    </div>
    <!-- <div class="open-Payment-page-bottom" v-if="true">
      <span>点击立即支付，即表示已阅读并同意</span>
      <span class="agreement" @click="vant">《AW大师付费协议》</span>
      
    </div> -->
  </div>
</template>
<script>
export default {
  data: _ => ({
    show: false
  }),
  props: {},
  methods: {
    vant() {
      this.show = true
    }
  }
}
</script>
<style lang="less">
.open-Payment-page {
  background: #ffffff;
  border-top: 1px solid #e6e6e6;
  .open-Payment-page-top {
    display: flex;
    justify-content: space-between;
    width: 359px;
    padding: 8px 0 8px 16px;
    ul {
      li:nth-child(1) {
        margin-bottom: 5px;
        font-size: 18px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
      }
      li:nth-child(2) {
        font-size: 12px;
        font-family: PingFang-SC-Regular;
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
      font-family: PingFang-SC-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 44px;
      text-align: center;
    }
  }
  // .open-Payment-page-bottom{
  //   line-height:14px;
  //   text-align: center;
  //   margin:8px 0 16px 0;
  //   span:nth-child(1){
  //     font-size:10px;
  //     font-family:PingFang-SC-Regular;
  //     font-weight:400;
  //     color:rgba(153,153,153,1);
  //     line-height:14px;
  //   }
  //   .agreement{
  //     font-size: 12px;
  //     transform:scale(.8);
  //     height: 14px;
  //     font-family:PingFang-SC-Regular;
  //     font-weight:400;
  //     color:#007AE6;
  //   }
  // }
}
</style>
