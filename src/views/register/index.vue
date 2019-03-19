<template>
  <div class="register-page">
    <div class="bg_img top-container" :style="{backgroundImage:'url(' + bgImg + ')'}">
      <div class="bg_img top-right" :style="{backgroundImage:'url(' + borderImg + ')'}"/>
      <p class="top-title">AW大师</p>
      <p class="top-text">全景看房 - AI拓客 - 裂变传播 - 监控意向</p>
      <p class="top-text top-desc">连接客户更简单</p>
      <div class="top-content" v-if="!registSuccess">
        <div class="box-shadow top-form-container">
          <div class="top-invite-info">
            <div class="bg_img invite-head" :style="{backgroundImage:'url(' + borderImg + ')'}"/>
            <span class="invite-name">张佳玮&nbsp;&nbsp;</span>
            <span class="invite-desc">邀请您加入aw大师</span>
          </div>
          <div class="top-phone-cell">
            <input
              class="phone-input"
              placeholder="请使用当前微信绑定手机号"
              type="text"
              oninput="value=value.replace(/[^0-9]/g,'')"
              maxlength="11"
              v-model="mobile"
              @focus="focusHandler"
              @blur="blurHandler"
              @input="inputHandler"
            >
          </div>
          <div class="top-code-cell">
            <div class="top-code-wrap">
              <input
                class="code-input"
                placeholder="请输入验证码"
                type="text"
                oninput="value=value.replace(/[^0-9]/g,'')"
                maxlength="6"
                v-model="code"
                @focus="focusHandler"
                @blur="blurHandler"
              >
            </div>
            <div
              class="top-send-btn"
              :class="disabled&&'disabled'"
              @click="sendCodeHandler"
            >{{sendCodeText}}</div>
          </div>
          <div class="top-name-cell">
            <input
              class="name-input"
              placeholder="请输入你的昵称"
              type="text"
              maxlength="6"
              v-model="name"
              @focus="focusHandler"
              @blur="blurHandler"
              @input="inputHandler"
            >
          </div>
        </div>
        <!-- <router-link :to="params"> -->
        <div class="reg-btn" :class="registDisabled&&'registDisabled'" @click="nextHandler">立即注册</div>
        <!-- </router-link> -->
        <p class="top-protocol">注册代表您同意
          <router-link
            style="color:#fff;font-size:12px;font-weight:bold;"
            to="/register/agreement?name=AW大师"
          >注册协议</router-link>
        </p>
      </div>
      <div v-else class="box-shadow qrcode-content">
        <img class="bg_img register-qrcode" :src="qrcodeImg"></img>
        <div class="register-desc">提交成功，请扫描二维码 </div>
        <div class="register-desc">关注企业微信 即完成注册</div>
      </div>
    </div>
    <div class="info-container">
      <h5>我们是AW大师</h5>
      <div class="bottom-line"></div>
      <div class="items-container">
        <div class="item" v-for="info in data" :key="info.title">
          <div class="bg_img" :style="{backgroundImage:'url(' + info.icon + ')'}"/>
          <h5>{{info.title}}</h5>
          <p>{{info.desc}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import { checkStrLength, checkStrType } from '@/utils/tool'
import RegisterService from 'SERVICE/registService'
export default {
  data: () => ({
    bgImg: require('IMG/register/registerBg.png'),
    borderImg: require('IMG/register/register_border.png'),
    data: [
      { title: '实拍全景', desc: '高保真分享不错过任何细节', icon: require('IMG/register/regIcon1.png') },
      { title: '提高转化率', desc: '改变传统分享被踢出群的尴尬', icon: require('IMG/register/regIcon2.png') },
      { title: '实时跟进', desc: '在合适的时间合适的地点做合适的事', icon: require('IMG/register/regIcon3.png') },
      { title: '大数据分析', desc: '分析客户真实购房需求, 快速形成用户标签', icon: require('IMG/register/regIcon4.png') },
      { title: '200万用户', desc: '与200万AW大师并肩作战', icon: require('IMG/register/regIcon5.png') },
      { title: '2元试用', desc: '您与快速成交的工具 只差两元', icon: require('IMG/register/regIcon6.png') }
    ],
    mobile: '',
    code: '',
    name: '',
    sendCodeText: '获取验证码',
    codeTime: 60,
    disabled: true, // 获取验证码是否可点击
    registDisabled: true, // 注册按钮是否可点击
    clickDisabled: false,  // 注册按钮防多次点击
    registSuccess: false, // 是否成功注册
    registerType: '',
    enterpriseId: '',
    parentUserId: '',
    distributorId: '',
    params: null,
    query: null
  }),
  created() {
    this.query = this.$route.query
    // 10：经纪人推荐注册，20：分销商推荐注册,30:普通注册 （搜一搜跳转注册，公众号跳转注册，用户端小程序切换注册）
    // registerType=10&parentUserId=113&enterpriseId=91
    // registerType=20&parentUserId=113&distributorId=120&enterpriseId=91
    // registerType=30&enterpriseId=91
    if (this.query.registerType == '30') {
      this.params = `/register/step1?${qs.stringify(this.$route.query)}`
    } else {
      this.params = `/register/step3?${qs.stringify(this.$route.query)}`
    }
    this.enterpriseId = this.$route.query.enterpriseId
    this.registerType = this.$route.query.registerType
    this.parentUserId = this.$route.query.parentUserId
    this.distributorId = this.$route.query.distributorId
    this.queryByRegister(this.enterpriseId)
  },
  methods: {
    async queryByRegister(enterpriseId) {
      const result = await RegisterService.queryByRegister(enterpriseId)
      this.qrcodeImg = result.qrCode
    },
    async queryRegisterRecommendInfo() {
      const result = await RegisterService.queryRegisterRecommendInfo(this.enterpriseId, this.registerType, this.parentUserId)
    },
    focusHandler(val, $event) {
      var body = document.querySelector('.top-phone-cell .top-code-cell .top-name-cell')
      body.scrollTop = body.scrollHeight
    },
    blurHandler(val, $event) {
      window.scroll(0, 0)
    },
    inputHandler() {
      if (this.mobile.length == 11) {
        this.disabled = false
      } else {
        this.disabled = true
      }
      if (this.code.length > 0 && this.name.length > 0) {
        this.registDisabled = false
      } else {
        this.registDisabled = true
      }
    },
    /**
     * 发送验证码
     */
    sendCodeHandler() {
      if (this.disabled == false) {
        this.disabled = !this.disabled
        const result = RegisterService.sendMsgRegister(this.mobile)
        this.countDown()
      }
    },
    countDown() {
      this.sendCodeText = '重新发送(' + this.codeTime + 's)'
      let timer = setInterval(() => {
        this.codeTime--
        this.sendCodeText = '重新发送(' + this.codeTime + 's)'
        if (this.codeTime < 0) {
          clearInterval(timer)
          this.sendCodeText = '重新发送'
          this.codeTime = 60
          this.disabled = false
        }
      }, 1000)
    },
    nextHandler() {
      if (this.registDisabled == true) return

      if (this.mobile.length == 0) {
        return this.$toast('请输入微信绑定手机号')
      }
      if (this.code.length == 0) {
        return this.$toast('请输入验证码')
      }
      if (!checkStrLength(this.name, 16)) {
        return this.$toast('昵称最多8个汉字(或16个字符)')
      }
      if (!checkStrType(this.name)) {
        return this.$toast('昵称只支持中文、英文和数字')
      }
      if (this.clickDisabled) {
        return
      }
      this.clickDisabled = true
      this.register()
    },
    async register() {
      let vo = {
        mobile: this.mobile,
        code: this.code,
        agentName: this.name,
        registerType: this.registerType,
        enterpriseId: this.enterpriseId,
        majorRegion: this.majorRegion,
        distributorId: this.userRegistInfo.distributorId,
        institutionId: this.userRegistInfo.institutionId
      }
      const result = await RegisterService.register(vo)
      console.log(result)
      if (result.returnCode == 21103 || result.returnCode == 21105) {
        this.clickDisabled = false
        this.registSuccess = false
        this.$toast(result.msg)
      } else {
        this.clickDisabled = true
        this.registSuccess = true
        // let params = {
        //   enterpriseId: this.enterpriseId
        // }
        // this.$router.push({ path: '/register/step2', query: params })
      }
    }
  }
}
</script>
<style lang="less">
.register-page {
  .top-container {
    position: relative;
    width: 100%;
    height: 600px;
    padding-left: 26px;
    padding-right: 26px;
    padding-top: 50px;
    .top-right {
      position: absolute;
      width: 56px;
      height: 266px;
      top: 20px;
      right: 0;
    }
    .top-title {
      color: #fff;
      font-size: 40px;
      height: 40px;
      line-height: 46px;
      font-family: 'FZY4JW--GB1-0';
      margin-bottom: 10px;
    }
    .top-text {
      color: #fff;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
    }
    .top-desc {
      margin-top: 6px;
    }
    .top-form-container {
      width: 324px;
      height: 260px;
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      margin-top: 24px;
      .phone-input,
      .code-input,
      .name-input {
        color: #445166;
        font-size: 16px;
        width: 90%;
        height: 40px;
        padding-left: 10px;
      }
      .phone-input::-webkit-input-placeholder,
      .code-input::-webkit-input-placeholder,
      .name-input::-webkit-input-placeholder {
        color: #969ea8;
        font-size: 16px;
      }
      .phone-input:-moz-placeholder,
      .code-input::-webkit-input-placeholder,
      .name-input::-webkit-input-placeholder {
        color: #969ea8;
        font-size: 16px;
      }
      .phone-input:-ms-input-placeholder,
      .code-input::-webkit-input-placeholder,
      .name-input::-webkit-input-placeholder {
        color: #969ea8;
        font-size: 16px;
      }

      > .top-invite-info {
        display: flex;
        > .invite-head {
          width: 24px;
          height: 24px;
        }
        > .invite-name {
          color: #666;
          font-size: 14px;
          font-weight: bold;
        }
        > .invite-desc {
          color: #666;
          font-size: 14px;
        }
      }
      > .top-phone-cell,
      > .top-name-cell {
        width: 100%;
        height: 44px;
        border: 1px solid rgba(150, 158, 168, 0.2);
        box-shadow: 0px 2px 4px 0px rgba(150, 158, 168, 0.15);
        margin-top: 20px;
        margin-bottom: 20px;
      }
      > .top-code-cell {
        position: relative;
        > .top-code-wrap {
          width: 174px;
          height: 44px;
          border: 1px solid rgba(150, 158, 168, 0.2);
          box-shadow: 0px 2px 4px 0px rgba(150, 158, 168, 0.15);
        }
        > .top-send-btn {
          margin-left: 10px;
          background-color: #007ae6;
          width: 100px;
          height: 44px;
          line-height: 44px;
          text-align: center;
          color: #fff;
          font-size: 14px;
          position: absolute;
          top: 0;
          right: 0;
          &.disabled {
            opacity: 0.5;
            background-color: #b6c0cc;
          }
        }
      }
    }

    .reg-btn {
      // position: absolute;
      width: 324px;
      height: 45px;
      border-radius: 8px;
      border: 0;
      color: #fff;
      font-size: 16px;
      line-height: 45px;
      text-align: center;
      // top: 482px;
      // left: 50%;
      // transform: translate(-50%, -50%);
      margin-top: 29px;
      background-color: #0dc868;
      &.registDisabled {
        opacity: 0.5;
        border: 1px solid #fff;
        background-color: transparent;
      }
    }
    .top-protocol {
      color: #fff;
      font-size: 12px;
      // position: absolute;
      // top: 514px;
      // left: 26px;
      margin-top: 8px;
    }
  }

  .qrcode-content {
    width: 324px;
    height: 324px;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    margin-top: 24px;
    > .register-qrcode {
    margin-top: 50px;
    width: 200px;
    height: 200px;
    }
    > .register-desc {
    height: 24px;
    color: #333;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  }

  .info-container {
    padding-top: 30px;
    text-align: center;
    > h5 {
      line-height: 1;
      font-size: 24px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      margin-bottom: -20px;
      padding-left: 10px;
    }
    .bottom-line {
      display: inline-block;
      width: 40px;
      height: 3px;
      background: rgba(0, 122, 230, 1);
      border-radius: 2px;
      margin-top: 25px;
    }
    .items-container {
      margin-top: 40px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .item {
        width: 40%;
        margin-bottom: 30px;
        line-height: 1;
        > div {
          display: inline-block;
          width: 48px;
          height: 48px;
        }
        > h5 {
          font-size: 14px;
          line-height: 1.5;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 3px;
        }
        > p {
          width: 80%;
          margin: 0 10%;
          font-size: 12px;
          line-height: 1.3;
          font-weight: 400;
          color: rgba(102, 102, 102, 0.85);
        }
      }
    }
  }
}
</style>
