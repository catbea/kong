<template>
  <div class="easy-photo-page">
    <div class="bg_img head-box" :style="{backgroundImage:'url(' + headImg + ')'}"></div>
    <div class="middle-box">
      <div class="bg_img middle-img" :style="{backgroundImage:'url(' + middleImg + ')'}"></div>
      <p class="middle-desc">手机连接 | 操作简单 | 预置点位 | 快速合成</p>
    </div>
    <div class="bottom-box">
      <div class="bottom-img" :style="{backgroundImage:'url(' + qrUrl + ')'}">
        <img :src="qrUrl">
      </div>
      
      <p class="bottom-desc">长按识别二维码 下载APP进行体验</p>
    </div>
  </div>
</template>
<script>
import { isIOS } from '@/utils/uaCheck'
export default {
  data: () => ({
    qrUrl: '',
    headImg: require('IMG/easyPhoto/headImg.png'),
    middleImg: require('IMG/easyPhoto/middleImg.png')
  }),
  created() {
    if (this.$route.query.qr) {
      this.qrUrl = this.$route.query.qr
    } else {
      if (isIOS()) {
        this.qrUrl = 'http://static-1251474741.file.myqcloud.com/qrcode/ios.png'
      } else {
        this.qrUrl = 'http://static-1251474741.file.myqcloud.com/qrcode/android.png'
      }
    }
  }
}
</script>
<style lang="less">
.easy-photo-page {
  background: #1e49d3;
  .head-box {
    margin: 37px auto;
    width: 168px;
    height: 66px;
  }
  .middle-box {
    .middle-img {
      margin: 40px auto 20px;
      width: 248px;
      height: 166px;
    }
    .middle-desc {
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      color: #fff;
    }
  }
  .bottom-box {
    .bottom-img {
      margin: 60px auto 10px;
      width: 120px;
      height: 120px;
      background-color: #dddddd;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .bottom-desc {
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      color: #fff;
      opacity: 0.6;
    }
  }
}
</style>


