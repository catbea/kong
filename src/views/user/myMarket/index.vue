<template>
  <div class="user-mymarket-page">
    <div style="margin-left:16px">
      <master-market :swipeList="swipeList"  @noRecommend="noRecommendHandle"></master-market>
    </div>
    <div style="margin-left:16px">
      <title-bar :conf="titleInfo" @return="returnHandle"></title-bar>
    </div>
    <div class="user-market-box">
      <!-- 展示的楼盘 -->
      <div class="market-left" v-show="myMarketShow">
        <div style="margin-left:16px" v-show="showMarketListCount>=showFilterLimit">
          <search :conf="searchInfo" v-model="showProjectName" @areaClick="areaClickHandler"></search>
          <screen v-model="showProjectFilters" :local="this.selectedCity"></screen>
        </div>
        <van-list v-model="showLoading" :finished="showFinished" finished-text="没有更多了" @load="showGetMyMarketInfo">
          <user-market @usmarIconReturn="skipShareHandle" v-for="(item,index) in showMarketList" :key="index" :marketIndex="index" :dataArr="item" @pushMaster="pushMasterHandle" @spliceMaster="spliceMasterHandle" @pushCommon="pushCommonHandle" @spliceCommon="spliceCommonHandle" @closeCut="closeCut" @returnMasterHandle="returnMasterHandle" @returncommonHandle="returncommonHandle"></user-market>
        </van-list>
      </div>
      <p v-show="isNoData" class="notMarket">暂未开通任何楼盘</p>
      <!-- 不展示的楼盘 -->
      <div class="market-right" v-show="!myMarketShow">
        <div style="margin-left:16px" v-show="unShowMarketListCount>=showFilterLimit">
          <search :conf="searchInfo" v-model="notShowProjectName" @areaClick="areaClickHandler"></search>
          <screen v-model="notShowProjectFilters"></screen>
        </div>
        <van-list v-model="notShowLoading" :finished="notShowFinished" finished-text="没有更多了" @load="notShowGetMyMarketInfo">
          <close-market v-for="(item,index) in notShowMarketList" :key="index" :dataArr="item" :marketIndex="index" @openCut="openCut" @returnMasterHandle="returnMasterHandle" @returncommonHandle="returncommonHandle"></close-market>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
import MasterMarket from 'COMP/User/MasterMarket/'
import TitleBar from 'COMP/TitleBar/arrow.vue'
import Search from 'COMP/Search/'
import Screen from 'COMP/Screen/'
import screenFilterHelper from '@/utils/screenFilterHelper'
import UserMarket from 'COMP/User/UserMarket/'
import CloseMarket from 'COMP/User/UserMarket/CloseMarket.vue'
import userService from 'SERVICE/userService'
export default {
  components: {
    MasterMarket,
    TitleBar,
    Search,
    Screen,
    UserMarket,
    CloseMarket
  },
  data: () => ({
    isNoData: false,
    showFilterLimit: 20,
    showLoading:false,
    showFinished:false,//展示
    notShowLoading:false,
    notShowFinished:false,//不展示
    showPage:1,
    notShowPage:1,
    pageSize: 4,
    showProjectName: '',//展示搜索名
    setShowName:null,
    showProjectFilters: {},//展示的筛选类型
    notShowProjectName: '',//不展示搜索名
    setNotShowName:null,
    notShowProjectFilters: {},//不展示的筛选类型
    searchShow: null,
    searchNotShow: null,
    searchShowNum: 0,
    searchNotShowNum: 0,
    head: false,
    marketShow: true,
    notMarketShow:true,
    recommendList: null,
    masterList:[],//大师推荐图
    commonList: [],//普通推荐图
    swipeList: [],
    selectedCity: '',
    showMarketList: [],
    showMarketListCount: 0,
    notShowMarketList: [],
    notShowMarketListCount: 0,
    marketList: [],
    myMarketShowList: [],
    myMarketNotShowList: [],
    myMarketShow: true,
    titleInfo: {
      title: '我的楼盘',
      linkText: '切换关闭展示楼盘',
      link: ''
    },
    searchInfo: {
      siteText: '全国',
      placeholderText: '请输入楼盘'
    },
    dataArr: []
  }),
 async created() {
    this.selectedCity = this.userArea.myMarketSelectedCity
    this.searchInfo.siteText = this.selectedCity ? this.selectedCity:  '全国'
    await this.showGetMyMarketInfo()//请求展示楼盘
    await this.notShowGetMyMarketInfo()//请求不展示楼盘
    await this.getRecommendInfo()//请求轮播图数据
    await this.marketShowHandle()//展示/不展示都没数据时
    this.getShowProjectCount();
    this.getUnShowProjectCount();
  },
  computed: {
    ...mapGetters(['userArea'])
  },
  watch: {
    showProjectName(val) {
      clearTimeout(this.setShowName)
        this.setShowName = setTimeout(() => {
        this.showPage = 1
        this.showProjectName = val
        // this.showProjectFilters = {}
        this.showGetMyMarketInfo()//根据搜索字请求展示的楼盘数据
        clearTimeout(this.setShowName)
      }, 500)
    },
    showProjectFilters: {
      handler(val) {
        this.showPage = 1
        this.showMarketList = []
        // this.showGetMyMarketInfo()
      },
      deep: true
    },
    notShowProjectName(val) {
      clearTimeout(this.setNotShowName)
      this.setNotShowName = setTimeout(() => {
        this.notShowPage = 1
        this.notShowProjectName = val
        this.notShowMarketList = []
        // this.notShowGetMyMarketInfo()//根据搜索字请求不展示的楼盘数据
        clearTimeout(this.setNotShowName)
      }, 500)
    },
    notShowProjectFilters: {
      handler(val) {
        this.notShowPage = 1
        this.notShowGetMyMarketInfo()
      },
      deep: true
    }
  },
  methods: {
    async getShowProjectCount() {
      const res = await userService.queryMyLinkerCount(0)
      this.showMarketListCount = res.count
    },
    async getUnShowProjectCount() {
      const res = await userService.queryMyLinkerCount(1)
      this.notShowMarketListCount = res.count
    },
    showOnLoad(){//展示数据初始化
      this.showGetMyMarketInfo()
    },
    notShowOnLoad(){//不展示数据初始化
      this.notShowGetMyMarketInfo()
    },
    // 搜索区域点击处理
    areaClickHandler() {
      this.$router.push({name: 'area-select', query: {fromPage:'myMarket'}})
    },
    operationSearch() {
      //根据展示/不展示楼盘数量来显示搜索
      if (this.searchShowNum > 20) {
        this.searchShow = true
      } else {
        this.searchShow = false
      }
    },
    marketShowHandle(){//展示/不展示都没数据时
      if (this.showMarketList.length == 0&&this.notShowMarketList.length==0) {
        this.marketShow = false
      } else {
        this.marketShow = true
      }
    },
    pushMasterHandle(n) {
      //点击实时更新大师推荐图片
      for (let index = 0; index < this.commonList.length; index++) {
        const element = this.commonList[index]
        if (n.linkerId === element.linkerId) {
          this.commonList.splice(index, 1)
        }
      }
      n.masterRecommand = '1'
      this.masterList = this.masterList.concat(n)
      this.swipeList = this.masterList.concat(this.commonList)
    },
    spliceMasterHandle(n) {
      //点击实时改为取消大师改为未推荐
      for (let index = 0; index < this.masterList.length; index++) {
        const element = this.masterList[index]
        if (n.linkerId === element.linkerId) {
          this.masterList.splice(index, 1)
          this.swipeList = this.masterList.concat(this.commonList)
        }
      }
      for (let index = 0; index < this.showMarketList.length; index++) {
        const element = this.showMarketList[index]
        if (n === element.linkerId) {
          element.masterRecommand = '0'
        }
      }
    },
    pushCommonHandle(n) {
      //点击实时更新普通推荐图片
      for (let index = 0; index < this.masterList.length; index++) {
        const element = this.masterList[index]
        if (n.linkerId === element.linkerId) {
          this.masterList.splice(index, 1)
        }
      }
      n.masterRecommand = '2'
      this.commonList = this.commonList.concat(n)
      this.swipeList = this.masterList.concat(this.commonList)
    },
    spliceCommonHandle(n) {
      //点击实时改为取消普通改为未推荐
      for (let index = 0; index < this.commonList.length; index++) {
        const element = this.commonList[index]
        if (n.linkerId == element.linkerId) {
          this.commonList.splice(index, 1)
          this.swipeList = this.masterList.concat(this.commonList)
        }
      }
    },
  async noRecommendHandle(n) {
      //图片列表删除某个，楼盘列表重置推荐
      for (let index = 0; index < this.swipeList.length; index++) {
        const element = this.swipeList[index]
        if (n === element.linkerId) {
          element.masterRecommand = '0'
        }
      }
      for (let index = 0; index < this.showMarketList.length; index++) {
        const element = this.showMarketList[index]
        if (n === element.linkerId) {
          element.masterRecommand = '0'
        }
      }
      this.commonList = this.swipeList.filter(item=>item.masterRecommand=='2');
      this.masterList = this.swipeList.filter(item=>item.masterRecommand=='1');
    },
    // async changeMarketStatus(linkerId, operationType, status){//改变楼盘推荐状态
    //   await userService.changeMarketData(linkerId, operationType, status)
    // },
    async getRecommendInfo() {
      //推荐楼盘的数据
      const res = await userService.getRecommend()
      this.recommendList = res
      this.master()
      this.common()
      this.swipeList = this.masterList.concat(this.commonList)
    },
    master() {
      this.masterList = this.recommendList.filter(item => {
        return item.masterRecommand == '1'
      })
    },
    common() {
      this.commonList = this.recommendList.filter(item => {
        return item.masterRecommand == '2'
      })
    },
    async showGetMyMarketInfo() {
      let name = this.showProjectName
      let filters = this.showProjectFilters
      let page = this.showPage
      //请求展示的楼盘数据
      let mergeFilters = filters.baseFilters ? Object.assign(filters.baseFilters, filters.moreFilters) : {}
      let obj = screenFilterHelper(name, mergeFilters)
      obj.current = page
      obj.size = this.pageSize
      obj.displayFlag = 0
      obj.city = this.selectedCity
      const resShow = await userService.getMyMarket(obj)
      this.showMarketList = this.showMarketList.concat(resShow.records)
      if (resShow.pages === 0 || this.showPage === resShow.pages) {
        this.showFinished = true
      }
      this.showPage++
      this.showLoading = false
    },
    async notShowGetMyMarketInfo() {
      // this.notShowProjectName,this.notShowProjectFilters, this.notShowPage
      let name = this.notShowProjectName
      let filters = this.notShowProjectFilters
      let page = this.notShowPage

      //请求不展示的楼盘数据
      let mergeFilters = filters.baseFilters ? Object.assign(filters.baseFilters, filters.moreFilters) : {}
      let obj = screenFilterHelper(name, mergeFilters)
      obj.current = page
      obj.size = this.pageSize
      obj.displayFlag = 1 
      obj.city = this.selectedCity
      // let obj = {}
      // obj.projectName=name
      // obj.displayFlag=1
      const resNotShow = await userService.getMyMarket(obj)
      // this.searchNotShowNum = resNotShow.records.length//不展示的楼盘个数
      // this.notShowMarketList =resNotShow.records
      this.notShowMarketList = this.notShowMarketList.concat(resNotShow.records)
      if (resNotShow.pages === 0 || this.notShowPage === resNotShow.pages) {
        this.notShowFinished = true
      }
      this.notShowPage++
      this.notShowLoading = false
    },
    returnHandle() {
      //切换展示与否
      this.myMarketShow = !this.myMarketShow
      if (this.myMarketShow) {
        this.titleInfo.linkText = '切换关闭展示楼盘'
      } else {
        this.titleInfo.linkText = '切换开启展示楼盘'
      }
    },
    skipShareHandle() {
      this.$router.push('/marketDetail/share')
    },
    closeCut(n) {
      this.notShowMarketList.push(n)
      for (let index = 0; index < this.showMarketList.length; index++) {
        const element = this.showMarketList[index];
        if(n.linkerId==element.linkerId){
          this.showMarketList.splice(index,1)
        }
      }
    },
    returnMasterHandle(n) {
      this.masterList.push(this.myMarketList[n])
    },
    returncommonHandle(n) {
      this.commonList.push(this.myMarketList[n])
    },
    openCut(n) {
      this.showMarketList.push(n)
      console.log(this.showMarketList,'展示的楼盘');
      for (let index = 0; index < this.notShowMarketList.length; index++) {
        const element = this.notShowMarketList[index];
        if(n.linkerId==element.linkerId){
          this.notShowMarketList.splice(index,1)
        }
      }
    }
  }
}
</script>
<style lang="less">
.user-mymarket-page {
  height: auto !important;
  background: #ffffff;
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 2s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .trans {
    position: relative;
    display: flex;
    margin-left: 100px;
    p {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      position: absolute;
    }
    p:nth-child(1) {
      background: black;
    }
    p:nth-child(2) {
      background: blue;
    }
  }
  .user-market-box {
    position: relative;
    display: flex;
    .notMarket {
      position: absolute;
      margin-left: -60px;
      margin-top: 100px;
      color: #666666;
      top: 50%;
      left: 50%;
      font-size: 15px;
    }
    .market-left {
      width: 100%;
    }
  }
  .title-bar,
  .search-container {
    width: 343px;
  }

  .user-mymarket-page-search {
    height: 44px;
  }
}
</style>
