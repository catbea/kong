<template>
  <div class="marketDetail-page">
    <hint-tire v-if="hintShow" @hintClose="hintHandle"></hint-tire>
    <!-- <van-tabs v-model="tabIndex" color="#007AE6" :line-width="15" sticky>
      <van-tab v-for="(item,index) in tabList" :key="index" :title="item">
        
      </van-tab>
    </van-tabs>-->
    <swipe-box :bannerList="bannerList" :collectionStatus="linkerInfo.collectionStatus" :ifPanorama="linkerInfo.ifPanorama"></swipe-box>
    <div class="marketDetail-page-bottom">
      <div class="marketDetail-box">
        <div class="marketDetail-box-top">
          <div class="left">
            <tag-group :arr="info"></tag-group>
          </div>
          <div class="house-owner">
            <div class="browse" @click="supplement">{{linkerInfo.browsCount?linkerInfo.browsCount:0}}</div>人浏览过
            <div
              class="head-portrait bg_img"
              :style="{backgroundImage:'url(http://imgs.julive.com/l?p=eyJpbWdfcGF0aCI6IlwvVXBsb2FkXC9zcGlkZXJfcHJvamVjdF9pbWdcLzJcLzMwMTY1MTg5XC80M2NkYzMyZTc5NjVhMWExMWY2NDk2YTk1N2UxOWI0My5qcGciLCJpbWdfcGFyYW1fYXJyIjpbXSwieC1vc3MtcHJvY2VzcyI6IlwvcmVzaXplLHdfMjYwLGhfMTgwLG1fZmlsbCJ9_x1.25)'}"
            ></div>
          </div>
        </div>
        <specific-marketDetail :info="linkerInfo"></specific-marketDetail>
      </div>
      <div class="button-box" @click="moreInfoHandle">更多信息</div>
      <title-bar :conf="confA" :isShow="!linkerInfo.houseList"></title-bar>
      <all-marketType :houseList="linkerInfo.houseList"></all-marketType>
      <title-bar :conf="confB" :isShow="!linkerInfo.houseDynamicList"></title-bar>
      <ul class="market-state-box" v-if="!linkerInfo.houseDynamicList">
        <li class="market-state-box-top">{{linkerInfo.houseDynamicList?linkerInfo.houseDynamicList[0].title:''}}</li>
        <li
          class="market-state-box-middle"
        >{{linkerInfo.houseDynamicList?linkerInfo.houseDynamicList[0].content:''}}</li>
        <li class="market-state-box-bottom">{{linkerInfo.houseDynamicList?linkerInfo.houseDynamicList[0].dynamicTime:''}}</li>
      </ul>
      <title-bar :conf="confC"></title-bar>
      <site-nearby></site-nearby>
      <title-bar :conf="confD"></title-bar>
      <all-elseMarket :linkerOtherList="linkerInfo.linkerOtherList"></all-elseMarket>
      <div class="m-statement">
        <span>免责声明：楼盘信息来源于政府公示网站、开发商、第三方公众平台，最终以政府部门登记备案为准，请谨慎核查。如楼盘信息有误或其他异议，请点击</span>
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
// import Classify from 'COMP/Classify/'
import HintTire from 'COMP/Market/MarketDetail/HintTire/'
import SpecificMarketDetail from 'COMP/Market/MarketDetail/SpecificMarketDetail'
import AllMarketType from 'COMP/Market/MarketDetail/AllMarketType'
import SiteNearby from 'COMP/Market/MarketDetail/SiteNearby'
import AllElseMarket from 'COMP/Market/MarketDetail/AllElseMarket'
import OpenMarketButton from 'COMP/Market/MarketDetail/OpenMarketButton'
import MarketRenew from 'COMP/Market/MarketDetail/MarketRenew'
import PopupBox from 'COMP/Market/MarketDetail/PopupBox'
import SwipeBox from 'COMP/Market/MarketDetail/SwipeBox'
import TagGroup from 'COMP/TagGroup/'
import TitleBar from 'COMP/TitleBar/arrow.vue'

import MarketService from 'SERVICE/marketService'

export default {
  components: {
    HintTire,
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
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  created() {
    this.linkerId = this.$route.params.id
    this.getLinkerDetail(this.linkerId)
  },
  data: () => ({
    linkerId: '',
    linkerInfo: {},
    bannerList: [],
    hintShow: true,
    show: false,
    boxShow: false,
    openFlag: true,
    renewFlag: true,
    list: [1, 2, 3, 4],
    tabList: ['楼盘', '户型', '位置', '周边', '推荐'],
    tabIndex: 0,
    confA: {
      title: '户型',
      linkText: '全部户型',
      link: '/marketDetail/FamilyList'
    },
    confB: {
      title: '楼盘动态 (12)',
      linkText: '全部动态',
      link: '/marketDetail/marketAllDynamic'
    },
    confC: {
      title: '位置周边',
      linkText: '全部周边',
      link: '/marketDetail/marketDetail/allNear'
    },
    confD: {
      title: '其他楼盘',
      linkText: '全部楼盘',
      link: '/market'
    },
    info: ['热销中', '住宅'],
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
    hintHandle() {
      this.hintShow = false
    },
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
    supplement() {
      this.show = true
    },
    moreInfoHandle() {
      this.$router.push('/marketDetail/info')
    },
    /**
     * 楼盘详情信息
     */
    async getLinkerDetail(id) {
      const result = await MarketService.getLinkerDetail(id)
      this.linkerInfo = result
      this.bannerList = result.bannerList
      let houseUseList = result.houseUseList
      houseUseList.unshift(result.saleStatus)
      this.info = houseUseList
      
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    this.hintShow = false
  }
}
</script>
<style lang="less">
.marketDetail-page {
  overflow:auto;
  background: #ffffff;
  .van-tabs__wrap--scrollable .van-tab {
    flex: 1;
  }
  .van-popup {
    border-radius: 12px;
  }
  .title-bar{
    width:339px;
   > .link-text{
     align-items: center;
   }
  }
  .marketDetail-page-bottom {
    padding: 20px 0 0 0;
    margin-left:20px;
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
            border-radius: 50%;
            margin-left: 5px;
          }
        }
      }
    }
    .button-box {
      width: 335px;
      height: 44px;
      background: rgba(0, 122, 230, 0.05);
      border-radius: 4px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      line-height: 44px;
      color: rgba(68, 81, 102, 1);
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
    .all-market-type-box{
      margin-bottom:40px;
    }
    .site-nearby-box{
      margin-top:13px;
      margin-bottom:32px;
    }
    .market-state-box {
      margin-bottom:41px;
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
    color: rgba(153, 153, 153, 1);
    font-size: 12px;
    // line-height: 0.34rem;
    .feedback {
      color: #017fff;
    }
  }
}
</style>
