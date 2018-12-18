<template>
  <div class="register-step2-page">
    <reg-step :step="2" :stepTitle="stepTitle"></reg-step>
    <div class="register-step2-content">
      <div class="register-step2-title">长按识别二维码</div>
      <div class="register-step2-subtitle">关注企业公众号后，点击经纪人端即可使用</div>
      <img class="bg_img register-qrcode" :src="qrcodeImg"></img>
      <div class="register-desc">请使用注册手机号码绑定的微信扫描二维码</div>
    </div>
  </div>
</template>
<script>
import RegStep from 'COMP/Register/RegStep'
import RegisterService from 'SERVICE/registService'
export default {
  components: {
    RegStep
  },
  data: () => ({
    isShow: false,
    value: '110000',
    stepTitle: '已注册',
    qrcodeImg: '',
    enterpriseId: ''
  }),
  created() {
    this.enterpriseId = this.$route.query.enterpriseId
    this.queryByRegister(this.enterpriseId)
  },
  methods: {
    async queryByRegister(enterpriseId) {
      const result = await RegisterService.queryByRegister(enterpriseId)
      this.qrcodeImg = result.qrCode
    }
  }
}
</script>
<style lang="less">
.register-step2-content {
  border-top: 1px solid #dddddd;
  margin-top: 20px;
  text-align: center;
  .register-step2-title {
    color: #333333;
    font-size: 24px;
    font-weight: 'Semibold';
    text-align: center;
    margin-top: 32px;
  }
  .register-step2-subtitle {
    color: #666666;
    font-size: 12px;
    font-weight: 'Regular';
    text-align: center;
    margin-bottom: 40px;
  }
  .register-qrcode {
    margin: 0 auto;
    text-align: center;
    width: 200px;
    height: 200px;
  }
  .register-desc {
    margin-top: 12px;
    color: #969ea8;
    font-size: 12px;
    font-weight: 'Regular';
    text-align: center;
  }
}
</style>
