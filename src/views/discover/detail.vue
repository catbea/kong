<template>
  <div>
    <Skeleton v-if="!info" showSkeleton='5'/>
    <div class="discover-detail-page" v-if="haveData">
      <!-- 文章详情和经纪人信息 -->
      <div class="discover-detail-container" :style="{height:contentHeight + 'px'}">
        <h5 class="discover-title">{{info&&info.title}}</h5>
        <div class="discover-views">
          <div class="reprint-views">浏览量：{{ info&&info.scanNum | numberFormatter}}</div>
          <div class="reprint-source">
            <span>分享源自</span>
            <span style="color:#445166">AW大师写一写</span>
          </div>
        </div>
        <!-- 观点 -->
        <div class="discover-viewpoint" v-if="editData&&editData.viewpoint">

          <div class="viewpoint-content">{{editData&&editData.viewpoint}}</div>
          <div class="viewpoint-top">
            <div class="viewpoint-right">
              <avatar class="avatar" :avatar="agentInfo&&agentInfo.avatarUrl"></avatar>
              <div class="viewpoint-name">
                <span style="color:#333;font-size:14px">{{agentInfo&&agentInfo.agentName}}</span>
                <span style="color:#9CA5B5;font-size:14px"> 点评</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 文章详情 -->
        <div class="discover-detail-content">
          <div class="edit-box" v-for="(paragraph,index) in renderDom" :key="index">
            <paragraph :info="paragraph"/>
            <estate-item v-if="(index===houseIndex) && (editData&&editData.inlayHouse)" :isInArticle="1" :preview="true" :showCard="true" :info="inlayHouseInfo" ></estate-item>
            <!-- @click.native="popHandler(inlayHouseInfo)" -->
          </div>
        </div>
        <p class="discover-extra-info" v-show="renderDom.length">
          <span class="reprint-from">{{info&&info.publisher}}</span>
          <span class="reprint-time">{{info&&info.createDate | dateTimeFormatter}}</span>
        </p>
        <p class="discover-disclaimer"  v-show="renderDom.length">
          <span class="disclaimer-text">免责声明：文章信息均来源网络，本平台对转载、分享的内容、陈述、观点判断保持中立，不对所包含内容的准确性、可靠性或完善性提供任何明示或暗示的保证，仅供读者参考，本公众平台将不承担任何责任。版权归原作者所有，如有侵权请告知删除。转载请注明以上信息。如有问题请点击 </span>
          <span class="discover-feedback" style="color:#445166" @click="feedbackClickHandler">举报反馈</span>
        </p>
        <!-- 好看 -->
        <div class="easy-look-container">
          <div class="easy-look-top">
            <div class="easy-look-left">
              <img src="../../assets/img/article/leftLike1.png" alt>
              <!-- <span style="color:#999999;font-size:17px;" class="icon iconfont icon-found_like"></span> -->
              <div class="easy-look-text">{{easylookList.length}}人觉得好看</div>
            </div>
            <div class="easy-look-right" @click="easyLookClickHandler">
              <!-- <span style="color:rgb(0, 122, 230);font-size:17px;" class="icon iconfont icon-found_like_pre" v-if="likeFlag"></span>
              <span style="color:#445166;font-size:17px;" class="icon iconfont icon-found_like" v-else></span>-->
              <img src="../../assets/img/article/like2.png" alt v-if="likeFlag">
              <img src="../../assets/img/article/like1.png" alt v-else>
              <div class="easy-look-text">好看</div>
            </div>
          </div>
          <div class="easy-look-list">
            <span ref="easyLook" :class="isMoreLike ? 'easy-look-name-clamp': 'easy-look-name'">{{easylookList && easylookList.join('、')}}</span>
            <div class="easy-look-fold" v-if="isMoreLike" @click="moreLikeListHandler">展开更多
              <van-icon name="arrow-down"/>
            </div>
          </div>
        </div>
        <!-- 推荐房源 -->
        <div class="recommend-houses" v-if="recommendHouseList.length>0">
          <title-bar :conf="{title: '推荐房源'}"/>
          <div class="recommend-houses-content">
            <estate-item v-for="(item,index) in recommendHouseList" :isInArticle="0" :preview="true" :key="index" :info="item"></estate-item>
            <!-- @click="popHandler(item)" -->
          </div>
        </div>
        <!-- 评论 -->
        <div class="comment-container" v-if="this.isPass=='1'">
          <div class="comment-box">
            <title-bar :conf="titleComments"/>
            <div class="comment-list-wrap" v-if="commentList.length">
              <div class="comment-list" v-for="(item, index) in commentList" :key="index" @click="commentSenderClickHandler(item)">
                <div class="bg_img" :style="{backgroundImage:'url('+item.senderAvatarUrl+')'}" style="width:40px;height:40px;border-radius:50%;"></div>
                <div class="comment-right">
                  <div class="comment-name-wrap">
                    <span class="comment-name">{{item.senderName}}</span>
                    <span v-if="item.receiverName" style="color:#969EA8;font-size:14px;margin-left:8px;margin-right:8px;">回复</span>
                    <span class="comment-reply" v-if="item.receiverName">{{item.receiverName}}</span>
                  </div>
                  <div class="comment-content">{{item.content}}</div>
                  <div></div>
                </div>
              </div>
              <div class="comment-list-more" v-if="isMoreComment" @click="moreCommentHandler">查看更多评论</div>
            </div>
          </div>
          <div class="comment-input-wrap">
            <div class="comment-textarea" @click="commentClickHandler">
              <div style="color:#969EA8;font-size:14px;">我来说两句</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 悬浮工具栏 -->
      <div class="van-hairline--top tools-bar">
        <div class="tool-item" @click="editClickHandler">
          <i class="icon iconfont icon-found_editor"></i>
          <p>{{info&&(info.source == 0 || info.source == 1)&&info.belongeder === '' ? '编辑' : '更新编辑'}}</p>
        </div>
        <div v-if="info&&(info.source == 0 || info.source == 1)&&info.belongeder === ''" class="tool-item" @click="collectHandler()">
          <i v-if="collectionStatus===1" style="color:#007AE6;" class="icon iconfont icon-Building_details_col"></i>
          <i v-else class="icon iconfont icon-Building_details_col1"></i>
          <p>收藏</p>
        </div>
        <div class="tool-item" v-if="info&&(info.source != 0 || info.source != 1)&&(info.agentId === info.belongeder)" @click="delHandler">
          <i class="icon iconfont icon-delete"></i>
          <p>删除下架</p>
        </div>
        <div class="tool-item" @click="shareHandler">
          <i class="icon iconfont icon-Building_details_for"></i>
          <p>分享</p>
        </div>
      </div>
      <van-actionsheet v-model="isShowDeleteComment" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="onCancel"></van-actionsheet>
      <!-- <open-article :show.sync="guidanceShow"></open-article> -->
      <comment-alert :show.sync="showCommentAlert" :info="commentInfo" :maxlength="140" @cancel="cancelHandler" @publish="publishHandler" @input="inputHandler"></comment-alert>
      <div class="loading" v-show="!renderDom.length">
        <van-loading type="spinner" color="white" class="van-loading"/>
      </div>
      <!-- 活动小程序二维码 -->
      <van-popup v-model="showPopup">
        <div class="mini-qrcode">
          <div style="background-color:#fff;">
            <div class="poster">
              <div class="logo">
                <img src="../../assets/img/discover/logo.png" alt="">
              </div>
              <div class="pic">
                <img :src="popupData.linkerUrl" alt="">
              </div>
              <div class="coupon">
                <img src="../../assets/img/discover/coupon.png" alt="">识别二维码领取卡券
              </div>
            </div>
            <div class="market-info scale-1px-bottom">
              <p class="title"><span class="name">{{popupData.linkerName}}</span><span v-if="popupData.price==='0 万元/套起' || popupData.price==0 || popupData .price=='0 元/㎡'">价格待定</span><span class="price" v-else>{{popupData.price}}{{popupData.priceUnit}}</span></p>
              <p class="tags"><span v-for="(item,index) in popupData.linkerTags">{{item}}</span></p>
            </div>
            <div class="user-info">
              <div class="qrcode">
                <img :src="miniQrcode" alt="">
              </div>
              <div class="user-detail">
                <p class="name" v-if="agentInfo"><img :src="agentInfo.avatarUrl" alt=""> <span>{{agentInfo.agentName}}</span> <span class="other">一手房源信息</span></p>
                <p class="tips">识别小程序码，进入查看<span>楼盘详情</span></p>
              </div>
            </div>
          </div>
          
          <div class="close" @click="showPopup=false">
            <!-- <img src="../../assets/img/discover/close.png" alt=""> -->
            <van-icon name="clear" size="35px" />
          </div>
        </div>
      </van-popup>
    </div>
    <div v-else>
      <null :nullIcon="nullIcon" :nullcontent="nullcontent"></null>
    </div>
  </div>
</template>
<script>
import Avatar from 'COMP/Avatar'
import TitleBar from 'COMP/TitleBar/'
import OpenArticle from 'COMP//Guidance/OpenArticle'
import CommentAlert from 'COMP//Discover/CommentAlert'
import Null from 'COMP/Null'
import { uuid } from '@/utils/tool'
import { remove, uniq } from 'lodash'
import { mapGetters } from 'vuex'
import discoverService from 'SERVICE/discoverService'
import userService from 'SERVICE/userService'
import articleService from 'SERVICE/articleService'
import cpInformationService from 'SERVICE/cpInformationService'
import EstateItem from 'COMP/EstateItem/indexInArtcile'
import Paragraph from 'COMP/Discover/Paragraph'
export default {
  components: {
    TitleBar,
    OpenArticle,
    CommentAlert,
    Avatar,
    EstateItem,
    Paragraph,
    Null
  },
  data: () => ({
    isInArticle:1,//是否是文章中的楼盘  1 是 ，非 1 否
    haveData: true,
    nullIcon: require('IMG/article/empty_article@2x.png'),
    nullcontent: '该文章已被下架删除',
    swiperOption: {
      slidesPerView: 2,
      spaceBetween: 12,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    },
    contentHeight: 0,
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
    qrcodeInfo: {},
    friendShareData: null, // 好友分享数据
    timelineShareData: null, // 朋友圈分享数据
    virtualDom: null,
    isMoreLike: false, // 是否有更多好看
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
    shareUuid: '',
    isPass: '',
    recommendHouseList: [], // 推荐房源列表
    renderDom: [],
    inlayHouseInfo: null, // 文章插入楼盘信息
    sharePrompt: true,
    startY: '',
    endY: '',
    showPopup: false,
    popupData: '',
    miniQrcode: ''
  }),
  created() {
    this.contentHeight = window.innerHeight - 72
    window.awHelper.wechatHelper.wx.showOptionMenu()
    this.id = this.$route.params.id
    this.city = this.$route.params.city
    this.agentId = this.$route.query.agentId
    this.enterpriseId = this.$route.query.enterpriseId
    this.shareUuid = uuid()
    if (window.localStorage.getItem('isFirst') == null || window.localStorage.getItem('isFirst') === 'false') {
      this.$store.commit('SHARE_PROMPT', true)
      window.localStorage.setItem('isFirst', true)
    } else {
      this.$store.commit('SHARE_PROMPT', false)
    }
    this.getDetail()
    this.getLikeList()
    this.getCommentList()
  },
  computed: {
    ...mapGetters(['userInfo']),
    houseIndex () {
      let index = parseInt(this.renderDom.length / 3) - 1
      return index < 0 ? 0 : index
    }
  },
  methods: {
    // 浏览器回退监听
    goBack () {
      this.$router.replace({path: '/write-article'});
    },
    // 显示小程序二维码
    popHandler (data) {
      this.popupData = data
      this.showPopup = true
      discoverService.queryLinkerQrcodeByToken({
        linkerId: data.linkerId
      }).then(res => {
        this.miniQrcode = res.qrCode
      }).catch()
    },
    async getDetail() {
      const res = await discoverService.getDiscoverDetail(this.id)
      if (res.returnCode == 10028) {
        this.haveData = false
        return
      }
      this.haveData = true
      this.info = res
      this.infoId = res.id
      this.collectionStatus = res.collectType
      this.likeFlag = res.likeFlag
      this.isPass = res.status

      this.agentInfo = {
        agentId: this.info.agentId,
        agentName: this.info.agentName,
        avatarUrl: this.info.avatarUrl,
        distributorName: this.info.distributorName,
        enterpriseName: this.info.enterpriseName,
        institutionName: this.info.institutionName
      }
      let host = process.env.VUE_APP_APP_URL
      host = host + 'aw-h5/#/article/' + this.id + '/' + encodeURI(this.city) + '?agentId=' + this.info.agentId + '&enterpriseId=' + this.enterpriseId + '&shareUuid=' + this.shareUuid
      let content = this.info.content.replace(/<[^>]+>/g, '').replace(/\s+/g, '')
      content = res.subTitle? res.subTitle : content? content.substr(0,32) : '我正在AW大师看文章，你也快来看看吧。'
      this.friendShareData = {
        title: this.info.title,
        desc: content,
        imgUrl: this.info.image,
        link: host
      }
      this.timelineShareData = {
        title: this.info.title,
        desc: '',
        imgUrl: this.info.image,
        link: host
      }
      if (this.info.editData !== '') this.editData = JSON.parse(this.info.editData)
      this.handleLinkerInfo()
      this.setShare()
      this.virtualDom = document.createElement('div')
      this.virtualDom.innerHTML = this.info.content

      // 创建虚拟dom解析html结构
      let virtualDom = document.createElement('div')
      virtualDom.innerHTML = this.info.content.replace(/&lt;/g,'<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
      // console.log(this.info.content)
      // 去掉嵌套空标签
      while (/<([a-z]+?)(?:\s+?[^>]*?)?>\s*?<\/\1>/ig.test(virtualDom.innerHTML)) {
        virtualDom.innerHTML = virtualDom.innerHTML.replace(/<([a-z]+?)(?:\s+?[^>]*?)?>\s*?<\/\1>/ig,'')
      }

      for (let dom of virtualDom.children) {
        if(dom.tagName == 'META') {
          continue
        }
        if(dom.tagName == 'STYLE' || dom.tagName == 'LINK') {
          // console.log(dom, dom.tagName)
          let head = document.getElementsByTagName("head")[0]
          if(dom.tagName == 'STYLE') {
            let style = document.createElement("style");
            style.type = "text/css";
            let styleStr = dom.innerHTML.replace(/body\{[^\}]*\}/g,"").replace(/\*\{[^\}]*\}/g,"")
            style.appendChild(document.createTextNode(styleStr))
            head.appendChild(style)
          } else {
            head.appendChild(dom)
          }
          continue
        }
        if(dom.innerHTML.indexOf('<!--VIDEO_') == 0) {
            let videoKey = dom.innerHTML.replace('<!--', '').replace('-->', '')
            this.renderDom.push({
              text: '<video src="'+this.info.fileUrlMap[videoKey]+'" controls="controls" />',
              status: 'h5'
            })
        } else {
          if (dom.innerHTML) {
            this.renderDom.push({
              text: '<section style="'+dom.style.cssText+'">'+dom.innerHTML+'</section>',
              status: 'h5'
            })
          }
          
          // this.renderDom.push({
          //     text: '<'+dom.tagName+' style="'+dom.style.cssText+'">'+dom.innerHTML+'</'+dom.tagName+'>',
          //     status: 'h5'
          // })
        }
      }
    },
    // 楼盘信息处理
    async handleLinkerInfo() {
      // 查询插入楼盘的信息
      if (this.editData) {
        // 编辑文章分享
        if (this.editData.inlayHouse && this.editData.inlayHouse !== '') {
          const res = await this.getLinkerInfo(this.editData.inlayHouse)
          
          this.inlayHouseInfo = res[0]

        }

        if (this.editData.recommendHouse && this.editData.recommendHouse.length > 0) {
          let res = await this.getLinkerInfo(this.editData.recommendHouse.join(','))
          res.map((item)=>{
            if (item.linkerTags) {
              let statusArr = ['热销中', '即将发售', '', '售罄']
              item.linkerTags = [statusArr[item.saleStatus], ...item.linkerTags].splice(0,3);
            }
          })
          this.recommendHouseList = res;

        }
      } else {
        // 原文章分享
        // this.recommendHouseList = await this.getLinkerInfo(this.agentId, this.enterpriseId, this.shareUuid, '')
      }
    },
    itemData(item) {
      let temp = item;
      console.log(temp);
      if (temp.linkerTags) {
        let statusArr = ['热销中', '即将发售', '', '售罄']
        temp.linkerTags = [statusArr[temp.saleStatus], ...temp.linkerTags]
      }
      while (temp.linkerTags.length > 3) {
        temp.linkerTags.pop()
      }
      return temp
    },
    // 查询楼盘信息
    async getLinkerInfo(linkerIds) {
      const res = await discoverService.queryLinkerListByIds(linkerIds)
      return res
    },
    // 好看列表
    async getLikeList() {
      const res = await discoverService.queryLikeListByToken(this.id)
      if (this.easylookList && this.easylookList.length > 0) {
        this.easylookList = []
      }
      if (res && res.length > 0) {
        for (var index in res) {
          let item = res[index]
          this.easylookList.push(item.userName)
        }
        this.$nextTick(() => {
          let height = this.$refs.easyLook&&this.$refs.easyLook.offsetHeight || 0
          if (height <= 85) {
            this.isMoreLike = false
          } else {
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
      if (res.likeFlag && res.shareFlag == false) {
        // 代表好看列表中当前经纪人是分享的
        // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度
        this.easylookList.unshift(this.agentInfo.agentName)
      } else if (res.likeFlag == false && res.shareFlag == false) {
        // 代表好看列表中当前经纪人是分享的
        this.easylookList = remove(this.easylookList, n => {
          return n !== this.agentInfo.agentName
        })
      }
      this.easylookList = uniq(this.easylookList)
      console.log(this.easylookList)
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
        type: 0,
        contentHeight: window.screen.height - 64
      }
    },
    // 评论输入框编辑
    inputHandler(commentContent) {
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
          title: item.senderName + '：' + item.content,
          placeholder: '回复' + item.senderName + '：',
          type: 1,
          contentHeight: window.screen.height - 64
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
          title: item.receiverName + '：' + item.content,
          placeholder: '回复' + item.receiverName + '：',
          type: 1,
          contentHeight: window.screen.height - 64
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
    // remove(arr, val) {
    //   for (var i = 0, len = arr.length; i < len; i++) {
    //     if (arr[i] == val) {
    //       if (i == 0) {
    //         arr.shift()
    //         return arr
    //       } else if (i == len - 1) {
    //         arr.pop()
    //         return arr
    //       } else {
    //         arr.splice(i, 1)
    //         return arr
    //       }
    //     }
    //   }
    // },
    // 过滤评论(自己回复的评论前端处理,不取后台的数据)
    filterComment() {
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
      this.$router.replace({ path: `/discover/edit/${this.$route.params.id}/${this.$route.params.city}`, query: this.$route.query })
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
      this.$store.commit('SHARE_PROMPT', true)
    },
    // 设置分享
    async setShare() {
      
      this.friendShareData.success = this.articleShare
      this.timelineShareData.success = this.articleShare
      this.friendShareData.cancel = this.articleShare
      this.timelineShareData.cancel = this.articleShare

      window.awHelper.wechatHelper.setShare(this.friendShareData, this.timelineShareData)
    },
    async insertShareInfo() {
      let linkerIds = []
      if (this.editData && this.editData.recommendHouse && this.editData.recommendHouse.length > 0) {
        linkerIds = this.editData.recommendHouse
      }
      let params = {
        agentId: this.agentId,
        deleteType: 0, // 1-删除，0-未删除
        enterpriseId: this.enterpriseId,
        infoId: this.infoId,
        linkerIds: linkerIds,
        shareUuid: this.shareUuid,
        sourceType: 0 // 经纪人-0，客户-1
      }
      // alert('share'+this.agentId+' '+this.enterpriseId+' '+this.infoId+' '+this.shareUuid+' ')
      const result = await discoverService.articleShare(params)
      // 分享成功之后重新获取新的UUID
      this.shareUuid = uuid()
      // 分享成功之后获取最新好看列表
      this.getLikeList()
    },
    // 分享成功之后
    async articleShare() {
      setTimeout(()=>{// 成功回调后500毫秒再调接口
        this.insertShareInfo()
      }, 500)
    },
    // 文章删除
    delHandler() {
      this.$dialog
        .confirm({
          title: '是否删除下架',
          message: '删除下架文章会导致已发布出去的文章失效'
        })
        .then(async () => {
          const res = await cpInformationService.updateEnableByInfoId(this.info.agentId, this.info.id)
          this.$toast('删除成功')
          setTimeout(() => {
            // this.$router.push('/user/articles/historicalArticles?typeCode=2')
            this.$router.go(-1)
          }, 1000)
        })
    },
    touchHandler(e) {
      return e.preventDefault()
    }
  },
  watch: {
    // 当前页面跳转当前页面不会自动刷新 所以强制刷新页面
    $route() {
      location.reload()
    }
  },
  mounted() {
    if(this.$route.query.type==1){
       this.$store.commit('SHARE_PROMPT', true)
    }
    document.querySelector('.tools-bar').addEventListener(
      'touchmove',
      this.touchHandler,
      { passive: false }
    )
    // if (window.history && window.history.pushState) {
    //   history.pushState(null, null, document.URL);
    //   window.addEventListener('popstate', this.goBack, false);
    // }
  },
  beforeDestroy() {
    this.$store.commit('SHARE_PROMPT', false)
    try {
      document.querySelector('.tools-bar').removeEventListener('touchmove',this.touchHandler,false)
      // window.removeEventListener('popstate', this.goBack, false)
    } catch (error) {}
  }
}
</script>
<style lang="less" scoped>
.discover-detail-page {
  box-sizing: border-box;
  background-color: #f7f9fa;
  -webkit-overflow-scrolling: touch;
  > .discover-detail-container {
    background-color: #fff;
    padding-bottom: 20px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 70px;
    overflow-y: scroll;
    box-sizing: border-box;
    overflow-x: hidden;
    > .discover-title {
      padding: 10px 15px;
      font-size: 22px;
      color: #333333;
      font-weight: 600;
      line-height: 1.3;
      box-sizing: border-box;
    }
    > .discover-views {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      box-sizing: border-box;
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
      margin: 20px 16px;
      margin-bottom: 5px;
      margin-top: 30px;
      padding-left: 16px;
      position: relative;
      box-sizing: border-box;
      border-left: 3px solid rgba(150,158,168, 0.4);
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
        margin-top: 8px;
        > .viewpoint-right {
          display: flex;
          > .viewpoint-name {
            margin-left: 7px;
            margin-top: -5px;
          }
        }
      }
      > .viewpoint-content {
        color: #13284D;
        font-size: 16px;
        font-weight: bold;
        line-height: 1.5;
        word-wrap: break-word;
      }
    }
    > .discover-detail-content {
      padding: 15px;
      // padding-bottom:0px;
      font-size: 16px;
      color: #333333;
      font-weight: 400;
      line-height: 28px;
      div,section{
        width: auto !important;
      }
      img{
        height: auto !important;
      }
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
    > .easy-look-container {
      padding: 10px 16px 32px 16px;
      // border-bottom: 10px solid #f7f9fa;
      > .easy-look-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 4px;
        > .easy-look-left {
          display: flex;
          flex-direction: row;
          img {
            width: 16px;
            height: 16px;
          }
        }
        > .easy-look-right {
          display: flex;
          flex-direction: row;
          img {
            width: 16px;
            height: 16px;
          }
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
          font-weight: 600;
        }
      }
      > .easy-look-list {
        margin-left: 20px;
        padding-top: 6px;
        position: relative;
        width: 300px;
        > .easy-look-name-clamp {
          color: #445166;
          font-size: 14px;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.5;
          // font-weight: 600;
        }
        > .easy-look-name {
          color: #445166;
          font-size: 14px;
          word-break: break-all;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.5;
          font-weight: 600;
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
          margin-top: 24px;
          padding: 0 16px;
          > .comment-list {
            width: 100%;
            display: flex;
            flex-direction: row;
            margin-bottom: 32px;
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
  .recommend-houses {
    background-color: #fff;
    margin-top: 10px;
    padding-top: 22px;
    border-top: 10px solid #f7f9fa;
    > .recommend-houses-content {
      padding: 16px 15px;
      div:nth-child(n) {
        margin-bottom: 10px;
      }
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
  .tools-bar {
    width: 100%;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    z-index: 5;
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    padding: 15px;
    height: 72px;
    color: #666666;
    > div {
      flex: 1;
      text-align: center;
      > i {
        display: block;
        font-size: 24px;
        width: 100%;
        height: 24px;
        margin-bottom: 4px;
      }
      p {
        transform: scale(0.84);
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
  .loading {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 50px;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 5;
    .van-loading {
      display: inline-block;
      position: fixed;
      left: 50%;
      top: 50%;
      width: 50px;
      height: 50px;
      z-index: 5;
      margin-left: -25px;
      margin-top: -25px;
    }
  }
  .mini-qrcode{
    width: 310px;
    height: 430px;
    position: relative;
    .poster{
      height: 205px;
      width: 100%;
      position: relative;
      overflow: hidden;
      .logo{
        position: absolute;
        z-index: 3;
        right: 10px;
        top: 10px;
        img{
          width: 72px;
          height: 23px;
        }
      }
      .pic{
        height: 100%;
        img{
          min-width: 100%;
          object-fit: cover;
        }
      }
      .coupon{
        position: absolute;
        left: 0;
        bottom: 15px;
        width: 152px;
        height: 24px;
        line-height: 24px;
        background:rgba(207,86,43,1);
        border-radius:0px 12px 12px 0px;
        font-size: 12px;
        color: #fff;
        vertical-align: middle;
        img{
          width: 16px;
          height: 16px;
          margin: 0 5px;
          vertical-align: middle;
        }
      }
    }
    .market-info{
      margin: 16px 16px 0;
      height: 65px;
      box-sizing: content-box;
      .title{
        font-size:18px;
        color: #333;
        font-weight:400;
        height: 20px;
        line-height: 20px;
        display: flex;
        .name{
          max-width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .price{
          flex: 1;
          font-size: 12px;
          color: #999;
          margin-left: 5px;
        }
      }
      .tags {
        span{
          color: #fff;
          font-size: 10px;
          font-weight: 400;
          padding: 2px 5px;
          margin-right: 5px;
          border-radius: 2px;
        }
        span:nth-child(1) {
          background-color: #007AE6;
        }
        span:nth-child(2) {
          background-color: #6EB8A3;
        }
        span:nth-child(3) {
          background:rgba(143,159,177,0.15);
          color: #5C5F66;
        }
      }
    }
    .user-info{
      margin: 0 16px;
      padding: 10px 0;
      display: flex;
      .qrcode{
        width: 60px;
        height: 60px;
        overflow: hidden;
        margin-right: 10px;
        img{
          width: 60px;
          height: 60px;
          object-fit: contain;
        }
      }
      .user-detail{
        flex: 1;
        font-size: 12px;
        margin-top: 3px;
        .name{
          vertical-align: middle;
          height: 20px;
          line-height: 20px;
          color: #333;
          margin: 8px 0 10px 0;
          img{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            vertical-align: middle;
          }
          span{
            margin-left: 5px;
          }
          .other{
            color: #999;
          }
        }
        .tips{
          color: #999;
          span{
            color: #007AE6;
          }
        }
      }
    }
    .close {
      padding-top: 16px;
      text-align: center;
      width: 100%;
      color: #fff;
      opacity: 0.9;
      img{
        width: 21px;
        height: 21px;
      }
    }
  }
  .van-popup{
    background-color: transparent;
  }
}
</style>
