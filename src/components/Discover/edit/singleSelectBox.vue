<template>
  <van-popup class="single-select-box" v-model="singleShow">
    <div v-if="status===1" class="search-container">
      <div class="search-box">
        <search :conf="searchInfo" @getContent="searchChangeHandle" @areaClick="areaClickHandle"/>
        <screen v-model="projectFilters" :local="this.searchInfo.siteText"/>
      </div>
      <div class="house-box">
        <van-list v-model="loading" :finished="finished" :finished-text="'没有更多了'" @load="getLinkerList">
          <meal-market v-for="(item,index) in projectList" :key="index" :dataArr="item" :indexData="index"  @click.native="selectHandle(item)"/>
        </van-list>
      </div>
    </div>
    <div v-else class="city-select-container"></div>
  </van-popup>
</template>
<script>
import Search from 'COMP/Search/'
import Screen from 'COMP/Screen/'
import { mapGetters } from 'vuex'
import marketService from 'SERVICE/marketService'
import userService from 'SERVICE/userService'
import screenFilterHelper from '@/utils/screenFilterHelper'
export default {
  components: {
    Search,
    Screen
    // MealMarket
  },
  props: {
    value: false // 对应show
  },
  data: () => ({
    singleShow: false,
    status: 1,
    projectFilters: {},
    searchInfo: {
      siteText: '',
      placeholderText: '请输入楼盘'
    },
    searchTimer: null,
    loading: false,
    finished: false,
    page: 1,
    pageSize: 10,
    projectName: '',
    projectList: []
  }),
  created() {
    this.searchInfo.siteText = this.userInfo.majorCity
  },
  methods: {
    searchChangeHandle(name) {
      this.finished = false
      this.page = 1
      this.projectName = name
      this.projectList = []
      this.getLinkerList()
    },
    async getLinkerList() {
      let mergeFilters = this.projectFilters.baseFilters ? Object.assign(this.projectFilters.baseFilters, this.projectFilters.moreFilters) : {}
      let payload = screenFilterHelper(this.projectName, mergeFilters)
      payload = Object.assign(payload, { current: this.page, size: this.pageSize })
      console.log(payload)
      const res = await userService.getMyMarket(payload)
          let _list = []
      for (let item of res.records) {
        let obj = {
          linkerId: item.linkerId,
          linkerUrl: item.linkerUrl,
          sale: item.sale,
          linkerName: item.linkerName,
          site: `${item.city} ${item.county} ${item.price} ${item.priceUnit}`, //'深圳 南山 120000元/㎡',
          condition: item.linkerTags,
          open: `${item.openTimes}次开通`,
          saleStatus: item.saleStatus,
          isChecked: false,
          divisionRules: item.divisionRules,
          price: `${item.price} ${item.priceUnit}`
        }
        _list.push(obj)
      }
      this.projectList = this.page <= 1 ? _list : this.projectList.concat(_list)
      if (res.pages === 0 || this.page >= res.pages) {
        this.finished = true
      }
      this.page++
      this.loading = false

      // this.checkAllShow = false
      // let param = { current: this.page, size: this.pageSize }
      // if (this.projectName) {
      //   param.projectName = this.projectName
      // } else {
      //   //组装检索条件
      //   let mergeFilters = this.projectFilters.baseFilters ? Object.assign(this.projectFilters.baseFilters, this.projectFilters.moreFilters) : {}
      //   let _filters = screenFilterHelper(this.projectName, mergeFilters)
      //   param = Object.assign(param, _filters)
      //   //
      // }
      // let res = []
      // if (this.type == 'package') {
      //   param.city = this.searchInfo.siteText
      //   res = await marketService.packageLinkerList(param)
      // } else {
      //   res = await marketService.vipLinkerList(param)
      // }

      // let _list = []
      // for (let item of res.records) {
      //   let obj = {
      //     linkerId: item.linkerId,
      //     linkerUrl: item.linkerUrl,
      //     sale: item.sale,
      //     linkerName: item.linkerName,
      //     site: `${item.city} ${item.county} ${item.price} ${item.priceUnit}`, //'深圳 南山 120000元/㎡',
      //     condition: item.linkerTags,
      //     open: `${item.openTimes}次开通`,
      //     saleStatus: item.saleStatus,
      //     isChecked: false,
      //     divisionRules: item.divisionRules,
      //     price: `${item.price} ${item.priceUnit}`
      //   }
      //   _list.push(obj)
      // }
      // this.projectList = this.page <= 1 ? _list : this.projectList.concat(_list)
      // if (res.pages === 0 || this.page >= res.pages) {
      //   this.finished = true
      // }
      // if (this.type == 'package') {
      //   //套盘跳过来的，加载套盘内容
      //   if (this.page == 1) {
      //     await this.getPackageInfo()
      //     this.packageCheckedInit()
      //   }
      // }
      // this.page++
      // this.loading = false
    },
    areaClickHandle() {
      this.status = 2
      // this.$router.push({ path: '/public/area-select' })
    }
  },
  watch: {
    value(val) {
      this.singleShow = val
    },
    singleShow(val) {
      console.log('sigin dadasd')

      this.$emit('input', val)
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userArea'])
  }
}
</script>

<style lang="less">
.single-select-box {
  width: 90%;
  height: 94%;
}
</style>
