<template>
  <div class="register-step2-page">
    <reg-step :step="2" :stepTitle="stepTitle"></reg-step>
    <div class="register-content">
      <div class="register-title">长按识别二维码</div>
      <div class="register-subtitle">关注企业公众号后，点击经纪人端即可使用</div>
      <div class="bg_img register-qrcode" :style="{'backgroundImage':'url('+ qrcodeImg +')'}"></div>
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
.register-content {
  border-top: 1px solid #dddddd;
  margin-top: 20px;
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
    font-size: 12pt;
    font-weight: 'Regular';
    text-align: center;
  }
}
</style>
