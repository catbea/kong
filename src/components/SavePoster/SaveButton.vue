<template>
  <div class="save-button-page">
    <p>长按保存图片 可分享好友或朋友圈</p>
    <ol class="button-box">
      <router-link tag="li" to="/marketDetail/share/compile">编辑海报</router-link>
      <li>保存海报</li>
    </ol>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less">
.save-button-page {
  width: 300px;
  text-align: center;
  p {
    font-size: 13px;

    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 18px;
    margin: 10px 0 17px 0;
  }
  ol {
    display: flex;
    justify-content: space-between;
    li:nth-child(1) {
      width: 144px;
      height: 44px;
      line-height: 44px;
      border-radius: 6px;
      border: 1px solid rgba(0, 122, 230, 1);
      font-size: 16px;

      font-weight: 400;
      color: rgba(0, 122, 230, 1);
    }
    li:nth-child(2) {
      width: 144px;
      height: 46px;
      line-height: 46px;
      background: rgba(0, 122, 230, 1);
      border-radius: 6px;
      font-size: 16px;

      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
