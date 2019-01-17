<template>
  <van-popup class="single-select-box" v-model="singleShow">
    <div v-if="status===1" class="search-container">
      <div class="search-box">
        <search :conf="searchInfo" @getContent="searchChangeHandle" @areaClick="areaClickHandle"/>
        <screen v-model="projectFilters" :local="this.searchInfo.siteText"/>
      </div>
      <div class="house-box">
        <van-list v-model="loading" :finished="finished" :finished-text="'没有更多了'" @load="getLinkerList">
          <discover-item2 v-for="(item,index) in projectList" :key="index" :dataArr="item" :indexData="index" @click.native="selectHandle(item)"/>
        </van-list>
      </div>
    </div>
    <div v-else class="city-select-container"></div>
  </van-popup>
</template>
<script>
import Search from 'COMP/Search/'
import Screen from 'COMP/Screen/'
import DiscoverItem2 from 'COMP/DiscoverItem2/'
import { mapGetters } from 'vuex'
import marketService from 'SERVICE/marketService'
import userService from 'SERVICE/userService'
import screenFilterHelper from '@/utils/screenFilterHelper'
export default {
  components: {
    Search,
    Screen,
    DiscoverItem2
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
    projectList: [],
    selectedItems: []
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
    },
    areaClickHandle() {
      this.status = 2
    },
    selectHandle(item) {
      const index = this.selectedItems.indexOf(item)
      if (index === -1) {
        this.selectedItems.push(item)
      } else {
        this.$delete(this.selectedItems, index)
      }
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
