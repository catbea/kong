<template>
  <div class="popup-page">
    <div class="popup-page-top">
      <p>===</p>
      <p>---</p>
    </div>
    <ul class="popup-page-bottom">
      <li>进入</li>
    </ul>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less">
.popup-page {
  width: 280px;
  height: 146px;
  background: rgba(255, 255, 255, 1);
  .popup-page-top {
    padding-top: 25px;
    p:nth-child(1) {
      font-size: 18px;
      font-family: PingFangSC-Medium;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
      margin: 0 0 9px 0;
      text-align: center;
    }
    p:nth-child(2) {
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 21px;
      margin-bottom: 15px;
      text-align: center;
    }
  }
  .popup-page-bottom {
    border-top: 1px solid #e5e5e5;
    display: flex;
    li {
      height: 49px;
      line-height: 49px;
      text-align: center;
      font-size: 18px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 122, 230, 1);
      border-left: 1px solid #e5e5e5;
    }
  }
}
</style>
