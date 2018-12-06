<template>
  <div class="register-step2-page">
    <reg-step :step="1" :stepTitle="stepTitle"></reg-step>
    <div class="register-content">
      <div class="register-title">输入手机号注册</div>
      <div class="register-subtitle">获取验证码输入即可完成注册</div>
      <div class="from-container">
        <div class="phone-cell">
          <material-input placeholder="请输入手机号" :type="'number'" :maxlength="11" v-model="mobile"></material-input>
          <div class="send-btn" :disabled="disabled" @click="sendCodeHandler">获取验证码</div>
        </div>
        <div class="code-cell">
          <material-input placeholder="请输入验证码"></material-input>
        </div>
        <div class="invite-cell">
          <div class="invite-name">邀请人：{{inviteName}}</div>
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
export default {
  components: {
    RegStep,
    MaterialInput
  },
  data: () => ({
    stepTitle: '手机注册',
    inviteName: '李大牛'
  }),
  methods: {}
}
</script>
<style lang="less">
.register-content {
  border-top: 1px solid #dddddd;
  margin-top: 20px;
  margin-left: 16px;
  .register-title {
    color: #333333;
    font-size: 24pt;
    font-weight: 'Semibold';
    text-align: center;
    margin-top: 32px;
  }
  .register-subtitle {
    color: #666666;
    font-size: 12pt;
    font-weight: 'Regular';
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
    font-weight: 'Regular';
    text-align: center;
  }
  
  .from-container {
    margin: 45px 15px 15px;
    .phone-cell {
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
    .code-cell {
      margin: 10px 15px;
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
    position: fixed;
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




