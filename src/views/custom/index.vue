<template>
  <div class="custom-page">
    <van-search class="search-container" v-model="searchVal" placeholder="请输入搜索关键词" show-action @search="onSearchHandler">
      <div slot="action" @click="onSearchHandler">搜索</div>
    </van-search>
    <tab></tab>
  </div>
</template>
<script>
import Tab from 'COMP/Tab'
import customService from 'SERVICE/customService'
export default {
  components: {
    Tab
  },
  data: () => ({
    searchVal: '',
    sort: 1
  }),
  created() {
  },
  methods: {
    onSearchHandler () {

    }
  }
}
</script>
<style lang="less">
.custom-page {
  .search-container {
  }
}
</style>


