<template>
  <div class="discover-detail-page">
    <!-- 文章详情和经纪人信息 -->
    <div class="discover-detail-container">
      <h5 class="discover-title">{{info&&info.title}}</h5>
      <!-- <agent-card-small :info="agentInfo" @click.native="popupShowControl(true)"/> -->
      <div class="discover-views">
        <div class="reprint-views">浏览量：{{ info&&info.scanNum | currency('')}}</div>
        <div class="reprint-source">
          <span>分享源自</span>
          <span style="color:#445166">AW大师写一写</span>
        </div>
      </div>
      <div class="discover-detail-content" v-html="info&&info.content"></div>
      <p class="discover-extra-info">
        <span class="reprint-from">{{info&&info.publisher}}</span>
        <span class="reprint-time">{{info&&info.createDate | dateTimeFormatter}}</span>
      </p>
      <p class="discover-disclaimer">
        <span
          class="disclaimer-text"
        >免责声明：文章信息均来源网络，本平台对转载、分享的内容、陈述、观点判断保持中立，不对所包含内容的准确性、可靠性或完善性提供任何明示或暗示的保证，仅供读者参考，本公众平台将不承担任何责任。 如有问题请点击</span>
        <span class="discover-feedback" style="color:#445166" @click="feedbackClickHandler">举报反馈</span>
      </p>
      <!-- <agent-card class="agent-card" v-if="agentInfo" :info="agentInfo" @showQRCode="popupShowControl(true)"></agent-card> -->
      <!-- 好看 -->
      <div class="easy-look-container">
        <div class="easy-look-top">
          <div class="easy-look-left">
            <div class="bg_img"></div>
            <div class="easy-look-text">{{num}}人觉得好看</div>
          </div>
          <div class="easy-look-right" @click="easyLookClickHandler">
            <div class="bg_img"></div>
            <div class="easy-look-text">好看</div>
          </div>
        </div>
        <div class="easy-look-list"></div>
      </div>
    </div>
    <!-- 评论 -->
    <div class="comment-container"></div>
    <!-- 推荐房源 -->
    <!-- <div class="recommend-houses" v-if="info&&info.projectRecommendList&&info.projectRecommendList.length>0">
      <title-bar :conf="titleProperties"/>
    <div class="recommend-houses-content">-->
    <!-- swiper -->
    <!-- <swiper :options="swiperOption">
          <swiper-slide v-for="item in info.projectRecommendList" :key="item.linkerId">
            <div class="house-item" @click="enterDetail(item)">
              <div class="bg_img house-img" :style="{backgroundImage:'url('+item.linkerImg+')'}"></div>
              <p class="house-name">{{item.linkerName}}</p>
              <p class="house-localtion">{{item.city}}</p>
              <p class="house-price" v-if="item.averagePrice=='0'">价格待定</p>
              <p class="house-price" v-else>{{item.averagePrice}} {{item.priceUnit}}</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>-->
    <!-- 推荐文章 -->
    <!-- <div class="recommend-discover" v-if="info&&info.recommendInformationList">
      <title-bar :conf="titleArticle"/>
      <div class="recommend-discover-content">
        <discover-item v-for="item in info.recommendInformationList" :key="item.id" :data="item"/>
      </div>
    </div>-->
    <!-- 悬浮工具栏 -->
    <div class="van-hairline--top tools-bar">
      <div class="tool-item" @click="editClickHandler">
        <i class="icon iconfont icon-me_opinion"></i>
        编辑
      </div>
      <div class="tool-item" @click="collectHandler()">
        <i v-if="collectionStatus===1" class="icon iconfont icon-Building_details_col"></i>
        <i v-else class="icon iconfont icon-Building_details_col1"></i>
        收藏
      </div>
      <div class="tool-item">
        <i class="icon iconfont icon-Building_details_for"></i>
        分享
      </div>
    </div>
    <van-popup
      class="popup-view"
      v-model="openPopup"
      :overlay="true"
      :lock-scroll="true"
      :close-on-click-overlay="true"
      :click-overlay="popupShowControl(false)"
    >
      <div class="close-titile">
        <img class="closePopup" :src="this.closeImg" @click="popupShowControl(false)">
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
  </div>
</template>
<script>
import AgentCardSmall from 'COMP/Discover/AgentCardSmall'
import AgentCard from 'COMP/AgentCard'
import TitleBar from 'COMP/TitleBar/'
import DiscoverItem from 'COMP/DiscoverItem'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters } from 'vuex'
import discoverService from 'SERVICE/discoverService'
import userService from 'SERVICE/userService'
export default {
  components: {
    AgentCardSmall,
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
    openPopup: true,
    closeImg: require('IMG/user/close_popup.png'),
    qrcodeInfo: {},
    shareData: null,
    virtualDom: null,
    num: 320,
    easylookList: ['张佳玮','静静','路遥|AW大师','小风风','坑坑','辣椒','A链家-小李','小锅锅mike','红色诺亚','贾班王','中原-小陈']
  }),
  created() {
    window.awHelper.wechatHelper.wx.showOptionMenu()
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
      host = host + '#/article/' + this.id + '/' + encodeURI(this.city) + '?agentId=' + this.info.agentId + '&enterpriseId=' + this.enterpriseId
      this.shareData = {
        title: this.info.title,
        imgUrl: this.info.image,
        link: host
      }
      this.shareHandler()
      this.virtualDom = document.createElement('div')
      this.virtualDom.innerHTML = this.info.content
      console.log(this.virtualDom)
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
    popupShowControl(status) {
      this.openPopup = status
    },

    // 好看点击事件
    easyLookClickHandler() {

    },
    // 举报反馈
    feedbackClickHandler() {
      // this.$router.push({path:`/discover/edit/${this.$route.params.id}/${this.$route.params.city}`,query:this.$route.query})
    },
    // 收藏文章按钮点击
    async collectHandler() {
      const deleteType = this.collectionStatus === 0 ? 0 : 1
      const res = await userService.articleCollection({
        infoId: this.infoId,
        deleteType
      })
      this.collectionStatus = res.deleteType === 0 ? 1 : 0
      if (this.collectionStatus) {
        this.$toast('收藏成功')
      } else {
        this.$toast('取消收藏成功')
      }
    },
    // 分享成功之后
    async articleShare() {
      let params = {
        deleteType: 0,
        infoId: this.infoId
      }
      const result = await discoverService.articleShare(params)
    },
    // 编辑按钮点击处理
    editClickHandler() {
      this.$router.push({ path: `/discover/edit/${this.$route.params.id}/${this.$route.params.city}`, query: this.$route.query })
    },
    // 设置分享
    async shareHandler() {
      this.shareData.success = this.articleShare
      window.awHelper.wechatHelper.setShare(this.shareData)
    }
  },
  watch: {
    // 当前页面跳转当前页面不会自动刷新 所以强制刷新页面
    $route() {
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
    font-size: 16px;
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
    padding-bottom: 50px;
    > .discover-title {
      padding: 10px 15px;
      font-size: 22px;
      color: #333333;
      font-weight: 600;
      line-height: 1.3;
    }
    > .discover-views {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      > .reprint-views {
        color: #969ea8;
        font-size: 14px;
      }
      > .reprint-source {
        color: #969ea8;
        font-size: 14px;
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
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: #8a8f99;
      font-size: 14px;
      padding: 0 15px;
      > .reprint-from {
        padding-left: 5px;
      }
      > .reprint-time {
        padding-right: 15px;
      }
    }
    > .discover-disclaimer {
      padding: 15px;
      color: #969ea8;
      font-size: 14px;
      line-height: 1.5;
    }
    > .agent-card {
      margin-top: 8px;
      margin-bottom: 10px;
    }
    // 好看
    > .easy-look-container {
    margin: 10px 16px;
    > .easy-look-top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      > .easy-look-left {
      }
      > .easy-look-right {
      }
      .easy-look-text {
        color: #445166;
        font-size: 14px;
      }
    }
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
  // 评论
  > .comment-container {
  }
  > .tools-bar {
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    z-index: 5;
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    padding: 5px 15px;
    color: #666666;
    > div {
      text-align: center;
      > i {
        display: block;
        font-size: 24px;
      }
    }
    // > div {
    //   border-radius: 100px;
    //   border: 1px solid #aeb1c2;
    //   margin: 5px;
    //   padding: 8px 20px;
    //   opacity: 0.7;
    // }
  }
}
</style>
