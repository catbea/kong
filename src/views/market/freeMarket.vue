<template>
  <div class="user-mymarket-page" ref="viewBox">
    <div class="user-market-box">
      <!-- 免费楼盘 -->
      <div class="my-market">
        <div class="top-search isFixed" >
          <search v-model="showProjectName" @areaClick="areaClickHandler2" :conf="freeContent"></search>
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
          @load="getFreeMarketInfo"
          v-if="!yes"
          class="marginFlxed"
        >
          <market-describe v-for="(item,index) in freeMarketList" :showFree="false" :key="index" :itemInfo="item" :vipInfo="vipInfo" @skipDetail="skipDetail(item)"  :borderBottom="true"></market-describe>
        </van-list>
        <div v-show="yes" class="notMarket">
          <p class="bg_img" :style="{backgroundImage:'url('+unShowImg+')'}"></p>
          <p>暂无免费楼盘</p>
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
import marketService from 'SERVICE/marketService'
import MarketDescribe from 'COMP/MarketDescribe/'
export default {
  components: {
    MasterMarket,
    TitleBar,
    Search,
    Screen,
    UserMarket,
    CloseMarket,
    MarketDescribe
  },
  mounted() {
    // document.querySelector('.router-view').addEventListener(
    //   'scroll',
    //   () => {
    //     let r = (document.querySelector('.router-view') && document.querySelector('.router-view').scrollTop) || 0
    //     let u = (document.querySelector('.user-market-box') && document.querySelector('.user-market-box').offsetTop) || 0
    //     if (r > u) {
    //       this.searchBar = true
    //     } else {
    //       this.searchBar = false
    //     }
    //   },
    //   false
    // )
  },
  data: () => ({
    searchBar: true, //是否吸顶
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
    pageSize: 10,
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
    searchContent: {
      siteText: '深圳市',
      placeholder: '请输入楼盘名称'
    },
    freeContent: {
      siteText: '全国',
      placeholder: '请输入楼盘名称'
    },
    titleInfo: {
      title: '我的楼盘',
      linkText: '已关闭盘',
      link: ''
    },
    dataArr: [],
    sortShow: false,
    vipInfo: {},
    active: 1,
    freeMarketList: []
  }),
  async created() {
    if (window.sessionStorage.getItem('myMarketTab-active')) {
      this.yes = false
      this.active = +window.sessionStorage.getItem('myMarketTab-active')
      window.sessionStorage.removeItem('myMarketTab-active')
    }
    if(window.sessionStorage.getItem('myMarketTab')) {
      this.active = +window.sessionStorage.getItem('myMarketTab');
      this.selectedCity = this.userArea.myMarketFreeCity || ''
      this.freeContent.siteText = this.selectedCity || '全国'
      window.sessionStorage.removeItem('myMarketTab')
    } else {
      let data = window.localStorage.getItem('myMarketCity') ? JSON.parse(window.localStorage.getItem('myMarketCity')) : ''
      this.selectedCity = (data && data.city) || this.userArea.myMarketSelectedCity || ''
      this.searchContent.siteText = this.selectedCity || '全国'
    }
    if (window.localStorage.getItem('myMarketFreeCity')) {
      let data = JSON.parse(window.localStorage.getItem('myMarketFreeCity'))
      this.selectedCity = (data && data.city) || this.userArea.myMarketFreeCity || ''
      this.freeContent.siteText = this.selectedCity || '全国'
    }
    // await this.showGetMyMarketInfo()//请求展示楼盘
    // await this.notShowGetMyMarketInfo()//请求不展示楼盘
    await this.getRecommendInfo() //请求轮播图数据
    await this.marketShowHandle() //展示/不展示都没数据时
    this.getShowProjectCount()
    this.getUnShowProjectCount()
    this.notShowGetMyMarketInfo()
    this.getVipInfo()
  },
  computed: {
    ...mapGetters(['userArea', 'userInfo'])
  },
  watch: {
    showProjectName(val) {
      clearTimeout(this.setShowName)
      this.setShowName = setTimeout(() => {
        this.showPage = 1
        this.showProjectName = val
        // this.showProjectFilters = {}
        this.showFinished = false
        this.freeMarketList = []
        if (this.active === 1) {
          this.showGetMyMarketInfo() //根据搜索字请求展示的楼盘数据
        } else {
          this.getFreeMarketInfo()
        }
        clearTimeout(this.setShowName)
      }, 500)
    },
    showProjectFilters: {
      handler(val) {
        this.showPage = 1
        this.freeMarketList = []
        this.showFinished = false
        if (this.active === 1) {
          this.showGetMyMarketInfo() //根据搜索字请求展示的楼盘数据
        } else {
          this.getFreeMarketInfo()
        }
      },
      deep: true
    },
    notShowProjectName(val) {
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
      handler(val) {
        this.notShowPage = 1
        this.notShowMarketList = []
        this.notShowFinished = false
        // this.notShowGetMyMarketInfo()
      },
      deep: true
    }
  },
  methods: {
    // tab切换
    changeTab (val) {
      this.showFinished = false
      this.showLoading = false
      this.showPage = 1
      this.yes = false
      if (val === 2) {
        this.selectedCity = this.userArea.myMarketFreeCity || ''
        this.freeContent.siteText = this.selectedCity || '全国'
        if (window.localStorage.getItem('myMarketFreeCity')) {
          let data = JSON.parse(window.localStorage.getItem('myMarketFreeCity'))
          this.selectedCity = (data && data.city) || this.userArea.myMarketFreeCity || ''
          this.freeContent.siteText = this.selectedCity || '全国'
        }
      }
      if (val === 1) {
        this.showGetMyMarketInfo()
      }
      this.active = val
    },
    // 楼盘详情
    skipDetail(item) {
      this.$router.push({ name: 'market-detail', params: { id: item.linkerId} })
    },
    // 开通vip
    goVip () {
      this.$router.push('/user/myMember')
    },
    // 获取VIP详情
    async getVipInfo() {
      let res = await marketService.vipInfo()
      this.vipInfo = res
    },
    handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    },
    screenHandle(index) {
      this.$nextTick(() => {
        if (document.querySelector('.area-filter') || document.querySelector('.price-filter') || document.querySelector('.popularity-filter') || document.querySelector('.more-page')) {
          this.flag = true
        } else {
          this.flag = false
        }
      })
      document.querySelector('.router-view').scrollTop = document.querySelector('.user-market-box').offsetTop - 4
    },
    sortHandle(n) {
      //筛选中排序滚动条操作
      this.$nextTick(() => {
        if (document.querySelector('.sortWay-page')) {
          this.flag = n
        } else {
          this.flag = n
        }
      })
    },
    stickNumHandle() {
      //判断有没有超过3个置顶
      for (let i = 0; i < this.freeMarketList.length; i++) {
        const element = this.freeMarketList[i]
        if (element.recommand == 10) {
          this.stickNum++
        }
      }
      this.stickNumHandle = function() {}
    },
    async getShowProjectCount() {
      const res = await userService.queryMyLinkerCount(0)
      this.showMarketListCount = res.count
    },
    async getUnShowProjectCount() {
      const res = await userService.queryMyLinkerCount(1)
      this.notShowMarketListCount = res.count
    },
    showOnLoad() {
      //展示数据初始化
      this.showGetMyMarketInfo()
    },
    notShowOnLoad() {
      //不展示数据初始化
      this.notShowGetMyMarketInfo()
    },
    // 搜索区域点击处理
    areaClickHandler() {
      this.$router.push({ name: 'city-list', query: { fromPage: 'myMarket', searchContent: this.searchContent.siteText, category: 1 } })
    },
    // 免费楼盘搜索区域
    areaClickHandler2() {
      window.sessionStorage.setItem('myMarketTab',2)
      this.$router.push({ name: 'city-list', query: { fromPage: 'myMarket', searchContent: this.searchContent.siteText, category: 0 } })
    },
    operationSearch() {
      //根据展示/不展示楼盘数量来显示搜索
      if (this.searchShowNum > 20) {
        this.searchShow = true
      } else {
        this.searchShow = false
      }
    },
    marketShowHandle() {
      //展示/不展示都没数据时
      if (this.freeMarketList.length == 0 && this.notShowMarketList.length == 0) {
        this.marketShow = false
      } else {
        this.marketShow = true
      }
    },
    //-----大师推荐操作
    pushMasterHandle(n) {
      //点击实时更新大师推荐图片
      for (let index = 0; index < this.commonList.length; index++) {
        const element = this.commonList[index]
        if (n.linkerId === element.linkerId) {
          this.commonList.splice(index, 1)
        }
      }
      for (let i = 0; i < this.freeMarketList.length; i++) {
        const element = this.freeMarketList[i] //遍历未/普通推荐改大师
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
      console.log(this.masterList, 'master大师')
      this.swipeList = this.masterList.concat(this.commonList)
      console.log(this.swipeList, 'swipe大师')

      // })
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
      for (let index = 0; index < this.freeMarketList.length; index++) {
        const element = this.freeMarketList[index] //遍历大师改成未推荐
        if (n.linkerId === element.linkerId) {
          element.masterRecommand = '0'
        }
      }
    },
    //-----普通推荐操作
    pushCommonHandle(n) {
      //点击实时更新普通推荐图片
      for (let index = 0; index < this.masterList.length; index++) {
        const element = this.masterList[index]
        if (n.linkerId === element.linkerId) {
          this.masterList.splice(index, 1)
        }
      }
      for (let i = 0; i < this.freeMarketList.length; i++) {
        const element = this.freeMarketList[i] //遍历未/大师推荐改普通
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
      console.log(this.commonList, 'commonList普通')
      this.swipeList = this.masterList.concat(this.commonList)
      console.log(this.swipeList, 'swipeList普通')
      // })
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
      for (let index = 0; index < this.freeMarketList.length; index++) {
        const element = this.freeMarketList[index] //遍历普通改成未推荐
        if (n.linkerId === element.linkerId) {
          element.masterRecommand = '0'
        }
      }
    },
    //-----置顶操作
    recommandTrueHandle(n) {
      this.stickNum++
      for (let index = 0; index < this.freeMarketList.length; index++) {
        const element = this.freeMarketList[index] //遍历未置顶改成置顶
        if (n.linkerId === element.linkerId) {
          element.recommand = '10'
        }
      }
    },
    recommandFalseHandle(n) {
      this.stickNum--
      for (let index = 0; index < this.freeMarketList.length; index++) {
        const element = this.freeMarketList[index] //遍历置顶改成未置顶
        if (n.linkerId === element.linkerId) {
          element.recommand = '0'
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
      for (let index = 0; index < this.freeMarketList.length; index++) {
        const element = this.freeMarketList[index]
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
    // 获取免费楼盘
    getFreeMarketInfo() {
      let name = this.showProjectName
      let filters = this.showProjectFilters
      let page = this.showPage
      //请求展示的楼盘数据
      let mergeFilters = filters.baseFilters ? Object.assign(filters.baseFilters, filters.moreFilters) : {}
      let obj = screenFilterHelper(name, mergeFilters)
      obj.current = page
      obj.size = this.pageSize
      let data = window.localStorage.getItem('myMarketFreeCity') ? JSON.parse(window.localStorage.getItem('myMarketFreeCity')) : ''
      if (data) {
        if (data.type === 1) {
          obj['province'] = data.city
        } else {
          obj['city'] = data.city
        }
      } else {
        obj.city = this.selectedCity
      }
      userService.getFreeLinkerList(obj).then(res => {
        res.records = res.records.map(el => {
          return Object.assign(el, {isFree: '1'})
        })
        if (page == 1) {
          this.freeMarketList = res.records
        } else {
          this.freeMarketList = this.freeMarketList.concat(res.records)
        }
        this.yes = (res.records.length == 0)
        if (res.pages === 0 || this.showPage >= res.pages) {
          this.showFinished = true
        }
        this.showPage++
        this.showLoading = false
      }).catch(() => {
        // this.yes = true
        this.showLoading = false
        this.showFinished = true
      })
    },
    async showGetMyMarketInfo() {
      //请求展示的楼盘列表数据
      let name = this.showProjectName
      let filters = this.showProjectFilters
      let page = this.showPage
      //请求展示的楼盘数据
      let mergeFilters = filters.baseFilters ? Object.assign(filters.baseFilters, filters.moreFilters) : {}
      let obj = screenFilterHelper(name, mergeFilters)
      obj.current = page
      obj.size = this.pageSize
      obj.displayFlag = 0
      let data = window.localStorage.getItem('myMarketCity') ? JSON.parse(window.localStorage.getItem('myMarketCity')) : ''
      if (data) {
        if (data.type === 1) {
          obj['province'] = data.city
        } else {
          obj['city'] = data.city
        }
      } else {
        obj.city = this.selectedCity
      }
      const resShow = await userService.getFreeLinkerList(obj)
      console.log(resShow, '展示的楼盘数据')
      // 数据重复加载
      if (page == 1) {
        this.freeMarketList = resShow.records
      } else {
        this.freeMarketList = this.freeMarketList.concat(resShow.records)
      }
      this.stickNumHandle() //请求的初始置顶个数
      let arr = []
      let json = {}
      for (let index = 0; index < this.freeMarketList.length; index++) {
        const element = this.freeMarketList[index]
        if (!json[element.linkerId]) {
          arr.push(element)
          json[element] = 1
        }
      }
      this.freeMarketList = arr
      if (this.freeMarketList.length == 0) {
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
      for (let index = 0; index < this.freeMarketList.length; index++) {
        //关闭展示
        const element = this.freeMarketList[index]
        if (n.linkerId == element.linkerId) {
          this.freeMarketList.splice(index, 1)
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
      if (this.freeMarketList.length == 0) {
        this.yes = true
      }
      if (this.notShowMarketList.length != 0) {
        this.no = false
        this.close = true
      }
    },
    openCut(n) {
      this.freeMarketList.push(n)
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
  },
  filters: {
    // 格式化时间
    formatDate (val) {
      let date = ''
      if (val) {
        let time = new Date(+val)
        let m = time.getMonth() + 1
        let d = time.getDate()
        let y = time.getFullYear()
        m = m < 10 ? '0' + m : m
        d = d < 10 ? '0' + d :d
        date = `${y}/${m}/${d}`
      }
      return date
    }
  },
  beforeDestroy() {
    window.sessionStorage.setItem('myMarketTab-active', this.active)
    try {
      document.querySelector('.router-view').removeEventListener('scroll')
    } catch (error) {}
  }
}
</script>
<style lang="less">
.user-mymarket-page {
  height: auto !important;
  background: #ffffff;
  .tabbar{
    font-size: 16px;
    height: 40px;
    width: 100%;
    display: flex;
    margin: 5px 0 10px ;
    .item{
      flex: 1;
      text-align: center;
      line-height: 40px;
      vertical-align: middle;
      position: relative;
      img{
        width: 17px;
        height: 19px;
        vertical-align: middle;
      }
      .line{
        width: 16px;
        height: 3px;
        background-color: #007AE6;
        position: absolute;
        bottom: 4px;
        left: 50%;
        margin-left: -8px;
      }
      .hot{
        position: absolute;
        width: 30px;
        height: 14px;
        line-height: 14px;
        text-align: center;
        background-color: #EA4D2E;
        color: #fff;
        border-radius: 8px;
        font-size: 10px;
        margin-left: -6px;
      }
    }
  }
  .screen {
    overflow: hidden;
    // height: 580px;
  }
  .search-container {
    width: auto;
    margin: 0 16px;
    // width: 343px;
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
    .notMarket {
      width: 100%;
      margin: 56px 0 100px 0;
      text-align: center;
      p:nth-child(1) {
        width: 88px;
        height: 88px;
        margin: auto;
      }
      p:nth-child(2) {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
      }
    }
    .market-left,.market-right,.my-market {
      width: 100%;
    }
    .top-search{
      padding-top: 16px;
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
.isFixed {
  position: fixed;
  width: 100%;
  background-color: #fff;
  top: 0;
  z-index: 999;
  padding-top: 16px;
}
.marginFlxed {
  margin-top: 78px;
}
</style>
