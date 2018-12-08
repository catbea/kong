<template>
  <div class="register-step3-page">
    <reg-step :step="1" :stepTitle="stepTitle"></reg-step>
    <div class="register-content van-hairline--top">
      <div class="register-title">输入手机号注册</div>
      <div class="register-subtitle">获取验证码输入即可完成注册</div>
      <div class="from-container">
        <div class="phone-cell">
          <div class="phone-tip" v-if="phoneFocus">请使用当前微信绑定号码进行注册</div>
          <material-input placeholder="请输入手机号" :type="'number'" :maxlength="11" v-model="mobile" @focus="focusHandler" @blur="blurHandler"></material-input>
        </div>
        <div class="code-cell">
          <material-input placeholder="请输入验证码" :type="'number'" :maxlength='6' v-model="code"></material-input>
          <div class="send-btn" :class="disabled&&'disabled'" @click="sendCodeHandler">{{sendCodeText}}</div>
        </div>
        <div class="invite-cell">
          <div class="invite-name">邀请人：{{parentUserName}}</div>
        </div>
      </div>
    </div>
    <div class="register-bottom">
      <div class="next-step" @click="registerHandler">注册</div>
      <p class="protocol">注册代表您同意
        <router-link to="/">AW大师用户协议</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import RegStep from 'COMP/Register/RegStep'
import MaterialInput from 'COMP/MaterialInput'

import RegisterService from 'SERVICE/registService'
export default {
  components: {
    RegStep,
    MaterialInput
  },
  data: () => ({
    stepTitle: '手机注册',
    mobile: '',
    code: '',
    sendCodeText: '获取验证码',
    codeTime: 60,
    disabled: false,
    phoneFocus: false,
    registerType: '',
    enterpriseId: '',
    parentUserId: '',
    parentUserName: ''
  }),
  created () {
    console.log(this.$route.query)
    this.query = this.$route.query
    this.registerType = this.query.registerType
    this.enterpriseId = this.query.enterpriseId
    this.parentUserId = this.query.parentUserId
    this.queryReferrerInfo(this.parentUserId)
    // document.getElementsByClassName('next-step')[0].addEventListener('click', function(){console.log(3333)},true)
  },
  methods: {
    /**
     * 发送验证码
     */
    sendCodeHandler () {
      if (this.disabled == false) {
        this.disabled = !this.disabled;
        // const result = RegisterService.sendMsgRegister(this.mobile)
        this.countDown()
      }
    },
    countDown () {
      this.sendCodeText = '重新发送(' + this.codeTime + 's)'
      let timer = setInterval(() => {
        this.codeTime --
        this.sendCodeText = '重新发送(' + this.codeTime + 's)'
        if (this.codeTime < 0) {
          clearInterval(timer)
          this.sendCodeText = '重新发送'
          this.codeTime = 60
          this.disabled = false
        }
      }, 1000)
    },
    focusHandler (focus) {
      this.phoneFocus = focus
    },
    blurHandler (focus) {
      this.phoneFocus = focus
    },
    registerHandler () {
      console.log('11111')
      // let params = {
          // enterpriseId: this.enterpriseId
        // }
        // debugger
        // this.$router.push({path: '/register/step2', query: params})
      // this.register()
    },
    /**
     * 查询推荐人信息
     */
    async queryReferrerInfo(parentUserId) {
      const result = await RegisterService.queryReferrerInfo(1)
      this.parentUserName = result.name
    },
    /**
     * 注册
     */
    async register () {
      let vo = {
        mobile: this.mobile,
        code: this.code,
        registerType: this.registerType,
        enterpriseId: this.enterpriseId,
        parentUserId: this.parentUserId,
      }
      const result = await RegisterService.register(vo)
      if (JSON.stringify(data) != "{}") {
        let params = {
          enterpriseId: this.enterpriseId
        }
        this.$router.push({path: '/register/step2', query: params})
          // location.href = '/?cropId=ww8f6801ba5fd2a112'
      }
    }
  }
}
</script>
<style lang="less">
.register-content {
  // border-top: 1px solid #dddddd;
  // margin-top: 20px;
  // margin-left: 16px;
  .register-title {
    color: #333333;
    font-size: 24pt;
    // font-weight: 'Semibold';
    text-align: center;
    margin-top: 32px;
  }
  .register-subtitle {
    color: #666666;
    font-size: 12pt;
    // font-weight: 'Regular';
    text-align: center;
  }
  .register-qrcode {
    margin-top: 40px;
    text-align: center;
    width: 200px;
    height: 200px;
  }
  .register-desc {
    margin-top: 12px;
    color: #969ea8;
    font-size: 12pt;
    // font-weight: 'Regular';
    text-align: center;
  }
  
  .from-container {
    margin: 45px 15px 15px;
    .phone-cell {
      margin: 10px 15px;
      > .phone-tip {
          color: #969EA8;
          font-size: 12pt;
          text-align: left;
          margin-left: 5px;
        }
    }
    .code-cell {
      position: relative;
      margin: 10px 15px;
      > .send-btn {
        position: absolute;
        width: 105px;
        height: 32px;
        background: rgba(0, 122, 230, 1);
        border-radius: 16px;
        font-size: 15px;
        font-weight: 400;
        line-height: 32px;
        right: -20%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: rgba(255, 255, 255, 1);
        text-align: center;
        &.disabled {
          opacity: 0.5;
        }
      }
    }
    .invite-cell {
      margin: 26px 15px;
      > .invite-name {
        color: #333333;
        font-size: 16pt;
        font-weight: Semibold;
      }
    }
  }
}
.register-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    .next-step {
    width: 343px;
    margin-left: 16px;
    background: #007ae6;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 400;
    color: #fff;
    padding: 10px 0;
    
  }
  .protocol {
    margin: 10px;
    font-size: 12px;
    color: #666666;
    > a {
      color: #448ee3;
    }
  }
}
</style>




