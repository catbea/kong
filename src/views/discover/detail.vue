<template>
  <div class="discover-detail-page">
    <!-- 文章详情和经纪人信息 -->
    <div class="discover-detail-container">
      <h5 class="discover-title">{{info&&info.title}}</h5>
      <div class="discover-views">
        <div class="reprint-views">浏览量：{{ info&&info.scanNum | currency('')}}</div>
        <div class="reprint-source">
          <span>分享源自</span>
          <span style="color:#445166">AW大师写一写</span>
        </div>
      </div>
      <!-- 观点 -->
      <div class="discover-viewpoint" v-if="editData&&editData.viewpoint" @click="popHandler(1)">
        <div class="viewpoint-line"></div>
        <div class="viewpoint-top">
          <div style="color:#333333;font-size:18px;font-weight:bold;">观点</div>
          <div class="viewpoint-right">
            <avatar class="avatar" :avatar="agentInfo&&agentInfo.avatarUrl"></avatar>
            <div class="viewpoint-name">
              <span style="color:#333;font-size:14px">{{agentInfo.agentName}}</span>
              <span style="color:#969EA8;font-size:14px">点评</span>
            </div>
          </div>
        </div>
        <div class="viewpoint-content">{{editData&&editData.viewpoint}}</div>
      </div>
      <div class="discover-detail-content" v-html="info&&info.content"></div>
      <p class="discover-extra-info">
        <span class="reprint-from">{{info&&info.publisher}}</span>
        <span class="reprint-time">{{info&&info.createDate | dateTimeFormatter(3, '/')}}</span>
      </p>
      <p class="discover-disclaimer">
        <span class="disclaimer-text">免责声明：文章信息均来源网络，本平台对转载、分享的内容、陈述、观点判断保持中立，不对所包含内容的准确性、可靠性或完善性提供任何明示或暗示的保证，仅供读者参考，本公众平台将不承担任何责任。 如有问题请点击</span>
        <span class="discover-feedback" style="color:#445166" @click="feedbackClickHandler">举报反馈</span>
      </p>
      <!-- <agent-card class="agent-card" v-if="agentInfo" :info="agentInfo" @showQRCode="popupShowControl(true)"></agent-card> -->
      <!-- 好看 -->
      <div class="easy-look-container" v-if="easylookList.length>0">
        <div class="easy-look-top">
          <div class="easy-look-left">
            <span class="icon iconfont icon-found_like"></span>
            <div class="easy-look-text">{{easylookList.length}}人觉得好看</div>
          </div>
          <div class="easy-look-right" @click="easyLookClickHandler">
            <span class="icon iconfont icon-found_like_pre" v-if="likeFlag"></span>
            <span class="icon iconfont icon-found_like" v-else></span>
            <div class="easy-look-text">好看</div>
          </div>
        </div>
        <div class="easy-look-list">
          <span ref="easyLook" :class="isMoreLike ? 'easy-look-name-clamp': 'easy-look-name'">{{easylookList && easylookList.join('、')}}</span>
          <div
            class="easy-look-fold"
            v-if="isMoreLike" @click="moreLikeListHandler"
          >展开更多<van-icon name="arrow-down"/></div>
          <span class="easy-look-name" :class="isMoreLike ? 'easy-look-name-clamp': 'easy-look-name'">{{easylookList && easylookList.join('、')}}</span>
          <div class="easy-look-fold" v-if="isMoreLike" @click="moreLikeListHandler">展开更多
            <van-icon name="arrow-down"/>
          </div>
        </div>
      </div>
      <!-- 评论 -->
      <div class="comment-container">
        <div class="comment-box">
          <title-bar :conf="titleComments"/>
          <div class="comment-list-wrap" v-if="commentList.length">
            <div class="comment-list" v-for="(item, index) in commentList" :key="index" @click="commentSenderClickHandler(item)">
              <div
                class="bg_img"
                :style="{backgroundImage:'url('+item.senderAvatarUrl+')'}"
                style="backgroundColor:red;width:40px;height:40px;border-radius:50%;"
              ></div>
              <div class="comment-right">
                <div class="comment-name-wrap">
                  <span
                    class="comment-name"
                  >{{item.senderName}}</span>
                  <span
                    v-if="item.receiverName"
                    style="color:#969EA8;font-size:14px;margin-left:8px;margin-right:8px;"
                  >回复</span>
                  <span
                    class="comment-reply"
                    v-if="item.receiverName"
                  >{{item.receiverName}}</span>
                </div>
                <div class="comment-content">{{item.content}}</div>
                <div></div>
              </div>
            </div>
            <div class="comment-list-more" v-if="isMoreComment" @click="moreCommentHandler">查看更多评论</div>
          </div>
        </div>
        <div class="comment-input-wrap">
          <!-- <textarea class="comment-textarea" placeholder="我来说两句" maxlength="140" rows="5" @focus="focusHandler"></textarea> -->
          <div class="comment-textarea" @click="commentClickHandler">
            <div style="color:#969EA8;font-size:14px;">我来说两句</div>
          </div>
        </div>
      </div>
    </div>
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
      <div class="tool-item" @click="shareHandler">
        <i class="icon iconfont icon-Building_details_for"></i>
        分享
      </div>
    </div>
    <van-actionsheet v-model="isShowDeleteComment" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="onCancel"></van-actionsheet>
    <open-article :show.sync="guidanceShow"></open-article>
    <comment-alert :show.sync="showCommentAlert" :info="commentInfo" @cancel="cancelHandler" @publish="publishHandler" @input="inputHandler"></comment-alert>
  </div>
</template>
<script>
import TitleBar from 'COMP/TitleBar/'
import OpenArticle from 'COMP//Guidance/OpenArticle'
import CommentAlert from 'COMP//Discover/CommentAlert'
import { uuid } from '@/utils/tool'
import { mapGetters } from 'vuex'
import discoverService from 'SERVICE/discoverService'
import userService from 'SERVICE/userService'
import articleService from 'SERVICE/articleService'
export default {
  components: {
    TitleBar,
    OpenArticle,
    CommentAlert
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
    editData: null, // 经纪人文章编辑json数据，包括评论，插入楼盘等内容
    infoId: '', //文章的id
    collectionStatus: -1, //收藏状态
    likeFlag: false, // 是否点赞
    titleComments: {
      title: '精彩评论',
      linkText: '',
      link: ''
    },
    guidanceShow: false,
    qrcodeInfo: {},
    shareData: null,
    virtualDom: null,
    isMoreLike: true, // 是否有更多好看
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
    shareUuid: ''
  }),
  created() {
    window.awHelper.wechatHelper.wx.showOptionMenu()
    this.id = this.$route.params.id
    this.city = this.$route.params.city
    this.agentId = this.$route.query.agentId
    this.enterpriseId = this.$route.query.enterpriseId
    this.shareUuid = uuid()
    console.log(this.shareUuid)
    if (window.localStorage.getItem('isFirst') == null || window.localStorage.getItem('isFirst') === 'false') {
      this.guidanceShow = true
    } else {
      this.guidanceShow = false
    }
    this.getDetail()
    this.getLikeList()
    this.getCommentList()
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    async getDetail() {
      const res = await discoverService.getDiscoverDetail(this.id)
      this.info = res
      this.infoId = res.id
      this.collectionStatus = res.collectType
      this.likeFlag = res.likeFlag
      this.agentInfo = {
        agentId: this.info.agentId,
        agentName: this.info.agentName,
        avatarUrl: this.info.avatarUrl,
        distributorName: this.info.distributorName,
        enterpriseName: this.info.enterpriseName,
        institutionName: this.info.institutionName
      }
      let host = process.env.VUE_APP_APP_URL
      host = host + '#/article/' + this.id + '/' + encodeURI(this.city) + '?agentId=' + this.info.agentId + '&enterpriseId=' + this.enterpriseId + '&shareUuid=' + this.shareUuid
      this.shareData = {
        title: this.info.title,
        imgUrl: this.info.image,
        link: host
      }
      if(this.info.editData !== '') this.editData = JSON.parse(this.info.editData)
      this.setShare()
      this.virtualDom = document.createElement('div')
      this.virtualDom.innerHTML = this.info.content
       
      console.log(this.virtualDom)
    },
    // 好看列表
    async getLikeList() {
      const res = await discoverService.queryLikeListByToken(this.id)
      if (res && res.length > 0) {
        for (var index in res) {
          let item = res[index]
          this.easylookList.push(item.userName)
        }
        this.$nextTick(() => {
          console.log(this.$refs.easyLook.offsetHeight)
          let height = this.$refs.easyLook.offsetHeight
          if (height <= 79) {
            this.isMoreLike = false
          }else {
            this.isMoreLike = true
          }
        })
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
        if (this.commentIds && this.commentIds.length > 0) {
          this.filterComment()
        }
      }
    },
    // 修改评论的状态(删除自己的评论)
    async updateCommentStatus() {
      const res = await discoverService.updateCommentStatus(this.selectCommentId, 3)
      this.commentList = this.removeObject(this.commentList, this.selectCommentId)
    },
    // 新增评论
    async insertComment(receiver) {
      let param = {
        enterpriseId: this.enterpriseId,
        infoId: this.infoId,
        parentId: receiver ? receiver.parentId : '',
        content: this.commentContent,
        senderId: this.agentId,
        senderSource: 0, // 0-企业微信；1-小程序
        receiverId: receiver ? receiver.receiverId : '',
        receiverSource: receiver ? receiver.receiverSource : '',
        type: receiver.type // 0-评论，1-回复
      }
      const res = await discoverService.insertComment(param)
      this.commentIds.push(res.id)
      this.commentList.push(res)
    },

    // 好看取消好看/点击事件
    async easyLookClickHandler() {
      this.likeFlag = !this.likeFlag
      let param = {
        infoId: this.id,
        likeFlag: this.likeFlag === true ? 1 : 0
      }
      const res = await articleService.updateLike(param)
      if (this.likeFlag) {
        this.easylookList.unshift(this.agentInfo.agentName)
      } else {
        this.easylookList = this.remove(this.easylookList, this.agentInfo.agentName)
      }
    },
    // 展开更多好看
    moreLikeListHandler() {
      this.isMoreLike = false
    },
    // 点击评论
    commentClickHandler() {
      this.showCommentAlert = true
      this.commentInfo = {
        parentId: '',
        receiverId: '',
        receiverName: '',
        receiverSource: '',
        senderId: this.agentId,
        senderSource: 0,
        title: this.info.title,
        placeholder: '分享你的想法',
        type: 0
      }
    },
    // 评论输入框编辑
    inputHandler(commentContent) {
      console.log(commentContent)
      this.commentContent = commentContent
    },
    // 取消评论
    cancelHandler() {
      this.showCommentAlert = false
      this.commentContent = ''
    },
    // 发布评论
    publishHandler() {
      this.showCommentAlert = false
      this.insertComment(this.commentInfo)
      this.commentContent = ''
    },
    // 查看更多评论
    moreCommentHandler() {
      this.getCommentList()
    },
    // 评论发送者
    commentSenderClickHandler(item) {
      this.selectCommentId = item.id
      if (this.agentId == item.senderId) {
        this.isShowDeleteComment = true
        this.showCommentAlert = false
      } else {
        this.isShowDeleteComment = false
        this.showCommentAlert = true
        this.commentInfo = {
          parentId: item.id,
          receiverId: item.senderId,
          receiverName: item.senderName,
          receiverSource: item.senderSource,
          senderId: this.agentId,
          senderSource: 0,
          title: item.content,
          placeholder: '回复' + item.senderName + '：',
          type: 1
        }
      }
    },
    // 评论被回复者
    commentReceiverClickHandler(item) {
      this.selectCommentId = item.id
      if (this.agentId == item.receiverId) {
        this.isShowDeleteComment = true
        this.showCommentAlert = false
      } else {
        this.isShowDeleteComment = false
        this.showCommentAlert = true
        this.commentInfo = {
          parentId: item.id,
          receiverId: item.receiverId,
          receiverName: item.receiverName,
          receiverSource: item.receiverSource,
          senderId: this.agentId,
          senderSource: 0,
          title: item.content,
          placeholder: '回复' + item.receiverName + '：',
          type: 1
        }
      }
    },
    // 删除对象（删除评论）
    removeObject(arr, id) {
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i].id == id) {
          if (i == 0) {
            arr.shift()
            return arr
          } else if (i == len - 1) {
            arr.pop()
            return arr
          } else {
            arr.splice(i, 1)
            return arr
          }
        }
      }
      return arr
    },
    // 删除数组中某个元素
    remove(arr, val) {
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] == val) {
          if (i == 0) {
            arr.shift()
            return arr
          } else if (i == len - 1) {
            arr.pop()
            return arr
          } else {
            arr.splice(i, 1)
            return arr
          }
        }
      }
    },
    // 过滤评论(自己回复的评论前端处理,不取后台的数据)
    filterComment() {
      debugger
      for (var index in this.commentIds) {
        let commentId = this.commentIds[index]
        this.commentList = this.removeObject(this.commentList, commentId)
        console.log(this.commentList)
      }
    },
    // 新增评论待用
    addComment() {
      let commentInfo = {
        parentId: item.id,
        receiverId: item.receiverId,
        receiverName: item.receiverName,
        receiverSource: item.receiverSource,
        senderId: this.agentId,
        senderSource: 0,
        title: this.info.title,
        placeholder: '回复' + item.receiverName + '：',
        type: 1
      }
    },

    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.isShowDeleteComment = false
      this.updateCommentStatus()
    },
    onCancel() {},
    // 举报反馈
    feedbackClickHandler() {
      this.$router.push({ path: '/discover/reportFeedback', query: { id: this.infoId } })
    },
    // 编辑按钮点击处理
    editClickHandler() {
      this.$router.push({ path: `/discover/edit/${this.$route.params.id}/${this.$route.params.city}`, query: this.$route.query })
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
    // 分享按钮点击处理
    shareHandler() {
      this.guidanceShow = true
    },
    // 设置分享
    async setShare() {
      this.shareData.success = this.articleShare
      window.awHelper.wechatHelper.setShare(this.shareData)
    },
    // 分享成功之后
    async articleShare() {
      let params = {
        agentId: this.agentId,
        deleteType: 0, // 1-删除，0-未删除
        enterpriseId: this.enterpriseId,
        infoId: this.infoId,
        shareUuid: this.shareUuid,
        sourceType: 0 // 经纪人-0，客户-1
      }
      const result = await discoverService.articleShare(params)
      // 分享成功之后重新获取新的UUID
      this.shareUuid = uuid()
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
    > .discover-viewpoint {
      border: 1px dashed #969ea8;
      margin: 20px 16px;
      padding: 16px;
      position: relative;
      > .viewpoint-line {
        width: 2px;
        height: 13px;
        background-color: #007ae6;
        position: absolute;
        top: 22px;
        left: 0;
      }
      > .viewpoint-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        > .viewpoint-right {
          display: flex;
          > .viewpoint-name {
            margin-left: 7px;
            margin-top: -5px;
          }
        }
      }
      > .viewpoint-content {
        color: #445166;
        font-size: 16px;
        margin-top: 20px;
        line-height: 1.5;
      }
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
    .van-icon {
    }
    > .easy-look-container {
      padding: 10px 16px 30px 16px;
      // border-bottom: 10px solid #f7f9fa;
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
          margin-left: 4px;
          margin-top: 1px;
        }
      }
      > .easy-look-list {
        margin-left: 20px;
        padding-top: 6px;
        width: 260px;
        position: relative;
        > .easy-look-name-clamp  {
          color: #445166;
          font-size: 14px;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.5;
        }
        > .easy-look-name {
          color: #445166;
          font-size: 14px;
          word-break: break-all;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.5;
        }
        > .easy-look-fold {
          color: #969ea8;
          font-size: 14px;
          position: absolute;
          left: 0;
          bottom: -20px;
        }
      }
    }
    // 评论
    > .comment-container {
      border-top: 10px solid #f7f9fa;
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

      > .comment-input-wrap {
        padding: 10px 16px;
        > .comment-textarea {
          background-color: #f2f6f7;
          border-radius: 6px;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          border: 0;
          width: 100%;
          padding: 0 5px;
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
  .comment-delete {
    color: #ea4d2e;
    font-size: 16px;
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
