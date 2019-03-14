<template>
  <div class="scan-code-page">
      <div class="scan-code-container">
          <div class="bg_img scan-code-girl" :style="{backgroundImage:'url(' + grilIconImg + ')'}"></div>
          <p class="scan-code-top">恭喜你</p>
          <div class="bg_img scan-code-star" :style="{backgroundImage:'url(' + starIconImg + ')'}"></div>
          <p class="scan-code-title">领取成功！</p>
          <p class="scan-code-detail">礼品已经躺在你的账号了哦</p>
          <p class="scan-code-detail">请使用参与活动手机号绑定的微信登录查看奖品</p>
          <p class="scan-code-detail">有效期：2019年3月22日前</p>
          <img class="bg_img scan-qrcode" :src="qrcodeImg"></img>
          <p class="scan-code-bottom">长按识别关注企业微信点击经纪人端领取奖品</p>
      </div>
  </div>
</template>
<script>
export default {
    data: () => ({
        grilIconImg: require('IMG/activity/activity_girl.png'),
        starIconImg: require('IMG/activity/activity_star.png'),
        qrcodeImg: ''
    }),
}
</script>
<style lang="less" scoped>
.scan-code-page {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(255, 145, 0, 1) 0%, rgba(254, 91, 1, 1) 38%, rgba(255, 62, 0, 1) 73%, rgba(250, 115, 2, 1) 100%);
}
.scan-code-container {
    width: 304px;
    height: 440px;
    background: linear-gradient(180deg,rgba(253,245,225,1) 0%,rgba(253,245,225,1) 100%);
    box-shadow: 0px 0px 6px 0px rgba(253,83,1,0.75);
    border-radius: 8px;
    margin: 0 auto;
    margin-top: 70px;
    text-align: center;
    position: relative;
    > .scan-code-girl {
        position: absolute;
        width: 30px;
        height: 71px;
        left: 22px;
        top: -36px;
    }
    > .scan-code-star {
        position: absolute;
        width: 11px;
        height: 16px;
        left: 115px;
        top: 40px;
    }
    > .scan-code-top {
        color: #331212;
        font-size: 15px;
        line-height: 21px;
        padding-top: 43px;
        position: relative;
    }
    > .scan-code-title {
        color: #F55130;
        font-size: 24px;
        line-height: 33px;
        font-weight: bold;
        margin: 4px 0 20px 4px;
    }
    > .scan-code-detail {
        color: #F98731;
        font-size: 12px;
        font-weight: bold;
        line-height: 19px;
        margin: 0 25px;
    }
    > .scan-qrcode {
        margin: 0 auto;
        margin-top: 60px;
        margin-bottom: 20px;
        text-align: center;
        width: 120px;
        height: 120px;
    }
    > .scan-code-bottom {
        color: #331212;
        font-size: 10px;
    }
}
</style>


