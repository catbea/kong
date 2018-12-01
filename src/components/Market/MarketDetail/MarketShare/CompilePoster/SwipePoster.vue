<template>
  <div class="swipe-poster-page">
      <div class="swipe-poster-item"></div>
    </div>
</template>
<script>
export default {
  data: () => ({
    
  })
}
</script>
<style lang="less">
.swipe-poster-page {
  margin-top: 20px;
  width: 375px;
  display: flex;
  justify-content: center;
  > .swipe-poster-item {
    width: 240px;
    height: 387px;
    border-radius: 0px 0px 6px 6px;
    border: 1px solid;
  }
}
</style>
