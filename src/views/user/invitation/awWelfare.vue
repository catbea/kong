<template>
  <div>
    <div class="bg_img awWelfare-bg" :style="{'backgroundImage':'url('+bgCombinedShapeIcon+')'}">
      <div class="awWelfare-botton">
        <div class="awWelfare-botton-item">
          <img :src="awtipsIcon" @click="goteammateList">
        </div>
        <button @click="show1 = true" class="awWelfare-botton-item">
          <img :src="awtips1Icon">
        </button>
      </div>
      <div v-show="status === 1" class="bg_img awWelfare-center" id="share-top">
        <img :src="awbgcardIcon" alt="">
        <div class="qrcode" id="qrcode" ref="qrCodeUrl"></div>
        <div class="awWelfare-info">
          <div class="awWelfare-info-left">
            <img :src="userInfo.avatarUrl?userInfo.avatarUrl:userEditIcon" class="info-left-icon">
          </div>
          <div class="awWelfare-info-right">
            <p class="awWelfare-info-right-name">{{userInfo.name}}</p>
            <p class="awWelfare-info-right-remak">邀请你加入AW大师</p>
          </div>
        </div>
      </div>
      <div class="imgcard" id="card-result" v-show="status === 2">
        <img class="imgcard-img" id="imgcard">
      </div>
      <div class="awWelfare-text">请长按保存邀请图片</div>
    </div>
    <popup v-model="show1" position="center" masker-opacity="0.6" :close-on-click-overlay="false">
      <div class="register-rule-box" :style="{'backgroundImage':'url('+teammatBack+')'}">
        <div class="register-rule-box-name">活动规则</div>
        <div class="register-rule-box-content">
          <div class="register-rule-box-title">邀请注册</div>
          <div class="register-rule-box-text">
            <div
              class="register-rule-box-text-item"
              v-if="regisItem"
              v-for="(regisItem,key) in registrationRules"
              :key="key"
            >
              <div class="div-dian">•</div>
              <div>{{regisItem}}</div>
            </div>
          </div>
          <div class="register-rule-box-footer">
            <p>本活动最终解释权归</p>
            <p>深圳尊豪网络科技股份有限公司所有</p>
          </div>
        </div>
      </div>
      <button class="register-rule-box-close" @click="show1 = false">
        <img :src="awbocloseIcon">
      </button>
    </popup>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { Popup } from 'vant'
import userService from 'SERVICE/userService'
import { mapGetters } from 'vuex'
import h2c from 'html2canvas'
export default {
  components: {
    Popup
  },
  data() {
    return {
      bgCombinedShapeIcon: require('IMG/user/invitation/bgCombinedShape@2x.png'),
      awtipsIcon: require('IMG/user/invitation/aw-tips@2x.png'),
      awtips1Icon: require('IMG/user/invitation/aw-tips1@2x.png'),
      awbocloseIcon: require('IMG/user/invitation/aw-box-close.png'),
      awbgcardIcon: require('IMG/user/invitation/aw-bgcard.png'),
      teammatBack: require('IMG/user/invitation/aw-box-bg@2x.png'),
      show1: false,
      registrationRules: '',
      invitationUrl: '',
      status: 1
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    userInfo(v) {}
  },
  created() {
    this.getregisrules()
  },
  async mounted() {
    await this.getqueryInvitationUrl()
    setTimeout(() => {
      this.savaReport()
    }, 200)
  },
  methods: {
    async savaReport() {
      const dpr = window.devicePixelRatio
      const canvas = await h2c(document.querySelector('#share-top'), {
        logging: false,
        useCORS: true
      })
      canvas.style.width = '284px';
      canvas.style.height = '466px'
      // canvas.style.zIndex = 99
      // document.getElementById('card-result').appendChild(canvas)

      let image = document.getElementById('imgcard')
      image.src = canvas.toDataURL('image/png')

      this.status = 2
    },
    async goteammateList() {
      this.$router.push({ name: 'teammateList' })
    },
    async getregisrules() {
      const regis = await userService.getrules(1)
      this.registrationRules = regis.rule.split('#')
    },

    async getqueryInvitationUrl() {
      const res = await userService.getqueryInvitationUrl()
      this.invitationUrl = res.invitationUrl
      this.goyInvitationUrlCode(this.invitationUrl)
    },
    async goyInvitationUrlCode(url) {
      let qrcode = new QRCode('qrcode', {
        width: 100,
        height: 100, // 高度
        text: this.invitationUrl, // 二维码内容
        image: '',
        render: 'table' // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas） // background: '#f0f' // foreground: '#ff0'
      })
    }
  }
}
</script>

<style scoped lang="less">
.van-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  max-height: 100%;
  overflow-y: auto;
  -webkit-transition: 0.3s ease-out;
  transition: 0.3s ease-out;
  -webkit-overflow-scrolling: touch;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  background-color: rgba(0, 0, 0, 0);
  text-align: center;
}
.radius-border {
  position: relative;
}

.awWelfare-bg {
  width: 100%;
  background-size: 100% 100%;
  height: 100%;
  position: absolute;
  .awWelfare-botton {
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    .awWelfare-botton-item {
      width: 46px;
      height: 60px;
      margin-right: 8px;
      padding: 0px;
      background-color: transparent;
      border: 0;
      img {
        width: 46px;
        height: 60px;
      }
    }
  }
  .awWelfare-center {
    width: 284px;
    height: 466px;
    margin: 0 auto;
    position: relative;

    > img {
      width: 100%;
      height: 100%;
    }
    .qrcode {
      width: 80px;
      height: 80px;
      position: absolute;
      bottom: 31%;
      left: 35%;
    }
    .awWelfare-info {
      padding: 34px 50px 34px 62px;
      position: absolute;
      bottom: 34px;
      display: flex;
      .awWelfare-info-left {
        .info-left-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .awWelfare-info-right {
        margin-left: 12px;
        .awWelfare-info-right-name {
          font-size: 14px;
          font-weight: 300;
          color: rgba(251, 199, 172, 1);
          line-height: 19px;
        }
        .awWelfare-info-right-remak {
          font-size: 11px;
          font-weight: 300;
          color: rgba(251, 199, 172, 1);
          line-height: 15px;
        }
      }
    }
  }

  .imgcard {
    width: 80%;
    height: 75%;
    margin-left: 10%;
    border: none;
    border-color: transparent;

    > .imgcard-img{
      width: 100%;
      height: 100%;
      border:none;
      border-color: transparent
    }
  }

  .awWelfare-text {
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 20px;
    user-select: none;
    margin-top: 10px;
  }
  // #card-result{
  //   >canvas{
  //     z-index: 99;
  //   }
  // }
}
//弹出层
.register-rule-box {
  width: 280px;
  height: 387px;
  background-size: 280px 387px;
  color: rgba(161, 100, 78, 1);
  .register-rule-box-name {
    font-size: 18px;
    font-weight: 600;
    color: rgba(244, 226, 191, 1);
    line-height: 39px;
    text-align: center;
  }
  .register-rule-box-content {
    overflow: scroll;
  }
  .register-rule-box-title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(161, 100, 78, 1);
    line-height: 22px;
    text-align: left;
    padding-top: 14px;
    padding-left: 20px;
  }
  .register-rule-box-text {
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: rgba(161, 100, 78, 1);
    line-height: 17px;
    padding: 0 25px;
    margin-top: 4px;
    .register-rule-box-text-item {
      display: flex;
      margin-bottom: 5px;
      .div-dian {
        margin-right: 15px;
      }
    }
  }
}
.register-rule-box-footer {
  font-size: 10px;
  font-weight: 400;
  color: rgba(161, 100, 78, 1);
  line-height: 16px;
  position: absolute;
  left: 15%;
  bottom: 107px;
}
.register-rule-box-close {
  background-color: transparent;
  border-radius: 0 0 0.16rem 0.16rem;
  margin-top: 40px;
  border: 0;
  img {
    width: 21px;
    height: 21px;
  }
}
.register-rule-box-close:active,
.register-rule-box-close:hover {
  background-color: transparent;
}
</style>
