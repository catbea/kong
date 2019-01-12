<template>
  <div class="article-guide">
    <div class="step step1" v-show="step===1">
      <img src="../../assets/img/article/guide1.png" alt="" srcset="">
    </div>
    <div class="step step2" v-show="step===2">
      <img src="../../assets/img/article/guide2.png" alt="" srcset="">
    </div>
    <div class="step step3" v-show="step===3">
      <img src="../../assets/img/article/guide3.png" alt="" srcset="">
    </div>
    <div class="step step4" v-show="step===4">
      <img src="../../assets/img/article/guide4.png" alt="" srcset="">
    </div>
    <div class="step step5" v-show="step===5">
      <img src="../../assets/img/article/guide5.png" alt="" srcset="">
    </div>
    <div class="step step6" v-show="step===6">
      <img src="../../assets/img/article/guide6.png" alt="" srcset="">
    </div>
    <div class="step step6" v-show="step===7">
      <img src="../../assets/img/article/guide7.png" alt="" srcset="">
    </div>
    <div class="action-btn" :class="'step'+step">
      <button class="next" v-show="step < 6" @click="nextStep">下一步</button>
      <button class="skip" v-show="step < 6" @click="hideStep">跳过</button>
      <button class="save" v-show="step === 6" @click="hideStep">知道了</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1
    }
  },
  methods: {
    // 下一步
    nextStep () {
      this.step += 1 
    },
    // 跳过
    hideStep () {
      this.$emit('hideStep')
    } 
  }
}
</script>

<style lang="less" scoped>
.article-guide{
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  .step{
    height: 100%;
    position: absolute;
    z-index: 2;
  }
  .action-btn{
     position: absolute;
     margin:  0 72px;
     text-align: center;
     z-index: 3;
     button{
       border: 1px solid #fff;
       height: 32px;
       width: 95px;
       color: #fff;
       border-radius: 16px;
       background: transparent;
       font-size: 16px;
       &.next{
         margin-right: 40px;
       }
     }
     &.step1{
       top: 370px;
     }
     &.step2{
       top: 480px;
     }
     &.step3{
       top: 60px;
     }
     &.step4{
       top: 370px;
     }
     &.step5{
       top: 420px;
     }
     &.step6{
       top: 130px;
     }
     &.step7{
       top: 333px;
     }
  }
}
</style>
