<template>
  <van-popup class="single-select-box" v-model="singleShow">
    <div v-if="status===1" class="search-container">
      <div class="search-box">
        <search :conf="searchInfo" @getContent="searchChangeHandle" @areaClick="areaClickHandle"/>
        <screen v-model="projectFilters" :local="this.searchInfo.siteText"/>
      </div>
      <div class="house-box">
        <van-list v-model="loading" :finished="finished" :finished-text="'没有更多了'" @load="getLinkerList">
          <discover-item2 v-for="(item,index) in projectList" v-model="item.isChecked" :key="index" :dataArr="item" :indexData="index" @click.native="selectHandle(item)"/>
        </van-list>
      </div>
      <div class="van-hairline--top operate-box">
        <div class="cancel-btn" @click="cancelBtnClick">取消</div>
        <div class="submit-btn" @click="submitBtnClick">确认</div>
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
    value: { type: Boolean, default: false }, // 对应show.是否显示
    maxSelect: { type: Number, default: 1 }, // 限制个数
    selected: [] // 已经选中
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
    // 搜索框文字改变时触发搜索
    searchChangeHandle(name) {
      this.finished = false
      this.page = 1
      this.projectName = name
      this.projectList = []
      this.getLinkerList()
    },
    // 加载数据方法 整合加载更多和重新搜索
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
          isChecked: this.existCheck(item.linkerId) !== -1,
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
    // 切换到地域切换
    areaClickHandle() {
      this.status = 2
    },
    // 验证是否已经被点击,不存在返回-1,存在返回index
    existCheck(linkerId) {
      for (let i = 0; i < this.selectedItems.length; i++) {
        if (this.selectedItems[i].linkerId === linkerId) return i
      }
      return -1
    },
    // 验证是否可以继续选中
    enableCheck() {
      return this.selectedItems.length < this.maxSelect
    },
    // item点击
    selectHandle(item) {
      const index = this.existCheck(item.linkerId)
      if (index === -1) {
        if (this.enableCheck()) {
          this.selectedItems.push(item)
        } else {
          // TODO 提示已到最大个数
        }
      } else {
        this.$delete(this.selectedItems, index)
      }
      console.log('result', this.selectedItems)
    },
    // 点击取消
    cancelBtnClick() {
      this.selectedItems = []
      this.singleShow = false
    },
    // 点击确认
    submitBtnClick() {
      this.$emit('submit', this.selectedItems)
      this.singleShow = false
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
  border-radius: 4px;
  > .search-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    > .search-box {
      position: relative;
      margin: 8px 10px;
    }
    > .house-box {
      flex: 1;
      margin-bottom: 30px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    > .operate-box {
      position: fixed;
      width: 100%;
      height: 50px;
      bottom: 0;
      flex: 1;
      display: flex;
      justify-content: space-around;
      background: #fff;
      > div {
        font-size: 12px;
        color: #ffffff;
        font-weight: 400;
        width: 120px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        letter-spacing: 2px;
        margin: 9px;
        border-radius: 6px;
        &.cancel-btn {
          background: #404457;
        }
        &.submit-btn {
          background: #007ae6;
        }
      }
    }
  }
}
</style>
