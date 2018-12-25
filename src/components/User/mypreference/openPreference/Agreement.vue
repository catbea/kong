<template>
  <div class="read-page">
    <p class="read">点击立即开通，即表示已阅读并同意
      <span class="Payment-agreement" @click="agreementHandle">《AW大师付费协议》</span>
    </p>
      </div>
  </div>
</template>
<script>
export default {
  data: () => ({}),
  methods: {
    agreementHandle() {
      this.$router.push('/open/agreement')
    }
  }
}
</script>
<style lang="less">
.read-page {
  .read {
    height: 60px;
    text-align: center;
    font-size: 12px;
    
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 60px;
    background: #f7f9fa;
    .Payment-agreement {
      color: #a07e72;
    }
  }
  .popup-box {
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    .agreement-popup {
      width: 300px;
      height: 400px;
      border-radius: 5px;
      background: #ffffff;
      font-size: 13px;
      overflow-y: auto;
    }
  }
}
</style>
