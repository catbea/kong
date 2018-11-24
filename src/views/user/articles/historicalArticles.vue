<template>
  <div class="historicalArticles-page">
    <div class="historicalArticles-title">
      共12文章
      <span class="historicalArticles-title-right">编辑</span>
    </div>
      <discover-list></discover-list>
  </div>
</template>
<script>
import discoverList from 'COMP/Discover/discoverList'
export default {
  components: {
    discoverList
  }
}
</script>
<style lang="less">
.historicalArticles-page {
  > .historicalArticles-title {
    font-size: 14px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
    margin: 17px 16px;

    > .historicalArticles-title-right {
      font-size: 13px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 16px;
      float: right;
    }
  }
}
</style>
