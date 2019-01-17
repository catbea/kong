<template>
  <div class="user-mymarket-page">
    <master-market
      :swipeList="swipeList"
      @noRecommend="noRecommendHandle"
    ></master-market>
    <title-bar
      :conf="titleInfo"
      @return="returnHandle"
    ></title-bar>
    <div class="user-market-box">
      <!-- 展示的楼盘 -->
      <div
        class="market-left"
        v-show="myMarketShow"
      >
        <div v-show="showMarketListCount>=showFilterLimit">
          <search
            :conf="searchInfo"
            v-model="showProjectName"
            @areaClick="areaClickHandler"
          ></search>
          <screen
            v-model="showProjectFilters"
            :local="this.selectedCity"
            :height="'16rem'"
            @screen="screenHandle"
            @sor="sortHandle"
          ></screen>
        </div>
        <van-list
          v-model="showLoading"
          :finished="showFinished"
          finished-text="没有更多了"
          @load="showGetMyMarketInfo"
          v-if="!yes"
          :class="{screen:flag}"
        >
          <user-market
            @usmarIconReturn="skipShareHandle"
            v-for="(item,index) in showMarketList"
            :key="index"
            :marketIndex="index"
            :dataArr="item"
            @pushMaster="pushMasterHandle"
            @spliceMaster="spliceMasterHandle"
            @pushCommon="pushCommonHandle"
            @spliceCommon="spliceCommonHandle"
            @closeCut="closeCut"
            @recommandTrueHandle="recommandTrueHandle"
            @recommandFalseHandle="recommandFalseHandle"
          ></user-market>
        </van-list>
        <div
          v-show="yes"
          class="notMarket"
        >
          <p
            class="bg_img"
            :style="{backgroundImage:'url('+unShowImg+')'}"
          ></p>
          <p>暂无开启展示的楼盘</p>
        </div>
      </div>

      <!-- 不展示的楼盘 -->
      <div
        class="market-right"
        v-show="!myMarketShow"
      >
        <div
          v-show="notShowMarketListCount>=showFilterLimit"
          style="margin-right:16px;margin-left:16px;"
        >
          <search
            :conf="searchInfo"
            v-model="notShowProjectName"
            @areaClick="areaClickHandler"
          ></search>
          <screen 
            v-model="notShowProjectFilters" 
            :height="'18rem'"
            @screen="screenHandle"
            @sor="sortHandle"></screen>
        </div>
        <van-list
          v-model="notShowLoading"
          :finished="notShowFinished"
          finished-text="没有更多了"
          @load="notShowGetMyMarketInfo"
          v-show="!no"
          :class="{screen:flag}"
        >
          <close-market
            v-for="(item,index) in notShowMarketList"
            :key="index"
            :dataArr="item"
            :marketIndex="index"
            @openCut="openCut"
          ></close-market>
        </van-list>
        <div
          v-show="no"
          class="notMarket"
        >
          <p
            class="bg_img"
            :style="{backgroundImage:'url('+unShowImg+')'}"
          ></p>
          <p>暂无关闭展示的楼盘</p>
        </div>
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
    flag: false,
    screenNum: null,
    stickNum: 0, //置顶个数
    unShowImg: require('IMG/user/collection/Group@2x.png'),
    yes: false,
    no: false,
    close: true,
    showFilterLimit: 20,
    showLoading: false,
    showFinished: false, //展示
    notShowLoading: false,
    notShowFinished: false, //不展示
    showPage: 1,
    notShowPage: 1,
    pageSize: 4,
    showProjectName: '', //展示搜索名
    setShowName: null,
    showProjectFilters: {}, //展示的筛选类型
    notShowProjectName: '', //不展示搜索名
    setNotShowName: null,
    notShowProjectFilters: {}, //不展示的筛选类型
    searchShow: null,
    searchNotShow: null,
    searchShowNum: 0,
    searchNotShowNum: 0,
    head: false,
    marketShow: true,
    notMarketShow: true,
    recommendList: null,
    masterList: [], //大师推荐图
    commonList: [], //普通推荐图
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
    dataArr: [],
    sortShow: false
  }),
  async created () {
    this.selectedCity = this.userArea.myMarketSelectedCity
    this.searchInfo.siteText = this.selectedCity ? this.selectedCity : '全国'
    // await this.showGetMyMarketInfo()//请求展示楼盘
    // await this.notShowGetMyMarketInfo()//请求不展示楼盘
    await this.getRecommendInfo() //请求轮播图数据
    await this.marketShowHandle() //展示/不展示都没数据时
    this.getShowProjectCount()
    this.getUnShowProjectCount()
    this.notShowGetMyMarketInfo()
  },
  computed: {
    ...mapGetters(['userArea'])
  },
  watch: {
    showProjectName (val) {
      clearTimeout(this.setShowName)
      this.setShowName = setTimeout(() => {
        this.showPage = 1
        this.showProjectName = val
        // this.showProjectFilters = {}
        this.showFinished = false
        this.showMarketList = []
        this.showGetMyMarketInfo() //根据搜索字请求展示的楼盘数据
        clearTimeout(this.setShowName)
      }, 500)
    },
    showProjectFilters: {
      handler (val) {
        this.showPage = 1
        this.showMarketList = []
        this.showFinished = false
        this.showGetMyMarketInfo()
      },
      deep: true
    },
    notShowProjectName (val) {
      clearTimeout(this.setNotShowName)
      this.setNotShowName = setTimeout(() => {
        this.notShowPage = 1
        this.notShowMarketList = []
        this.notShowFinished = false
        // this.notShowGetMyMarketInfo()//根据搜索字请求不展示的楼盘数据
        clearTimeout(this.setNotShowName)
      }, 500)
    },
    notShowProjectFilters: {
      handler (val) {
        this.notShowPage = 1
        this.notShowMarketList = []
        this.notShowFinished = false
        // this.notShowGetMyMarketInfo()
      },
      deep: true
    }
  },
  methods: {
    screenHandle (index) {//筛选中更多等滚动条操作
      // this.screenNum = index
      // if (this.screenNum == index) {
      //   this.flag = false
      // } else {
      //   this.flag = true
      // }
      // console.log('more-page');
      this.$nextTick(() => {
        if(document.querySelector('.area-filter')||document.querySelector('.price-filter')
      ||document.querySelector('.popularity-filter')||document.querySelector('.more-page'))
      {
        this.flag=true
      }else{
        this.flag=false
      }
      })
    },
    sortHandle(n){//筛选中排序滚动条操作
      this.$nextTick(() => {
        if(document.querySelector('.sortWay-page'))
      {
        this.flag=n
      }else{
        this.flag=n
      }
      })
    },
    stickNumHandle () {
      //判断有没有超过3个置顶
      for (let i = 0; i < this.showMarketList.length; i++) {
        const element = this.showMarketList[i]
        if (element.recommand == 10) {
          this.stickNum++
        }
      }
      this.stickNumHandle = function () { }
    },
    async getShowProjectCount () {
      const res = await userService.queryMyLinkerCount(0)
      this.showMarketListCount = res.count
    },
    async getUnShowProjectCount () {
      const res = await userService.queryMyLinkerCount(1)
      this.notShowMarketListCount = res.count
    },
    showOnLoad () {
      //展示数据初始化
      this.showGetMyMarketInfo()
    },
    notShowOnLoad () {
      //不展示数据初始化
      this.notShowGetMyMarketInfo()
    },
    // 搜索区域点击处理
    areaClickHandler () {
      this.$router.push({ name: 'area-select', query: { fromPage: 'myMarket' } })
    },
    operationSearch () {
      //根据展示/不展示楼盘数量来显示搜索
      if (this.searchShowNum > 20) {
        this.searchShow = true
      } else {
        this.searchShow = false
      }
    },
    marketShowHandle () {
      //展示/不展示都没数据时
      if (this.showMarketList.length == 0 && this.notShowMarketList.length == 0) {
        this.marketShow = false
      } else {
        this.marketShow = true
      }
    },
    //-----大师推荐操作
    pushMasterHandle (n) {
      //点击实时更新大师推荐图片
      for (let index = 0; index < this.commonList.length; index++) {
        const element = this.commonList[index]
        if (n.linkerId === element.linkerId) {
          this.commonList.splice(index, 1)
        }
      }
      for (let i = 0; i < this.showMarketList.length; i++) {
        const element = this.showMarketList[i] //遍历未/普通推荐改大师
        if (n.linkerId === element.linkerId) {
          element.masterRecommand = '1'
        }
      }

      // this.$nextTick(() => {
      //   let arr = []
      // arr.push(n)
      // this.masterList = arr.concat(this.masterList)
      // this.masterList = this.masterList.concat(n)
      this.masterList.unshift(n)
      console.log(this.masterList, "master大师");
      this.swipeList = this.masterList.concat(this.commonList)
      console.log(this.swipeList, "swipe大师");

      // })
    },
    spliceMasterHandle (n) {
      //点击实时改为取消大师改为未推荐
      for (let index = 0; index < this.masterList.length; index++) {
        const element = this.masterList[index]
        if (n.linkerId === element.linkerId) {
          this.masterList.splice(index, 1)
          this.swipeList = this.masterList.concat(this.commonList)
        }
      }
      for (let index = 0; index < this.showMarketList.length; index++) {
        const element = this.showMarketList[index] //遍历大师改成未推荐
        if (n.linkerId === element.linkerId) {
          element.masterRecommand = '0'
        }
      }
    },
    //-----普通推荐操作
    pushCommonHandle (n) {
      //点击实时更新普通推荐图片
      for (let index = 0; index < this.masterList.length; index++) {
        const element = this.masterList[index]
        if (n.linkerId === element.linkerId) {
          this.masterList.splice(index, 1)
        }
      }
      for (let i = 0; i < this.showMarketList.length; i++) {
        const element = this.showMarketList[i] //遍历未/大师推荐改普通
        if (n.linkerId === element.linkerId) {
          element.masterRecommand = '2'
        }
      }

      // this.$nextTick(() => {
      //   let arr = []
      // arr.push(n)
      // this.commonList = arr.concat(this.commonList)
      // this.commonList = this.commonList.concat(n)
      this.commonList.unshift(n)
      console.log(this.commonList, "commonList普通");
      this.swipeList = this.masterList.concat(this.commonList)
      console.log(this.swipeList, "swipeList普通");
      // })
    },
    spliceCommonHandle (n) {
      //点击实时改为取消普通改为未推荐
      for (let index = 0; index < this.commonList.length; index++) {
        const element = this.commonList[index]
        if (n.linkerId == element.linkerId) {
          this.commonList.splice(index, 1)
          this.swipeList = this.masterList.concat(this.commonList)
        }
      }
      for (let index = 0; index < this.showMarketList.length; index++) {
        const element = this.showMarketList[index] //遍历普通改成未推荐
        if (n.linkerId === element.linkerId) {
          element.masterRecommand = '0'
        }
      }
    },
    //-----置顶操作
    recommandTrueHandle (n) {
      this.stickNum++
      for (let index = 0; index < this.showMarketList.length; index++) {
        const element = this.showMarketList[index] //遍历未置顶改成置顶
        if (n.linkerId === element.linkerId) {
          element.recommand = '10'
        }
      }
    },
    recommandFalseHandle (n) {
      this.stickNum--
      for (let index = 0; index < this.showMarketList.length; index++) {
        const element = this.showMarketList[index] //遍历置顶改成未置顶
        if (n.linkerId === element.linkerId) {
          element.recommand = '0'
        }
      }
    },
    async noRecommendHandle (n) {
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
      this.commonList = this.swipeList.filter(item => item.masterRecommand == '2')
      this.masterList = this.swipeList.filter(item => item.masterRecommand == '1')
    },
    // async changeMarketStatus(linkerId, operationType, status){//改变楼盘推荐状态
    //   await userService.changeMarketData(linkerId, operationType, status)
    // },
    async getRecommendInfo () {
      //推荐楼盘的数据
      const res = await userService.getRecommend()
      this.recommendList = res
      this.master()
      this.common()
      this.swipeList = this.masterList.concat(this.commonList)
    },
    master () {
      this.masterList = this.recommendList.filter(item => {
        return item.masterRecommand == '1'
      })
    },
    common () {
      this.commonList = this.recommendList.filter(item => {
        return item.masterRecommand == '2'
      })
    },
    async showGetMyMarketInfo () {
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
      // 数据重复加载
      if (page == 1) {
        this.showMarketList = resShow.records
      } else {
        this.showMarketList = this.showMarketList.concat(resShow.records)
      }
      this.stickNumHandle() //请求的初始置顶个数
      let arr = []
      let json = {}
      for (let index = 0; index < this.showMarketList.length; index++) {
        const element = this.showMarketList[index]
        if (!json[element.linkerId]) {
          arr.push(element)
          json[element] = 1
        }
      }
      this.showMarketList = arr
      if (this.showMarketList.length == 0) {
        this.yes = true
      } else {
        this.yes = false
      }
      if (resShow.pages === 0 || this.showPage === resShow.pages) {
        this.showFinished = true
      }
      this.showPage++
      this.showLoading = false
    },
    async notShowGetMyMarketInfo () {
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
      let arr = []
      let json = {}
      for (let index = 0; index < this.notShowMarketList.length; index++) {
        const element = this.notShowMarketList[index]
        if (!json[element.linkerId]) {
          arr.push(element)
          json[element] = 1
        }
      }
      this.notShowMarketList = arr

      if (this.notShowMarketList.length == 0) {
        this.no = true
      } else {
        this.no = false
      }
      if (resNotShow.pages === 0 || this.notShowPage === resNotShow.pages) {
        this.notShowFinished = true
      }
      this.notShowPage++
      this.notShowLoading = false
    },
    returnHandle () {
      //切换展示与否
      this.myMarketShow = !this.myMarketShow
      if (this.myMarketShow) {
        this.titleInfo.linkText = '切换关闭展示楼盘'
      } else {
        this.titleInfo.linkText = '切换开启展示楼盘'
      }
    },
    skipShareHandle () {
      this.$router.push('/marketDetail/share')
    },
    closeCut (n) {
      this.notShowMarketList.push(n)
      for (let index = 0; index < this.showMarketList.length; index++) {
        //关闭展示
        const element = this.showMarketList[index]
        if (n.linkerId == element.linkerId) {
          this.showMarketList.splice(index, 1)
          element.masterRecommand = 0 //变成未推荐
          element.recommand = 0 //变成未置顶
        }
      }
      for (let i = 0; i < this.swipeList.length; i++) {
        //关闭展示轮播图取消
        const element = this.swipeList[i]
        if (n.linkerId == element.linkerId) {
          this.swipeList.splice(i, 1)
        }
      }
      if (this.showMarketList.length == 0) {
        this.yes = true
      }
      if (this.notShowMarketList.length != 0) {
        this.no = false
        this.close = true
      }
    },
    openCut (n) {
      this.showMarketList.push(n)
      for (let index = 0; index < this.notShowMarketList.length; index++) {
        const element = this.notShowMarketList[index]
        if (n.linkerId == element.linkerId) {
          this.notShowMarketList.splice(index, 1)
        }
      }
      if (this.notShowMarketList.length == 0) {
        this.no = true
      }
    }
  }
}
</script>
<style lang="less">
.user-mymarket-page {
  height: auto !important;
  background: #ffffff;
  .screen {
    overflow: hidden;
    height: 580px;
  }
  .search-container {
    margin-left: 18px;
    width: 343px;
  }
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
    margin-top: 19px;
    .notMarket {
      margin: 56px 0 100px 144px;
      p:nth-child(1) {
        width: 88px;
        height: 88px;
      }
      p:nth-child(2) {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
        margin-left: -12px;
      }
    }
    .market-left {
      width: 100%;
    }
  }
  .title-bar {
    justify-content: space-between;
    margin: 24px 0 0 16px;
    width: 343px;
  }

  .user-mymarket-page-search {
    height: 44px;
  }
}
</style>
