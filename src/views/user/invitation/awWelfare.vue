<template>
  <div class="invitation-bg">
    <div class="invitation-top">
      <div class="invitation-title">邀请有礼</div>
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
</template>


<script>
import { mapGetters } from 'vuex'
import QRCode from 'qrcodejs2'
import userService from 'SERVICE/userService'
export default {
  data: () => ({
    companyBg: require('IMG/user/invitation/invitition_bg.png'),
    invitationUrl: ''
  }),
  computed: {
    ...mapGetters(['userInfo'])
  },
  async mounted() {
    await this.getqueryInvitationUrl()
    this.toImg()
  },

  methods: {
    toImg() {
      let t = setTimeout(() => {
        if (document.getElementById('qrcode').getElementsByTagName('img')) {
          // this.savaReport()
          // clearTimeout(t)
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
    }
  }
}
</script>


<style lang="less" scoped>
.invitation-bg {
  background: linear-gradient(220deg, rgba(0, 158, 230, 1) 0%, rgba(0, 122, 230, 1) 100%);

  > .invitation-top {
    width: 86%;
    height: 100px;
    margin-left: 7%;

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
    height: 66%;
    width: 86%;
    margin-left: 7%;
    min-height: 397px;
    background-size: 321px 397px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: -10px;

    > .code-bg {
      width: 170px;
      height: 170px;
      margin-top: -100px;

    }

    .code-text {
      color: #333333;
      font-size: 14px;
      line-height: 10px;
      margin-top: 20px;
    }

    .campany-text {
      color: #333333;
      font-size: 14px;
      line-height: 10px;
      margin-top: 5px;
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
