<template>
  <div class="tab-container">
<van-tabs v-model="active" color="#007AE6" :line-width="15" :swipe-threshold="6">
  <van-tab title="全部"></van-tab>
  <van-tab title="关注">关注</van-tab>
  <van-tab title="访客">访客</van-tab>
  <van-tab title="意向">意向</van-tab>
  <van-tab title="新增">意向</van-tab>
</van-tabs>
  </div>
</template>
<script>
export default {
  data: () => ({
    active: 0
  })
}
</script>
<style lang="less">
.tab-container {
}
</style>
