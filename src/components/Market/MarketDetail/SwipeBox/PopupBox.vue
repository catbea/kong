<template>
  <div class="alert-page">
    <div class="alert">
      <ol>
        <li>您有未完善的信息</li>
        <li>信息不完整会影响传播效率哦</li>
      </ol>
      <ul>
        <li @click="cancel">取消</li>
        <li @click="perfect">去完善</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    show: true
  }),
  methods: {
    perfect() {
      , this.$emit('close', false)
    },
    cancel() {
      this.$emit('close', false)
    }
  }
}
</script>
<style lang="less">
.alert-page {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  .alert {
    width: 280px;
    height: 146px;
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    ol {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 95px;
      border-bottom: 1px solid #e5e5e5;
      li:nth-child(1) {
        font-size: 18px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
      }
      li:nth-child(2) {
        margin-top: 9px;
        font-size: 15px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
      }
    }
    ul {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 50px;
      li:nth-child(1) {
        width: 140px;
        height: 50px;
        font-size: 18px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 50px;
        text-align: center;
      }
      li:nth-child(2) {
        border-left: 1px solid #e5e5e5;
        width: 139px;
        height: 50px;
        font-size: 18px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0, 122, 230, 1);
        line-height: 50px;
        text-align: center;
      }
    }
  }
}
</style>
