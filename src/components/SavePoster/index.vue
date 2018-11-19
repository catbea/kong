<template>
  <div class="market-share-poster-page">
    <div class="box">
    <div class="share-top">
      <div class="share-top-content"></div>
    </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less">
.market-share-poster-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .share-top {
    width: 300px;
    height: 480px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 6px 0px rgba(58, 76, 130, 0.07),
      0px 2px 17px 0px rgba(34, 47, 85, 0.05);
    .share-top-content {
      width: 271px;
      height: 448px;
      border: 1px solid black;
    }
  }
}
</style>
