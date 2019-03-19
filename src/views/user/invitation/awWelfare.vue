<template>
  <div class="invitation-bg">
    <div class="invitation-top" :style="{backgroundImage:'url(' + starBg + ')'}">
      <div class="invitation-title">邀请有礼</div>
      <img class="romptingLabel" :src="romptingLabel">
      <div class="invitation-info">
        <img :src="userInfo.avatarUrl?userInfo.avatarUrl:userEditIcon" class="info-left-icon">
        <p class="awWelfare-info-right-remak">{{userInfo.name}} 邀请你加入AW大师</p>
      </div>
    </div>
    <div
      class="company-card"
      :style="{backgroundImage:'url(' + companyBg + ')'}"
      v-show="status === 1"
      id="share-top"
    >
      <div class="code-bg" id="qrcode" ref="qrCodeUrl"></div>
      <span class="code-text">扫描二维码</span>
      <span class="campany-text">关注企业公众号</span>
    </div>
    <div class="imgcard" id="card-result" v-show="status === 2">
      <img class="imgcard-img" id="imgcard">
    </div>
    <span class="notice-text">请长按保存邀请图片</span>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import QRCode from 'qrcodejs2'
import userService from 'SERVICE/userService'
import h2c from 'html2canvas'

export default {
  data: () => ({
    companyBg: require('IMG/user/invitation/invitition_bg.png'),
    romptingLabel: require('IMG/user/invitation/rompting_label.png'),
    starBg: require('IMG/user/invitation/star_bg.png'),

    invitationUrl: '',
    status: 1,
    registrationRules: ''
  }),
  computed: {
    ...mapGetters(['userInfo'])
  },
  async mounted() {
    await this.getqueryInvitationUrl()
    this.toImg()
  },

  created() {
    this.getregisrules()
  },

  methods: {
    toImg() {
      let t = setTimeout(() => {
        if (document.getElementById('qrcode').getElementsByTagName('img')) {
          this.savaReport()
          clearTimeout(t)
        } else {
          this.toImg()
        }
      }, 500)
    },
    async getqueryInvitationUrl() {
      const res = await userService.getqueryInvitationUrl()
      this.invitationUrl = res.invitationUrl
      this.goyInvitationUrlCode(this.invitationUrl)
    },
    goyInvitationUrlCode(url) {
      let qrcode = new QRCode('qrcode', {
        width: 170,
        height: 170, // 高度
        text: this.invitationUrl, // 二维码内容
        image: '',
        render: 'table' // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas） // background: '#f0f' // foreground: '#ff0'
      })
    },
    async getregisrules() {
      const regis = await userService.getrules(1)
      this.registrationRules = regis.rule.split('#')
    },
    async savaReport() {
      const dpr = window.devicePixelRatio
      const canvas = await h2c(document.querySelector('#share-top'), {
        logging: false,
        useCORS: true,
        backgroundColor: null
      })
      let imgW = 321
      let imgH = 397
      let box = document.getElementById('card-result')
      box.style.overflow = 'hidden'
      box.style.width = imgW + 'px'
      box.style.height = imgH + 'px'
      box.style.border = 'none'

      let image = document.getElementById('imgcard')
      image.src = canvas.toDataURL('image/png')
      image.style.width = imgW + 1 + 'px'
      image.style.maxWidth = imgW + 1 + 'px'
      image.style.height = imgH + 1 + 'px'
      this.status = 2
    }
  }
}
</script>


<style lang="less" scoped>
.invitation-bg {
  background: linear-gradient(220deg, rgba(0, 158, 230, 1) 0%, rgba(0, 122, 230, 1) 100%);

  > .invitation-top {
    width: 80%;
    height: 100px;
    margin-left: 10%;
    background-size: 299px 89px;
    border: none;

    > .romptingLabel {
      width: 122px;
      height: 40px;
      position: absolute;
      right: 10%;
      top: 60px;
    }

    > .invitation-title {
      height: 40px;
      font-size: 40px;
      font-family: FZY4JW--GB1-0;
      font-weight: normal;
      color: rgba(255, 255, 255, 1);
      line-height: 46px;
      margin-top: 50px;
    }

    > .invitation-info {
      width: 100%;
      height: 24px;
      display: flex;
      margin-top: 8px;

      > .info-left-icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-top: 10px;
      }

      > .awWelfare-info-right-remak {
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
        font-size: 14px;
        margin-top: 12px;
        margin-left: 10px;
      }
    }
  }
  > .company-card {
    height: 75%;
    width: 80%;
    background: green;
    margin-left: 10%;
    border-color: transparent;
    background-size: cover;
    display: flex;
    min-height: 380px;
    flex-direction: column;

    > .code-bg {
      display: flex;
      justify-content: center;
      margin-top: 40px;
    }

    > .code-text {
      display: flex;
      justify-content: center;
      color: #333333;
      font-size: 14px;
      line-height: 10px;
      margin-top: 20px;
    }

    > .campany-text {
      display: flex;
      justify-content: center;
      color: #333333;
      font-size: 14px;
      line-height: 10px;
      margin-top: 10px;
    }
  }

  .imgcard {
    height: 66%;
    width: 86%;
    margin-top: -10px;
    border: 1px #0098e6 solid;
    padding-top: 2px;
    margin-left: 7%;

    > .imgcard-img {
      width: 100%;
      height: 100%;
      border: none;
      border-color: transparent;
    }
  }

  .notice-text {
    color: #ffffff;
    font-size: 14px;
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
}
</style>
