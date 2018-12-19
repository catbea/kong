<template>
  <div class="discover-detail-page">
    <!-- 文章详情和经纪人信息 -->
    <div class="discover-detail-container">
      <h5 class="discover-title">{{info&&info.title}}</h5>
      <div class="agent-top-info-box">
        <div class="agent-box-left">
          <avatar class="agent-avatar" :avatar="agentInfo&&agentInfo.avatarUrl"></avatar>
          <div class="agent-info">
            <p class="agent-name">{{agentInfo&&agentInfo.agentName}}</p>
            <p class="agent-company">{{agentInfo&&agentInfo.enterpriseName}}</p>
          </div>
        </div>
        <div class="agent-box-right"></div>
      </div>
      <div
        class="bg_img van-hairline--surround discover-img"
        :style="{backgroundImage:'url('+ (info&&info.image) +')'}"
      ></div>
      <div class="discover-detail-content" v-html="info.content"></div>
      <p class="discover-extra-info">
        转载于
        <span class="reprint-from">{{info&&info.publisher}}</span>
        <span class="reprint-time">{{info&&info.createDate | dateTimeFormatter}}</span>
        <span class="reprint-views">浏览：{{ info&&info.scanNum | currency('')}}</span>
      </p>
      <agent-card class="agent-card" :info="agentInfo"></agent-card>
    </div>
    <!-- 推荐房源 -->
    <div class="recommend-houses" v-if="info&&info.projectRecommendList">
      <title-bar :conf="titleProperties"/>
      <div class="recommend-houses-content">
        <!-- swiper -->
        <swiper :options="swiperOption">
          <swiper-slide v-for="item in info.projectRecommendList" :key="item.linkerId">
            <div class="house-item">
              <div class="bg_img house-img" :style="{backgroundImage:'url('+item.linkerImg+')'}"></div>
              <p class="house-name">{{item.linkerName}}</p>
              <p class="house-localtion">{{item.city}}</p>
              <p class="house-price">{{item.averagePrice}} {{item.priceUnit}}</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 推荐文章 -->
    <div class="recommend-discover" v-if="info&&info.recommendInformationList">
      <title-bar :conf="titleArticle"/>
      <div class="recommend-discover-content">
        <discover-item v-for="item in info.recommendInformationList" :key="item.id" :data="item"/>
      </div>
    </div>
    <!-- 悬浮工具栏 -->
    <div class="van-hairline--top tools-bar">
      <div class="app-btn" @click="appCardHandler">
        <i class="icon iconfont icon-article_program"></i>小程序名片
      </div>
      <div class="collect-btn" @click="collectHandler(info.id)">
        <i class="icon iconfont icon-package_Optimal"></i>收藏
      </div>
      <div class="share-btn" @click="shareHandler">
        <i class="icon iconfont icon-Building_list_share"></i>分享
      </div>
    </div>
    <!-- 小程序名片 -->
    <div class="app-card"></div>
  </div>
</template>
<script>
import Avatar from 'COMP/Avatar'
import AgentCard from 'COMP/AgentCard'
import TitleBar from 'COMP/TitleBar/'
import DiscoverItem from 'COMP/DiscoverItem'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import discoverService from 'SERVICE/discoverService'
import userService from 'SERVICE/userService'
export default {
  components: {
    Avatar,
    AgentCard,
    TitleBar,
    swiper,
    swiperSlide,
    DiscoverItem
  },
  data: () => ({
    swiperOption: {
      slidesPerView: 2,
      spaceBetween: 12,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    },
    id: -1,
    city: '',
    info: null,
    agentInfo: null,
    show: false,
    infoId: '', //文章的id
    collectionStatus: '', //收藏状态
    titleProperties: {
      title: '推荐房源',
      linkText: '全部楼盘',
      link: '/market'
    },
    titleArticle: {
      title: '推荐文章',
      linkText: '查看全部',
      link: '/discover'
    }
  }),
  created() {
    this.id = this.$route.params.id
    this.city = this.$route.params.city
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const res = await discoverService.getDiscoverDetail(this.id, this.city)
      this.info = res

      this.infoId = res.id
      this.collectionStatus = res.collectType

      this.agentInfo = {
        agentId: this.info.agentId,
        agentName: this.info.agentName,
        avatarUrl: this.info.avatarUrl,
        distributorName: this.info.distributorName,
        enterpriseName: this.info.enterpriseName
      }
    },
    // 小程序名片
    appCardHandler() {},
    // 收藏文章
    async collectHandler(infoId) {
      let obj = {}
      if (this.collectionStatus == '0') {
        obj.deleteType = '1'
      } else {
        obj.deleteType = '0'
      }
      obj.infoId = infoId
      const res = await userService.articleCollection(obj)

      //添加UI的逻辑判断

    },
    // 分享
    shareHandler() {}
  }
}
</script>
<style lang="less">
.discover-detail-page {
  background-color: #f7f9fa;
  > .discover-detail-container {
    background-color: #fff;
    padding-bottom: 10px;
    > .discover-title {
      padding: 10px 15px;
      font-size: 22px;
      color: #333333;
      font-weight: 600;
      line-height: 1.3;
    }
    > .agent-top-info-box {
      padding: 0 10px;
      > .agent-box-left {
        display: flex;
        > .agent-avatar {
          width: 40px;
          height: 40px;
          margin: 0 5px;
        }
        > .agent-info {
          font-weight: 400;
          > .agent-name {
            font-size: 14px;
            color: #333333;
            font-weight: 500;
            margin: 2px 0 2px 3px;
          }
          > .agent-company {
            font-size: 12px;
            color: #8a8f99;
            margin: 1px 0 0 3px;
          }
        }
      }
      > .agent-box-right {
      }
    }
    > .discover-img {
      margin: 15px;
      height: 195px;
      border-radius: 10px;
      background-color: #999999;
    }
    > .discover-detail-content {
      padding: 15px;
      font-size: 16px !important;
      color: #333333 !important;
      font-weight: 400 !important;
      line-height: 28px !important;
    }
    > .discover-extra-info {
      position: relative;
      color: #8a8f99;
      font-size: 12px;
      padding: 0 15px;
      > .reprint-from {
        padding-left: 5px;
      }
      > .reprint-time {
        padding-left: 15px;
      }
      > .reprint-views {
        position: absolute;
        right: 15px;
      }
    }
    > .agent-card {
      margin-bottom: 10px;
    }
  }
  > .recommend-houses {
    background-color: #fff;
    margin-top: 10px;
    > .recommend-houses-content {
      padding: 10px 15px;
      .house-item {
        > .house-img {
          width: 166px;
          height: 93px;
          border-radius: 4px;
        }
        > .house-name {
          font-size: 16px;
          color: #333333;
          font-weight: 500;
          line-height: 1.5;
        }
        > .house-localtion {
          font-size: 12px;
          font-weight: 400;
          color: #999999;
          line-height: 1.5;
        }
        > .house-price {
          font-size: 15px;
          font-weight: 500;
          color: #ea4d2e;
        }
      }
    }
  }
  > .recommend-discover {
    background-color: #fff;
    margin: 10px 0 30px;
    padding: 10px 0px;
    .discover-item {
      margin: 15px 0;
    }
  }
  > .tools-bar {
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    z-index: 5;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding: 5px 15px;
    > div {
      border-radius: 100px;
      border: 1px solid #aeb1c2;
      margin: 5px;
      padding: 8px 20px;
      opacity: 0.7;
    }
    > .app-btn {
    }
    > .collect-btn {
    }
    > .share-btn {
    }
  }
}
</style>
