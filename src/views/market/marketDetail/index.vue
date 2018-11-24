<template>
  <div class="marketDetail-page">
    <classify></classify>
    <swipe-box></swipe-box>
    <div class="marketDetail-page-bottom">
    <div class="marketDetail-box">
      <div class="marketDetail-box-top">
      <div class="left">
<<<<<<< HEAD
        <tag-group :condition="info"></tag-group>
=======
>>>>>>> e832288d5e85ae65ab3ec9ff0dfefe07973f0e90
      </div>
      <div class="house-owner">
        <div class="browse" @click="supplement">12345</div>人浏览过
        <div class="head-portrait">
        </div>
      </div>
      </div>
      <specific-marketDetail></specific-marketDetail>
    </div>
    <button-box :buttonInfo="buttonInfo"></button-box>
    <!-- <div class="button-box-tow">
      <div class="button-box-tow-left">
        <div class="button-box-tow-left-icon" :style="{'background':'url('+buttonBoxTowLeftIconIMG+') no-repeat','background-size':'contain'}"></div>
        <div class="button-box-tow-left-text" >开盘通知</div>
      </div>
      <div class="button-box-tow-right">
        <div class="button-box-tow-right-icon" :style="{'background':'url('+buttonBoxTowRightIconIMG+') no-repeat','background-size':'contain'}"></div>
        <div class="button-box-tow-right-text">降价通知</div>
      </div>
    </div> -->
    <title-bar :conf="confA"></title-bar>
    <all-marketType></all-marketType>
    <title-bar :conf="confB"></title-bar>
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
    <title-bar :conf="confC"></title-bar>
    <site-nearby></site-nearby>
    <title-bar :conf="confD"></title-bar>
    <all-elseMarket></all-elseMarket>
    <div class="m-statement">
      <span>免责声明：楼盘信息来源于政府公示网站、开发商、第三方公众平台，最终以政府部门登记备案为准，请谨慎核查。如楼盘信息有误或其他异议，请点击 </span>
      <router-link to="/market/marketDetail/correction" class="feedback">反馈纠错</router-link>
      <!-- <router-link :to="{ path: './infoErrorCorrection', query: { linkerId:linkerId,agentId:agentId,linkerName:encodeURI(linkerName)}}"> -->
    </div>
    </div>
    <open-marketButton></open-marketButton>
    <!-- v-if="openFlag" -->
    <market-renew v-if="renewFlag"></market-renew>
    <van-popup v-model="show">
      <popup-box></popup-box>
    </van-popup>
  </div>
  
</template>
<script>
import * as types from '@/store/mutation-types'
import ButtonBox from 'COMP/ButtonBox/'
import Classify from 'COMP/Classify/'
import SpecificMarketDetail from 'COMP/Market/MarketDetail/SpecificMarketDetail'
import AllMarketType from 'COMP/Market/MarketDetail/AllMarketType'
import SiteNearby from 'COMP/Market/MarketDetail/SiteNearby'
import AllElseMarket from 'COMP/Market/MarketDetail/AllElseMarket'
import OpenMarketButton from 'COMP/Market/MarketDetail/OpenMarketButton'
import MarketRenew from 'COMP/Market/MarketDetail/MarketRenew'
import PopupBox from 'COMP/Market/MarketDetail/PopupBox'
import SwipeBox from 'COMP/Market/MarketDetail/SwipeBox'
import TagGroup from 'COMP/TagGroup/'
import TitleBar from 'COMP/TitleBar/'
export default {
  components: {
<<<<<<< HEAD
    Classify,
    Condition,
=======
    Sort,
>>>>>>> e832288d5e85ae65ab3ec9ff0dfefe07973f0e90
    ButtonBox,
    SpecificMarketDetail,
    AllMarketType,
    SiteNearby,
    AllElseMarket,
    OpenMarketButton,
    MarketRenew,
    PopupBox,
    TagGroup,
    TitleBar,
    SwipeBox
  },
  created() {
    // this.$store.commit(types.TABBAR, false)
    // console.log(this.$route.params.userId)
  },
  mounted() {
    //给window添加一个滚动滚动监听事件
    console.log(111111111111111111)
    window.addEventListener('scroll', this.handleScroll)
  },
  data: _ => ({
    show: false,
    boxShow:false,
    openFlag: true,
    renewFlag: true,
    list: [1, 2, 3, 4],
    confA:{
      title:"户型",
      linkText:"全部户型",
      link:"/marketDetail/FamilyList"
    },
    confB:{
      title:"楼盘动态 (12)",
      linkText:"全部动态",
      link:"/marketDetail/marketAllDynamic"
    },
    confC:{
      title:"位置周边",
      linkText:"全部周边",
      link:"/marketDetail/marketDetail/allNear"
    },
    confD:{
      title:"其他楼盘",
      linkText:"全部楼盘",
      link:"/market"
    },
    info: ['热销中','住宅'],
    buttonInfo: {
      text: '按钮文字',
      borderRadius: '4px',
      width: '335px',
      height: '44px',
      backColor: 'rgba(0,122,230,0.05)',
      lineHeight: '44px'
    },
    buttonBoxTowLeftIconIMG: require('IMG/marketDetail/icon@2x.png'),
    buttonBoxTowRightIconIMG: require('IMG/marketDetail/icon1@2x.png'),
    siteNearbyBoxHintBoxIconIMG: require('IMG/marketDetail/Shape@2x.png')
  }),
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      console.log(scrollTop)
      if (scrollTop >= 200) {
        this.boxShow = true
      } else {
        this.boxShow = false
      }
    },
    supplement(){
      this.show=true
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="less">
.marketDetail-page {
  .van-popup{
    border-radius: 12px;
  }
  .marketDetail-page-bottom {
    padding: 20px 0 0 20px;
    .marketDetail-box {
      margin-bottom: 11px;
      .marketDetail-box-top {
        display: flex;
        justify-content: space-between;
        .house-owner {
          font-size: 13px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          display: flex;
          margin-right: 16px;
          .browse {
            color: rgba(0, 122, 230, 1);
          }
          .head-portrait {
            width: 24px;
            height: 24px;
            border: 1px solid;
            border-radius: 50%;
            margin-left: 5px;
          }
        }
      }
    }
    .button-box-tow {
      margin-top: 12px;
      width: 335px;
      display: flex;
      justify-content: space-between;
      .button-box-tow-left,
      .button-box-tow-right {
        display: flex;
        width: 162px;
        height: 44px;
        background: rgba(0, 122, 230, 0.05);
        border-radius: 4px;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 400;
        color: rgba(68, 81, 102, 1);
      }
      .button-box-tow-left .button-box-tow-left-icon {
        width: 20px;
        height: 20px;
        margin-right: 6px;
        background-size: 100%;
      }
      .button-box-tow-right .button-box-tow-right-icon {
        width: 20px;
        height: 20px;
        margin-right: 6px;
        background-size: 100%;
      }
    }

    .market-state-box {
      margin-top: 11px;
      .market-state-box-top {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 291px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 6px;
      }
      .market-state-box-middle {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        width: 323px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 10px;
      }
      .market-state-box-bottom {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  .m-statement {
    margin-top: 15px;
  color: rgba(153, 153, 153, 1);;
  font-size:12px;
  // line-height: 0.34rem;
    .feedback {
      color: #017fff;
    }
  }
}
</style>
