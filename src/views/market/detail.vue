<template>
  <div class="market-detail-page" v-if="info">
    <!-- 新手引导 -->
    <hint-tire></hint-tire>
    <!-- 顶部swipe -->
    <div class="top-swipe-container">
      <div class="swipe-content">
        <div class="swipe-photo" @click.stop="photoHandle" v-show="photoButton">相册</div>
        <van-swipe @change="swipeChange">
          <van-swipe-item v-for="(item,index) in info.bannerList" :key="index">
            <div class="bg_img swipe-item dev" :style="{backgroundImage:'url(' + item.imgUrl + ')'}"></div>
          </van-swipe-item>
          <div class="custom-indicator dev" slot="indicator">{{ swipeCurrent + 1 }}/{{info.bannerList.length}}</div>
        </van-swipe>
      </div>
      <div class="operate-content">
        <!-- 收藏/分享 -->
        <div class="operate-1">
          <div class="operate-collect" @click="collectHandler">
            <i v-if="status == 0" class="icon iconfont icon-article_collection"></i>
            <i v-else class="icon iconfont icon-Building_details_col" style="color:#2f7bdf;"></i>
            收藏
          </div>
          <div class="operate-share" @click="shareHandler" v-if="info.saleStatus!=='售罄'">
            <i class="icon iconfont icon-article_share"></i>
            分享
          </div>
        </div>
        <!-- 存在全景时全景播放 -->
      </div>
      <div class="bg_img operate-2" v-if="info.ifPanorama===1" :style="{backgroundImage:'url(' + playIcon + ')'}" @click.stop="ifPanoramaClickHandler"></div>
    </div>
    <!-- 楼盘基础信息 -->
    <div class="base-info-container">
      <div class="info-top-bar">
        <tag-group :arr="tagGroupArr&&tagGroupArr.slice(0,3)"/>
        <div class="browser-info">
          <span>{{info.browsCount}}</span>人浏览过
          <div class="head-portrait-box">
            <transition name="show">
              <avatar :avatar="item.clientImg" v-for="(item,index) in info.customerList" :key="index" v-if="index===headCurrent"/>
            </transition>
          </div>
        </div>
      </div>
      <div class="info-content">
        <h5 class="house-name">{{info.linkerName}}</h5>
        <p class="house-feature">{{ info.projectTagList === '' ? null : info.projectTagList.join("|")}}</p>
        <div class="specific-market-detail-commission" v-if="info&&info.divisionRules">
          <span class="bg_img" :style="{backgroundImage:'url('+commissionImg+')'}"></span>
          <span class="commission-text">{{info&&info.divisionRules}}</span>
          <div class="bg_img commission-detail" @click="commission" :style="{backgroundImage:'url('+siteDetailImg+')'}"></div>
        </div>
        <div class="house-info-form">
          <p>
            <span>平均价格:</span>
            {{info.averagePrice}}
          </p>
          <p>
            <span>开盘时间:</span>
            {{info.openTime}}
          </p>
          <p>
            <span>楼盘地址:</span>
            {{info.detailAddress}}
          </p>
          <p>
            <span>开发商:</span>
            {{info.developer}}
          </p>
        </div>
        <div class="more-info" @click="moreInfoHandler">更多信息</div>
      </div>
    </div>
    <!-- 楼盘分享关系图谱 -->
    <div class="marker-relation-box">
      <p>楼盘分享关系图谱</p>
      <ol class="bg_img relation-drawing" :style="{backgroundImage:'url('+drawingImg+')'}" @click="relationShow=true">
        <li class="bg_img" :style="{backgroundImage:'url('+info.headImgUrl+')'}"></li>
        <li>{{info.linkerName}}</li>
      </ol>
    </div>
    <van-popup v-model="relationShow">
      <div class="relationName">
        <p class="bg_img" :style="{backgroundImage:'url('+closeImg+')'}" @click="relationShow=false"></p>
        <p>查看楼盘分享关系详情 请联系400-0904-99</p>
        <p @click="relationHandle">立即联系</p>
      </div>
    </van-popup>
    <!-- 户型 -->
    <div class="house-type" v-if="info.houseTypeList&&info.houseTypeList.length>0">
      <title-bar :conf="typeTitleConf"/>
      <div class="type-swipe-content">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in info.houseTypeList" :key="index">
            <div class="house-type">
              <div class="bg_img house-type-img" :style="{backgroundImage:'url('+item.imgUrl+')'}" @click.stop="houseTypeHandle(item.imgUrl)"></div>
              <div class="house-type-info">
                <p class="house-type-name">{{item.householdDesc}}</p>
                <p class="house-type-area" v-if="item.orientations=='暂无信息'">{{`建面${item.area} 暂无朝向信息`}}</p>
                <p class="house-type-area" v-else>{{`建面${item.area}${item.orientations}朝向`}}</p>
                <p class="house-type-price" v-if="item.price=='价格待定'">{{item.price}}</p>
                <p class="house-type-price" v-else>约{{item.price}}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 动态 -->
    <div class="house-news" v-if="info.houseDynamicList&&info.houseDynamicList.length>0">
      <title-bar :conf="newsTitleConf"/>
      <div class="news-container">
        <p class="news-title">{{info.houseDynamicList[0].title}}</p>
        <p class="news-content">{{info.houseDynamicList[0].content | textOver(48)}}</p>
        <p class="news-time">{{info.houseDynamicList[0].dynamicTime}}</p>
      </div>
    </div>
    <!-- 位置周边 -->
    <div class="house-circum" v-if="info.houseAroundType&&info.houseAroundType.length>0">
      <title-bar :conf="aroundTitleConf"/>
      <div class="tab-box">
        <van-tabs v-model="mapTab" color="#007AE6" swipeable>
          <van-tab v-for="item in info.houseAroundType" :key="item.name" :title="item.name" :line-width="0"/>
        </van-tabs>
      </div>
      <div class="map-box">
        <t-map :latLng="{lat:info.latitude,lng:info.longitude}" :data="mapData" :conf="mapConf"></t-map>
      </div>
    </div>
    <!-- 其他楼盘 -->
    <div class="house-recommend" v-if="info.linkerOtherList.length>0">
      <title-bar :conf="othersTitleConf"/>
      <div class="recommend-swipe-content">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in info.linkerOtherList" :key="index" @click.native="itemClickHandler(item.linkerId)">
            <div class="recommend-house-item">
              <div class="bg_img recommend-house-img" :style="{backgroundImage:'url('+item.headImgUrl+')'}">
                <p class="bg_img panorama-icon" v-if="item.ifPanorama==1" :style="{backgroundImage:'url('+panoramaIcon+')'}"></p>
              </div>
              <div class="recommend-house-info">
                <p class="house-name">{{item.linkerName}}</p>
                <p class="house-location">{{item.district}}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="m-statement">
        <span>免责声明：楼盘信息来源于政府公示网站、开发商、第三方公众平台，最终以政府部门登记备案为准，请谨慎核查。如楼盘信息有误或其他异议，请点击</span>
        <router-link :to="'/marketDetail/correction/'+id" class="feedback">反馈纠错</router-link>
      </div>
    <!-- 开通提示及开通状态 -->
    <div class="van-hairline--top house-status">
      <div class="unopen-status-box" v-if="openStatus&&info.saleStatus!=='售罄'">
        <div class="open-btn" @click="openHandler">开通({{info.subscribePrice}}元/天起)</div>
      </div>
      <market-renew v-if="!openStatus&&info.saleStatus!=='售罄'" :renewInfo="info"/>
      <div class="saleStatusFlag" v-if="info.saleStatus==='售罄'"> <p>售罄</p> </div>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import HintTire from 'COMP/Market/MarketDetail/HintTire/'
import MarketRenew from 'COMP/Market/MarketDetail/MarketRenew'
import TagGroup from 'COMP/TagGroup'
import Avatar from 'COMP/Avatar'
import TitleBar from 'COMP/TitleBar'
import TMap from 'COMP/TMap'
import marketService from 'SERVICE/marketService'
import isEmpty from 'lodash/isEmpty'
import { ImagePreview } from 'vant'
export default {
  components: {
    HintTire,
    TagGroup,
    Avatar,
    swiper,
    swiperSlide,
    TitleBar,
    TMap,
    MarketRenew
  },
  data() {
    return {
      instance: 0,
      status: null, // 0-未收藏 1-已收藏
      photoButton: true, //是否存在相册
      commissionImg: require('IMG/user/collection/icon_commission@2x.png'),
      siteDetailImg: require('IMG/marketDetail/hun@2x.png'),
      panoramaIcon: require('IMG/marketDetail/Oval@2x.png'),
      drawingImg: require('IMG/marketDetail/drawing@2x.png'),
      closeImg: require('IMG/marketDetail/close@2x.png'),
      id: -1,
      info: null,
      swipeCurrent: 0,
      headCurrent: 0,
      tagGroupArr: [],
      mapTab: 0,
      openStatus: false,
      relationShow:false,//立即联系
      typeTitleConf: {
        title: '户型',
        linkText: '全部户型'
        // link: `/marketDetail/FamilyList/${this.id}`
      },
      newsTitleConf: {
        title: '楼盘动态',
        linkText: '全部动态',
        link: '/'
      },
      aroundTitleConf: {
        title: '位置周边'
      },
      othersTitleConf: {
        title: '其他楼盘',
        linkText: '全部楼盘',
        link: '/market'
      },
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 12
      },
      mapConf: {
        draggable: false,
        scrollwheel: false,
        disableDoubleClickZoom: false
      },
      rd: {
        headSlideTimer: null
      },
      playIcon: require('IMG/market/view720.png')
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getDetailInfo(this.id)
    this.getMarketDetailPhotoInfo()
    this.typeTitleConf.link = `/marketDetail/FamilyList/${this.id}`
    this.newsTitleConf.link = `/marketDetail/marketAllDynamic/${this.id}`
    // window.addEventListener("popstate", this.fun, false);
  },
  beforeRouteLeave(to, from, next) {
    if (this.instance) {
      this.instance.close()
    }
    next()
  },
  watch: {
    $route(to, from) {
      this.id = this.$route.params.id
      this.getDetailInfo(this.id)
      this.getMarketDetailPhotoInfo()
      this.typeTitleConf.link = `/marketDetail/FamilyList/${this.id}`
      this.newsTitleConf.link = `/marketDetail/marketAllDynamic/${this.id}`
    }
  },
  methods: {
    relationHandle(){//立即联系弹窗
        window.location.href = 'tel://400-0904-99'
        this.relationShow=false
    },
    async getMarketDetailPhotoInfo() {
      //判断该楼盘有无图片列表
      const res = await marketService.getMarketDetailPhoto(this.id)
      if (res.length > 0) {
        this.photoButton = true
      } else if (res.length <= 0) {
        this.photoButton = false
      }
    },
    photoHandle() {
      //进入相册页面
      this.$router.push({ name: 'photoList', params: { id: this.id } })
    },
    commission() {
      //进入佣金详情
      this.$router.push({ name: 'marketDetail-commission', params: { id: this.info.linkerId } })
    },
    async getDetailInfo(id) {
      // 获取楼盘详情
      const res = await marketService.getLinkerDetail(id)
      this.info = res
      console.log(res, '楼盘详情kkkk')

      if (!this.info.linkerOtherList) {
        this.othersTitleConf.title = ''
      }
      this.status = this.info.collectionStatus
      this.tagGroupArr = [this.info.saleStatus, ...this.info.houseUseList]
      // 浏览者头像动画
      this.headSlide()
      this.competeOpenStatus()
    },
    swipeChange(val) {
      this.swipeCurrent = val
    },
    headSlide() {
      this.rd.headSlideTimer = setInterval(() => {
        this.headCurrent = this.headCurrent < this.info.customerList.length - 1 ? this.headCurrent + 1 : 0
      }, 3000)
    },
    houseTypeHandle(n) {
      //查看户型图片预览
      let data = []
      data.push(n)
      // this.$router.push({ name: 'Preview-Picture', query: { arr: data }})
      this.instance = ImagePreview({
        images: data,
        startPosition: 0
      })
    },
    async collectHandler() {
      //修改收藏状态
      if (this.status == 1) {
        this.status = 0
      } else {
        this.status = 1
      }
      await marketService.changeLinkerCollect(this.id, this.status, 1)
    },
    shareHandler() {
      if (isEmpty(this.userInfo.name) || isEmpty(this.userInfo.distributorName) || isEmpty(this.userInfo.majorCity) || isEmpty(this.userInfo.institutionName)) {
        this.$dialog
          .confirm({
            title: '您有未完善的信息',
            message: '信息不完整会影响传播效率哦',
            confirmButtonText: '去完善',
            className: 'marketShareHint'
          })
          .then(() => {
            this.$router.push({ name: 'user-edit' })
          })
      } else {
        if (this.info.expireFlag == 0) {
          this.$dialog
            .confirm({
              title: '温馨提示',
              message: '还未开通楼盘，请前往开通'
            })
            .then(() => {
              this.$router.push({ name: 'marketDetail-open', params: { id: this.id } })
            })
        } else {
          this.$router.push({ name: 'market-share', params: { id: this.id } })
        }
      }
    },
    async openHandler() {
      //VIP用户选择城市与VIP开通楼盘同城市
      if (this.info.city === this.userInfo.vipInfo.city) {
        await marketService.addHouseByVip(this.info.linkerId)
        await this.getDetailInfo(this.id)
        this.openStatus = false
        this.$toast({
          duration: 1000,
          message: '已开通成功，请到我的楼盘查看'
        })
      } else {
        this.$router.push({ name: 'marketDetail-open', params: { id: this.info.linkerId } })
      }
    },
    moreInfoHandler() {
      this.$router.push({ name: 'marketDetail-info', params: { id: this.info.linkerId, licenceList: this.info.licenceList } })
    },
    // 全景点击
    ifPanoramaClickHandler() {
      window.location.href = this.info.linkerUrl
    },
    competeOpenStatus() {
      this.openStatus = this.info.openStatus == 0
    },
    // 其他楼盘
    itemClickHandler(id) {
      this.$router.push(`/market/${id}`)
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    mapData() {
      return this.info.houseAroundType[this.mapTab]
    }
  },
  beforeDestroy() {
    clearInterval(this.rd.headSlideTimer)
    window.removeEventListener('popstate', this.fun, false)
  }
}
</script>
<style lang="less">
.market-detail-page {
  > .top-swipe-container {
    position: relative;
    width: 100%;
    height: 281px;
    > .swipe-content {
      position: relative;
      width: 100%;
      height: 100%;
      > .swipe-photo {
        position: absolute;
        z-index: 1;
        left: 155px;
        bottom: 15px;
        text-align: center;
        width: 60px;
        height: 24px;
        background: rgba(255, 255, 255, 1);
        border-radius: 12px;
        font-size: 12px;

        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
      }
      > .van-swipe {
        position: relative;
        width: 100;
        height: 100%;
        > .custom-indicator {
          position: absolute;
          color: #fff;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 10px;
          z-index: 5;
          right: 20px;
          bottom: 15px;
          font-size: 12px;
          padding: 3px 15px;
          border: none;
        }
        .swipe-item {
          width: 100%;
          height: 100%;
          background-color: #999999;
          border: none;
        }
      }
    }
    > .operate-content {
      position: absolute;
      top: 0;
      right: 10px;
      > .operate-1 {
        display: flex;
        > div {
          padding: 10px;
          font-size: 12px;
          color: #fff;
          > i {
            font-size: 24px;
            display: block;
          }
        }
      }
    }
    > .operate-2 {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 64px;
      height: 64px;
    }
  }
  > .base-info-container {
    > .info-top-bar {
      display: flex;
      justify-content: space-between;
      margin: 15px;
      margin-left: 9px;
      font-size: 12px;
      > .browser-info {
        display: flex;
        line-height: 23px;
        color: #333333;
        font-weight: 600;
        font-size: 12px;
        > span {
          color: #007ae6;
        }
        > .head-portrait-box {
          position: relative;
          width: 24px;
          height: 24px;
          margin-left: 4px;
          > div {
            position: absolute;
            width: 24px;
            height: 24px;
            border-radius: 50%;
          }
        }
      }
    }
    > .info-content {
      padding: 0 15px;
      > .house-name {
        color: #333333;
        font-size: 26px;
        font-weight: 600;
        font-family:PingFangSC-Semibold;
      }
      > .house-feature {
        padding-top: 10px;
        font-size: 14px;
        line-height: 1.5;
      }
      .specific-market-detail-commission {
        width: 339px;
        height: 34px;
        background: rgba(247, 249, 250, 1);
        border-radius: 4px;
        font-size: 15px;

        font-weight: 400;
        color: rgba(234, 77, 46, 1);
        display: flex;
        align-items: center;
        position: relative;
        .commission-detail {
          width: 12px;
          height: 12px;
          position: absolute;
          right: 5px;
        }
        span:nth-child(1) {
          width: 17px;
          height: 17px;
          margin: 0 8px;
        }
        .commission-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          width: 130px;
        }
      }
      // > .commission-view {
      //   display: flex;
      //   align-items: center;
      //   height: 34px;
      //   width: 95%;
      //   margin-left: 2.5%;
      //   background: rgba(247, 249, 250, 1);
      //   border-radius: 4px;
      //   margin-top: 5px;

      //   img {
      //     width: 16px;
      //     height: 16px;
      //   }

      //   span {
      //     color: #ea4d2e;
      //     font-size: 15px;
      //     margin-left: 8px;
      //   }
      // }
      > .house-info-form {
        padding-top: 20px;
        line-height: 1.5;
        font-size: 16px;
        color: #333333;
        > p {
          padding-bottom: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 343px;
          > span {
            display: inline-block;
            color: #8a8f99;
            width: 80px;
          }
        }
      }
      > .more-info {
        width: 335px;
        height: 44px;
        line-height: 44px;
        margin: 5px;
        margin-left: 0px;
        background-color: rgba(0, 122, 230, 0.05);
        color: #445166;
        font-weight: 400;
        font-size: 16px;
        text-align: center;
        border-radius: 4px;
      }
    }
  }
 > .marker-relation-box{
   padding:40px 0 0 15px;
   p{
     font-size:20px;
     font-family:PingFangSC-Medium;
     font-weight:600;
   }
   ol{
     position: relative;
     margin-top:12px;
     width:343px;
     height:114px;
     li:nth-child(1){
       border-radius:50%;
       position:absolute;
      top:48px;
      left:153px;
       width:23px;
       height:23px;
     }
     li:nth-child(2){
       text-align: center;
       position:absolute;
      top:73px;
      left:135px;
       width:60px;
      font-size:8px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
     }
   }
 }
  > .house-type {
    margin-top: 28px;
    .type-swipe-content {
      margin: 16px 22px 0px 22px;
      .house-type {
        > .house-type-img {
          width: 160px;
          height: 120px;
          border-radius: 6px;
        }
        > .house-type-info {
          margin-top: 12px;
          line-height: 1.5;
          > .house-type-name {
            font-size: 16px;
            color: #333333;
            font-weight: 600;
          }
          > .house-type-area {
            font-size: 12px;
            color: #333333;
            font-weight: 400;
          }
          > .house-type-price {
            font-size: 14px;
            color: #ea4d2e;
            font-weight: 400;
          }
        }
      }
    }
  }
  > .house-news {
    margin-top: 15px;
    > .news-container {
      color: #333333;
      line-height: 1.5;
      margin: 0 15px;
      > .news-title {
        font-size: 16px;
        font-weight: 600;
        margin-top: 11px;
        margin-bottom: 6px;
      }
      > .news-content {
        font-size: 14px;
        font-weight: 400;
      }
      > .news-time {
        margin-top: 12px;
        font-size: 12px;
        color: #999999;
      }
    }
  }
  > .house-circum {
    margin-top: 15px;
    .tab-box {
      > .van-tabs {
        .van-tabs__line {
          display: none;
        }
        > .van-tabs__wrap {
          &::after {
            border: none;
          }
        }
        .van-tab--active {
          color: #007ae6;
        }
      }
    }
    .map-box {
      margin: 15px 15px;
      width: 345px;
      height: 190px;
      border-radius: 10px;
      overflow: hidden;
    }
  }
  > .house-recommend {
    margin-top: 28px;
    margin-bottom: 10px;
    > .recommend-swipe-content {
      margin: 0 15px;
      .recommend-house-item {
        line-height: 1.5;
        > .recommend-house-img {
          margin-top: 18px;
          margin-bottom: 12px;
          width: 160px;
          height: 90px;
          border-radius: 6px;
          position: relative;
          .panorama-icon {
            position: absolute;
            width: 34px;
            height: 34px;
            left: 50%;
            top: 50%;
            margin-left: -17px;
            margin-top: -17px;
          }
        }
        > .recommend-house-info {
          .house-name {
            font-size: 16px;
            font-weight: 600;
            color: #333333;
          }
          .house-location {
            font-size: 12px;
            font-weight: 400;
            color: #999999;
          }
        }
      }
    }
  }
  .m-statement {
    padding: 16px 23px 90px 16px;
    // width: 343px;
    background: #f7f9fa;
    color: #8a9299;
    font-size: 12px;
    // line-height: 0.34rem;
    .feedback {
      color: #525c66;
    }
  }
  > .house-status {
    position: fixed;
    width: 100%;
    height: 70px;
    left: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 999;
    > .unopen-status-box {
      position: relative;
      width: 100%;
      height: 100%;
      > .open-btn {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: inline-block;
        width: 343px;
        height: 44px;
        background: #007ae6;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
        line-height: 44px;
        text-align: center;
      }
    }
    .saleStatusFlag {
      width: 343px;
      height: 44px;
      background: #c8c9cc;
      border-radius: 6px;
      line-height: 44px;
      text-align: center;
      margin-top: 14px;
      margin-left: 16px;
      p {
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
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
      top: 0;
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
}
.van-popup{
  border-radius:12px;
  width:311px;
  height:214px;
  // padding-top:45px;
  .relationName{
  width:311px;
  height:214px;
  background:rgba(255,255,255,1);
  border-radius:12px;
  position: relative;
  p:nth-child(1){
    width:12px;
    height:12px;
    position:absolute;
    right:15px;
    top:15px;
  }
  p:nth-child(2){
    width:248px;
    font-size:22px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    padding-top:45px;
    margin:0px 25px 32px 32px;
    text-align:center;
  }
  p:nth-child(3){
    text-align: center;
    margin-left:32px;
    width:247px;
    height:44px;
    background:rgba(0,122,230,1);
    border-radius:6px;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:44px;
  }
  }
}
.marketShareHint {
  //完善信息弹窗
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
