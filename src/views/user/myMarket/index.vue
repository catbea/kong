<template>
  <div class="user-mymarket-page">
    <div style="margin-left:16px">
      <master-market
        v-if="closeSwipe"
        :swipeList="swipeList"
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
        v-for="(item,index) in marketList"
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
        v-for="(item,index) in marketList"
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
    recommendList: null,
    swipeList:[],
    masterList:[],
    commonList:[],
    marketList:[],
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
      console.log(res, 78787878)
      this.recommendList = res
      this.master()
      this.common()
     this.swipeList = this.masterList.concat(this.commonList)
     console.log(this.swipeList,'大师和推荐')
    },
    master () {
      this.masterList = this.recommendList.filter((item) => {
        return item.masterRecommand == "1"
      })
      console.log(this.masterList,'大师')
    },
    common () {
      this.commonList = this.recommendList.filter((item) => {
        return item.masterRecommand == "2"
      })
      console.log(this.commonList,'普通')
    },
    async getMyMarketInfo () {//请求展示/不展示的楼盘数据
      const resShow = await userService.getMyMarket(0)
      this.marketList=resShow.records
      console.log(this.marketList,'展示')
      const resNotShow = await userService.getMyMarket(1)
      this.marketList=this.marketList.concat(resNotShow.records)
      console.log(resNotShow,'不展示')
      // const show = await userService.getMyMarket(this.agentId,0)
      // console.log(show.records, '展示')
      // this.myMarketShowList = show.records
      // const notShow = await userService.getMyMarket(this.agentId,1)
      // console.log(notShow.records, "不展示")
      // this.myMarketNotShowList = notShow.records
    },
    returnHandle () {//切换展示与否
      this.myMarketShow = !this.myMarketShow
      if(this.myMarketShow){
        this.titleInfo.linkText= "切换关闭展示楼盘"
      }else{
         this.titleInfo.linkText= "切换开启展示楼盘"
      }
    },
    skipShareHandle () {
      this.$router.push('/marketDetail/share')
    },
    closeCut(n){
      // this.myMarketList[n].displayFlag='1'
    //  console.log(this.myMarketList[n])
    },
    returnMasterHandle(n){
      this.masterList.push(this.myMarketList[n])
    },
    returncommonHandle(n){
      this.commonList.push(this.myMarketList[n])
    },
    openCut(n){
      // this.myMarketList[n].displayFlag='0'
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
