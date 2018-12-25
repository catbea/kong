<template>
  <div class="marketDetail-page">
    <!-- 新手引导 -->
    <hint-tire></hint-tire>
    <swipe-box :linkerInfo="linkerInfo" :bannerList="bannerList" :collectionStatus="linkerInfo&&linkerInfo.collectionStatus" :ifPanorama="linkerInfo&&linkerInfo.ifPanorama" :linkerId="linkerInfo&&linkerInfo.linkerId" @shareBuilding="shareBuildingPage" :photoButton="photoButton"></swipe-box>
    <div class="marketDetail-page-bottom">
      <div class="marketDetail-box">
        <div class="marketDetail-box-top">
          <div class="left">
            <tag-group :arr="info"></tag-group>
          </div>
          <div class="house-owner">
            <div
              class="browse"
              @click="supplement"
            >{{linkerInfo&&linkerInfo.browsCount?linkerInfo.browsCount:0}}</div>人浏览过
            <div class="head-portrait-box">
            <transition name="show">
              <div class="bg_img head-portrait" v-for="(item,index) in customerList" :key="index" v-if="headCount == index" :style="{backgroundImage:'url('+item.clientImg+')'}">
                <!-- 头像滑动淡入淡出 -->
              </div>
            </transition>
            </div>
          </div>
        </div>
        <specific-marketDetail :info="linkerInfo&&linkerInfo"></specific-marketDetail>
      </div>
      <div class="button-box" @click="moreInfoHandle">更多信息</div>
      <title-bar :conf="confType" :isShow="linkerInfo&&linkerInfo.houseTypeList.length>0"></title-bar>
      <all-marketType :houseTypeList="linkerInfo&&linkerInfo.houseTypeList"></all-marketType>
      <title-bar :conf="confDynamic" :isShow="linkerInfo&&linkerInfo.houseDynamicList.length>0"></title-bar>
      <ul class="market-state-box" v-if="linkerInfo&&linkerInfo.houseDynamicList.length>0">
        <li class="market-state-box-top">{{linkerInfo.houseDynamicList?linkerInfo.houseDynamicList[0].title:''}}</li>
        <li class="market-state-box-middle">{{linkerInfo.houseDynamicList?linkerInfo.houseDynamicList[0].content:''}}</li>
        <li class="market-state-box-bottom">{{linkerInfo.houseDynamicList?linkerInfo.houseDynamicList[0].dynamicTime:''}}</li>
      </ul>
      <title-bar :conf="confLocation" :isShow="linkerInfo&&linkerInfo.aroundList.length>0"></title-bar>
      <site-nearby :aroundList="linkerInfo&&linkerInfo.aroundList"></site-nearby>
      <title-bar :conf="confElse" :isShow="linkerInfo&&linkerInfo.linkerOtherList.length>0"></title-bar>
      <all-elseMarket :linkerOtherList="linkerInfo&&linkerInfo.linkerOtherList" @itemClick="skipMarketDetail"></all-elseMarket>
      <div class="m-statement">
        <span>免责声明：楼盘信息来源于政府公示网站、开发商、第三方公众平台，最终以政府部门登记备案为准，请谨慎核查。如楼盘信息有误或其他异议，请点击</span>
        <router-link :to="'/marketDetail/correction/'+linkerId" class="feedback">反馈纠错</router-link>
        <!-- <router-link :to="{ path: './infoErrorCorrection', query: { linkerId:linkerId,agentId:agentId,linkerName:encodeURI(linkerName)}}"> -->
      </div>
    </div>
    <open-marketButton v-if="expireFlag==0" @click.native="marketOpenHandle"></open-marketButton>
    <!-- v-if="openFlag" -->

    <market-renew v-if="expireFlag==1" :renewInfo='linkerInfo'></market-renew>
    <van-popup v-model="show">
      <popup-box></popup-box>
    </van-popup>
  </div>
</template>
<script>
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
import Avatar from 'COMP/Avatar'
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
import { Dialog } from 'vant'
export default {
  components: {
    HintTire,
    Avatar,
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
    this.linkerId = this.$route.params.id
    this.getMarketDetailPhotoInfo()
    this.$store.commit(types.USER_BUILD_INFO, this.linkerId)
    this.getLinkerDetail(this.linkerId)
    this.skipMoreContent()
    this.getHouseAroundType(this.linkerId)
  },
  data: () => ({
    head: false,
    photoButton: true,
    linkerId: '',
    linkerInfo: null,
    bannerList: null,
    customerList: [],
    headCount: 0, //当前显示的头像的下标
    expireFlag: null, // 0过期 1已过期
    show: false,
    boxShow: false,
    openFlag: true,
    tabList: ['楼盘', '户型', '位置', '周边', '推荐'],
    tabIndex: 0,
    confType: {
      title: '户型',
      linkText: '全部户型',
      link: '/marketDetail/FamilyList'
    },
    confDynamic: {
      title: '楼盘动态 (?)',
      linkText: '全部动态',
      link: '/marketDetail/marketAllDynamic/'
    },
    confLocation: {
      title: '位置周边',
      linkText: '全部周边',
      link: '/marketDetail/marketDetail/allNear'
    },
    confElse: {
      title: '其他楼盘',
      linkText: '全部楼盘',
      link: '/market'
    },
    info: [],
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
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    headSlide() {
      console.log(this.customerList, '头像数据')
      setInterval(() => {
        if (this.headCount < this.customerList.length - 1) {
          this.headCount += 1
        } else {
          this.headCount = 0
        }
      }, 3000)
    },
    shareBuildingPage() {
      if (this.userInfo.name !== '' && this.userInfo.distributorName !== '' && this.userInfo.majorRegion !== '' && this.userInfo.institutionName !== '') {
        this.$router.push({ name: 'marketDetail-share' })
      } else {
        Dialog.confirm({
          title: '您有未完善的信息',
          message: '信息不完整会影响传播效率哦',
          confirmButtonText: '去完善',
          className: 'marketShareHint'
        })
          .then(() => {
            this.$router.push({ name: 'user-edit' })
          })
          .catch(() => {
            // on cancel
          })
      }
    },
    supplement() {
      this.show = true
    },
    moreInfoHandle() {
      this.$router.push({ name: 'marketDetail-info', query: { id: this.linkerInfo } })
    },
    skipMarketDetail(val) {
      this.linkerId = val
      this.$router.push({ name: 'marketDetail', params: { id: val } })
    },
    marketOpenHandle() {
      this.$router.push({ name: 'marketDetail-open', params: { id: this.linkerId } })
    },
    /**
     * 楼盘详情信息
     */
    async getLinkerDetail(id) {
      const result = await MarketService.getLinkerDetail(id)
      console.log(result, '楼盘详情数据')
      this.linkerInfo = result
      this.customerList = result.customerList
      this.headSlide()
      this.bannerList = result.bannerList
      let houseUseList = result.houseUseList
      houseUseList.unshift(result.saleStatus)
      this.info = houseUseList
      this.confDynamic.title = '楼盘动态 (' + this.linkerInfo.houseDynamicList.length + ')'
      this.expireFlag = result.expireFlag
      console.log(this.expireFlag, '是否已开通')
      //this.titleBarHandle()
    },
    //判断该楼盘有无图片列表
    async getMarketDetailPhotoInfo() {
      const res = await MarketService.getMarketDetailPhoto(this.linkerId)
      if (res.length > 0) {
        this.photoButton = true
      } else if (res.length <= 0) {
        this.photoButton = false
      }
    },
    //跳转更多内容
    skipMoreContent() {
      this.confType.link = '/marketDetail/FamilyList/' + this.linkerId
      this.confDynamic.link = '/marketDetail/marketAllDynamic/' + this.linkerId
      this.confLocation.link = '/public/map-Search?latitude=' + this.info.longitude + '&' + this.info.latitude
    },
    /**
     * 楼盘详情-位置周边
     */
    async getHouseAroundType(id) {
      const result = await MarketService.getHouseAroundType(id) //获取附近公交等公共场所数据的数组
    }
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      this.getLinkerDetail(this.linkerId)
    }
  },
  destroyed() {}
}
</script>
<style lang="less">
.marketDetail-page {
  overflow: auto;
  background: #ffffff;
  @keyframes show {
    0% {
      opacity: 0;
      top: 0px;
    }
    100% {
      opacity: 1;
      top: 0;
    }
  }
  @keyframes hide {
    0% {
      opacity: 1;
      top: 0;
    }
    100% {
      opacity: 0;
      top: -32px;
    }
  }
  .show-enter-active {
    animation: show 1.2s;
  }
  .show-leave-active {
    animation: hide 1.2s;
  }
  .show-enter,
  .show-leave-to {
    opacity: 0;
  }
  .van-tabs__wrap--scrollable .van-tab {
    flex: 1;
  }
  .van-popup {
    border-radius: 12px;
  }
  .title-bar {
    width: 339px;
    > .link-text {
      align-items: center;
    }
  }
  .marketDetail-page-bottom {
    padding: 20px 0 0 0;
    > div {
      margin-left: 20px;
    }
    .marketDetail-box {
      margin-bottom: 11px;
      .marketDetail-box-top {
        display: flex;
        justify-content: space-between;
        .house-owner {
          font-size: 13px;
          
          font-weight: 600;
          display: flex;
          margin-right: 16px;
          align-items: center;
          .head-portrait-box {
            position: relative;
            width: 24px;
            height: 24px;
            margin-left: 4px;
            .head-portrait {
              position: absolute;
              width: 24px;
              height: 24px;
              border-radius: 50%;
            }
          }
          .browse {
            color: rgba(0, 122, 230, 1);
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
    .all-market-type-box {
      margin-bottom: 40px;
    }
    .site-nearby-box {
      margin-top: 13px;
      margin-bottom: 32px;
    }
    .market-state-box {
      margin-bottom: 41px;
      margin-left: 16px;
      margin-right: 16px;
      .market-state-box-top {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 291px;
        font-size: 16px;
        
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
        
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 10px;
      }
      .market-state-box-bottom {
        font-size: 12px;
        
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
.marketShareHint {
  width: 280px;
  border-radius: 12px;
  text-align: center;
  .van-dialog__header {
    font-size: 18px;
    
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 25px;
  }
  .van-dialog__message {
    font-size: 15px;
    
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 21px;
  }
  .van-dialog__footer {
    border-top: 1px solid #e5e5e5;
  }
}
</style>
