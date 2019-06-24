<template>
  <div class="market-page">
    <!-- <div style="height:192px;width:300px;"></div> -->
    <div class="fixed">
      <div class="">
      <div class="search-box">
        <div class="search-comp">
          <search :conf="searchContent" @areaClick="areaClickHandler" @focus="focusHandler"></search>
        </div>
      </div>
      </div>
      <screen v-model="projectFilters" :local="this.selectedCity"></screen>
    </div>
    <!-- <already-open :agentIdInfo="agentIdInfo" @returnMyMarket="returnMyMarket"></already-open> -->
      <div class="all-market">
        <van-list ref="list" v-model="loading" :finished="finished" :finished-text="'没有更多了'" :offset="500" @load="getProjectList">
          <market-describe v-for="(item,index) in marketList" :key="index" :itemInfo="item" :vipInfo="vipInfo" @skipDetail="skipDetail(item)"  :borderBottom="borderBottom" @updateMarket="updateMarket(index)"></market-describe>
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
    vipInfo: {},
    historyCity: '',
    scrollTop: 0
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
    let data = window.localStorage.getItem('marketCity') ? JSON.parse(window.localStorage.getItem('marketCity')) : ''
    if (data) {
      this.historyCity = data
      this.selectedCity = data.city || this.userArea.marketSelectedCity || this.userInfo.majorCity || ''
    } else {
      this.selectedCity = this.userArea.marketSelectedCity || this.userInfo.majorCity || ''
    }
    this.searchContent.siteText = this.selectedCity || '全国'
    // 判断青岛用户
    if (this.userInfo.enterpriseId == 92 || this.userInfo.enterpriseId == 93) {
      this.selectedCity = '青岛市'
      this.searchContent.siteText = '青岛市'
      if (data) {
        data.city = '青岛市'
        window.localStorage.setItem('marketCity',JSON.stringify(data))
      }
    }
    await this.getVipInfo()
    // this.getBrokerInfo()
    // await this.hotMarketHandle()
    let markList = window.sessionStorage.getItem('marketList')
    if (markList) {
      let item = JSON.parse(markList)
      this.loading = item.loading
      this.finished = item.finished
      this.marketList = item.marketList
      this.page = item.page
      this.scrollTop = item.scrollTop
      window.sessionStorage.removeItem('marketList')
      this.$nextTick(() => {
        document.querySelector('.router-view').scrollTop = this.scrollTop
      })
    }
  },
  methods: {
    touchmove() {},
    // 更新数据
    updateMarket (index) {
      let option = this.marketList[index]
      let current = Math.ceil((index+1) / this.pageSize)
      let param = { current: current, size: this.pageSize }
      //组装检索条件
      let mergeFilters = this.projectFilters.baseFilters ? Object.assign(this.projectFilters.baseFilters, this.projectFilters.moreFilters) : {}
      let _filters = screenFilterHelper(this.projectName, mergeFilters)
      param = Object.assign(param, _filters)
      let data = window.localStorage.getItem('marketCity') ? JSON.parse(window.localStorage.getItem('marketCity')) : ''
      if(data) {
        if(data.type===1) {
          param['province'] = data.city
        } else {
          param['city'] = data.city
        }
      } else {
        this.selectedCity = this.userArea.marketSelectedCity || this.userInfo.majorCity || ''
        param.city = this.selectedCity
      }
      marketService.getHouseList(param).then(res => {
        let item = res.records.filter(el => {
          return el.linkerId === option.linkerId
        })
        this.marketList.splice(index, 1, item[0])
      }).catch()
    },
    async getProjectList() {
      if ( window.sessionStorage.getItem('marketList')) {
        return this.loading = false
      }
      let param = { current: this.page, size: this.pageSize }
      //组装检索条件
      let mergeFilters = this.projectFilters.baseFilters ? Object.assign(this.projectFilters.baseFilters, this.projectFilters.moreFilters) : {}
      let _filters = screenFilterHelper(this.projectName, mergeFilters)
      param = Object.assign(param, _filters)
      let data = window.localStorage.getItem('marketCity') ? JSON.parse(window.localStorage.getItem('marketCity')) : ''
      if(data) {
        if(data.type===1) {
          param['province'] = data.city
        } else {
          param['city'] = data.city
        }
      } else {
        this.selectedCity = this.userArea.marketSelectedCity || this.userInfo.majorCity || ''
        param.city = this.selectedCity
      }
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
            // await this.hotMarketHandle(arr)
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
          // await this.hotMarketHandle(arr)
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
      this.$router.push({ name: 'city-list', query: { fromPage: 'market', searchContent: this.searchContent.siteText, category: 0 } })
    },
    focusHandler() {
      this.$router.push({ name: 'market-search', query: {city: this.searchContent.siteText}})
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
  },
  beforeRouteLeave (to, from, next) {
    this.scrollTop = document.querySelector('.router-view').scrollTop;
    if (to.name === 'market-detail') {
      let data = {
        loading: this.loading,
        finished: this.finished,
        marketList: this.marketList,
        scrollTop: this.scrollTop,
        page: this.page
      }
      window.sessionStorage.setItem('marketList',JSON.stringify(data))
    }
    next()
  },
  beforeDestroy () {
    
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
      height: 30px;
      margin: 0px 16px;
      box-sizing: border-box;
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
    margin-top: 90px;
  }
  .hot-recommend {
    margin-top: 30px;
  }
}
</style>
