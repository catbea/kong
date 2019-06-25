<template>
  <div class="market-search-page">
    <div class="search-box">
      <van-search v-model.trim="searchValue" placeholder="请输入楼盘名称" show-action background="#fff">
        <img src="../../assets/img/market/Group 3@2x.png" class="search-icon" @click="leftIconClick" slot="left-icon">
        <div slot="action" @click="onCancelHandler">取消</div>
      </van-search>
    </div>
    <div class="history-words-content" v-if="searchStatus === 0 && searchHistory.length>0">
      <div class="title-box">
        <p class="history-title">历史搜索</p>
        <div class="bg_img clear-icon" :style="{backgroundImage:'url('+clearIcon+')'}" @click="cleanHandler"></div>
      </div>
      <div class="history-content">
        <div class="history-item" v-for="(item, index) in searchHistory" :key="index" @click="historyItemClick(item)">{{item}}</div>
      </div>
    </div>
    <!-- 搜索建议 -->
    <div class="search-reminder" v-if="searchStatus === 1">
      <div class="search-reminder-item" v-for="(info, index) in searchBirefList" :key="index" @click="reminderItemHandler(info)">
        <p class="house-name">{{info.linkerName}}</p>
        <p class="house-info">{{`${info.city}${info.county} ${info.price}${info.priceUnit}`}}</p>
      </div>
      <null :nullIcon="nullIcon" :nullcontent="nullcontent" v-show="nodata"></null>
    </div>
    <!-- 搜索结果 -->
    <div class="search-result-container" v-if="searchStatus === 2">
      <screen v-model="filters" v-show=""></screen>
      <div class="search-result-content">
        <van-list
          class="list-container"
          v-model="loading"
          :finished="finished"
          finished-text
          @load="onLoad"
        >
          <market-describe
            v-for="(item,index) in searchResult"
            :key="index"
            :itemInfo="item"
            @openReturnHandle="opClickHandler(item)"
            @skipDetail="skipDetail(item)"
          ></market-describe>
        </van-list>
        <null :nullIcon="nullIcon" :nullcontent="nullcontent" v-if="showNull"></null>
        <div class="hot-recommend" v-if="!haveData&&hotResult.length!=0">
          <title-bar class="title-container" :conf="titleBarConf"/>
          <market-describe
            v-for="(item,index) in hotResult"
            :key="index"
            :itemInfo="item"
            @openReturnHandle="opClickHandler(item)"
            @skipDetail="skipDetail(item)"
          ></market-describe>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Search from 'COMP/Search'
import Screen from 'COMP/Screen/'
import TitleBar from 'COMP/TitleBar'
import MarketDescribe from 'COMP/MarketDescribe'
import marketService from '@/services/marketService'
import userService from '@/services/userService'
import Null from 'COMP/Null'
import isNull from 'lodash/isNull'
import screenFilterHelper from '@/utils/screenFilterHelper'
import { mapGetters } from 'vuex'
export default {
  components: {
    Search,
    Screen,
    MarketDescribe,
    Null,
    TitleBar
  },
  data: () => ({
    searchValue: '',
    autoSearchTimer: null,
    searching: false,
    searchStatus: 0, // 0-未输入状态 1-输入但是未确认状态 2-按下确认状态
    searchBirefList: [],
    searchHistory: [],
    searchResult: [],
    hotResult: [],
    page: 1,
    pageSize: 10,
    filters: {},
    loading: false,
    finished: false,
    nullcontent: '没有找到任何相关楼盘',
    haveData: true,
    showNull: false,
    titleBarConf: {
      title: '热门楼盘'
    },
    nullIcon: require('IMG/market/search/empty.png'),
    clearIcon: require('IMG/market/search/clear.png'),
    city: '',
    nodata: false
  }),
  created() {
    this.historyController('init')
    this.city = this.$route.query.city
  },
  methods: {
    leftIconClick() {
      
    },
    onSearchHandler(val) {
      this.historyController('add', val)
      this.resetSearch()
      // this.searchMidator(val, this.filters, this.page)
    },
    onKeypressHandler(val) {
      // this.searchStatus = 1
    },
    // 输入时搜索
    async preSearch() {
      // this.searchStatus =  1
      let payload = {
        projectName: this.searchValue,
        city: this.city,
        orderBy: 1,
        current: 1,
        size: 100
      }
      const res = await userService.getMyMarket(payload)
      this.searchBirefList = res.records
      this.nodata = !res.records.length
    },
    onLoad() {
      this.searchMidator(this.searchValue, this.filters, this.page)
    },
    reminderItemHandler(val) {
      this.$router.push(`/market/${val.linkerId}`)
    },
    resetSearch() {
      this.searchResult = []
      this.page = 1
      this.searchStatus = 2
      this.loading = false
      this.finished = false
    },
    // 搜索控制
    async searchMidator(name, filters) {
      let mergeFilters = filters.baseFilters ? Object.assign(filters.baseFilters, filters.moreFilters) : {}
      let params = screenFilterHelper(name, mergeFilters)
      params.current = this.page
      params.size = this.pageSize
      params = Object.assign(params)
      const result = await userService.getMyMarket(params)
      if (result.records.length > 0) {
        this.searchResult = this.searchResult.concat(result.records)
        this.loading = false
        this.haveData = true
        this.showNull = false
        if (result.pages === this.page) {
          this.finished = true
        } else {
          this.page++
        }

        if (result.records.length <= 5) {
          this.finished = true
          this.loading = false
          this.haveData = false
          this.showNull = false
          let arr = []
          for (let i = 0; i < this.searchResult.length; i++) {
            const element = this.searchResult[i]
            arr.push(element.linkerId)
          }
          arr = arr.join()
          let hotParams = {
            city: this.userInfo.majorCity || '全国',
            hotTotal: 5,
            linkerIds: arr
          }
          const hotRes = await userService.getHotLinker(hotParams)
          this.hotResult = hotRes
        }
      } else {
        // 显而易见,进入这里表明无数据
        this.finished = true
        this.loading = false
        this.haveData = false
        this.showNull = true
        let hotParams = {
          city: this.userInfo.majorCity || '全国',
          hotTotal: 5
        }
        const hotRes = await userService.getHotLinker(hotParams)
        this.hotResult = hotRes
      }
    },
    // 历史item点击
    historyItemClick(val) {
      this.searchValue = val
      setTimeout(() => {
        this.searchStatus = 2
      }, 1)
      this.resetSearch()
    },
    // 取消搜索
    onCancelHandler() {
      this.$router.back()
    },
    // 清空历史
    cleanHandler() {
      this.historyController('reset')
    },
    opClickHandler(item) {
      this.$router.push(`/marketDetail/open/${item.linkerId}`)
    },
    skipDetail(item) {
      this.$router.push(`/market/${item.linkerId}`)
    },
    //
    /**
     * 历史控制器
     * @param {String} op 操作 init-初始化 add-添加 get-取 reset-清空
     * @param {String} data 值 add时使用
     */
    historyController(op, data = '') {
      switch (op) {
        case 'init':
          let tempHistory = window.localStorage.getItem('SEARCH_HISTORY')
          if (!isNull(tempHistory)) this.searchHistory = tempHistory.split(',')
          break
        case 'add':
          let valIndex = this.searchHistory.indexOf(data)
          if (valIndex !== -1) this.searchHistory.splice(valIndex, 1)
          if (this.searchHistory.length >= 8) this.searchHistory.shift()
          this.searchHistory.push(data)
          window.localStorage.setItem('SEARCH_HISTORY', this.searchHistory.join(','))
          break
        case 'reset':
          this.searchHistory = []
          window.localStorage.removeItem('SEARCH_HISTORY')
          break
      }
    }
  },
  watch: {
    searchValue(val) {
      clearTimeout(this.autoSearchTimer)
      if (val === '') {
        this.searchStatus = 0
      } else {
        this.searchStatus = 1
        this.autoSearchTimer = setTimeout(() => {
          this.preSearch()
          clearTimeout(this.autoSearchTimer)
        }, 500)
      }
    },
    filters: {
      handler(val) {
        this.resetSearch()
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
<style lang="less">
.market-search-page {
  margin-top: 11px;
  > .search-box {
    .van-field__body {
      height: 100%;
    }
    .van-field__left-icon{
      display: flex;
    }
    .van-cell {
      background-color: #f5f5f5;
    }
    .search-icon {
      width: 24px;
      height: 24px;
    }
    .van-field__control {
      height: 24px;
      // line-height:24px;
      padding-top: 2px;
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
    > .history-content {
      margin: 15px;
      > .history-item {
        padding: 10px 20px;
        font-size: 14px;
        color: #666666;
        display: inline-block;
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
  > .search-result-container {
    > .search-result-content {
      > .null-container {
        margin-top: 10%;
      }
      > .hot-recommend {
        margin-top: 30px;
      }
    }
  }
}
</style>
