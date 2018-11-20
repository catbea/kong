<template>
  <div class="custom-page">
    <van-search class="search-container" v-model="searchVal" placeholder="请输入搜索关键词" show-action @search="onSearchHandler">
      <div slot="action" @click="onSearchHandler">搜索</div>
    </van-search>
    <div class="tab-container">
      <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6">
        <van-tab title="全部"></van-tab>
        <van-tab title="关注"></van-tab>
        <van-tab title="访客"></van-tab>
        <van-tab title="意向"></van-tab>
        <van-tab title="新增"></van-tab>
      </van-tabs>
    </div>
    <div class="list-continer">
      <van-list v-model="loading" :finished="currentData.finished" @load="onLoad">
        <my-custom-item v-for="(item,index) in currentData.list" :key="index" :info="item" @click="itemClickHandler"></my-custom-item>
      </van-list>
    </div>
  </div>
</template>
<script>
import MyCustomItem from 'COMP/Custom/MyCustomItem'
import CustomService from 'SERVICE/customService'
export default {
  components: {
    MyCustomItem
  },
  data: () => ({
    activeIndex: 0,
    data: {
      0: { finished: false, list: [], page: 0 },
      1: { finished: false, list: [], page: 0 },
      2: { finished: false, list: [], page: 0 },
      3: { finished: false, list: [], page: 0 },
      4: { finished: false, list: [], page: 0 }
    },
    loading: false,
    search: '',
    pageSize: 10,
    searchVal: '',
    sort: 1
  }),
  created () { },
  methods: {
    onSearchHandler () { },
    async onLoad () {
      this.loading = true
      const result = await CustomService[this.getServeceFunc()](this.search, this.currentData.page, this.pageSize, this.sort)
      console.log(result);
      this.currentData.list = this.currentData.list.concat(result.records)
      if (result.records.length < this.pageSize) {
        this.currentData.finished = true
      } else {
        this.currentData.page++
      }
      this.loading = false
    }, 
    // 获取当前serviec处理方法
    getServeceFunc () {
      switch (this.activeIndex) {
        case 0:
          return 'getCustomerAll'
        case 1:
          return 'getCustomerFollow'
        case 2:
          return 'getCustomerVisitor'
        case 3:
          return 'getCustomerIntention'
        case 4:
          return 'getCustomerAdd'
      }
    },
    itemClickHandler (e) {
      console.log(e);
      
    }
  },
  computed: {
    currentData () {
      return this.data[this.activeIndex]
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
