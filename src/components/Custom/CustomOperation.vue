<template>
  <div class="custom-operation-page">
    <div class="attention-box" @click="attentionHandler">
      <span class="bg_img icon-attention" :style="{backgroundImage:'url('+(attentionFlag?attentionColorImg:attentionImg)+')'}"></span>
      关注
    </div>
    <div class="report-box" @click="reportHandler"> 
      <span class="bg_img icon-report" :style="{backgroundImage:'url('+reportImg+')'}"></span>
      报备
    </div>
    <div class="phone-button" @click="phoneHandler" v-if="clientMobile">
      <span class="bg_img icon-phone" :style="{backgroundImage:'url('+phoneImg+')'}"></span>
      电话
    </div>
    <div class="consult-button" :class="clientMobile.length==0&&'button'" @click="consultHandler">
      <span class="bg_img icon-consult" :style="{backgroundImage:'url('+consultImg+')'}"></span>
      联系
    </div>
  </div>
</template>
<script>
export default {
  props: {
    attentionFlag: { type: Boolean, default: false },
    clientMobile: { type: String, default: '' }
  },
  data: () => ({
    attentionImg: require('IMG/custom/attention@2x.png'),
    attentionColorImg: require('IMG/custom/attentionColor@2x.png'),
    reportImg: require('IMG/custom/report@2x.png'),
    phoneImg: require('IMG/custom/phone@2x.png'),
    consultImg: require('IMG/custom/consult@2x.png')
  }),
  methods: {
    attentionHandler() {
      this.$emit('onattention', this.attentionFlag)
    },
    reportHandler() {
      this.$emit('onreport')
    },
    phoneHandler() {
      this.$emit('onphone')
    },
    consultHandler() {
      this.$emit('onconsult')
    }
  }
}
</script>
<style lang="less">
.custom-operation-page {
  display: flex;
  align-items: center;
  width: 100%;
  height: 72px;
  position: fixed;
  bottom: 0;
  background: #ffffff;
  border-top: 1px solid #e6e6e6;
  .attention-box,
  .report-box {
    display: flex;
    flex-direction: column;
    margin-left: 33px;
    span {
      width: 24px;
      height: 24px;
    }
    font-size: 11px;

    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 16px;
  }
  .phone-button,
  .consult-button {
    width: 98px;
    height: 44px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;

    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 20px;
    span {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }
  .phone-button {
    background: rgba(64, 68, 87, 1);
    margin-left: 36px;
  }
  .consult-button {
    background: rgba(0, 122, 230, 1);
    margin-left: 16px;
  }
  .button {
    width: 212px;
    margin-left: 35px;
  }
}
</style>
