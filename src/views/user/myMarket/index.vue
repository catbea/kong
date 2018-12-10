<template>
  <div class="user-mymarket-page">
    <div style="margin-left:16px">
      <master-market
        v-if="closeSwipe"
        :marster="masterList"
        :common="commonList"
        @returnCloseHandle='returnCloseHandle'
      ></master-market>
    </div>
    <div style="margin-left:16px">
      <title-bar
        :conf="titleInfo"
        @return="returnHandle"
      ></title-bar>
    </div>
    <div style="margin-left:16px">
      <van-search :obj="searchInfo"></van-search>
    </div>
    <div style="margin-left:16px">
      <screen></screen>
    </div>
    <div class="user-market-box">
      <div class="market-left" v-if="myMarketShow">
      <user-market
        @usmarIconReturn="skipShareHandle"
        v-for="(item,index) in myMarketShowList"
        :key="index"
        :marketIndex="index"
        :dataArr="item"
        @closeCut="closeCut"
        @returnMasterHandle='returnMasterHandle'
        @returncommonHandle='returncommonHandle'
      >
      </user-market>
      </div>
      <div class="market-right" v-if="!myMarketShow">
      <close-market
        v-for="(item,index) in myMarketNotShowList"
        :key="index"
        :dataArr="item"
        :marketIndex="index"
        @openCut="openCut"
        @returnMasterHandle='returnMasterHandle'
        @returncommonHandle='returncommonHandle'
      ></close-market>
      </div>
    </div>
    
  </div>
</template>
<script>
import MasterMarket from 'COMP/User/MasterMarket/'
import TitleBar from 'COMP/TitleBar/arrow.vue'
import VanSearch from 'COMP/VanSearch/'
import Screen from 'COMP/Screen/'
import UserMarket from 'COMP/User/UserMarket/'
import CloseMarket from 'COMP/User/UserMarket/CloseMarket.vue'
import userService from 'SERVICE/userService'
export default {
  components: {
    MasterMarket,
    TitleBar,
    VanSearch,
    Screen,
    UserMarket,
    CloseMarket
  },
  data: () => ({
    closeSwipe: true,
    agentId:705,
    displayFlag: 0,
    recommendList: 987,
    masterList: [],
    commonList: [],
    myMarketShowList:[],
    myMarketNotShowList:[],
    myMarketShow: true,
    titleInfo: {
      title: "我的楼盘",
      linkText: "切换开启展示楼盘",
      link: ""
    },
    searchInfo: {
      siteText: "全国",
      placeholderText: "请输入楼盘"
    },
    dataArr: [
      { title: "龙光·久钻", site: "深圳 南山 120000元/㎡", condition: ["热销中", "地铁房", "低密度"], open: "125次开通 11/22到期", flag: true, price: "1%+5万元/套" },
      { title: "龙光·久钻", site: "深圳 南山 120000元/㎡", condition: ["热销中", "地铁房", "低密度"], open: "125次开通 11/22到期", flag: true, price: "1%+5万元/套" },
      { title: "龙光·久钻", site: "深圳 南山 120000元/㎡", condition: ["热销中", "地铁房", "低密度"], open: "125次开通 11/22到期", flag: true, price: "1%+5万元/套" },
      { title: "龙光·久钻", site: "深圳 南山 120000元/㎡", condition: ["热销中", "地铁房", "低密度"], open: "125次开通 11/22到期", flag: true, price: "1%+5万元/套" }
    ]
  }),
  created () {
    this.getMyMarketInfo()
    this.getRecommendInfo()
  },
  methods: {
    async getChangeMarketData(){
      const res = await userService.changeMarketData()
    },
    returnCloseHandle () {
      this.closeSwipe = !this.closeSwipe
    },
    async getRecommendInfo () {//推荐楼盘的数据
      const res = await userService.getRecommend()
      this.recommendList = res
      this.master()
      this.common()
    },
    master () {
      this.masterList = this.recommendList.filter((item) => {
        return item.masterRecommand === 1
      })
    },
    common () {
      this.commonList = this.commonList.filter((item) => {
        return item.masterRecommand === 2
      })
    },
    async getMyMarketInfo () {//请求展示/不展示的楼盘数据
      const show = await userService.getMyMarket(this.agentId,0)
      this.myMarketShowList = show.records
      const notShow = await userService.getMyMarket(this.agentId,1)
      this.myMarketNotShowList = notShow.records
    },
    returnHandle () {//切换展示与否
      this.myMarketShow = !this.myMarketShow
    },
    skipShareHandle () {
      this.$router.push('/marketDetail/share')
    },
    closeCut(n){
      this.myMarketList[n].displayFlag='1'
    },
    returnMasterHandle(n){
      this.masterList.push(this.myMarketList[n])
    },
    returncommonHandle(n){
      this.commonList.push(this.myMarketList[n])
    },
    openCut(n){
      this.myMarketList[n].displayFlag='0'
    }
  }
}
</script>
<style lang="less">
.user-mymarket-page {
  height: auto !important;
  background: #ffffff;
  .user-market-box{
    display: flex;
  }
  .title-bar,
  .van-search-page {
    width: 343px;
  }
  
  .user-mymarket-page-search {
    height: 44px;
  }
}
</style>
