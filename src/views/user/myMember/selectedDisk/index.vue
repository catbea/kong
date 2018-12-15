<template>
  <div class="my-member-page">
    <div class="search-box">
      <search :conf="searchInfo" @areaClick="areaClickHandle"></search>
    </div>
    <div>
      <screen></screen>
    </div>
    <div class="market-box">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="'没有更多了'"
        @load="getLinkerList">
        <meal-market
            v-for="(item,index) in projectList"
            :key="index"
            :dataArr="item"
            :indexData="index"
            :showData="checkedList.indexOf(index) > -1"
            @click.native="selectHandle(item)" ></meal-market>
      </van-list>
    </div>
    <div class="check-all-box">
      <div class="img-box" v-show="type == 'vip'">
        <span class="icon-check bg_img"
        :style="{backgroundImage:'url('+(checkAllShow ? checkColorImg : checkImg)+')'}"
        @click="allSelectHandle" ></span>
        <span class="check-label">全选</span>
      </div>
      <div class="img-box" v-show="type == 'package'">
        <span class="bg_img icon-project-select"
          :style="{backgroundImage:'url('+(projectSelectIco)+')'}" ></span>
        <span class="check-label">待选楼盘（{{checkedList.length}}/{{limitCount}}）</span>
      </div>
      <span @click="vipProjectOpenHandle" class="check-all-button">开通</span>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant'
import marketService from 'SERVICE/marketService'
import Search from 'COMP/Search/'
import Screen from 'COMP/Screen/'
import MealMarket from './MealMarket.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    Search,
    Screen,
    MealMarket
  },
  created() {
    this.type = this.$route.query.type
    if(this.type == 'vip') {
      console.log(this.userInfo.vipInfo, 'this.userInfo.vipInfo')
      this.searchInfo.siteText = (this.userInfo.vipInfo && this.userInfo.vipInfo.city) ? this.userInfo.vipInfo.city : ''
    } else {
      this.searchInfo.siteText = this.userArea.selectedCity || this.userArea.city 
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userArea'])
  },
  data: () => ({
    type: 'vip',
    packageIscheckedIds:[],
    checkedList: [],
    limitCount: 10,
    searchInfo: {
      siteText: '',
      placeholderText: '请输入楼盘'
    },
    projectSelectIco: require('IMG/myMember/project_select_ico.png'),
    checkImg: require('IMG/user/mealMarket/check@2x.png'),
    checkColorImg: require('IMG/user/mealMarket/checkColor@2x.png'),
    page: 1,
    pageSize: 8,
    checkAllShow: false,
    loading: false,
    finished: false,
    projectList: []
  }),
  methods: {
    areaClickHandle() {
      if(this.type == 'vip') {
        return
      }
      this.$router.push({path: "/public/area-select"})
    },

    async getPackageInfo() {
      const res = await marketService.packPageHouseQuery(this.$route.query.packageId)
      this.limitCount = res.limitTotal
      this.packageIscheckedIds = res.linkerIdList
    },

    async getLinkerList() {
      this.checkAllShow = false
      let param = {current: this.page, size: this.pageSize}
      let res = []
      if(this.type == 'package') {
        param.city = this.searchInfo.siteText
        res = await marketService.packageLinkerList(param)
      } else {
        res = await marketService.vipLinkerList(param)
      }
      
      let _list = []
      for(let item of res.records) {
        let obj = {
          linkerId: item.linkerId,
          linkerUrl: item.linkerUrl,
          sale: item.sale,
          linkerName: item.linkerName,
          site: `${item.city} ${item.county} ${item.price} ${item.priceUnit}`, //'深圳 南山 120000元/㎡',
          condition: item.linkerTags,
          open: `${item.openTimes}次开通`,
          isChecked: false,
          price: `${item.price} ${item.priceUnit}`
        }
        _list.push(obj)
      }
      this.projectList = this.projectList.concat(_list)
      if (res.pages === 0 || this.page === res.pages) {
        this.finished = true
      }

      if(this.type == 'package') { //套盘跳过来的，加载套盘内容
        if(this.page == 1){
          await this.getPackageInfo()
        }
        this.packageCheckedInit()
      }

      this.page++
      this.loading = false
    },

    packageCheckedInit() {
      this.checkedList = []
      for(let i=0; i<this.packageIscheckedIds.length;i++) {
        this.checkedList.push({linkerId: this.packageIscheckedIds[i]})
        for(let item of this.projectList) {
          if(this.packageIscheckedIds[i] == item.linkerId){
            item.isChecked = true
          }
        }
      }
    },

    async vipProjectOpenHandle() {
      if(this.checkedList.length == 0) {
        this.$toast('请先选择楼盘')
        return
      }
      let isCheckLinkerArr = []
      for(let item of this.checkedList){
        isCheckLinkerArr.push(item.linkerId)
      }
      
      if(this.type == 'package') {
        let res = await marketService.userPackageAddHouse(isCheckLinkerArr.join(), this.$route.query.packageId)
        this.$toast('添加到套盘成功')
      } else {
        let res = await marketService.addHouseByVip(isCheckLinkerArr.join())
        this.$toast('添加到我的楼盘成功')
        this.$router.replace({path: "/user"})
      }
    },

    selectHandle(project) {
      if(this.type == 'package' && !project.isChecked && this.checkedList.length >= this.limitCount){
        this.$toast('已达到楼盘添加上限')
        return
      }
      project.isChecked = !project.isChecked
      for(let item of this.checkedList) {
        if(project.linkerId == item.linkerId){
          this.checkedList = this.checkedList.filter(obj => {
            return obj != item
          })
          return
        }
      }
      this.checkedList.push(project)
      console.log(this.checkedList)
    },

    allSelectHandle() {
      this.checkAllShow = !this.checkAllShow
      if(this.checkAllShow){
        this.checkedList = this.projectList
        for(let item of this.projectList){
          item.isChecked = true
        }
      } else {
        this.checkedList = []
        for(let item of this.projectList){
          item.isChecked = false
        }
      }
    }
  }
}
</script>
<style lang="less">
.my-member-page {
  .search-box{
    padding: 8px;
  }
  .market-box {
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
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .icon-check {
      width: 18px;
      height: 18px;
      margin: 0 16px;
    }
    .icon-project-select{
      width: 20px;
      height: 17px;
      margin: 0px 8px 0 16px;
    }
    .check-label{
      line-height: 20px;
    }
    .check-all-button {
      margin-right: 32px;
      width: 72px;
      height: 30px;
      border-radius: 22px;
      border: 1px solid;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 122, 230, 1);
      line-height: 30px;
      text-align: center;
    }
  }
}
</style>
