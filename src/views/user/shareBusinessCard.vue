<template>
  <div class="page-1">
    <div class="build" v-show="status === 1">
      <div id="show-container">
        <div class="card-img"></div>
        <!-- userInfo.avatarUrl -->
        <img class="avatar-img" :src="shareInfo.avatarUrl" alt="">
        <img class="cover-img" :src="coverBg">
        <img class="logo-img" :src="logoImg">
        <div class="user-base-info">
          <p class="user-name">{{shareInfo.name}}</p>
          <p class="user-nickname">{{shareInfo.nickname}}</p>
        </div>
        <div class="user-more-info">
          <p class="user-signature">- {{shareInfo.signature}}</p>
          <p class="user-phone">
            <span>Tel:</span>
            <span>{{shareInfo.phone}}</span>
          </p>
          <p class="user-company">
            <span>Col:</span>
            <span>{{shareInfo.company}}</span>
          </p>
          <p class="user-address">
            <span>Add:</span>
            <span>{{shareInfo.address}}</span>
          </p>
        </div>
        <div class="scan-me">
          <div class="qrcode-container">
            <img class="qrcode-view" :src="shareInfo.qrcode">
          </div>
          <p>长按识别更多</p>
        </div>
      </div>
      <div class="edit-container">
        <!-- <div @click="changeBgHandler">修改背景</div> -->
        <div
          class="mark-sure"
          @click="buildCardHandler"
          :style="{'pointer-events':this.pointerEvents}"
        >确认</div>
      </div>
    </div>
    <van-loading type="spinner" class="van-loading" v-if="showLoading==true"/>
    <div class="result" id="card-result" v-show="status === 2">
      <img id="cardimg">
    </div>
  </div>
</template>
<script>
import random from 'lodash/random'
import h2c from 'html2canvas'
import { mapGetters } from 'vuex'
import userService from '@/services/userService'
export default {
  data: () => ({
    currentImgIndex: 0,
    coverBg: require('IMG/dev/page1/cover@2x.png'),
    logoImg: require('IMG/dev/page1/logo@2x.png'),
    shareInfo: {},
    status: 1,
    showLoading: false,
    pointerEvents: '',
    lastOpTimer: 0
  }),
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.agentId = this.$route.query.agentId
    this.getCardInfo(this.agentId)
  },
  methods: {
    async getCardInfo(agentId) {
      const result = await userService.getQrCode(agentId)
      if (result) {
        this.shareInfo = {
          qrcode: result.miniQrCode,
          phone: result.mobile,
          signature: result.signature,
          address: result.mojarRegion,
          nickname: result.pinyin,
          company: result.institutionName,
          name: result.agentName,
          avatarUrl: result.avatarUrl
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

    buildCardHandler() {
      let dd = new Date().getTime()
      if (dd - this.lastOpTimer < 3000) return
      this.lastOpTimer = dd
      this.handleDate()
    },

    async handleDate() {
      this.status = 2
      this.showLoading = true
      this.pointerEvents = 'none'

      const dpr = window.devicePixelRatio
      const canvas = await h2c(document.querySelector('#show-container'), {
        logging: false,
        useCORS: true
      })
      canvas.style.width = '101%'
      canvas.style.height = '100%'
      // document.getElementById('card-result').appendChild(canvas)

      let image = document.getElementById('cardimg')
      image.src = canvas.toDataURL('image/png')

      this.showLoading = false
    }
  }
}
</script>
<style lang="less">
.page-1 {
  width: 100%;
  height: 100%;
  position: relative;

  .build {
    position: absolute;
    width: 100%;
    height: 100%;

    #show-container {
      position: relative;
      margin: 15px;
      height: 480px;
      margin-left: 10%;
      width: 300px;
      border-radius: 5px;
      .avatar-img {
        width: 100%;
        border-radius: 5px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        background-position: center top;
        background-attachment: fixed;
      }
      .cover-img {
        position: absolute;
        width: 100%;
        height: 400px;
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
        top: 270px;
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
        margin-left: 30px;
        margin-right: 30px;
        font-weight: 400;
        bottom: 0;
        margin-bottom: 10px;
        .user-signature {
          font-size: 16px;
          opacity: 0.85;
          margin-bottom: 10px;
        }
        .user-phone,
        .user-company,
        .user-address:first-child {
          font-size: 14px;
          opacity: 0.5;
          line-height: 32px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
        }

        .user-phone,
        .user-company,
        .user-address:last-child {
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
            padding: 8px;
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
      margin-bottom: 10px;

      > div {
        flex: 1;
        text-align: center;
        background: #007ae6;
        height: 44px;
        border-radius: 5px;
        margin-left: 30px;
        margin-right: 30px;
        color: #ffffff;
        font-size: 16px;
        line-height: 44px;
      }
    }
  }

  .van-loading {
    display: inline-block;
    position: absolute;
    margin-left: 39%;
    width: 84px;
    height: 84px;
    margin-top: 50%;
    z-index: 10000;
  }
}
</style>
