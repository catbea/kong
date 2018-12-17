<template>
  <div class="my-preference-page">
    <div class="my-preference-header">
      <!-- <van-search :obj="searchInfo"></van-search> -->
      <div class="search-view">
        <search :conf="searchInfo" @getContent="inpitBuildName"></search>
      </div>
      <screen @input="queryBuildingList" :cityValue="cityName"></screen>
    </div>
    <div class="market-box">
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
import VanSearch from 'COMP/VanSearch/'
import Screen from 'COMP/Screen/'
import MealMarket from './MealMarket.vue'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
import reportServer from 'SERVICE/reportService'
import Null from 'COMP/Null'
import Search from 'COMP/Search/'
export default {
  components: {
    VanSearch,
    Screen,
    MealMarket,
    Null,
    Search
  },
  created() {
    // this.queryBuildingList({}, 1, '')
  },
  data: () => ({
    type: null,
    checkIndex: -1,
    checkData: null,
    dataArrLength: null,
    showArr: [],
    current: 1, //默认第一页
    searchInfo: {
      siteText: '全国',
      placeholderText: '请输入楼盘'
    },
    checkImg: require('IMG/user/mealMarket/check@2x.png'),
    checkColorImg: require('IMG/user/mealMarket/checkColor@2x.png'),
    nullIcon: require('IMG/user/bill-null.png'),
    nullcontent: '暂还没有可报备楼盘信息',
    checkShow: false,
    dataArr: [],
    haveData: true,
    loading: false,
    finished: false,
    projectName: '',
    parameterObj: {
      area: '',
      price: '-1,-1',
      popularity: ' ,500',
      sort: '',
      generalView: 0,
      discountHouse: '',
      projectPriceAvgStart: '',
      projectPriceAvgEnd: '',
      togetherNumStart: '',
      togetherNumEnd: 500,
      orderBy: '',
      size: 10,
      current: 1,
      province: '',
      city: '',
      county: '',
      projectName: ''
    }
  }),
  computed: {
    ...mapGetters(['reportAddInfo', 'userArea']),

    cityName() {
      return this.userArea.city ? this.userArea.city : '深圳市'
    }
  },
  methods: {
    onLoad() {
      this.queryBuildingList({}, this.current)
    },

    inpitBuildName(buildName) {
      this.projectName = buildName

      this.parameterObj.projectName = buildName

      this.queryBuildingList(this.parameterObj, this.current)
    },

    async queryBuildingList(val, current) {
      this.searchInfo.siteText = this.userArea.city

      let obj = this.parameterObj

      if (val.baseFilters != null || val.moreFilters != null) {
        obj = Object.assign(val.baseFilters, val.moreFilters)

        obj.houseType = obj.type //几居室

        obj.projectName = this.parameterObj.projectName

        if (obj.generalView) {
          //全景
          obj.generalView = '1'
        } else {
          obj.generalView = '0'
        }

        if (obj.discountHouse) {
          //优惠
          obj.discountHouse = '1'
        } else {
          obj.discountHouse = ''
        }

        if (obj.areaSize != null) {
          let areaSize = obj.areaSize.split(',')
          obj.areaStart = areaSize[0]
          obj.areaEnd = areaSize[1]
        } else {
        }

        if (obj.price != null) {
          let price = obj.price.split(',')
          if (obj.price == '-1,-1') {
            obj.projectPriceAvgStart = ''
            obj.projectPriceAvgEnd = ''
          } else {
            obj.projectPriceAvgStart = price[0]
            obj.projectPriceAvgEnd = price[1]
          }
        }

        if (obj.popularity != null) {
          let popularity = obj.popularity.split(',')
          if (obj.popularity == '-1,-1') {
            obj.togetherNumStart = ''
            obj.togetherNumEnd = ''
          } else {
            obj.togetherNumStart = popularity[0]
            obj.togetherNumEnd = popularity[1]
          }
        }

        if (obj.sort != null) {
          obj.orderBy = obj.sort
        }

        obj.size = 10
        obj.current = 1
        obj.province = ''
        obj.city = ''
        obj.county = ''
        this.parameterObj = obj
      } else {
        obj.size = 10
        obj.current = 1
        this.parameterObj = obj
      }

      const result = await reportServer.getReportBuildingList(obj)

      if (result.records.length > 0) {
        this.dataArr = result.records
        this.haveData = true

        if (res.pages === 0 || this.page === res.pages) {
          this.finished = true
        }
        this.cuurent++
        this.loading = false
      } else {
        if (current == 1) {
          this.haveData = false
        }
        this.loading = false
        this.finished = true
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

    .notice-view{
      font-size: 12px;
      color: #999999;
      text-align:center;
      margin-top: 90px;
      
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
