<template>
  <div class="discover-detail-page">
  </div>
</template>
<script>
import Avatar from 'COMP/Avatar'
import TitleBar from 'COMP/TitleBar/'
import OpenArticle from 'COMP//Guidance/OpenArticle'
import Paragraph from 'COMP/Discover/Paragraph'
import EstateItem from 'COMP/EstateItem/indexInArtcile'
import Null from 'COMP/Null'
import CardDialog from 'COMP/Dialog/CardDialog'
import MarketDialog from 'COMP/Dialog/MarketDialog'
import ArticleDialog from 'COMP/Dialog/ArticleDialog'
import timeUtils from '@/utils/timeUtils'
import discoverService from 'SERVICE/discoverService'
import userService from 'SERVICE/userService'
import articleService from 'SERVICE/articleService'
export default {
  components: {
    Avatar,
    TitleBar,
    OpenArticle,
    EstateItem,
    CardDialog,
    MarketDialog,
    ArticleDialog,
    Paragraph,
    Null
  },
  data: () => ({
    // mpUser: {},
    // appId: process.env.VUE_APP_MP_APPID,
    // haveData: true,
    // nullIcon: require('IMG/article/empty_article@2x.png'),
    // nullcontent: '该文章已被下架删除',
    // shareImage: '',
    // shareDesc: '',
    // infoId: '', //文章的id
    // city: '',
    // info: null,
    // editData: null, // 经纪人文章编辑json数据，包括评论，插入楼盘等内容
    // inlayHouseInfo: null, // 文章插入楼盘信息
    // agentInfo: null,
    // guidanceShow: false,
    // friendShareData: null, // 好友分享数据
    // timelineShareData: null, // 朋友圈分享数据
    // renderDom: [],
    // easylookList: [], // 好看列表
    // commentCur: 1,
    // commentSize: 5,
    // isMoreComment: false,
    // commentList: [], // 评论列表
    // selectCommentId: '', // 选中的评论ID
    // commentContent: '', // 评论内容
    // isShowDeleteComment: false, // 是否显示删除评论上拉菜单
    // actions: [{ name: '删除评论', className: 'comment-delete' }],
    // showCommentAlert: false, // 是否显示评论输入框
    // commentInfo: null,
    // commentIds: [], // 评论Ids
    // recommendHouseList: [], // 推荐房源列表
    // articleList: [], // 文章列表
    // openCardPopup: false,
    // openMarketPopup: false,
    // openArticlePopup: false,
    // cardQrInfo: null,
    // marketQrInfo: null,
    // articleQrInfo: null,
    // urlParm: {},
    // shareUuid: '', // 分享ID
    // scrollHeight: 0,
    // clientHeight: 0,
    // preTime: 0, // 数据上报时间
    // scrollPercent: '' // 页面滚动百分比
  }),
  async created() {
    let domain = process.env.VUE_APP_APP_URL
    let host = location.href
    let hostArr = host.split(domain)
    let to = domain+'aw-h5/'+hostArr[1]
    // console.log(to)
    location.href = to
    // this.urlParm = this.getUrlQueryParams(location.href)
    // this.infoId = this.$route.params.id
    // this.city = this.$route.params.city
    // this.agentId = this.$route.query.agentId
    // this.enterpriseId = this.$route.query.enterpriseId
    // this.shareUuid = this.$route.query.shareUuid
    // this.checkAuth()
    // // this.mpUser.appid = 'wx6c6423c9efb44c75'
    // if (window.localStorage.getItem('isFirst') == null || window.localStorage.getItem('isFirst') === 'false') {
    //   this.$store.commit('SHARE_PROMPT', true)
    //   window.localStorage.setItem('isFirst', true)
    // } else {
    //   this.$store.commit('SHARE_PROMPT', false)
    // }
  },
  methods: {
    async checkAuth() {
      let wxredirecturl = window.location.href
        .replace('?from=singlemessage', '')
        .replace('?from=groupmessage', '')
        .replace('?from=timeline', '')
      wxredirecturl = wxredirecturl.replace('&isappinstalled=0', '')
      let parm = this.urlParm

      if (parm.code) {
        let parmStr = location.href.split('?')[2]
        this.agentId = parmStr.split('&')[0].split('=')[1]
        this.enterpriseId = parmStr.split('&')[1].split('=')[1]
        this.shareUuid = parmStr.split('&')[2].split('=')[1]

        const res = await userService.getUserByCode(parm.code, this.enterpriseId)
        this.mpUser = res
        // alert(this.mpUser.appid)
        // console.log(res, 'getUserByCode')
        // this.codetest = parm.code

        // await Promise.all([this.getDetail(), this.getLikeList(), this.getCommentList(), this.getArticleList(), this.dataReport({ userActionType: 'viewNews', userActionCode: 'HTWZFXCK', userActionData: '' })])
        await this.getDetail()
        await this.getLikeList()
        await this.getCommentList()
        await this.getArticleList()
        await this.getCardQrCode()
        await this.dataReport({ userActionType: 'viewNews', userActionCode: 'HTWZFXCK', userActionData: '' })
      } else {
        let wxurl =
          'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
          this.appId +
          '&redirect_uri=' +
          encodeURIComponent(wxredirecturl).toLowerCase() +
          '&response_type=code&scope=snsapi_userinfo&state=062882#wechat_redirect'
        // console.log(wxredirecturl)
        window.location.href = wxurl
      }
    },
    getUrlQueryParams(_url) {
      let params = {},
        results = null,
        url = _url || location.href
      let regex = /[?&]([\w]+)=([^&#]*)/g
      while ((results = regex.exec(url)) != null) {
        params[decodeURIComponent(results[1])] = decodeURIComponent(results[2])
      }
      return params
    },
    async getDetail() {
      // alert(this.mpUser.clientId+'---')
      const res = await discoverService.getDiscoverDetailForH5(this.infoId, this.enterpriseId, this.agentId, this.mpUser.clientId)
      if (res.returnCode == 10028) {
        this.haveData = false
        return
      }
      this.haveData = true
      this.info = res
      this.infoId = res.id
      if (this.info.editData !== '') this.editData = JSON.parse(this.info.editData)
      this.handleLinkerInfo()

      this.agentInfo = {
        agentId: this.info.agentId,
        agentName: this.info.agentName,
        avatarUrl: this.info.avatarUrl,
        distributorName: this.info.distributorName,
        enterpriseName: this.info.enterpriseName,
        institutionName: this.info.institutionName
      }

      // 创建虚拟dom解析html结构
      let virtualDom = document.createElement('div')
      virtualDom.innerHTML = this.info.content
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
        
        this.renderDom.push({
          text: dom.innerHTML,
          status: 'view'
        })
      }

      let host = process.env.VUE_APP_APP_URL
      host = host + '#/article/' + this.infoId + '/' + encodeURI(this.city) + '?agentId=' + this.info.agentId + '&enterpriseId=' + this.enterpriseId + '&shareUuid=' + this.shareUuid
      let content = this.info.content.replace(/<[^>]+>/g, '').replace(/\s+/g, '')
      content =  res.subTitle? res.subTitle : content? content.substr(0,32) : '我正在AW大师看文章，你也快来看看吧。'
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
      this.shareDesc = this.info.title
      this.shareImage = this.info.image
      this.shareHandler()
    },
    // 楼盘信息处理
    async handleLinkerInfo() {
      // 查询插入楼盘的信息
      if (this.editData) {
        // 编辑文章分享
        if (this.editData.inlayHouse) {
          const res = await this.getLinkerInfo(this.agentId, this.enterpriseId, this.shareUuid, this.editData.inlayHouse)
          this.inlayHouseInfo = res[0]
          this.handleLinkerTags(this.inlayHouseInfo)
        }
        if (this.editData.recommendHouse && this.editData.recommendHouse.length > 0) {
          this.recommendHouseList = await this.getLinkerInfo(this.agentId, this.enterpriseId, this.shareUuid, this.editData.recommendHouse.join(','))
          this.handleLinkerTags(this.recommendHouseList)
        }
      } else {
        // 原文章分享
        this.recommendHouseList = await this.getLinkerInfo(this.agentId, this.enterpriseId, this.shareUuid, '')
        this.handleLinkerTags(this.recommendHouseList)
      }
    },
    // 查询楼盘信息
    async getLinkerInfo(agentId, enterpriseId, shareUuid, linkerIds) {
      const res = await discoverService.queryLinkerInfoForH5(agentId, enterpriseId, shareUuid, linkerIds)
      return res
    },
    // 好看列表
    async getLikeList() {
      const res = await discoverService.queryLikeListForH5(this.infoId, this.enterpriseId)
      if (res && res.length > 0) {
        for (var index in res) {
          let item = res[index]
          this.easylookList.push(item.userName)
        }
      }
    },
    // 评论列表
    async getCommentList() {
      const res = await discoverService.commentListForH5(this.commentCur, this.commentSize, this.infoId, this.enterpriseId)
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
    // // 推荐房源列表
    // async getLinkerList() {
    //   const res = await discoverService.queryLinkerListByIdsForH5(this.shareUuid, this.enterpriseId)
    //   this.recommendHouseList = res
    // },
    // TA的写一写
    async getArticleList() {
      const res = await discoverService.queryArticleListForH5(this.agentId, this.enterpriseId, this.infoId)
      this.articleList = res
    },
    // 名片二维码信息
    async getCardQrCode() {
      const result = await userService.getQrCode(this.agentId, this.enterpriseId)
      this.cardQrInfo = result
    },
    // 楼盘二维码信息
    async getLinkerQrcode(linkerId) {
      const result = await discoverService.queryLinkerQrcodeForH5(this.agentId, linkerId, this.enterpriseId)
      this.marketQrInfo = result
    },
    // 文章二维码信息
    async getArticleQrcode(infoId) {
      const result = await discoverService.queryArticleQrcodeForH5(this.agentId, infoId, this.enterpriseId)
      this.articleQrInfo = result
    },
    // 弹出框
    popHandler(val, item) {
      if (val == 1) {
        // 名片
        this.openCardPopup = true
        this.dataReport({ userActionType: 'viewCard', userActionCode: 'HMPCK', userActionData: '' })
      } else if (val == 2) {
        // 楼盘
        this.getLinkerQrcode(item.linkerId)
        this.openMarketPopup = true
        this.dataReport({ userActionType: 'viewHouse', userActionCode: 'HFCKLP', userActionData: '', houseId: item.linkerId, houseName: item.linkerName })
      } else {
        // 文章
        // this.getArticleQrcode(item.id)
        // this.openArticlePopup = true
        // this.dataReport({userActionType: 'viewNews', userActionCode: 'HTWZFXCK', action: ''})
        let host =
          process.env.VUE_APP_APP_URL + '#/article/' + item.id + '/' + encodeURI(this.city) + '?agentId=' + this.agentId + '&enterpriseId=' + this.enterpriseId + '&shareUuid=' + item.shareUuid
        location.href = host
        // this.$router.push(`/article/${item.id}/${encodeURI(this.city)}?agentId=${this.agentId}&enterpriseId=${this.enterpriseId}&shareUuid=${item.shareUuid}`)
      }
    },
    popupShowControl(val) {
      this.overlayClose()
    },
    // 关闭弹出框
    overlayClose() {
      this.openCardPopup = false
      this.openMarketPopup = false
      this.openArticlePopup = false
      this.marketQrInfo = null
      this.articleQrInfo = null
    },

    // 数据埋点上报
    async dataReport(data) {
      if (this.mpUser.appid) {
        if (data.userActionData) {
          this.preTime = timeUtils.getNowDay()
        }
        let title = this.info ? this.info.title : ''
        let params = {
          enterpriseId: this.enterpriseId,
          agentId: this.agentId,
          clientId: this.mpUser.clientId,
          clientName: this.mpUser.clientName || '',
          userActionType: data.userActionType || '',
          userActionCode: data.userActionCode || '',
          viewTime: timeUtils.getNowDay(),
          userActionData: data.userActionData || '',
          houseId: data.houseId || '',
          houseName: data.houseName || '',
          articleId: this.infoId,
          articleTitle: title,
          sources: 'H5'
        }
        // alert(this.mpUser.appid+'---'+params.userActionData)
        const result = await articleService.dataReport(params, { appId: this.mpUser.appid })
        // alert(result+'---')
      }
    },

    // 处理楼盘标签
    handleLinkerTags(obj) {
      let statusArr = ['热销中', '即将发售', '', '售罄']
      if (Array.isArray(obj)) {
        for (var i in obj) {
          let tempArr = []
          var item = obj[i]
          tempArr.push(statusArr[item.saleStatus])
          if (item.linkerTags) {
            tempArr = tempArr.concat(item.linkerTags)
            if (tempArr && tempArr.length > 3) {
              item.linkerTags = tempArr.slice(0, 3)
            } else {
              item.linkerTags = tempArr
            }
          } else {
            item.linkerTags = tempArr
          }
        }
      } else {
        let tempArr = []
        tempArr.push(statusArr[obj.saleStatus])
        if (obj.linkerTags) {
          tempArr = tempArr.concat(obj.linkerTags)
          if (tempArr && tempArr.length > 3) {
            obj.linkerTags = tempArr.slice(0, 3)
          } else {
            obj.linkerTags = tempArr
          }
        } else {
          obj.linkerTags = tempArr
        }
      }
    },

    // 举报反馈
    feedbackClickHandler() {
      this.$router.push({ path: '/discover/reportFeedback', query: { id: this.infoId } })
    },

    // 分享之后调用
    async articleShare() {
      /*
      let params = {
        deleteType: 0,
        infoId: this.infoId
      }
      const result = await discoverService.articleShare(params)
      */
      // h5分享添加数据埋点
      this.dataReport({ userActionType: 'viewNews', userActionCode: 'HFFXWZ', userActionData: '' })
    },
    // 分享
    async shareHandler() {
      await window.awHelper.wechatHelper.init(this.agentId)

      this.friendShareData.success = this.articleShare
      this.timelineShareData.success = this.articleShare
      this.friendShareData.cancel = this.articleShare
      this.timelineShareData.cancel = this.articleShare

      await window.awHelper.wechatHelper.setShare(this.friendShareData, this.timelineShareData)
      setTimeout(() => {
        window.awHelper.wechatHelper.setShare(this.friendShareData, this.timelineShareData)
      }, 2500)
    }
  },
  watch: {
    // 当前页面跳转当前页面不会自动刷新 所以强制刷新页面
    $route() {
      location.reload()
    }
  },
  beforeCreate() {},
  mounted() {
    // document.querySelector('.discover-detail-container').addEventListener(
    //   'touchmove',
    //   function(e) {
    //     e.preventDefault()
    //   },
    //   { passive: false }
    // )
    window.addEventListener('pageshow', () => {
      // alert('show')
      // this.dataReport({userActionType: 'viewNews', userActionCode: 'HFFWZCK', action: 'REPORTED_BEGIN'})
    })
    window.addEventListener('visibilitychange', () => {
      if (window.visibilityState === 'hidden') {
        // alert('hide')
        // this.dataReport({userActionType: 'viewNews', userActionCode: 'HFFWZCK', action: 'REPORTED_END'})
      }
      if (window.visibilityState === 'visible') {
        // alert('show')
        // this.dataReport({userActionType: 'viewNews', userActionCode: 'HFFWZCK', action: 'REPORTED_BEGIN'})
      }
    })
    window.onload = function() {
      // alert('onload')
    }
    window.onunload = function() {
      // alert('onunload')
    }

    /*
    document.querySelector('.router-view').addEventListener('scroll', e => {
      let scrollTop = e.target.scrollTop + this.clientHeight
      console.log(scrollTop)
      if (scrollTop && this.scrollHeight) {
        let percent = Number(scrollTop / (this.scrollHeight - this.clientHeight)).toFixed(2) * 100.0
        percent = percent >= 100 ? 100 : percent
        if (this.scrollPercent < percent) {
          this.scrollPercent = percent
          let curTime = new Date()
          let interval = curTime.getTime() - new Date(this.preTime).getTime()
          // if (interval >= 1000) {
            this.preTime = curTime
            // 滑动页面篇幅数据上报
            // this.dataReport({ userActionType: 'viewNews', userActionCode: 'HFFWZCK', userActionData: this.scrollPercent + '%' })
          // }
        }
      }
    })
    */
    // window.addEventListener('scroll', ()=> {
    //   let scrollHeight = document.querySelector('.discover-detail-container').scrollHeight
    //   // let scrollHeight = document.body.scrollHeight
    //   let scrollTop = document.querySelector('.router-view').scrollTop
    // }, true)

    // document.body.onscroll = function() {
    //   let scrollHeight = document.querySelector('.discover-detail-container').scrollHeight
    //   // let scrollHeight = document.body.scrollHeight
    //   let clientHeight = document.body.clientHeight
    //   let scrollTop = document.documentElement.scrollTop
    //   let innerHeight = window.innerHeight
    // }
  },
  beforeDestory() {
    // alert('beforeDestory')
  }
}
</script>
<style lang="less">
.share-image {
  display: none;
}
.share-desc {
  display: none;
}
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
    // 观点
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

    // 好看
    > .easy-look-container {
      padding: 10px 16px 20px 16px;
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
        padding-top: 8px;
        line-height: 1.5;
        color: #445166;
        font-size: 14px;
        width: 300px;
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
          margin-top: 24px;
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
      // margin: 10px 0 30px;
      // padding: 10px 0px;
      .recommend-article-list {
        margin: 0 16px;
        padding: 15px 0;
        border-bottom: 1px solid #e2e2e3;
        > .recommend-article-name {
          color: #333333;
          font-size: 15px;
          line-height: 1.5;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
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
}
</style>
