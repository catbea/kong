<template>
  <div class="market-page">
    <div class="search-box van-hairline--bottom">
      <div class="search-comp">
        <search :conf="searchContent" @areaClick="areaClickHandler" @focus="focusHandler"></search>
      </div>
    </div>
    <screen v-model="projectFilters" :local="this.selectedCity"></screen>
    <already-open :agentIdInfo="agentIdInfo" @returnMyMarket="returnMyMarket"></already-open>
    <div class="all-market">
      <van-list v-model="loading" :finished="finished" :finished-text="'没有更多了'" @load="getProjectList">
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
import screenFilterHelper from '@/utils/screenFilterHelper'
import { mapGetters } from 'vuex'
export default {
  components: {
    Search,
    Screen,
    MarketDescribe,
    TitleBar,
    AlreadyOpen
  },
  computed: {
    ...mapGetters(['userArea','userInfo'])
  },
  data: () => ({
    selectedCity: '',
    broker: 705,
    marketList: [],
    page: 1,
    pageSize: 5,
    loading: false,
    finished: false,
    projectFilters: {},
    searchContent: {
      siteText: '深圳',
      placeholder: '请输入楼盘名称'
    },
    value: '',
    locationIcon: require('IMG/market/juxing.png'),
    agentIdInfo: null,
    resInfo: null,
    borderBottom: true,
    containerHeight: '0'
  }),
  watch: {
    projectFilters: {
      handler(val) {
        this.finished = false
        this.page = 1
        this.marketList = []
        // this.getProjectList()
      },
      deep: true
    }
  },
  created() {
    this.selectedCity = this.userArea.marketSelectedCity || this.userArea.city
    this.searchContent.siteText = this.selectedCity
    this.getBrokerInfo()
  },
  methods: {
    onLoad() {
      this.getProjectList()
    },

    async getProjectList() {
      let param = { current: this.page, size: this.pageSize }
      //组装检索条件
      let mergeFilters = this.projectFilters.baseFilters ? Object.assign(this.projectFilters.baseFilters, this.projectFilters.moreFilters) : {}
      let _filters = screenFilterHelper(this.projectName, mergeFilters)
      param = Object.assign(param, _filters)
      param.city = this.selectedCity
      // console.log(param)

      const res = await marketService.getHouseList(param)
      this.marketList = this.marketList.concat(res.records)
      if (res.pages === 0 || this.page === res.pages) {
        this.finished = true
      }
      this.page++
      this.loading = false
    },
   async openReturnHandle(item) {
      this.$router.push({ name: 'marketDetail-open', params: { id: item.linkerId } })
      if(this.item.city===this.userInfo.vipInfo.city){
       await marketService.addHouseByVip(item.linkerId)
      }//VIP用户选择城市与VIP开通楼盘同城市
    },
    onClickHandler() {
      this.$router.push('/market/inputSearch')
    },
    returnMyMarket() {
      this.$router.push({ name: 'mymarket' })
    },
    async getBrokerInfo() {
      const res = await marketService.getBrokerMarket()
      this.agentIdInfo = res
    },
    skipDetail(item) {
      this.$router.push({ name: 'market-detail', params: { id: item.linkerId } })
    },
    // 搜索区域点击处理
    areaClickHandler() {
      this.$router.push({ name: 'area-select', query: { fromPage: 'market' } })
    },
    focusHandler() {
      this.$router.push({ name: 'market-search' })
    }
  }
}
</script>
<style lang="less">
.market-page {
  > .search-box {
    position: relative;
    width: 375px;
    height: 44px;
    > .search-comp {
      width: 345px;
      height: 30px;
      margin: 10px 50px 7px 10px;
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
