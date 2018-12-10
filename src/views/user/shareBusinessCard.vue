<template>
  <div class="page-1">
    <div class="build" v-show="status === 1">
      <div id="show-container">
        <div class="card-img"></div>
        <img class="avatar-img" :src="avatvrImg" alt="">
        <img class="cover-img" :src="coverBg">
        <img class="logo-img" :src="logoImg">
        <div class="user-base-info">
          <p class="user-name">{{userInfo.name}}</p>
          <p class="user-nickname">{{userInfo.nickname}}</p>
        </div>
        <div class="user-more-info">
          <p class="user-signature">- {{userInfo.signature}}</p>
          <p class="user-phone">Tel: {{userInfo.phone}}</p>
          <p class="user-company">Col: {{userInfo.company}}</p>
          <p class="user-address">Add: {{userInfo.address}}</p>
        </div>
        <div class="scan-me">
          <div class="qrcode-container">
            <img class="qrcode-view" :src="userInfo.qrcode">
          </div>
          <p>长按识别更多</p>
        </div>
      </div>
      <div class="edit-container">
        <!-- <div @click="changeBgHandler">修改背景</div> -->
        <div @click="buildCardHandler">确认</div>
      </div>
    </div>
    <div class="result" id="card-result" v-show="status === 2"></div>
  </div>
</template>
<script>
import random from 'lodash/random'
import h2c from 'html2canvas'
import userService from '@/services/userService'
export default {
  data: () => ({
    currentImgIndex: 0,
    coverBg: require('IMG/dev/page1/cover@2x.png'),
    logoImg: require('IMG/dev/page1/logo@2x.png'),
    userInfo: {},
    status: 1,
    avatvrImg: 'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=e31d7a55dba20cf4529df68d17602053/91ef76c6a7efce1b27893518a451f3deb58f6546.jpg'
    // IMG_LIST: [
    //   'http://phga1f2sd.bkt.clouddn.com/0000.jpg',
    //   'http://phga1f2sd.bkt.clouddn.com/0001.jpg',
    //   'http://phga1f2sd.bkt.clouddn.com/0002.jpg',
    //   'http://phga1f2sd.bkt.clouddn.com/0003.jpg',
    //   'http://phga1f2sd.bkt.clouddn.com/0004.jpg',
    //   'http://phga1f2sd.bkt.clouddn.com/0005.jpg',
    //   'http://phga1f2sd.bkt.clouddn.com/0006.jpg',
    //   'http://phga1f2sd.bkt.clouddn.com/0008.jpg'
    // ]
  }),
  created() {
    this.getCardInfo()
    // this.userInfo = {
    //   name: '张佳玮',
    //   nickname: 'JIaWei Zhang',
    //   signature: '别问我是谁,请叫我大师啊.别问我是谁,我是大师呀',
    //   phone: '180-9899-9257',
    //   company: '中原地产股份有限公司',
    //   address: '深圳南山区创业路门店',
    //   qrcode: 'http://phga1f2sd.bkt.clouddn.com/0008.jpg'
    // }
  },
  methods: {
    async getCardInfo() {
      const result = await userService.getQrCode()
      if (result) {
        this.userInfo = {
          qrcode: result.miniQrCode,
          phone: result.mobile,
          signature: result.signature,
          address: '深圳南山区创业路门店',
          nickname: 'JIaWei Zhang',
          company: '国际人口贩卖股份有限公司',
          name: result.agentName
        }
      }
    },

    changeBgHandler(e) {
      let r = random(0, this.IMG_LIST.length - 1)
      let randomCount = 0
      while (r === this.currentImgIndex || randomCount > 5) {
        r = random(0, this.IMG_LIST.length - 1)
        randomCount++
        return
      }
      this.currentImgIndex = r
    },
    async buildCardHandler() {
      this.status = 2
      const dpr = window.devicePixelRatio
      const canvas = await h2c(document.querySelector('#show-container'), {
        logging: false,
        useCORS: true
      })
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      document.getElementById('card-result').appendChild(canvas)
    }
  },
  computed: {
    // backImg() {
    //   return this.IMG_LIST[this.currentImgIndex]
    // }
  }
}
</script>
<style lang="less">
.page-1 {
  width: 100%;
  height: 100%;
  #show-container {
    position: relative;
    margin: 15px;
    height: 600px;
    border-radius: 5px;
    .avatar-img {
      width: 100%;
      height: 350px;
      border-radius: 5px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center top;
    }
    .cover-img {
      position: absolute;
      width: 100%;
      height: 470px;
      left: 0;
      bottom: 0;
      object-fit: cover;
      border-radius: 5px;
    }
    .logo-img {
      position: absolute;
      width: 94px;
      height: 23px;
      top: 20px;
      right: 20px;
    }
    .user-base-info {
      position: absolute;
      top: 220px;
      left: 30px;
      color: #ffffff;
      border-bottom: 4px solid #0069ca;
      border-radius: 3px;
      width: 40px;
      white-space: nowrap;
      .user-name {
        font-size: 32px;
        line-height: 32px;
      }
      .user-nickname {
        font-size: 12px;
        line-height: 20px;
      }
    }
    .user-more-info {
      position: absolute;
      color: #ffffff;
      margin: 30px;
      font-weight: 400;
      .user-signature {
        font-size: 16px;
        opacity: 0.85;
        margin-bottom: 20px;
      }
      .user-phone,
      .user-company,
      .user-address {
        font-size: 14px;
        opacity: 0.5;
        line-height: 32px;
      }
    }
    .scan-me {
      position: absolute;
      top: 225px;
      right: 20px;
      .qrcode-container {
        width: 84px;
        height: 84px;
        border-radius: 100%;
        background: #ffffff;

        > .qrcode-view {
          width: 84px;
          height: 84px;
          border-radius: 50%;
        }
      }
      > p {
        margin: 5px 0;
        font-size: 12px;
        transform: scale(0.8);
        text-align: center;
        color: #ffffff;
        opacity: 0.4;
      }
    }
  }
  .edit-container {
    display: flex;
    justify-content: center;
    > div {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
