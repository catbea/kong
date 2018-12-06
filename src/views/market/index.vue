<template>
  <div class="market-page">
    <div class="search-box van-hairline--bottom">
      <div class="search-comp">
        <search :conf="searchContent"></search>
      </div>
      <div class="bg_img location-icon" :style="{'backgroundImage':'url(' + locationIcon + ')'}"></div>
    </div>
    <screen v-model="filter"></screen>
    <already-open :agentIdInfo="agentIdInfo"></already-open>
    <div class="all-market">
      <!-- <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="没有更多了"
        @load="onLoad"
      >-->
      <market-describe v-for="(item,index) in resInfo" :key="index" :itemInfo="item" @openReturnHandle="openReturnHandle" @skipDetail="skipDetail(item)" :borderBottom="borderBottom"></market-describe>
      <!-- </van-list> -->
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
    filter: null,
    searchContent: {
      siteText: '深圳',
      placeholderText: '请输入平台名称'
    },
    value: '',
    locationIcon: require('IMG/market/juxing.png'),
    agentIdInfo: null,
    resInfo: null,
    borderBottom: true,
    containerHeight: '0'
  }),
  created() {
    this.getMarketDescribeInfo()
    this.getBrokerInfo()
  },
  methods: {
        openReturnHandle(){
      this.$router.push({name:'marketDetail-open', params:{id:1}})
    },
    onClickHandler () {
      this.$router.push('/market/inputSearch')
    },
    async getMarketDescribeInfo() {
      const res = await marketService.getMarketDescribe(705)
      console.log(res)
      this.resInfo = res.records
    },
    async getBrokerInfo() {
      const res = await marketService.getBrokerMarket(1)
      this.agentIdInfo = res
    },
    skipDetail(item) {
      this.$router.push({ name: 'marketDetailNotOpen', params: { id: item.linkerId } })
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
    > div {
      display: inline-block;
    }
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
      top: 22px;
    }
  }
}
</style>
