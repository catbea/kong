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
        <div class="agent-box-right" @click="showQRCode">
          <button class="agent-right"><b>+</b> 名片</button>
        </div>
      </div>
      <!-- <div
        class="bg_img van-hairline--surround discover-img"
        :style="{backgroundImage:'url('+ (info&&info.image) +')'}"
      ></div>-->
      <div class="discover-detail-content" v-html="info&&info.content"></div>
      <p class="discover-extra-info">
        转载于
        <span class="reprint-from">{{info&&info.publisher}}</span>
        <span class="reprint-time">{{info&&info.createDate | dateTimeFormatter}}</span>
        <span class="reprint-views">浏览：{{ info&&info.scanNum | currency('')}}</span>
      </p>
      <agent-card class="agent-card" :info="agentInfo" @showQRCode="showQRCode"></agent-card>
    </div>
    <!-- 推荐房源 -->
    <div
      class="recommend-houses"
      v-if="info&&info.projectRecommendList&&info.projectRecommendList.length>0"
    >
      <title-bar :conf="titleProperties"/>
      <div class="recommend-houses-content">
        <!-- swiper -->
        <swiper :options="swiperOption">
          <swiper-slide v-for="item in info.projectRecommendList" :key="item.linkerId">
            <div class="house-item" @click="enterDetail(item)">
              <div class="bg_img house-img" :style="{backgroundImage:'url('+item.linkerImg+')'}"></div>
              <p class="house-name">{{item.linkerName}}</p>
              <p class="house-localtion">{{item.city}}</p>
              <p class="house-price" v-if="item.averagePrice=='0'">价格待定</p>
              <p class="house-price" v-else>{{item.averagePrice}} {{item.priceUnit}}</p>
              <!--  -->
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <van-popup
      class="popup-view"
      v-model="openPopup"
      :overlay="true"
      :lock-scroll="true"
      :close-on-click-overlay="true"
      :click-overlay="overlayClose"
    >
      <div class="close-titile">
        <img class="closePopup" :src="this.closeImg" @click="overlayClose">
      </div>
      <span class="notice-view">长按识别查看更多</span>
      <img class="qrcode-view" :src="qrcodeInfo.miniQrCode">
      <div class="introduce-box">
        <span class="username-view">{{qrcodeInfo.agentName}}</span>
        <span class="introduce-view">资深房产经纪人</span>
        <span class="phone-view">{{qrcodeInfo.mobile}}</span>
        <span class="company-view">{{qrcodeInfo.enterpriseName}}</span>
      </div>
      <div class="info-bottom">
        <span class="info-view">开启买房新模式及时获取一手房源信息</span>
      </div>
    </van-popup>
    <!-- 推荐文章 -->
    <div class="recommend-discover" v-if="info&&info.recommendInformationList">
      <title-bar :conf="titleArticle"/>
      <div class="recommend-discover-content">
        <discover-item v-for="item in info.recommendInformationList" :key="item.id" :data="item"/>
      </div>
    </div>
    <!-- 悬浮工具栏 -->
    <div class="van-hairline--top tools-bar">
      <div class="app-btn" @click="showQRCode">
        <i class="icon iconfont icon-article_program"></i>小程序名片
      </div>
      <div class="collect-btn" @click="collectHandler(info.id)">
        <div v-if="this.collectionStatus===1">
          <i class="icon iconfont icon-Building_details_col"></i>收藏
        </div>
        <div v-else>
          <i class="icon iconfont icon-package_Optimal"></i>收藏
        </div>
      </div>
      <!-- <div class="share-btn" @click="shareHandler">
        <i class="icon iconfont icon-Building_list_share"></i>分享
      </div>-->
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
// import wechatApi from '@/utils/wechatApi'
import { mapGetters } from 'vuex'
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
    collectionStatus: -1, //收藏状态
    titleProperties: {
      title: '推荐房源',
      linkText: '全部楼盘',
      link: '/market'
    },
    titleArticle: {
      title: '推荐文章',
      linkText: '查看全部',
      link: '/discover'
    },
    openPopup: false,
    closeImg: require('IMG/user/close_popup.png'),
    qrcodeInfo: {},
    shareData: null
  }),
  created() {
    this.id = this.$route.params.id
    this.city = this.$route.params.city
    this.agentId = this.$route.query.agentId
    this.enterpriseId = this.$route.query.enterpriseId
    this.getDetail()
    this.getQrCode(this.agentId)
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    async getDetail() {
      const res = await discoverService.getDiscoverDetail(this.id, this.city, this.enterpriseId, this.agentId, '2')
      this.info = res

      this.infoId = res.id
      this.collectionStatus = res.collectType

      this.agentInfo = {
        agentId: this.info.agentId,
        agentName: this.info.agentName,
        avatarUrl: this.info.avatarUrl,
        distributorName: this.info.distributorName,
        enterpriseName: this.info.enterpriseName,
        institutionName: this.info.institutionName
      }
      let host = process.env.VUE_APP_APP_URL
      host = host + '#/article/' + this.id + '/' + this.city + '/' + this.info.agentId
      this.shareData = {
        title: this.info.title,
        imgUrl: this.info.image,
        link: host
      }
      this.shareHandler()
    },

    //进入楼盘详情
    enterDetail(item) {
      this.$router.push({ name: 'market-detail', params: { id: item.linkerId } })
    },

    async getQrCode(agentId) {
      const result = await userService.getQrCode(agentId)
      if (result) {
        this.qrcodeInfo = result
      }
    },

    overlayClose() {
      this.openPopup = false
    },

    // 小程序名片
    showQRCode() {
      this.openPopup = true
    },

    // 收藏文章
    async collectHandler(infoId) {
      let obj = {}
      if (this.collectionStatus === 0) {
        obj.deleteType = 0
      } else {
        obj.deleteType = 1
      }
      obj.infoId = infoId
      const res = await userService.articleCollection(obj)
      if (res) {
        if (res.deleteType === 0) {
          this.collectionStatus = 1
        } else {
          this.collectionStatus = 0
        }
      }
    },
    // 分享成功之后
    async articleShare() {
      console.log('[article share suss]')
      let params = {
        deleteType: 0,
        infoId: this.infoId
      }
      const result = await discoverService.articleShare(params)
    },
    // 设置分享
    async shareHandler() {
      await window.awHelper.wechatHelper.init()
      this.shareData.success = this.articleShare
      console.log('serShare', this.shareData)

      window.awHelper.wechatHelper.setShare(this.shareData)
      // wechatApi
      //   .wechatShare(this.shareData)
      //   .then(res => {
      //     this.articleShare()
      //   })
      //   .catch(e => {})
    }
  },
  // mounted() {
  //   this.shareHandler()
  // },
  watch: {
    // 当前页面跳转当前页面不会自动刷新 所以强制刷新页面
    $route() {
      // this.$router.go(0) // 该方法不兼容iOS
      // history.go(-1)
      location.reload()
    }
  }
}
</script>
<style lang="less">
.popup-view {
  width: 260px;
  height: 371px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > .close-titile {
    width: 100%;
    height: 24px;
    display: flex;
    flex-direction: row-reverse;

    > .closePopup {
      width: 24px;
      height: 24px;
      margin-top: 8px;
      margin-right: 8px;
    }
  }

  > .notice-view {
    color: #333333;
    font-size: 18px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
  }

  > .qrcode-view {
    width: 162px;
    height: 162px;
    text-align: center;
    margin-top: 11px;
    padding: 5px;
  }

  > .introduce-box {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    margin-left: -45px;

    > .username-view {
      color: #333333;
      font-size: 16px;
      margin-top: 12px;
    }
    > .introduce-view {
      font-size: 14px;
      color: #666666;
      margin-top: 3px;
    }

    > .company-view {
      margin-top: 7px;
      color: #666666;
      font-size: 12px;
    }

    > .phone-view {
      margin-top: 12px;
      color: #666666;
      font-size: 12px;
    }
  }

  > .info-bottom {
    width: 100%;
    height: 32px;
    margin-bottom: 0;
    background: #eeeeee;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    > .info-view {
      color: #666666;
      font-size: 12px;
      background-color: #eeeeee;
    }
  }
}

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
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      > .agent-box-left {
        display: flex;
        > .agent-avatar {
          width: 40px;
          height: 40px;
          margin: 0 5px;
        }
        > .agent-info {
          padding-top: 3px;
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
        > .agent-right {
          width: 64px;
          height: 32px;
          background: rgba(0, 122, 230, 1);
          border-radius: 16px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          border: 0;
          margin-right: 7px;
          b{
            font-size: 14px;
          }
        }
      }
    }
    > .discover-img {
      margin: 15px;
      height: 195px;
      border-radius: 10px;
      background-color: #999999;
    }
    > .discover-detail-content {
      margin-top: 15px;
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
      margin-top: 8px;
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
