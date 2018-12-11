<template>
  <div class="custom-page">
    <van-search class="search-container" v-model="searchVal" placeholder="请输入搜索关键词" show-action @search="onSearchHandler" @click="onFocusHandler" >
      <div slot="action" @click="onSearchHandler">搜索</div>
    </van-search>
    <div class="tab-container">
      <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6" @click="onClick">
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
      0: { finished: false, list: [], page: 1 },
      1: { finished: false, list: [], page: 1 },
      2: { finished: false, list: [], page: 1 },
      3: { finished: false, list: [], page: 1 },
      4: { finished: false, list: [], page: 1 }
    },
    loading: false,
    pageSize: 10,
    searchVal: '',
    sort: 'intention' // intention：意向度（默认选项）， createTime：时间
  }),
  created() {},
  methods: {
    onSearchHandler() {
      this.currentData.page = 1
      this.onLoad()
    },
    onFocusHandler() {
    },
    /**
     * 切换tab方法
     */
    onClick() {
      this.onLoad()
    },
    async onLoad() {
      this.loading = true
      const result = await CustomService[this.getServeceFunc()](this.searchVal, this.currentData.page, this.pageSize, this.sort)
      if (this.currentData.page > 1) {
        this.currentData.list = this.currentData.list.concat(result.records)
      } else {
        this.currentData.list = result.records
      }
      if (result.pages <= this.currentData.page) {
        this.currentData.finished = true
      } else {
        this.currentData.page++
      }
      this.loading = false
    },
    // 获取当前serviec处理方法
    getServeceFunc() {
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
    itemClickHandler(e) {
      this.$router.push(`/custom/${e.clientId}`)
    }
  },
  computed: {
    currentData() {
      return this.data[this.activeIndex]
    }
  }
}
</script>
<style lang="less">
.custom-page {
  .search-container {
    .van-field__body {
      height: 100%;
    }
    .van-field__control {
      height: 100%;
    }
  }
}
</style>
