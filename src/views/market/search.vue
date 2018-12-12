<template>
  <div class="market-search-page">
    <div class="search-box">
      <van-search v-model="searchValue" placeholder="请输入搜索关键词" show-action @keypress="onKeypressHandler" @search="onSearchHandler">
        <div slot="action" @click="onCancelHandler">取消</div>
      </van-search>
    </div>
    <div class="history-words-content" v-if="!searching">
      <div class="title-box">
        <p class="history-title">历史搜索</p>
        <div class="bg_img clear-icon" :style="{backgroundImage:'url('+clearIcon+')'}"></div>
      </div>
      <div class="history-content">
        <div class="history-item"></div>
      </div>
    </div>
    <div class="search-reminder">
      <div class="search-reminder-item" v-for="info in searchBirefList">
        <p class="house-name">{{info.linkerName}}</p>
        <p class="house-info">{{`${info.linkerAddress} ${info.linkerPrice}`}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Search from 'COMP/Search'
import marketService from '@/services/marketService'
export default {
  components: {
    Search
  },
  data: () => ({
    searchValue: '',
    autoSearchTimer: null,
    searching: false,
    searchBirefList: [],
    // search
    clearIcon: require('IMG/market/search/clear.png')
  }),
  methods: {
    onSearchHandler(val) {
      console.log(val)
    },
    onKeypressHandler(val) {
      console.log()
    },
    // 输入时搜索
    async preSearch() {
      this.searching = true
      let payload = {
        projectName: this.searchValue,
        orderBy: 1,
        current: 1,
        size: 5
      }
      const res = await marketService.getHouseList(payload)
      this.searchBirefList = res.records
    },
    // searchMediator(payload){

    // },
    // 取消搜索
    onCancelHandler() {
      this.$router.back()
    }
  },
  watch: {
    searchValue(val) {
      clearTimeout(this.autoSearchTimer)
      this.autoSearchTimer = setTimeout(() => {
        this.preSearch()
        clearTimeout(this.autoSearchTimer)
      }, 500)
    }
  }
}
</script>
<style lang="less">
.market-search-page {
  > .search-box {
    .van-field__body {
      height: 100%;
    }
  }
  > .history-words-content {
    > .title-box {
      position: relative;
      margin: 25px 16px 16px;
      > .history-title {
        font-size: 18px;
        color: #333333;
        font-weight: 600;
      }
      > .clear-icon {
        position: absolute;
        right: 0;
        top: 0;
        width: 16px;
        height: 16px;
      }
    }
  }
  > .search-reminder {
    > .search-reminder-item {
      height: 67px;
      font-weight: 400;
      padding: 12px 15px;
      > .house-name {
        font-size: 16px;
        color: #333333;
        padding-bottom: 8px;
      }
      > .house-info {
        font-size: 12px;
        color: #999999;
      }
    }
  }
}
</style>

