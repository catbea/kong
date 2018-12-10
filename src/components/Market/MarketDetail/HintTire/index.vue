<template>
  <div class="hint-tire-page">
    <div class="enjoy">
      <span class="icon-enjoy bg_img" :style="{backgroundImage:'url('+enjoyImg+')'}"></span>
      <p>分享</p>
    </div>
    <div class="hint-box">
      <p>快点击这里分享楼盘</p>
      <div class="line">
        <span class="one"></span>
        <span class="tow"></span>
      </div>
    </div>
    <div class="know-button" @click="knowHandle">
      知道了
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    enjoyImg: require('IMG/marketDetail/enjoy@2x.png')
  }),
  methods: {
    knowHandle() {
      this.$emit('hintClose')
    }
  }
}
</script>
<style lang="less">
.hint-tire-page {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 1);
  opacity: 0.65;
  z-index: 11;
  .enjoy {
    margin: 20px 0px 0 322px;
    display: flex;
    flex-direction: column;
    .icon-enjoy {
      width: 20px;
      height: 20px;
    }
    p {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 17px;
    }
  }
  .hint-box {
    width: 225px;
    height: 164px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 5px 0 0 111px;
    p {
      font-size: 17px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
      margin-bottom: -10px;
    }
    .line {
      display: flex;
      width: 62px;
      height: 159px;
      border-right: dashed rgba(255, 255, 255, 1);
      border-bottom: dashed rgba(255, 255, 255, 1);
      // border-style: dotted;
      position: relative;
      .one {
        width: 5px;
        height: 5px;
        position: absolute;
        right: -4.5px;
        top: -7px;
        background: rgba(255, 255, 255, 1);
        border-radius: 50%;
      }
      .tow {
        width: 5px;
        height: 5px;
        position: absolute;
        bottom: -4.5px;
        left: -6.5px;
        background: rgba(255, 255, 255, 1);
        border-radius: 50%;
      }
    }
  }
  .know-button {
    margin: 123px 0 0 140px;
    width: 95px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 16px;
    opacity: 0.6163000000000001;
    border: 1px solid rgba(255, 255, 255, 1);
    font-size: 17px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
