<template>
  <div class="custom-page">
    <form action="/">
      <van-search
        class="search-container"
        v-model="searchVal"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearchHandler"
        @click="onFocusHandler"
      >
        <div slot="action" @click="onSortHandler">
          <i class="icon iconfont icon-Clientlist_screenin"></i>
        </div>
      </van-search>
    </form>
    <!-- <div class="popup-container">

    </div>-->
    <div class="sort-container dev" v-show="sortShow">
      <ul>
        <li class="van-hairline-bottom" @click="sortClickHandler('intention')">意向度排序</li>
        <li class="van-hairline-bottom" @click="sortClickHandler('createTime')">
          时间排序
          <span>(按客户新增时间)</span>
        </li>
      </ul>
    </div>

    <div class="tab-container">
      <van-tabs
        v-model="activeIndex"
        color="#007AE6"
        :line-width="15"
        :swipe-threshold="6"
        @click="onClick"
      >
        <van-tab title="全部"></van-tab>
        <van-tab title="关注"></van-tab>
        <van-tab title="访客"></van-tab>
        <van-tab title="意向"></van-tab>
        <van-tab title="新增"></van-tab>
      </van-tabs>
    </div>
    <div class="list-continer">
      <van-list
        v-model="loading"
        :finished="currentData.finished"
        @load="onLoad"
        v-if="currentData.haveData"
      >
        <my-custom-item
          v-for="(item,index) in currentData.list"
          :key="index"
          :info="item"
          @click="itemClickHandler"
        ></my-custom-item>
      </van-list>
      <div v-if="!currentData.haveData">
        <null :nullIcon="nullIcon" :nullcontent="nullcontent"></null>
      </div>
    </div>
  </div>
</template>
<script>
import MyCustomItem from 'COMP/Custom/MyCustomItem'
import Null from 'COMP/Null'
import CustomService from 'SERVICE/customService'
export default {
  components: {
    Null,
    MyCustomItem
  },
  data: () => ({
    activeIndex: 0,
    nullIcon: require('IMG/user/empty_custom@2x.png'),
    nullcontent: '暂无客户，快去分享你的名片吧！',
    data: {
      0: { finished: false, list: [], page: 1, haveData: true },
      1: { finished: false, list: [], page: 1, haveData: true },
      2: { finished: false, list: [], page: 1, haveData: true },
      3: { finished: false, list: [], page: 1, haveData: true },
      4: { finished: false, list: [], page: 1, haveData: true }
    },
    loading: false,
    pageSize: 10,
    searchVal: '',
    sortShow: false,
    sort: 'intention' // intention：意向度（默认选项）， createTime：时间
  }),
  methods: {
    onSearchHandler() {
      this.currentData.page = 1
      this.onLoad()
    },
    onSortHandler() {
      this.sortShow = !this.sortShow
    },
    onFocusHandler() {},
    // 排序切换
    sortClickHandler(val) {
      this.sortShow = false
      this.sort = val
      this.cleanCurrentData()
      this.onLoad()
    },
    cleanCurrentData() {
      this.currentData.page = 1
      this.currentData.list = []
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
      if (this.currentData.list.length > 0) {
        this.currentData.haveData = true
      } else {
        this.currentData.haveData = false
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
    },
    touchHandler(e) {
      return e.preventDefault()
    }
  },
  watch: {
    sortShow(val) {
      if (val) {
        document.removeEventListener('touchmove', this.touchHandler, false)
        document.getElementsByClassName('router-view')[0].style.overflowY = 'hidden' // 兼容pc测试
      } else {
        document.addEventListener('touchmove', null)
        document.getElementsByClassName('router-view')[0].style.overflowY = 'auto' // 兼容pc测试
      }
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
.van-field__body {
  height: 100%;
}
.van-field__control {
  // height: 100%;
  line-height: 24px !important;
}
.custom-page {
  position: relative;
  > .search-container {
    .van-field__body {
      height: 100%;
    }
    .van-field__control {
      // height: 100%;
      border: 0;
      margin: 0;
      padding: 0;
      width: 100%;
      resize: none;
      display: block;
      color: #323233;
      box-sizing: border-box;
      background-color: transparent;
      line-height: 24px !important;
    }
  }
  > .sort-container {
    min-height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 45px;
    width: 100%;
    // background: #fff;
    // margin: 0 15px;
    z-index: 100;
    li {
      padding: 0 15px;
      background: #fff;
      height: 50px;
      line-height: 50px;
      font-size: 15px;
    }
  }
}
</style>
