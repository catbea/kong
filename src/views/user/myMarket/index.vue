<template>
  <div class="user-mymarket-page">
    <div style="margin-left:16px">
      <master-market :swipeList="swipeList"  @noRecommend="noRecommendHandle"></master-market>
    </div>
    <div style="margin-left:16px">
      <title-bar :conf="titleInfo" @return="returnHandle"></title-bar>
    </div>
    <div class="user-market-box">
      <div class="market-left" v-show="myMarketShow">
        <div style="margin-left:16px">
          <search :conf="searchInfo" v-model="showProjectName" @areaClick="areaClickHandler"></search>
          <screen v-model="showProjectFilters"></screen>
        </div>
        <user-market v-if="marketShow" @usmarIconReturn="skipShareHandle" v-for="(item,index) in showMarketList" :key="index" :marketIndex="index" :dataArr="item" @pushMaster="pushMasterHandle" @spliceMaster="spliceMasterHandle" @pushCommon="pushCommonHandle" @spliceCommon="spliceCommonHandle" @closeCut="closeCut" @returnMasterHandle="returnMasterHandle" @returncommonHandle="returncommonHandle"></user-market>
      </div>
      <p v-if="!marketShow" class="notMarket">暂未开通任何楼盘</p>
      <div class="market-right" v-show="!myMarketShow">
        <div style="margin-left:16px">
          <search :conf="searchInfo" v-model="notShowProjectName" @areaClick="areaClickHandler"></search>
          <screen v-model="notShowProjectFilters"></screen>
        </div>
        <close-market v-if="marketShow" v-for="(item,index) in notShowMarketList" :key="index" :dataArr="item" :marketIndex="index" @openCut="openCut" @returnMasterHandle="returnMasterHandle" @returncommonHandle="returncommonHandle"></close-market>
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
    showProjectName: '',
    showProjectFilters: {},
    notShowProjectName: '',
    notShowProjectFilters: {},
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
    showMarketList: [],
    notShowMarketList: [],
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
    dataArr: [
      { title: '龙光·久钻', site: '深圳 南山 120000元/㎡', condition: ['热销中', '地铁房', '低密度'], open: '125次开通 11/22到期', flag: true, price: '1%+5万元/套' },
      { title: '龙光·久钻', site: '深圳 南山 120000元/㎡', condition: ['热销中', '地铁房', '低密度'], open: '125次开通 11/22到期', flag: true, price: '1%+5万元/套' },
      { title: '龙光·久钻', site: '深圳 南山 120000元/㎡', condition: ['热销中', '地铁房', '低密度'], open: '125次开通 11/22到期', flag: true, price: '1%+5万元/套' },
      { title: '龙光·久钻', site: '深圳 南山 120000元/㎡', condition: ['热销中', '地铁房', '低密度'], open: '125次开通 11/22到期', flag: true, price: '1%+5万元/套' }
    ]
  }),
 async created() {
   await this.showGetMyMarketInfo()//请求展示楼盘
   await this.notShowGetMyMarketInfo()//请求不展示楼盘
   await this.getRecommendInfo()//请求轮播图数据
    this.searchInfo.siteText = this.userArea.city
   await this.marketShowHandle()//展示/不展示都没数据时
  },
  computed: {
    ...mapGetters(['userArea'])
  },
  watch: {
    showProjectName(val) {
      clearTimeout(setShowName)
      const setShowName = setTimeout(() => {
        this.showGetMyMarketInfo()
        console.log(this.showProjectName, '输入的搜索条件')
        clearTimeout(setShowName)
      }, 500)
    },
    showProjectFilters: {
      handler(val) {
        this.page = 1
        this.showGetMyMarketInfo(this.projectName, val, this.page)
      },
      deep: true
    },
    notShowProjectName(val) {
      clearTimeout(setNotShowName)
      const setNotShowName = setTimeout(() => {
        this.notShowGetMyMarketInfo()
        console.log(this.notShowprojectName, '输入的搜索条件')
        clearTimeout(setNotShowName)
      }, 500)
    },
    notShowProjectFilters: {
      handler(val) {
        this.notShowGetMyMarketInfo(this.projectName, val, this.page)
      },
      deep: true
    }
  },
  methods: {
    // 搜索区域点击处理
    areaClickHandler() {
      this.$router.push({ name: 'area-select' })
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
      console.log(this.swipeList, '楼盘图片数据')
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
    async showGetMyMarketInfo(name = '', filters = {}, page = 1) {
      //请求展示的楼盘数据
      let obj = {}
      obj.displayFlag=0
      obj.projectName=name
      const resShow = await userService.getMyMarket(obj)
      this.showMarketList = resShow.records
      console.log(this.showMarketList,'展示的楼盘');
      
      this.searchShowNum = resShow.records.length
      
    },
    async notShowGetMyMarketInfo(name = '', filters = {}, page = 1) {
      //请求不展示的楼盘数据
      let obj = {}
      obj.displayFlag=1
      obj.projectName=name
      const resNotShow = await userService.getMyMarket(obj)
      this.searchNotShowNum = resNotShow.records.length
      this.notShowMarketList =resNotShow.records
      console.log(this.notShowMarketList,'不展示的楼盘');
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
      console.log(this.notShowMarketList,'不展示的楼盘');
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
