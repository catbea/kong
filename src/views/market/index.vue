<template>
  <div class="market-page">
    <div class="fixed">
      <div class="search-box van-hairline--bottom">
        <div class="search-comp">
          <search :conf="searchContent" @areaClick="areaClickHandler" @focus="focusHandler"></search>
        </div>
      </div>
      <screen v-model="projectFilters" :local="this.selectedCity" ></screen>
    </div>
    <already-open :agentIdInfo="agentIdInfo" @returnMyMarket="returnMyMarket"></already-open>
    <div class="all-market">
      <van-list ref="list" v-model="loading" :finished="finished" :finished-text="'没有更多了'" :offset="500" @load="getProjectList">
        <market-describe v-for="(item,index) in marketList" :key="index" :itemInfo="item" @skipDetail="skipDetail(item)" :borderBottom="borderBottom"></market-describe>
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
    ...mapGetters(['userArea', 'userInfo'])
  },
  data: () => ({
    selectedCity: '',
    broker: 705,
    marketList: [],
    page: 1,
    pageSize: 10,
    loading: false,
    finished: false,
    projectFilters: {},
    searchContent: {
      siteText: '深圳市',
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
        this.page = 1
        this.marketList = []
        // this.finished = false
        this.loading = false
        setTimeout(() => {
          this.$refs.list.check()
        }, 100);
        
      },
      deep: true
    }
  },
  created() {
    this.selectedCity = this.userArea.marketSelectedCity || this.userInfo.majorCity || ''
    this.searchContent.siteText = this.selectedCity || '全国'
    this.getBrokerInfo()
  },
  methods: {
    async getProjectList() {
      let param = { current: this.page, size: this.pageSize }
      //组装检索条件
      let mergeFilters = this.projectFilters.baseFilters ? Object.assign(this.projectFilters.baseFilters, this.projectFilters.moreFilters) : {}
      let _filters = screenFilterHelper(this.projectName, mergeFilters)
      param = Object.assign(param, _filters)
      param.city = this.selectedCity
      const res = await marketService.getHouseList(param)
      this.marketList = this.marketList.concat(res.records)
      if (res.pages === 0 || this.page === res.pages) {
        
        this.finished = true
      }
      this.page++
      this.loading = false
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
  .fixed {
    position: fixed;
    width: 100%;
    background: #ffffff;
    z-index: 3;
  }
  .already-open-page {
    margin-top: 86px;
  }
  .search-box {
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
  .all-market{
    margin-top:5px;
  }
}
</style>
