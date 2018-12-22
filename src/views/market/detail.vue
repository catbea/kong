<template>
  <div class="market-detail-page" v-if="info">
    <!-- 新手引导 -->
    <hint-tire></hint-tire>
    <!-- 顶部swipe -->
    <div class="top-swipe-container">
      <div class="swipe-content">
        <van-swipe @change="swipeChange">
          <van-swipe-item v-for="(item,index) in info.bannerList" :key="index">
            <div
              class="bg_img swipe-item dev"
              :style="{backgroundImage:'url(' + item.imgUrl + ')'}"
            ></div>
          </van-swipe-item>
          <div
            class="custom-indicator dev"
            slot="indicator"
          >{{ swipeCurrent + 1 }}/{{info.bannerList.length}}</div>
        </van-swipe>
      </div>
      <div class="operate-content">
        <!-- 收藏/分享 -->
        <div class="operate-1">
          <div class="operate-collect" @click="collectHandler">
            <i class="icon iconfont icon-article_collection"></i>
            收藏
          </div>
          <div class="operate-share" @click="shareHandler">
            <i class="icon iconfont icon-article_share"></i>
            分享
          </div>
        </div>
        <!-- 存在全景时全景播放 -->
        <div class="operate-2"></div>
      </div>
    </div>
    <!-- 楼盘基础信息 -->
    <div class="base-info-container">
      <div class="info-top-bar">
        <tag-group :arr="tagGroupArr"/>
        <div class="browser-info">
          <span>{{info.browsCount}}</span>人浏览过
          <div class="head-portrait-box">
            <transition name="show">
              <avatar
                :avatar="item.clientImg"
                v-for="(item,index) in info.customerList"
                :key="index"
                v-if="index===headCurrent"
              />
            </transition>
          </div>
        </div>
      </div>
      <div class="info-content">
        <h5 class="house-name">{{info.linkerName}}</h5>
        <p
          class="house-feature"
        >{{ info.projectTagList === '' ? null : info.projectTagList.join("|")}}</p>
        <div class="specific-market-detail-commission" v-if="info&&info.divisionRules">
            <span class="bg_img" :style="{backgroundImage:'url('+commissionImg+')'}"></span>
           <span class="commission-text">{{info&&info.divisionRules}}</span>
           <div class="bg_img commission-detail" @click="commission" :style="{backgroundImage:'url('+siteDetailImg+')'}"></div>
           </div>
        <!-- <div class="commission-view" v-show="info.divisionRules" @click="enterCommission">
          <img :src="commissionImg">
          <span>{{info.divisionRules | textOver}}</span>
        </div> -->
        <div class="house-info-form">
          <p>
            <span>平均价格:</span>
            {{info.averagePrice}}
          </p>
          <p>
            <span>开盘时间:</span>
            {{info.openTime | dateTimeFormatter(5)}}
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
    <!-- 户型 -->
    <div class="house-type" v-if="info.houseTypeList&&info.houseTypeList.length>0">
      <title-bar :conf="typeTitleConf"/>
      <div class="type-swipe-content">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in info.houseTypeList" :key="index">
            <div class="house-type">
              <div class="bg_img house-type-img" :style="{backgroundImage:'url('+item.imgUrl+')'}"></div>
              <div class="house-type-info">
                <p class="house-type-name">{{item.householdDesc}}</p>
                <p class="house-type-area">{{`建面${item.area}${item.orientations}朝向`}}</p>
                <p class="house-type-price">约{{item.price}}</p>
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
    <div class="house-circum">
      <title-bar :conf="aroundTitleConf"/>
      <div class="tab-box">
        <van-tabs v-model="mapTab" color="#007AE6" swipeable>
          <van-tab
            v-for="item in info.houseAroundType"
            :key="item.name"
            :title="item.name"
            :line-width="0"
          />
        </van-tabs>
      </div>
      <div class="map-box">
        <t-map :latLng="{lat:info.latitude,lng:info.longitude}" :data="mapData" :conf="mapConf"></t-map>
      </div>
    </div>
    <!-- 其他楼盘 -->
    <div class="house-recommend">
      <title-bar :conf="othersTitleConf"/>
      <div class="recommend-swipe-content">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in info.linkerOtherList" :key="index">
            <div class="recommend-house-item">
              <div
                class="bg_img recommend-house-img"
                :style="{backgroundImage:'url('+item.headImgUrl+')'}"
              ></div>
              <div class="recommend-house-info">
                <p class="house-name">{{item.linkerName}}</p>
                <p class="house-location">{{item.district}}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 开通提示及开通状态 -->
    <div class="van-hairline--top house-status">
      <div class="unopen-status-box" v-if="info.openStatus == 0">
        <div class="open-btn" @click="openHandler">开通({{info.subscribePrice}}元/天起)</div>
      </div>
      <div class="open-status-box">
        <div class="icon-box">
          <div>
            <i class="icon iconfont icon-building_details_rec1"></i>
            <!-- <i class="icon iconfont icon-building_details_rec"></i> -->
            推荐
          </div>
          <div>
            <i class="icon iconfont icon-building_details_sho"></i>
            <!-- <i class="icon iconfont icon-building_details_rec"></i> -->
            展示
          </div>
          <div>
            <i class="icon iconfont icon-building_details_top"></i>
            <!-- <i class="icon iconfont icon-building_details_rec"></i> -->
            置顶
          </div>
        </div>
        <div class="btn-box">续费()</div>
      </div>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import HintTire from 'COMP/Market/MarketDetail/HintTire/'
import TagGroup from 'COMP/TagGroup'
import Avatar from 'COMP/Avatar'
import TitleBar from 'COMP/TitleBar'
import TMap from 'COMP/TMap'
import marketService from 'SERVICE/marketService'
export default {
  components: {
    HintTire,
    TagGroup,
    Avatar,
    swiper,
    swiperSlide,
    TitleBar,
    TMap
  },
  data: () => ({
    commissionImg: require('IMG/user/collection/icon_commission@2x.png'),
    siteDetailImg: require('IMG/marketDetail/arrow.png'),
    id: -1,
    info: null,
    swipeCurrent: 0,
    headCurrent: 0,
    tagGroupArr: [],
    mapTab: 0,
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
    }
  }),
  created() {
    this.id = this.$route.params.id
    // this.$store.commit(types.USER_BUILD_INFO, this.id)
    this.getDetailInfo(this.id)
    this.typeTitleConf.link = `/marketDetail/FamilyList/${this.id}`
  },
  methods: {
    //进入佣金详情
    commission() {
      this.$router.push({ name: 'marketDetail-commission', params: { id: this.info.linkerId } })
    },
    // enterCommission() {
    //   this.$router.push({ name: 'marketDetail-commission', params: { id: this.info.linkerId } })
    // },
    // 获取楼盘详情
    async getDetailInfo(id) {
      const res = await marketService.getLinkerDetail(id)
      this.info = res
      this.tagGroupArr = [this.info.saleStatus, ...this.info.houseUseList]
      // 浏览者头像动画
      this.headSlide()
    },
    swipeChange(val) {
      this.swipeCurrent = val
    },
    headSlide() {
      this.rd.headSlideTimer = setInterval(() => {
        this.headCurrent = this.headCurrent < this.info.customerList.length - 1 ? this.headCurrent + 1 : 0
      }, 3000)
    },
    collectHandler() {},
    shareHandler() {
      this.$router.push({ name: 'market-share', params: { id: this.id } })
    },
    openHandler() {
      this.$router.push(`/marketDetail/open/${this.id}`)
    },
    moreInfoHandler() {
      this.$router.push({ name: 'marketDetail-info', params: { id: this.info.linkerId } })
    }
  },
  computed: {
    mapData() {
      return this.info.houseAroundType[this.mapTab]
    }
  },
  beforeDestroy() {
    clearInterval(this.rd.headSlideTimer)
  }
}
</script>
<style lang="less">
.market-detail-page {
  > .top-swipe-container {
    width: 100%;
    height: 281px;
    > .swipe-content {
      position: relative;
      width: 100%;
      height: 100%;
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
        }
        .swipe-item {
          width: 100%;
          height: 100%;
          background-color: #999999;
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
  }
  > .base-info-container {
    > .info-top-bar {
      display: flex;
      justify-content: space-between;
      margin: 15px;
      font-size: 12px;
      > .browser-info {
        display: flex;
        line-height: 23px;
        color: #333333;
        font-weight: 600;
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
      }
      > .house-feature {
        padding-top: 5px;
        font-size: 14px;
        line-height: 1.5;
      }
      .specific-market-detail-commission {
    width: 339px;
    height: 34px;
    background: rgba(247, 249, 250, 1);
    border-radius: 4px;
    font-size: 15px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(234, 77, 46, 1);
    display: flex;
    align-items: center;
    position: relative;
    .commission-detail{
      width:12px;
      height:12px;
      position: absolute;
      right:5px;
    }
    span:nth-child(1){
      width: 16px;
      height: 16px;
      margin: 0 8px;
    }
    .commission-text{
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
        padding-top: 5px;
        line-height: 1.5;
        font-size: 16px;
        color: #333333;
        > p {
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
        background-color: rgba(0, 122, 230, 0.05);
        color: #445166;
        font-weight: 400;
        font-size: 16px;
        text-align: center;
        border-radius: 4px;
      }
    }
  }
  > .house-type {
    margin-top: 15px;
    .type-swipe-content {
      margin: 10px 15px;
      .house-type {
        > .house-type-img {
          width: 160px;
          height: 120px;
          border-radius: 6px;
        }
        > .house-type-info {
          margin-top: 5px;
          line-height: 1.5;
          > .house-type-name {
            font-size: 16px;
            color: #333333;
            font-weight: 500;
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
        font-weight: 500;
      }
      > .news-content {
        margin-top: 3px;
        font-size: 14px;
        font-weight: 400;
      }
      > .news-time {
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
    margin-top: 15px;
    margin-bottom: 100px;
    > .recommend-swipe-content {
      margin: 0 15px;
      .recommend-house-item {
        line-height: 1.5;
        > .recommend-house-img {
          width: 160px;
          height: 90px;
          border-radius: 6px;
        }
        > .recommend-house-info {
          .house-name {
            font-size: 16px;
            font-weight: 500;
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
</style>
