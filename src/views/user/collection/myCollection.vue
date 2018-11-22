<template>
  <div class="collection-page">
    <div class="tab-container">
      <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6">
        <van-tab title="收藏楼盘"></van-tab>
        <van-tab title="收藏文章">
          <div class="collection-top">
            <collection-list></collection-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import collectionList from 'COMP/User/collection/collectionList'
export default {
  components: {
    collectionList
  },
}
</script>
<style lang="less">
.collection-page{
  .tab-container{
    .collection-top{
      margin-top: 16px;
    }
  }
}
</style>
