<template>
  <div class="marketDetail-page">
    <Sort v-if="show"></Sort>
    <div class="market-img">
      <div class="collect-box">
        <div class="collect"></div> 收藏
      </div>
      <router-link tag="div" to="/marketDetail/share" class="share-box">
        <div class="share"></div> 分享
      </router-link>
    </div>
    <div class="marketDetail-page-bottom">
    <div class="marketDetail-box">
      <div class="marketDetail-box-top">
      <div class="left">
        <!-- <Condition :info="info"></Condition> -->
      </div>
      <div class="house-owner">
        <div class="browse">12345</div>人浏览过
        <div class="head-portrait">
        </div>
      </div>
      </div>
      <specific-marketDetail></specific-marketDetail>
    </div>
    <button-box :buttonInfo="buttonInfo"></button-box>
    <div class="button-box-tow">
      <div class="button-box-tow-left">
        <div class="button-box-tow-left-icon" :style="{'background':'url('+buttonBoxTowLeftIconIMG+') no-repeat'}"></div>
        <div class="button-box-tow-left-text" >开盘通知</div>
      </div>
      <div class="button-box-tow-right">
        <div class="button-box-tow-right-icon" :style="{'background':'url('+buttonBoxTowRightIconIMG+') no-repeat'}"></div>
        <div class="button-box-tow-right-text">降价通知</div>
      </div>
    </div>
    <all-marketType></all-marketType>
    <ul class="market-state-box">
      <li class="market-state-box-top">
        山水江南82平小户型已售罄山水江南82平小户型已售罄
      </li>
      <li class="market-state-box-middle">
        山水江南项目56-82平的小户型房源已售完，目前仅剩余2013-122平米3-4房在售3-122平目前仅剩余2013-122平米3-4房在售3-122平
      </li>
      <li class="market-state-box-bottom">
        2018年6月15日
      </li>
    </ul>
    <site-nearby></site-nearby>
    <all-elseMarket></all-elseMarket>
    </div>
    <open-marketButton></open-marketButton>
    <!-- v-if="openFlag" -->
    <market-renew v-if="renewFlag"></market-renew>
  </div>
  
</template>
<script>
import * as types from '@/store/mutation-types'
import Condition from 'COMP/Condition/'
import ButtonBox from 'COMP/ButtonBox/'
import Sort from 'COMP/Market/MarketDetail/Sort'
import SpecificMarketDetail from 'COMP/Market/MarketDetail/SpecificMarketDetail'
import AllMarketType from 'COMP/Market/MarketDetail/AllMarketType'
import SiteNearby from 'COMP/Market/MarketDetail/SiteNearby'
import AllElseMarket from 'COMP/Market/MarketDetail/AllElseMarket'
import OpenMarketButton from 'COMP/Market/MarketDetail/OpenMarketButton'
import MarketRenew from 'COMP/Market/MarketDetail/MarketRenew'
export default {
  components:{
    Sort,
    Condition,
    ButtonBox,
    SpecificMarketDetail,
    AllMarketType,
    SiteNearby,
    AllElseMarket,
    OpenMarketButton,
    MarketRenew
  },
  created() {
     this.$store.commit(types.TABBAR,false)
    this.getUserId()
    // console.log(this.$route.params.userId)
  },
    mounted () {//给window添加一个滚动滚动监听事件
    console.log(111111111111111111)
  window.addEventListener('scroll', this.handleScroll)
  },
  data: _ => ({
    show:false,
    openFlag:true,
    renewFlag:false,
    list:[1,2,3,4],
   info: [
      {text:'热销中',textColor:'rgba(255,255,255,1)', backColor:'rgba(0,122,230,1)'},
      {text:'住宅',textColor:'rgba(255,255,255,1)', backColor:'rgba(110,184,163,1)'}
    ],
    buttonInfo:{
      text:"按钮文字",borderRadius:"4px",width:"335px",height:"44px",backColor:'rgba(0,122,230,0.05)',lineHeight:"44px"
    },
    buttonBoxTowLeftIconIMG:require('IMG/marketDetail/icon.png'),
    buttonBoxTowRightIconIMG:require('IMG/marketDetail/icon1.png'),
    siteNearbyBoxHintBoxIconIMG:require('IMG/marketDetail/Shape.png'),
  }),
  methods:{
    getUserId(){
      if(this.$route.params.userId==1){
        this.renewFlag=true
        this.openFlag=false
      }else{
        this.renewFlag=false
        this.openFlag=true
      }
    },
    handleScroll(){
       let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
       console.log(scrollTop)
      if (scrollTop>=200) {
        this.show=true
      }else{
        this.show=false
      }
    }
  },
  destroyed () {
  window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="less">
.marketDetail-page{
  .market-img{
    width: 375px;
    height: 281px;
    border-bottom: 1px solid black;
    position: relative;
    margin-top: 45px;
    .collect-box{
      width: 24px;
      position: absolute;
      top: 20px;
      right: 69px;
      font-size:12px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:black;
      .collect{
        border: 1px solid black;
        width: 20px;
        height: 20px;
      }
    }
    .share-box{
      width: 24px;
      position: absolute;
      top: 20px;
      right: 29px;
      font-size:12px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:black;
      .share{
        border: 1px solid black;
        width: 20px;
        height: 20px;
      }
    }
  }
  .marketDetail-page-bottom{
    padding: 20px 0 0 20px;
  .marketDetail-box{
    margin-bottom: 11px;
    .marketDetail-box-top{
      display: flex;
    justify-content:space-between;
    .house-owner{
      font-size:13px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      display: flex;
      margin-right: 16px;
      .browse{
        color:rgba(0,122,230,1);
      }
      .head-portrait{
        width:24px;
        height:24px;
        border:1px solid;
        border-radius: 50%;
        margin-left: 5px;
      }
    }
    }
    
  }
  .button-box-tow{
    margin-top:12px;
    width: 335px;
    display: flex;
    justify-content: space-between;
    .button-box-tow-left,.button-box-tow-right{
      display: flex;
      width:162px;
      height:44px;
      background:rgba(0,122,230,0.05);
      border-radius:4px;
      align-items:center;
      justify-content: center;
      font-size:16px;
      font-weight:400;
      color:rgba(68,81,102,1);
    }
    .button-box-tow-left .button-box-tow-left-icon{
      width: 20px;
      height: 20px;
      margin-right: 6px;
    }
    .button-box-tow-right .button-box-tow-right-icon{
      width: 20px;
      height: 20px;
      margin-right: 6px;
    }
  }
  
  .market-state-box{
    margin-top: 11px;
    .market-state-box-top{
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      width:291px;
      font-size:16px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
      margin-bottom: 6px;
    }
    .market-state-box-middle{
      overflow:hidden; 
      text-overflow:ellipsis;
      display:-webkit-box; 
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2; 
      width:323px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(51,51,51,1);
      margin-bottom: 10px;
    }
    .market-state-box-bottom{
      font-size:12px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(153,153,153,1);
    }
  }

  
 }
 
}
</style>
