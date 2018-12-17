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
    }
  }
  > .house-circum {
  }
  > .house-recommend {
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
  >.house-status{
    position: fixed;
    width: 100%;
    height: 70px;
    left: 0;
    bottom: 0;
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
<template>
  <div class="market-detail-page" v-if="info">
    <!-- 顶部swipe -->
    <div class="top-swipe-container">
      <div class="swipe-content">
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
          <div class="operate-collect" @collectHandler>
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
              <avatar :avatar="item.clientImg" v-for="(item,index) in info.customerList" :key="index" v-if="index===headCurrent"/>
            </transition>
          </div>
        </div>
      </div>
      <div class="info-content">
        <h5 class="house-name">{{info.linkerName}}</h5>
        <p class="house-feature">{{info.projectTagList.join("|")}}</p>
        <div class="house-info-form">
          <p>
            <span>平均价格:</span>
            {{info.averagePrice}}起
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
        <div class="more-info">更多信息</div>
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
      </div>
    </div>
    <!-- 位置周边 -->
    <div class="house-circum">
      <title-bar :conf="aroundTitleConf"/>
    </div>
    <!-- 其他楼盘 -->
    <div class="house-recommend">
      <title-bar :conf="othersTitleConf"/>
      <div class="recommend-swipe-content">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in info.linkerOtherList" :key="index">
            <div class="recommend-house-item">
              <div class="bg_img recommend-house-img" :style="{backgroundImage:'url('+item.headImgUrl+')'}"></div>
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
      
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import TagGroup from 'COMP/TagGroup'
import Avatar from 'COMP/Avatar'
import TitleBar from 'COMP/TitleBar'

import marketService from 'SERVICE/marketService'
export default {
  components: {
    TagGroup,
    Avatar,
    swiper,
    swiperSlide,
    TitleBar
  },
  data: () => ({
    id: -1,
    info: null,
    swipeCurrent: 0,
    headCurrent: 0,
    tagGroupArr: [],
    typeTitleConf: {
      title: '户型',
      linkText: '全部户型',
      link: '/'
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
      link: '/'
    },
    swiperOption: {
      slidesPerView: 2,
      spaceBetween: 12
    },
    rd: {
      headSlideTimer: null
    }
  }),
  created() {
    this.id = this.$route.params.id
    this.getDetailInfo(this.id)
  },
  methods: {
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
      this.$router.push({ name: 'market-share', params: { id: this.info.id } })
    }
  },
  beforeDestroy() {
    clearInterval(this.rd.headSlideTimer)
  }
}
</script>
<style lang="less">
.market-detail-page {
}
</style>

