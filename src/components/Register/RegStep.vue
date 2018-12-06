<template>
  <div class="reg-step-container">
    <div class="step-box" :class="(step === 1&&'current-step')||(step > 1&&'step-over')">1<span>{{stepTitle}}</span></div>
    <div class="bg_img interim-box" :style="{backgroundImage:'url(' + (step>1?arr1:arr2) + ')'}"></div>
    <div class="step-box" :class="(step === 2&&'current-step')||(step > 2&&'step-over')">2<span>扫码关注</span></div>
    <div class="bg_img interim-box" :style="{backgroundImage:'url(' + (step>2?arr1:arr2) + ')'}"></div>
    <div class="step-box" :class="step === 3&&'current-step'">3<span>进入经纪人端</span></div>
  </div>
</template>
<script>
export default {
  props: {
    step: { type: Number, default: 1 },
    stepTitle: { type: String, default: '注册完善' }
  },
  data: () => ({
    arr1: require('IMG/register/stepArr1.png'),
    arr2: require('IMG/register/stepArr2.png')
  })
}
</script>
<style lang="less">
.reg-step-container {
  display: flex;
  justify-content: space-evenly;
  margin: 15px;
  .step-box {
    position: relative;
    background: #cbd3dd;
    border-radius: 100%;
    width: 24px;
    height: 24px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    margin: 8px 0;
    > span {
      position: absolute;
      color: #969ea8;
      font-size: 12px;
      width: 80px;
      left: 50%;
      top: 145%;
      transform: translate(-50%, -50%);
    }
    &.current-step {
      width: 30px;
      height: 30px;
      background: #007ae6;
      line-height: 30px;
      margin: 0;
      > span {
        color: #007ae6;
        font-size: 14px;
      }
    }
    &.step-over{
      background:#445166;
      >span{
        color: #445166;
      }
    }
  }
  .interim-box {
    width: 68px;
    height: 14px;
    margin-top: 12px;
  }
}
</style>

