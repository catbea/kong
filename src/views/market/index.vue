<template>
  <div class="market-page">
    <!-- <div style="height:192px;width:300px;"></div> -->
    <div class="fixed">
      <div class="van-hairline--bottom">
      <div class="search-box">
        <div class="search-comp">
          <search :conf="searchContent" @areaClick="areaClickHandler" @focus="focusHandler"></search>
        </div>
      </div>
      </div>
      <screen v-model="projectFilters" :local="this.selectedCity"></screen>
    </div>
    <already-open :agentIdInfo="agentIdInfo" @returnMyMarket="returnMyMarket"></already-open>
    <div class="all-market">
      <van-list ref="list" v-model="loading" :finished="finished" :finished-text="'没有更多了'" :offset="500" @load="getProjectList">
        <market-describe v-for="(item,index) in marketList" :key="index" :itemInfo="item" :vipInfo="vipInfo" @skipDetail="skipDetail(item)"  :borderBottom="borderBottom"></market-describe>
      </van-list>
    </div>
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
</template>
<script>
import Search from 'COMP/Search'
import Screen from 'COMP/Screen/'
import MarketDescribe from 'COMP/MarketDescribe/'
import TitleBar from 'COMP/TitleBar/'
import AlreadyOpen from 'COMP/Market/AlreadyOpen/'
import marketService from 'SERVICE/marketService'
import userService from '@/services/userService'
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
    haveData: true,
    hotResult: [],
    titleBarConf: {
      title: '热门楼盘'
    },
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
    containerHeight: '0',
    vipInfo: ''
  }),
  watch: {
    projectFilters: {
      handler(val) {
        this.page = 1
        this.marketList = []
        this.loading = false
        this.finished = false
        setTimeout(() => {
          this.$refs.list.check()
        }, 100)
      },
      deep: true
    }
  },
  mounted() {},
  async created() {
    await this.getVipInfo()
    this.selectedCity = this.userArea.marketSelectedCity || this.userInfo.majorCity || ''
    this.searchContent.siteText = this.selectedCity || '全国'
    this.getBrokerInfo()
    await this.hotMarketHandle()
  },
  methods: {
    touchmove() {},
    async getProjectList() {
      let param = { current: this.page, size: this.pageSize }
      //组装检索条件
      let mergeFilters = this.projectFilters.baseFilters ? Object.assign(this.projectFilters.baseFilters, this.projectFilters.moreFilters) : {}
      let _filters = screenFilterHelper(this.projectName, mergeFilters)
      param = Object.assign(param, _filters)
      param.city = this.selectedCity
      const res = await marketService.getHouseList(param)

      if (this.projectFilters.baseFilters) {
        //筛选时
        if (res.records.length > 0) {
          //有结果时
          this.marketList = this.marketList.concat(res.records)
          if (res.records.length < 8) {
            //条数小于8时
            this.haveData = false
            let arr = []
            for (let i = 0; i < this.marketList.length; i++) {
              const element = this.marketList[i]
              arr.push(element.linkerId)
            }
            arr = arr.join()
            await this.hotMarketHandle(arr)
            console.log(this.marketList)
          }
          if (res.pages === 0 || this.page === res.pages) {
            this.finished = true
          }
          this.page++
          this.loading = false
        } else {
          this.haveData = false
          let arr = []
          for (let i = 0; i < this.marketList.length; i++) {
            const element = this.marketList[i]
            arr.push(element.linkerId)
          }
          arr = arr.join()
          await this.hotMarketHandle(arr)
          if (res.pages === 0 || this.page === res.pages) {
            this.finished = true
          }
          this.loading = false
        }
      } else {
        //未筛选时
        this.marketList = this.marketList.concat(res.records)
        if (res.pages === 0 || this.page === res.pages) {
          this.finished = true
        }
        this.page++
        this.loading = false
      }
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
      this.$router.push({ name: 'market-detail', params: { id: item.linkerId} })
    },
    opClickHandler(item) {
      this.$router.push(`/marketDetail/open/${item.linkerId}`)
    },
    // 搜索区域点击处理
    areaClickHandler() {
      this.$router.push({ name: 'area-select', query: { fromPage: 'market', searchContent: this.searchContent.siteText } })
    },
    focusHandler() {
      this.$router.push({ name: 'market-search' })
    },
    async hotMarketHandle(arr) {
      let hotParams = {
        city: this.selectedCity || '全国',
        hotTotal: 5,
        linkerIds: arr
      }
      const hotRes = await userService.getHotLinker(hotParams)
      this.hotResult = hotRes
    },
    // 获取VIP详情
    async getVipInfo() {
      let res = await marketService.vipInfo()
      this.vipInfo = res
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
    margin-top: 105px;
  }
  .search-box {
    position: relative;
    width: 375px;
    height: 44px;
    padding: 7px 0;
    > .search-comp {
      width: 345px;
      height: 30px;
      margin: 0px 50px 0px 10px;
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
  .all-market {
    margin-top: 8px;
  }
  .hot-recommend {
    margin-top: 30px;
  }
}
</style>
