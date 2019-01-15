<template>
  <div class="discover-detail-page">
    <!-- 文章详情和经纪人信息 -->
    <div class="discover-detail-container">
      <h5 class="discover-title">{{info&&info.title}}</h5>
      <div class="discover-views">
        <div class="reprint-views">浏览量：{{ info&&info.scanNum | currency('')}}</div>
        <div class="reprint-source">
          <span>分享源自 </span>
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
        <span class="discover-feedback" style="color:#445166" @click="feedbackClickHandler"> 举报反馈</span>
      </p>
      <!-- 好看 -->
      <div class="easy-look-container">
        <div class="easy-look-top">
          <div class="easy-look-left">
            <div class="bg_img easy-look-icon" :style="{backgroundImage:'url('+easylookImg+')'}"></div>
            <div class="easy-look-text">{{easylookList.length}}人觉得好看</div>
          </div>
        </div>
        <div class="easy-look-list">
          {{easylookList && easylookList.join('、')}}
          <span
            class="easy-look-fold"
            v-if="isMoreLike"
          >展开更多</span>
        </div>
      </div>
      <!-- 评论 -->
      <div class="comment-container">
        <div class="comment-box" v-if="commentList.length">
          <title-bar :conf="titleComments"/>
          <div class="comment-list-wrap">
            <div class="comment-list" v-for="(item, index) in commentList" :key="index">
              <div
                class="bg_img"
                :style="{backgroundImage:'url('+item.senderAvatarUrl+')'}"
                style="backgroundColor:red;width:40px;height:40px;border-radius:50%;"
                @click="commentSenderClickHandler(item)"
              ></div>
              <div class="comment-right">
                <div class="comment-name-wrap">
                  <span
                    class="comment-name"
                    @click="commentSenderClickHandler(item)"
                  >{{item.senderName}}</span>
                  <span
                    v-if="item.receiverName"
                    style="color:#969EA8;font-size:14px;margin-left:8px;margin-right:8px;"
                  >回复</span>
                  <span
                    class="comment-reply"
                    v-if="item.receiverName"
                    @click="commentReceiverClickHandler(item)"
                  >{{item.receiverName}}</span>
                </div>
                <div class="comment-content">{{item.content}}</div>
                <div></div>
              </div>
            </div>
            <div class="comment-list-more" v-if="isMoreComment" @click="moreCommentHandler">查看更多评论</div>
          </div>
        </div>
      </div>
      <!-- 推荐房源 -->
      <div class="recommend-houses">
        <title-bar :conf="titleProperties"/>
        <div class="recommend-houses-content">
          <estate-item v-for="(item,index) in houseList" :key="index" :info="item" @click="popHandler(2)"></estate-item>
        </div>
      </div>
      <!-- TA的写一写 -->
      <div class="recommend-article">
        <title-bar :conf="titleArticle"/>
        <div class="recommend-article-list" v-for="(item, index) in articleList" :key="index">
          <div class="recommend-article-name">{{item.title}}</div>
        </div>
      </div>
    </div>
    <!-- 悬浮工具栏 -->
    <div class="van-hairline--top tools-bar">
      <div class="tool-box">
        <div class="tool-left">
          <avatar class="avatar" :avatar="agentInfo.avatarUrl"></avatar>
          <div class="tool-content">
            <div class="tool-name">{{agentInfo.agentName}}</div>
            <div class="tool-institution">{{agentInfo.institutionName}}</div>
          </div>
        </div>
        <div class="tool-right">在线咨询</div>
      </div>
    </div>
    <open-article :show.sync="guidanceShow"></open-article>
    <agent-card class="agent-card" v-if="agentInfo" :info="agentInfo" @showQRCode="popupShowControl(true)"></agent-card>
  </div>
</template>
<script>
import Avatar from 'COMP/Avatar'
import AgentCard from 'COMP/AgentCard'
import TitleBar from 'COMP/TitleBar/'
import DiscoverItem from 'COMP/DiscoverItem'
import OpenArticle from 'COMP//Guidance/OpenArticle'
import EstateItem from 'COMP/EstateItem'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import discoverService from 'SERVICE/discoverService'
import userService from 'SERVICE/userService'
export default {
  components: {
    Avatar,
    AgentCard,
    TitleBar,
    OpenArticle,
    EstateItem
  },
  data: () => ({
    id: -1,
    city: '',
    info: null,
    agentInfo: null,
    infoId: '', //文章的id
    titleComments: {
      title: '精彩评论',
      linkText: '',
      link: ''
    },
    titleProperties: {
      title: '推荐房源',
      linkText: '',
      link: ''
    },
    titleArticle: {
      title: 'TA的写一写',
      linkText: '',
      link: ''
    },
    openPopup: false,
    closeImg: require('IMG/user/close_popup.png'),
    guidanceShow: false,
    qrcodeInfo: {},
    shareData: null,
    virtualDom: null,
    isMoreLike: true, // 是否有更多好看
    easylookImg: require('IMG/discover/icon_easy_look@2x.png'),
    easylookList: [], // 好看列表
    commentCur: 1,
    commentSize: 5,
    isMoreComment: false,
    commentList: [], // 评论列表
    selectCommentId: '', // 选中的评论ID
    commentContent: '', // 评论内容
    isShowDeleteComment: false, // 是否显示删除评论上拉菜单
    actions: [{ name: '删除评论', className: 'comment-delete' }],
    showCommentAlert: false, // 是否显示评论输入框
    commentInfo: null,
    commentIds: [], // 评论Ids
    houseList: [], // 房源列表
    articleList: [], // 文章列表
  }),
  created() {
    window.awHelper.wechatHelper.wx.showOptionMenu()
    this.id = this.$route.params.id
    this.city = this.$route.params.city
    this.agentId = this.$route.query.agentId
    this.enterpriseId = this.$route.query.enterpriseId
    this.getDetail()
    this.getLikeList()
    this.getCommentList()
    this.getArticleList()
    // this.getQrCode(this.agentId)
    this.shareHandler()
  },
  methods: {
    async getDetail() {
      const res = await discoverService.getDiscoverDetailForH5(this.id, this.city, this.enterpriseId, this.agentId, 1)
      this.info = res

      this.infoId = res.id

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
    },
    // 好看列表
    async getLikeList() {
      const res = await discoverService.queryLikeList(this.id)
      if (res && res.length > 0) {
        for (var index in res) {
          let item = res[index]
          this.easylookList.push(item.userName)
        }
      }
    },
    // 评论列表
    async getCommentList() {
      const res = await discoverService.commentList(this.commentCur, this.commentSize, this.id)
      if (res.pages <= this.commentCur) {
        this.isMoreComment = false
      } else {
        this.isMoreComment = true
      }
      if (this.commentCur > 1) {
        this.commentList = this.commentList.concat(res.records)
      } else {
        this.commentList = res.records
      }
      if (this.commentList && this.commentList.length > 0) {
        this.commentCur++
      }
    },
    // 查看更多评论
    moreCommentHandler() {
      this.getCommentList()
    },
    // TA的写一写
    async getArticleList() {
      const res = await discoverService.queryArticleListForH5(this.agentId, this.enterpriseId, this.id)
      this.articleList = res
    },
    async getQrCode(agentId) {
      const result = await userService.getQrCode(agentId)
      if (result) {
        this.qrcodeInfo = result
      }
    },
    popupShowControl(val) {
      
    },
    // 弹出框
    popHandler(val) {
      if (val == 1) {
        // 名片
      }else if (val == 2) {
        // 楼盘
      }else {
        // 文章
      }
    },
    // 关闭弹出框
    overlayClose() {
      this.openPopup = false
    },

    // 举报反馈
    feedbackClickHandler() {
      this.$router.push({ path: '/discover/reportFeedback', query: { id: this.infoId } })
    },

    // 分享之后调用
    async articleShare() {
      let params = {
        deleteType: 0,
        infoId: this.infoId
      }
      const result = await discoverService.articleShare(params)
    },
    // 分享
    async shareHandler() {
      await window.awHelper.wechatHelper.init()
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
.discover-detail-page {
  background-color: #f7f9fa;
  > .discover-detail-container {
    background-color: #fff;
    padding-bottom: 65px;
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
      padding: 10px 16px 20px 16px;
      border-bottom: 10px solid #f7f9fa;
      > .easy-look-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        > .easy-look-left {
          display: flex;
          flex-direction: row;
        }
        > .easy-look-right {
          display: flex;
          flex-direction: row;
        }
        .easy-look-icon {
          width: 16px;
          height: 16px;
          margin-right: 4px;
        }
        .easy-look-text {
          color: #445166;
          font-size: 14px;
        }
      }
      > .easy-look-list {
        padding-left: 24px;
        padding-top: 8px;
        line-height: 1.5;
        color: #445166;
        font-size: 14px;
        width: 260px;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
    // 评论
    > .comment-container {
      border-bottom: 10px solid #f7f9fa;
      > .comment-box {
        padding-top: 10px;
        > .comment-list-wrap {
          margin-top: 20px;
          padding: 0 16px;
          > .comment-list {
            width: 100%;
            display: flex;
            flex-direction: row;
            margin-bottom: 20px;
            > .comment-right {
              width: 85%;
              margin-left: 8px;
              display: flex;
              flex-direction: column;
              > .comment-name-wrap {
                height: 20px;
                display: flex;
                > .comment-name {
                  color: #333333;
                  font-size: 14px;
                  font-weight: bold;
                }
                > .comment-reply {
                  color: #333333;
                  font-size: 14px;
                }
              }
              > .comment-content {
                color: #333333;
                font-size: 14px;
                margin-top: 3px;
              }
            }
          }
          > .comment-list-more {
            color: #969ea8;
            font-size: 14px;
            margin: 20px 0;
            text-align: center;
          }
        }
      }
    }
    // 推荐房源
    > .recommend-houses {
      background-color: #fff;
      margin-top: 10px;
      border-bottom: 10px solid #f7f9fa;
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
    // TA的写一写
    > .recommend-article {
      background-color: #fff;
      margin: 10px 0 30px;
      padding: 10px 0px;
      .recommend-article-list {
        margin: 15px 0;
      }
    }
  }

  .comment-delete {
    color: #ea4d2e;
    font-size: 16px;
  }
  // 悬浮
  > .tools-bar {
    width: 100%;
    height: 72px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    z-index: 5;

    > .tool-box {
      padding: 14px 16px;
      width: 100%;
      > .tool-left {
        position: absolute;
        left: 16px;
        top: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
        > .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        > .tool-content {
          margin-left: 7px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          > .tool-name {
            color: #333333;
            font-size: 15px;
            height: 21px;
          }
          > .tool-institution {
            color: #969ea8;
            font-size: 12px;
          }
        }
      }
      > .tool-right {
        position: absolute;
        right: 16px;
        top: 14px;
        width: 88px;
        height: 44px;
        line-height: 44px;
        border-radius: 6px;
        background-color: #007ae6;
        color: #fff;
        font-size: 14px;
        text-align: center;
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
