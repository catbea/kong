<template>
  <div class="user-mymarket-page">
    <div style="margin-left:16px">
      <master-market
        :swipeList="swipeList"
        :boxShow='boxShow'
        @noRecommend='noRecommendHandle'
      ></master-market>
    </div>
    <div style="margin-left:16px">
      <title-bar
        :conf="titleInfo"
        @return="returnHandle"
      ></title-bar>
    </div>
    <div style="margin-left:16px" >
      <search :conf="searchInfo" v-model="value" @areaClick="areaClickHandler"></search>
      <screen></screen>
    </div>
    <div class="user-market-box">
      <div class="market-left" v-show="myMarketShow" v-if="marketShow">
      <user-market
        @usmarIconReturn="skipShareHandle"
        v-for="(item,index) in marketList"
        :key="index"
        :marketIndex="index"
        :dataArr="item"
        @pushMaster='pushMasterHandle'
        @spliceMaster="spliceMasterHandle"
        @pushCommon='pushCommonHandle'
        @spliceCommon='spliceCommonHandle'
        @closeCut="closeCut"
        @returnMasterHandle='returnMasterHandle'
        @returncommonHandle='returncommonHandle'
      >
      </user-market>
      </div>
      <p v-if="!marketShow" class="notMarket">暂未开通任何楼盘</p>
      <div class="market-right" v-show="!myMarketShow" v-if="marketShow">
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
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
import MasterMarket from 'COMP/User/MasterMarket/'
import TitleBar from 'COMP/TitleBar/arrow.vue'
import Search from 'COMP/Search/'
import Screen from 'COMP/Screen/'
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
    value:'',
    searchShow:null,
    searchNotShow:null,
    searchShowNum:0,
    searchNotShowNum:0,
    head:false,
    boxShow:false,
    marketShow:true,
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
    this.searchInfo.siteText = this.userArea.city
  },
   computed: {
    ...mapGetters(['userArea'])
  },
  methods: {
    // 搜索区域点击处理
    areaClickHandler() {
      this.$router.push({ name: 'area-select' })
    },
    operationSearch(){//根据展示/不展示楼盘数量来显示搜索
    if(this.searchShowNum>20){
      this.searchShow=true
    }else{
      this.searchShow=false
    }
    },
    pushMasterHandle(n){//点击实时更新大师推荐图片
    console.log(this.commonList,"此时的")
    for (let index = 0; index < this.commonList.length; index++) {
      const element =this.commonList[index];
      if(n.linkerId===element.linkerId){
       this.commonList.splice(index,1)
      }
    }
    n.masterRecommand='1'
   this.masterList=this.masterList.concat(n)
   this.swipeList = this.masterList.concat(this.commonList)
   console.log(this.commonList,"之后的")
    },
    spliceMasterHandle(n){//点击实时改为取消大师改为未推荐
    console.log(this.masterList,'现在的样子');
    for (let index = 0; index < this.masterList.length; index++) {
      const element = this.masterList[index];
      if(n.linkerId===element.linkerId){
       this.masterList.splice(index,1)
       this.swipeList = this.masterList.concat(this.commonList)
      }
    }
    },
    pushCommonHandle(n){//点击实时更新普通推荐图片
    for (let index = 0; index < this.masterList.length; index++) {
      const element =this.masterList[index];
      if(n.linkerId===element.linkerId){
       this.masterList.splice(index,1)
      }
    }
    n.masterRecommand='2'
   this.commonList=this.commonList.concat(n)
   this.swipeList = this.masterList.concat(this.commonList)
    },
    spliceCommonHandle(n){//点击实时改为取消普通改为未推荐
    for (let index = 0; index < this.commonList.length; index++) {
      const element = this.commonList[index];
      if(n.linkerId==element.linkerId){
       this.commonList.splice(index,1)
       this.swipeList = this.masterList.concat(this.commonList)
      }
    }
    },
    noRecommendHandle(n){//图片列表删除某个，楼盘列表重置推荐
    for (let index = 0; index < this.marketList.length; index++) {
      const element = this.marketList[index];
      if(n===element.linkerId){
        element.masterRecommand='0'
      }
    }
    },
    async getChangeMarketData(){
      const res = await userService.changeMarketData()
    },
    async getRecommendInfo () {//推荐楼盘的数据
    
      const res = await userService.getRecommend()
      this.recommendList = res
      this.master()
      this.common()
     this.swipeList = this.masterList.concat(this.commonList)
     console.log(this.swipeList,'楼盘图片数据')
     if(this.swipeList.length==0){
      this.boxShow=false
    }else{
      this.boxShow=true
    }
    },
    master () {
      this.masterList = this.recommendList.filter((item) => {
        return item.masterRecommand == "1"
      })
    },
    common () {
      this.commonList = this.recommendList.filter((item) => {
        return item.masterRecommand == "2"
      })
    },
    async getMyMarketInfo () {//请求展示/不展示的楼盘数据
      const resShow = await userService.getMyMarket(0)
      this.marketList=resShow.records
      this.searchShowNum=resShow.records.length
      const resNotShow = await userService.getMyMarket(1)
      this.searchNotShowNum=resNotShow.records.length
      this.marketList=this.marketList.concat(resNotShow.records)
      console.log(this.marketList,'展示/不展示的楼盘数据')
      if(this.marketList.length==0){
        this.marketShow=false
      }else{
        this.marketShow=true
      }
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity 2s
}
.fade-enter, .fade-leave-to{
    opacity: 0
}
  .trans{
    position: relative;
    display:flex;
    margin-left:100px;
    p{
      width:40px;
      height:40px;
      border-radius:50%;
      position:absolute;
    }
    p:nth-child(1){
      background: black;
    }
    p:nth-child(2){
      background: blue;
    }
  }
  .user-market-box{
    position: relative;
    display: flex;
  .notMarket{
    position:absolute;
    margin-left:-60px;
    margin-top:100px;
    color:#666666;
    top:50%;
    left:50%;
    font-size:15px;
  }
    .market-left{
      width:100%;
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
