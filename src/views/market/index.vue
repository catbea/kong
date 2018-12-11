<template>
  <div class="market-page">
    <div class="search-box van-hairline--bottom">
      <div class="search-comp">
        <search :conf="searchContent" @areaClick="areaClickHandler"></search>
      </div>
      <router-link to="/public/map-Search/" class="bg_img location-icon" :style="{'backgroundImage':'url(' + locationIcon + ')'}"></router-link>
    </div>
    <screen v-model="filter"></screen>
    <already-open :agentIdInfo="agentIdInfo" @returnMyMarket="returnMyMarket"></already-open>
    <div class="all-market">
      <van-list v-model="loading" :finished="finished" :finished-text="'没有更多了'" @load="onLoad">
        <market-describe v-for="(item,index) in marketList" :key="index" :itemInfo="item" @openReturnHandle="openReturnHandle(item)" @skipDetail="skipDetail(item)" :borderBottom="borderBottom"></market-describe>
      </van-list>
    </div>
  </div>
</template>
<script>
import Search from 'COMP/Search'
import Screen from 'COMP/Screen/'
import MarketDescribe from 'COMP/MarketDescribe/'
import TitleBar from 'COMP/TitleBar/'
import AlreadyOpen from 'COMP/Market/AlreadyOpen/'
import marketService from 'SERVICE/marketService'
export default {
  components: {
    Search,
    Screen,
    MarketDescribe,
    TitleBar,
    AlreadyOpen
  },
  data: () => ({
    broker: 705,
    marketList: [],
    page: 1,
    loading: false,
    finished: false,
    filter: null,
    searchContent: {
      siteText: '深圳',
      placeholder: '请输入平台名称'
    },
    value: '',
    locationIcon: require('IMG/market/juxing.png'),
    agentIdInfo: null,
    resInfo: null,
    borderBottom: true,
    containerHeight: '0'
  }),
  created() {
    this.getBrokerInfo()
  },
  methods: {
    async onLoad() {
      //楼盘信息请求
      const res = await marketService.getMarketDescribe(705, this.page)
      this.marketList = this.marketList.concat(res.records)
      if (res.pages === 0 || this.page === res.pages) {
        this.finished = true
      }
      this.page++
      this.loading = false
    },
    openReturnHandle(item) {
      this.$router.push({ name: 'marketDetail-open', params: { id: item.linkerId } })
    },
    onClickHandler() {
      this.$router.push('/market/inputSearch')
    },
    returnMyMarket() {
      this.$router.push({ name: 'mymarket', params: { id: this.broker } })
    },
    async getBrokerInfo() {
      //经纪人Id请求
      const res = await marketService.getBrokerMarket(this.broker)
      this.agentIdInfo = res
    },
    skipDetail(item) {
      this.$router.push({ name: 'marketDetail', params: { id: item.linkerId } })
    },
    // s搜索区域点击处理
    areaClickHandler() {
      this.$router.push({name:'area-select'})
    }
  }
}
</script>
<style lang="less">
.market-page {
  width: 100%;
  height: 100%;
  > .search-box {
    position: relative;
    width: 375px;
    height: 44px;
    > .search-comp {
      width: 305px;
      height: 30px;
      margin: 7px 50px 7px 10px;
    }
    > .location-icon {
      position: absolute;
      width: 24px;
      height: 24px;
      transform: translate(-50%, -50%);
      right: 8px;
      top: 15px;
    }
  }
}
</style>
