<template>
  <div class="empty-page">
    <div class="empty-page-top" >
      <span :style="{'background':'url('+img+') no-repeat'}"></span>
      <p>没有找到任何相关楼盘</p>
    </div>
    <p class="empty-page-bottom">推荐楼盘</p>
  </div>
</template>
<script>
export default {
  data: () => ({
    img: require('IMG/search/Group@2x.png')
  })
}
</script>
<style lang="less">
.empty-page {
  width: 375px;
  .empty-page-top {
    height: 185px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      width: 88px;
      height: 88px;
      background-size: contain !important;
    }
    p {
      font-size: 12px;

      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 17px;
      margin-left: 16px;
    }
  }
  .empty-page-bottom {
    font-size: 20px;

    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    margin-left: 16px;
  }
}
</style>
