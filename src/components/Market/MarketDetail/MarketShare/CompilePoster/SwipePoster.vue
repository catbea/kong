<template>
  <div class="swipe-poster-page">
      <div class="swipe-poster-item" v-for="(item,index) in list" :key="index"></div>
    </div>
</template>
<script>
export default {
  data: () => ({
    list: [1, 2, 3, 4]
  })
}
</script>
<style lang="less">
.swipe-poster-page {
  margin-top: 20px;
  width: 375px;
  display: flex;
  display: -webkit-box;
  overflow-x: auto;
  > .swipe-poster-item {
    width: 212px;
    height: 346px;
    border-radius: 0px 0px 6px 6px;
    border: 1px solid;
    margin: 0 24px 0 24px;
  }
}
</style>
