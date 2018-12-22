<template>
  <div class="my-preference-page">
    <div class="my-preference-header" v-if="isShowHeader">
      <div class="search-view">
        <search :conf="searchInfo" v-model="projectName" @areaClick="areaClickHandler"></search>
      </div>
      <screen v-model="projectFilters" :local="userArea.myReportCity"></screen>
    </div>
    <div class="market-box" :style="{'margin-top':isShowHeader?'74px':'20px'}">
      <div class="notice-view">仅能对当前所属分销商下已开通且未过期楼盘进行报备</div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <meal-market
          v-for="(item,index) in dataArr"
          :key="index"
          :dataArr="item"
          :indexData="index"
          :checkData="checkData"
          @click.native="selectHandle(index)"
          v-if="haveData"
        ></meal-market>
      </van-list>
      <null :nullIcon="nullIcon" :nullcontent="nullcontent" v-if="!haveData"></null>
    </div>
    <div class="report-confirm" @click="onSureHandler">
      <p>确定</p>
    </div>
  </div>
</template>
<script>
// TODO Vansearch 去掉  screen工具类提取
import Screen from 'COMP/Screen/'
import MealMarket from './MealMarket.vue'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
import reportServer from 'SERVICE/reportService'
import Null from 'COMP/Null'
import Search from 'COMP/Search/'
import screenFilterHelper from '@/utils/screenFilterHelper'

export default {
  components: {
    Screen,
    MealMarket,
    Null,
    Search
  },
  data: () => ({
    projectName: '',
    projectFilters: {},
    page: 1,
    pageSize: 10,
    checkIndex: -1,
    checkData: null,
    searchInfo: {
      siteText: '全国',
      placeholderText: '请输入楼盘'
    },
    nullcontent: '暂还没有可报备楼盘信息',
    dataArr: [],
    haveData: true,
    loading: false,
    finished: false,
    queryTimer: null,
    nullIcon: require('IMG/user/bill-null.png'),
    isShowHeader: true,
    
  }),
  computed: {
    ...mapGetters(['userArea'])
  },
  created() {
    this.page = 1
    this.searchInfo.siteText = this.userArea.myReportCity === '' ? this.userArea.city : this.userArea.myReportCity
  },
  methods: {
    onLoad() {
      this.queryBuildingList(this.projectName, this.projectFilters, this.page)
    },
    // 搜索区域点击处理
    areaClickHandler() {
      this.$router.push({ path: '/public/area-select/', query: { fromPage: 'myReport' } })
    },
    async queryBuildingList(name = '', filters = {}, page = 1) {
      let mergeFilters = filters.baseFilters ? Object.assign(filters.baseFilters, filters.moreFilters) : {}
      let params = screenFilterHelper(name, mergeFilters)
      params.current = page
      params.size = this.pageSize
      params.city = this.userArea.myReportCity
      console.log(params)
      const result = await reportServer.getReportBuildingList(params)
      if (result.records.length > 0) {
        this.dataArr = page === 1 ? result.records : this.dataArr.concat(result.records)
        this.haveData = true
        if (page === result.pages) {
          this.finished = true
        }
        this.page++
      } else {
        if (page == 1) {
          this.haveData = false
          this.finished = true
        }else {
          this.finished = false
        }
        
      }
      this.loading = false
      if (params.projectName == '' && params.current == 1 && params.size == 10 && params.city == '') {
        if (result.total < 2) {
          this.isShowHeader = false
        } else {
          this.isShowHeader = true
        }
      }
    },
    selectHandle(index) {
      this.checkData = index
    },
    /**
     * 报备选择楼盘确定
     */
    onSureHandler() {
      let obj = this.dataArr[this.checkData]

      let _reportAddInfo = {
        linkerId: obj.linkerId,
        linkerName: obj.linkerName
      }
      this.$store.commit(types.REPORT_INFO, _reportAddInfo)
      this.$router.back(-1)

      if (this.checkIndex != -1) {
        var item = this.dataArr[this.checkIndex]
      }
    }
  },
  watch: {
    projectName(val) {
      clearTimeout(this.queryTimer)
      this.queryTimer = setTimeout(() => {
        this.page = 1
        this.queryBuildingList(val, this.projectFilters, this.page)
        clearTimeout(this.queryTimer)
      }, 500)
    },
    projectFilters: {
      handler(val) {
        this.page = 1
        this.queryBuildingList(this.projectName, val, this.page)
      },
      deep: true
    }
  },
  beforeDestroy() {
    clearTimeout(this.queryTimer)
  }
}
</script>
<style lang="less">
.my-preference-page {
  .my-preference-header {
    width: 100%;
    position: fixed;
    background: rgba(255, 255, 255, 1);
    z-index: 11;
    padding-top: 6px;
    .search-view {
      margin-left: 15px;
      margin-right: 15px;
    }
    .van-search-page {
      margin-left: 15px;
    }
  }

  .market-box {
    margin: 74px 0 60px 16px;
    .notice-view {
      font-size: 12px;
      color: #999999;
      text-align: center;
    }
  }
  .report-confirm {
    border-top: 1px solid #e6e6e6;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0;
    background: rgba(255, 255, 255, 1);
    p {
      width: 72px;
      height: 30px;
      border-radius: 22px;
      border: 1px solid rgba(0, 122, 230, 1);
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 122, 230, 1);
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>
