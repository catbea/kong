<template>
  <div class="my-member-page">
    <div class="search-box">
      <search :conf="searchInfo" @getContent="searchChangeHandle" @areaClick="areaClickHandle"></search>
      <screen v-model="projectFilters" :local="this.searchInfo.siteText"></screen>
    </div>
    <div class="market-box">
      <van-list v-model="loading" :finished="finished" :finished-text="'没有更多了'" @load="getLinkerList">
        <meal-market v-for="(item,index) in projectList" :key="index" :dataArr="item" :indexData="index" :showData="checkedList.indexOf(index) > -1" @click.native="selectHandle(item)"></meal-market>
      </van-list>
    </div>
    <div class="check-all-box scale-1px">
      <div class="img-box" v-show="type == 'vip'">
        <span class="icon-check bg_img" :style="{backgroundImage:'url('+(checkAllShow ? checkColorImg : checkImg)+')'}" @click="allSelectHandle"></span>
        <span class="check-label">全选</span>
      </div>
      <div class="img-box" v-show="type == 'package'">
        <span class="bg_img icon-project-select" :style="{backgroundImage:'url('+(projectSelectIco)+')'}"></span>
        <span class="check-label">待选楼盘（{{checkedList.length}}/{{limitCount}}）</span>
      </div>
      <span @click="vipProjectOpenHandle" v-show="!saving" class="check-all-button">开通</span>
      <span v-show="saving" class="saving-button">开通中...</span>
    </div>
  </div>
</template>
<script>
import marketService from 'SERVICE/marketService'
import Search from 'COMP/Search/'
import Screen from 'COMP/Screen/'
import MealMarket from './MealMarket.vue'
import { mapGetters } from 'vuex'
import screenFilterHelper from '@/utils/screenFilterHelper'
export default {
  components: {
    Search,
    Screen,
    MealMarket
  },
  watch: {
    projectFilters: {
      handler(val) {
        this.finished = false
        this.page = 1
        this.projectList = []
        this.getLinkerList()
      },
      deep: true
    }
  },
  created() {
    this.type = this.$route.query.type
    this.vipCity = this.$route.query.vipCity
    if (this.type == 'vip') {
      this.searchInfo.siteText = this.userArea.selectedCity || this.vipCity || (this.userInfo.vipInfo && this.userInfo.vipInfo.city ? this.userInfo.vipInfo.city : '')
    } else {
      this.searchInfo.siteText = this.userArea.selectedCity || this.userInfo.majorCity || this.userArea.city
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userArea'])
  },
  data: () => ({
    saving: false,
    type: 'vip',
    projectFilters: {},
    packageIscheckedIds: [],
    checkedList: [],
    limitCount: 10,
    searchInfo: {
      siteText: '',
      placeholderText: '请输入楼盘'
    },
    projectName: '',
    projectSelectIco: require('IMG/myMember/project_select_ico.png'),
    checkImg: require('IMG/user/mealMarket/check@2x.png'),
    checkColorImg: require('IMG/user/mealMarket/checkColor@2x.png'),
    isCheckedImg: require('IMG/user/mealMarket/isChecked.png'),
    page: 1,
    pageSize: 4,
    checkAllShow: false,
    loading: false,
    finished: false,
    projectList: [],
    vipCity: ''
  }),
  methods: {
    areaClickHandle() {
      if (this.type == 'vip') {
        this.$router.push({ path: '/public/vip-market', query: {category: 1} })
      } else {
        this.$router.push({ path: '/public/area-select' })
      }
      
    },

    searchChangeHandle(name) {
      this.finished = false
      this.page = 1
      this.projectName = name
      this.projectList = []
      this.getLinkerList()
    },

    async getPackageInfo() {
      const res = await marketService.packPageHouseQuery(this.$route.query.packageId)
      this.limitCount = res.limitTotal
      this.packageIscheckedIds = res.linkerIdList
    },

    async getLinkerList() {
      this.checkAllShow = false
      let city = this.searchInfo.siteText === '全国' ? '' : this.searchInfo.siteText
      let param = { current: this.page, size: this.pageSize, city: city }
      if (this.projectName) {
        param.projectName = this.projectName
      } else {
        //组装检索条件
        let mergeFilters = this.projectFilters.baseFilters ? Object.assign(this.projectFilters.baseFilters, this.projectFilters.moreFilters) : {}
        let _filters = screenFilterHelper(this.projectName, mergeFilters)
        param = Object.assign(param, _filters)
        //
      }
      let res = []
      if (this.type == 'package') {
        param.city = this.searchInfo.siteText
        res = await marketService.packageLinkerList(param)
        console.log(res,'楼盘数据')
      } else {
        res = await marketService.vipLinkerList(param)
      }

      let _list = []
      for (let item of res.records) {
        let obj = {
          linkerId: item.linkerId,
          linkerUrl: item.linkerUrl,
          sale: item.sale,
          linkerName: item.linkerName,
          site: `${item.city ? item.city : ''} ${item.county ? item.county : ''} ${item.price ? item.price : '价格待定'} ${item.priceUnit&&item.price ? item.priceUnit : ''}`, //'深圳 南山 120000元/㎡',
          condition: item.linkerTags,
          open: `${item.openTimes}次开通`,
          saleStatus: item.saleStatus,
          isChecked: false,
          isFree: item.isFree,
          divisionRules: item.divisionRules,
          price: `${item.price} ${item.priceUnit}`
        }
        _list.push(obj)
      }
      this.projectList = this.page <= 1 ? _list : this.projectList.concat(_list)
      if (res.pages === 0 || this.page >= res.pages) {
        this.finished = true
      }
      if (this.type == 'package') {
        //套盘跳过来的，加载套盘内容
        if (this.page == 1) {
          await this.getPackageInfo()
          this.packageCheckedInit()
        }
      }
      this.page++
      this.loading = false
    },

    packageCheckedInit() {
      this.checkedList = []
      for (let i = 0; i < this.packageIscheckedIds.length; i++) {
        this.checkedList.push({ linkerId: this.packageIscheckedIds[i] })
        for (let item of this.projectList) {
          if (this.packageIscheckedIds[i] == item.linkerId) {
            ;(item.isUnable = true), (item.isChecked = true)
          }
        }
      }
    },

    async vipProjectOpenHandle() {
      if (this.packageIscheckedIds.length == this.checkedList.length) {
        this.$toast('请先选择楼盘')
        return
      }
      let isCheckLinkerArr = []
      for (let item of this.checkedList) {
        isCheckLinkerArr.push(item.linkerId)
      }
      this.saving = true
      if (this.type == 'package') {
        let res = await marketService.userPackageAddHouse(isCheckLinkerArr.join(), this.$route.query.packageId)
      } else {
        let res = await marketService.addHouseByVip(isCheckLinkerArr.join())
      }
      this.saving = false
      this.$dialog
        .confirm({
          title: '开通成功',
          message: '成功开通楼盘',
          cancelButtonText: '取消'
        })
        .then(() => {
          this.$router.replace({ path: '/market/classify/mymarket' })
        })
        .catch(() => {
          this.page = 1
          this.projectList = []
          this.getLinkerList()
        })
    },

    selectHandle(project) {
      if (project.isUnable) {
        return
      }
      if (this.type == 'package' && !project.isChecked && this.checkedList.length >= this.limitCount) {
        this.$toast('已达到楼盘添加上限')
        return
      }
      project.isChecked = !project.isChecked
      for (let item of this.checkedList) {
        if (project.linkerId == item.linkerId) {
          this.checkedList = this.checkedList.filter(obj => {
            return obj != item
          })
          return
        }
      }
      this.checkedList.push(project)
    },

    allSelectHandle() {
      this.checkAllShow = !this.checkAllShow
      if (this.checkAllShow) {
        this.checkedList = this.projectList
        for (let item of this.projectList) {
          item.isChecked = true
        }
      } else {
        this.checkedList = []
        for (let item of this.projectList) {
          item.isChecked = false
        }
      }
    }
  }
}
</script>
<style lang="less">
.my-member-page {
  .search-box {
    width: 100%;
    background: #fff;
    position: fixed;
    top: 0px;
    padding: 8px;
    z-index: 9;
  }
  .market-box {
    padding-top: 80px;
    padding-bottom: 80px;
    .meal-market-page {
      .meal-market-page-box {
        margin: 16px 0 0 16px;
      }
    }
  }
  .check-all-box {
    background: rgba(255, 255, 255, 1);
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    .img-box {
      display: flex;
      font-size: 12px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .icon-check {
      width: 18px;
      height: 18px;
      margin: 0 16px;
    }
    .icon-project-select {
      width: 20px;
      height: 17px;
      margin: 0px 8px 0 16px;
    }
    .check-label {
      line-height: 20px;
    }
    .check-all-button {
      margin-right: 16px;
      width: 72px;
      height: 30px;
      border-radius: 22px;
      border: 1px solid;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 122, 230, 1);
      line-height: 30px;
      text-align: center;
    }
    .saving-button {
      margin-right: 16px;
      width: 72px;
      height: 30px;
      border-radius: 22px;
      border: 1px solid;
      font-size: 14px;
      font-weight: 400;
      color: #ccc;
      line-height: 30px;
      text-align: center;
    }
  }
}
</style>
