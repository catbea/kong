<template>
  <div class="register-step3-page">
    <reg-step :step="1" :stepTitle="stepTitle"></reg-step>
    <div class="register-step3-content van-hairline--top">
      <div class="register-step3-title">输入手机号注册</div>
      <div class="register-step3-subtitle">获取验证码输入即可完成注册</div>
      <div class="from-container">
        <div class="phone-cell">
          <div class="phone-tip" v-if="phoneFocus">请使用当前微信绑定号码进行注册</div>
          <material-input placeholder="请输入手机号" :type="'number'" :maxlength="11" v-model="mobile" @focus="focusHandler" @blur="blurHandler"></material-input>
        </div>
        <div class="code-cell">
          <material-input placeholder="请输入验证码" :type="'number'" :maxlength='6' v-model="code" @blur="blurHandler"></material-input>
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
        <router-link :to="route">{{registerAgreementName}}注册协议</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import RegStep from 'COMP/Register/RegStep'
import MaterialInput from 'COMP/MaterialInput'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
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
    disabled: true,
    phoneFocus: false,
    registerType: '',
    enterpriseId: '',
    parentUserId: '',
    parentUserName: '',
    distributorId: '',
    registerAgreementName: '',
    route: ''
  }),
  computed: {
    ...mapGetters(['userRegistInfo'])
  },
  created() {
    this.query = this.$route.query
    this.registerType = this.query.registerType
    this.enterpriseId = this.query.enterpriseId
    this.parentUserId = this.query.parentUserId
    this.distributorId = this.query.distributorId
    this.mobile = this.userRegistInfo.registerMobile
    this.code = this.userRegistInfo.registerCode
    this.queryByRegister(this.enterpriseId)
    this.queryRegisterRecommendInfo(this.enterpriseId, this.registerType, this.parentUserId)
  },
  watch: {
    mobile() {
      this.disabled = !this.mobile
    }
  },
  methods: {
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
    focusHandler(focus) {
      this.phoneFocus = focus
    },
    blurHandler(focus) {
      this.phoneFocus = focus
      let _userRegistInfo = {
        registerMobile: this.mobile,
        registerCode: this.code
      }
      this.$store.commit(types.USER_REGIST_INFO, _userRegistInfo)
    },
    registerHandler() {
      // let params = {
      //   enterpriseId: this.enterpriseId
      // }
      // this.$router.push({path: '/register/step2', query: params})
      this.register()
    },
    async queryByRegister(enterpriseId) {
      const result = await RegisterService.queryByRegister(enterpriseId)
      this.registerAgreementName = result.registerAgreementName
      this.route = '/register/agreement?name=' + this.registerAgreementName
    },
    /**
     * 查询注册推荐人信息
     */
    async queryRegisterRecommendInfo(enterpriseId, registerType, parentUserId) {
      const result = await RegisterService.queryRegisterRecommendInfo(enterpriseId, registerType, parentUserId)
      this.parentUserName = result.name
    },
    /**
     * 注册
     */
    async register() {
      let vo = {
        mobile: this.mobile,
        code: this.code,
        registerType: this.registerType,
        enterpriseId: this.enterpriseId,
        parentUserId: this.parentUserId,
        distributorId: this.distributorId
      }
      const result = await RegisterService.register(vo)
      if (JSON.stringify(result) != '{}') {
        let params = {
          enterpriseId: this.enterpriseId
        }
        this.$router.push({ path: '/register/step2', query: params })
        // location.href = '/?cropId=ww8f6801ba5fd2a112'
      }
    }
  }
}
</script>
<style lang="less">
.register-step3-content {
  margin-top: 32px;
  .register-step3-title {
    color: #333333;
    font-size: 24px;
    text-align: center;
    padding-top: 32px;
  }
  .register-step3-subtitle {
    color: #999;
    font-size: 12px;
    text-align: center;
    padding-top: 6px;
  }

  .from-container {
    margin: 45px 15px 15px;
    .phone-cell {
      margin: 10px 15px;
      > .phone-tip {
        color: #969ea8;
        font-size: 12px;
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
      .material-input__component {
        margin-top: 15px;
      }
    }
    .invite-cell {
      margin: 26px 15px;
      > .invite-name {
        color: #333333;
        font-size: 16px;
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
