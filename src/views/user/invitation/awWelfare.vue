<template>
  <div class="invitation-bg">
    <div class="save-card" v-show="status === 1" id="share-top">
      <div style="width:100%;height:30px;"></div>
      <div class="invitation-top" :style="{backgroundImage:'url(' + starBg + ')'}">
        <div class="invitation-title">邀请有礼</div>
        <img class="romptingLabel" :src="romptingLabel">
        <div class="invitation-info">
          <img :src="userInfo.avatarUrl?userInfo.avatarUrl:userEditIcon" class="info-left-icon">
          <p class="awWelfare-info-right-remak">{{userInfo.name}} 邀请你加入AW大师</p>
        </div>
      </div>
      <div class="company-card" :style="{backgroundImage:'url(' + companyBg + ')'}">
        <div class="code-bg" id="qrcode" ref="qrCodeUrl"></div>
        <span class="code-text">扫描二维码</span>
        <span class="campany-text">关注企业公众号</span>
      </div>
      <span class="notice-text">请长按保存邀请图片</span>
    </div>
    <div class="imgcard" id="card-result" v-show="status === 2">
      <img class="imgcard-img" id="imgcard">
    </div>
    <div class="cloud-bg" :style="{backgroundImage:'url(' + cloud + ')'}"></div>
    <div class="recode-box">
      <div class="check-record" @click="goteammateList">
        <span>查看邀请记录</span>
        <div class="right-body">
          <img class="img-label" :src="coupon">
          <img class="img-arrow" :src="rightArrow">
        </div>
      </div>
      <div class="rule-body">
        <span class="rule-text">活动规则</span>
        <div class="rule-line">
          <li>成功邀请1个好友注册可获得1张代金券。</li>
          <li>第1次获得5元券</li>
          <li>第2次获得10元券</li>
          <li>第3次获得15元券</li>
          <li>第4次及以上均获得20元券</li>
        </div>
      </div>
      <div class="activity-text-first">本活动最终解释权归</div>
      <div class="activity-text-second">深圳尊豪网络科技股份有限公司所有</div>
    </div>
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
    cloud: require('IMG/user/invitation/cloud_invition.png'),
    coupon: require('IMG/user/invitation/coupon_label.png'),
    rightArrow: require('IMG/user/invitation/arrow.png'),

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
    async goteammateList() {
      this.$router.push({ name: 'teammateList' })
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
      let imgW = 100
      let imgH = 100
      let box = document.getElementById('card-result')
      box.style.overflow = 'hidden'
      box.style.width = imgW + '%'
      box.style.height = imgH + '%'
      box.style.border = 'none'

      let image = document.getElementById('imgcard')
      image.src = canvas.toDataURL('image/png')
      image.style.width = imgW + '%'
      image.style.maxWidth = imgW + '%'
      image.style.height = imgH + '%'
      image.style.marginTop='-3%'
      this.status = 2
    }
  }
}
</script>


<style lang="less" scoped>
.invitation-bg {
  background: linear-gradient(220deg, rgba(0, 158, 230, 1) 0%, rgba(0, 122, 230, 1) 100%);

  > .save-card {
    width: 100%;
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
      margin-top: 20px;
      height: 35px;
    }
  }

  .cloud-bg {
    background-size: cover;
    width: 100%;
    height: 64px;
  }

  .recode-box {
    background: white;
    width: 100%;
    height: 350px;

    > .check-record {
      width: 86%;
      margin-left: 7%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 54px;
      border-bottom: 1px #e2e2e3 solid;
      border-top: 1px #e2e2e3 solid;

      span {
        color: #333333;
        font-size: 16px;
      }

      .right-body {
        width: 53px;
        height: 16px;
        display: flex;

        > .img-label {
          width: 35px;
          height: 16px;
        }

        > .img-arrow {
          width: 16px;
          height: 16px;
        }
      }
    }
    > .rule-body {
      width: 86%;
      margin-left: 7%;
      margin-top: 28px;
      margin-bottom: 54px;

      > .rule-text {
        font-size: 24px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(68, 81, 102, 1);
        line-height: 33px;
      }

      .rule-line {
        margin-top: 14px;

        li {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(68, 81, 102, 1);
          line-height: 24px;
        }
      }
    }

    > .activity-text-first {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(150, 158, 168, 1);
      display: flex;
      justify-content: center;
    }

    > .activity-text-second {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(150, 158, 168, 1);
      display: flex;
      line-height: 25px;
      justify-content: center;
    }
  }
}
</style>
