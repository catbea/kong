<template>
  <div class="article-box">
    <Guide v-if="showGuide" @hideGuide="hideStep"/>
    <div class="tab-bar scale-1px-bottom">
      <div class="classify">
        <span
          :class="{'recommend': item.itemCode===classify && item.itemName === classifyName}"
          v-for="(item, index) in articleType"
          :key="index"
          @click="changeClassify(item,$event)"
        >{{item.itemName}}</span>
      </div>
      <span class="icon" @click="showSubFn">
        <img v-show="!showSub" src="../../assets/img/article/tabicon.png" alt="">
        <img v-show="showSub" src="../../assets/img/article/tabicon2.png" alt="">
      </span>
    </div>
    <div class="submenu" v-show="showSub" @click="hideSubMenu">
      <ul>
        <li :class="[{'active': sortType === 2},'scale-1px-bottom']" @click="sortTypeFn(2)">按时间排序</li>
        <li :class="{'active': sortType === 1}" @click="sortTypeFn(1)">按活跃度排序</li>
      </ul>
    </div>
    <div class="article-list" v-if="articleData.length">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
        <van-list v-model="loading" :finished="finished" finished-text="--没有更多了--" @load="onLoad">
          <div class="article-item" v-for="(item,index) in articleData" :key="index">
            <div class="content scale-1px-bottom">
              <div class="left-cnt">
                <h3 class="title"  @click="goInfo(item)">{{item.articleTitle}}</h3>
                <div class="attr">
                  <p class="source">
                    <span class="name">{{item.publisher}}</span>
                    <span class="time">{{item.createTime | formatData}}</span>
                  </p>
                  <span class="read">{{item.scanNum}}次阅读</span>
                </div>
              </div>
              <div class="img"  @click="goInfo(item)">
                <img :src="item.articleImg" alt="">
              </div>
            </div>
            <div class="comment">
              <div class="like-count">
                <span class="icon" v-show="item.praiseAndShareUserVOS.length">
                  <img src="../../assets/img/article/like1.png" alt="">
                </span>
                <span v-show="item.praiseAndShareUserVOS.length">{{item.praiseAndShareUserVOS.length}}人觉得好看</span>
              </div>
              <div class="action">
                <span class="like-icon">
                  <img
                    src="../../assets/img/article/like2.png"
                    alt=""
                    v-if="item.praiseStatus===1"
                    @click="updateLike(item, 0, index)"
                  >
                  <img
                    src="../../assets/img/article/like1.png"
                    alt=""
                    v-else
                    @click="updateLike(item, 1, index)"
                  >
                </span>
                <span class="comment-icon">
                  <img
                    src="../../assets/img/article/dis1.png"
                    alt=""
                    @click="showReplayFn(item,index,1)"
                  >
                </span>
              </div>
            </div>
            <div class="like-cnt">
                <div class="like-box" v-show="item.praiseAndShareUserVOS.length">
                  <span class="icon">
                    <!-- <img src="../../assets/img/article/like1.png" alt=""> -->
                  </span>
                  <div class="list">
                    <div class="cnt-box-like">
                      <span
                        class="name"
                        :class="{'active': data===activeLikeItem}"
                        v-for="(data,num) in item.praiseAndShareUserVOS"
                        :key="num"
                        @click.stop="showLike(data)"
                        v-show="num < item.likeCount"
                      >
                        {{data.userName}}
                        <label
                          v-show="num !== item.praiseAndShareUserVOS.length-1"
                        >、</label>
                      </span>
                    </div>
                    <span
                      class="more"
                      v-show="item.praiseAndShareUserVOS.length > item.likeCount"
                      @click="item.likeCount += 15"
                    >展开查看
                      <van-icon name="arrow-down"/>
                    </span>
                    <span
                      class="more"
                      v-show="item.praiseAndShareUserVOS.length <= item.likeCount && item.praiseAndShareUserVOS.length > 15"
                      @click="item.likeCount=15"
                    >收起
                      <van-icon name="arrow-up"/>
                    </span>
                  </div>
                </div>
                <div class="comment-box" v-show="item.discussVOS.length">
                  <span class="icon">
                    <img src="../../assets/img/article/dis1.png" alt="">
                  </span>
                  <div class="list">
                    <div class="cnt-box-replay">
                      <div class="comment-item" v-for="(data,num) in item.discussVOS" :key="num">
                        <p
                          v-show="num < item.replayCount"
                          @click="showReplayFn(item, index,2,data,num)"
                        >
                          <!--  @click.stop="replayLike(data,1)" -->
                          <span class="name">{{data.senderName}}</span>
                          <span class="text" v-if="data.receiverName">回复</span>
                          <!--  @click.stop="replayLike(data,2)" -->
                          <span
                            class="name"
                            v-if="data.receiverName"
                          >{{data.receiverName }}</span>:
                          <span class="replay-cnt">{{data.content}}</span>
                        </p>
                      </div>
                    </div>
                    <span
                      class="more"
                      v-show="item.discussVOS.length > item.replayCount"
                      @click="item.replayCount += 10"
                    >展开查看
                      <van-icon name="arrow-down"/>
                    </span>
                    <span
                      class="more"
                      v-show="item.discussVOS.length <= item.replayCount && item.discussVOS.length > 5"
                      @click="item.replayCount=5"
                    >收起 
                      <van-icon name="arrow-up"/>
                    </span>
                  </div>
                </div>
              </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="nodata" v-show="!articleData.length && nodataStatus" @click="onRefresh">
      <img src="../../assets/img/article/noarticle.png" alt="">
      <p>对不起，没有查询到相关文章！</p>
    </div>
    <div class="artcle-tips" v-show="showNewArticle" @click="onRefresh">
      {{newArticelCount}}条新内容
      <van-icon name="arrow-down"/>
    </div>
    <div class="write">
      <p @click="goAdd">
        <img src="../../assets/img/article/plus.png" alt="">
      </p>
      <p @click="goWrite">
        <img src="../../assets/img/article/write.png" alt="">
      </p>
    </div>
    <div class="replay" v-show="showReplay">
      <div class="replay-cnt">
        <div class="top-action">
          <p class="cancle" @click="hideReplayFn">取消</p>
          <p class="publish" @click="insertCommentFn">
            <span>发布</span>
          </p>
        </div>
        <div class="replay-title">
          <p v-if="replayStatus===1">{{commentItem.articleTitle}}</p>
          <p v-else>{{replayItem.senderName}}: {{replayItem.content}}</p>
        </div>
        <div class="replay-box">
          <span class="name" v-if="replayStatus===2">回复{{replayItem.senderName}}</span>
          <textarea
            placeholder="最多输入140个字"
            class="textarea"
            :class="{'placeholder': replayStatus===2 && system==='IOS'}"
            name=""
            id=""
            ref="replaybox"
            maxlength="140"
            v-model="replayCnt"
            :style="{'text-indent': (replayStatus===2 ? '75px' : '')}"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="loading" v-show="showLoading">
      <van-loading type="spinner" color="white" class="van-loading"/>
    </div>
    <div class="delete-replay">
      <van-actionsheet v-model="showDelete" :actions="actions" @select="onSelect"/>
    </div>
    <!-- <div
      class="comment-like-dialog"
      v-show="showLikeDialog"
      :style="{'left': dialogX+'px', 'top': dialogY+'px'}"
    >
      <div class="action">
        <span @click="goCard">
          <img
            src="../../assets/img/article/card.png"
            alt=""
            v-show="activeLikeItem&&activeLikeItem.userSource === 0"
          >查看名片
        </span>
        <span @click="goShare">
          <img src="../../assets/img/article/share.png" alt="">查看分享
        </span>
      </div>
    </div>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Guide from './guide'
import ArticleService from 'SERVICE/articleService'
import { formatTime, parseTime, checkStrLength } from '@/utils/tool'
export default {
  components: {
    Guide
  },
  data() {
    return {
      newArticelCount: 0,
      showGuide: false, // 显示引导
      articleData: [], // 文章列表
      showSub: false, // 显示排序菜单
      city: '', // 用户主营城市
      showCity: false, //是否显示城市菜单
      loading: false, //是否处于加载状态
      finished: false, //是否已加载完所有数据
      isLoading: false, //是否处于下拉刷新状态
      showReplay: false, //显示回复框
      showNewArticle: false, // 显示新消息
      articleType: [{ itemCode: '', itemName: '推荐' }],
      size: 10,
      current: 1,
      pages: null,
      classify: '', // 分类
      sortType: 1, // 排序 1：按活跃度排序 2：按文章创建时间排序
      classifyName: '推荐', // 分类
      showLoading: false, // loading
      replayCnt: '', // 评论内容
      commentItem: '', // 评论文章
      replayItem: '', // 回复评论
      commentIndex: '', // 评论文章索引
      replayStatus: '', //恢复状态 1为评论 2为回复
      showDelete: false, // 删除评论
      actions: [
        // 上拉菜单
        {
          name: '删除评论',
          value: 1,
          className: 'van-actionsheet-del'
        },
        {
          name: '取消',
          value: 2
        }
      ],
      deleteIndex: '', // 删除评论
      showLikeDialog: false, // 显示好看弹框
      dialogX: '', // 弹框位置
      dialogY: '', // 弹框位置
      activeLikeItem: '', // 点击好看名称
      nodataStatus: false,
      updateLikeItem: '' //点赞数据
    }
  },
  watch: {
    '$store.getters.newMsgStatus': function(v) {
      let msgContent = this.$store.getters.newMsgContent
      if(!v) {
        this.showNewArticle = false
      } else {
        if(msgContent.desc == 6 && this.$route.path == '/write-article') {
          let data = JSON.parse(msgContent.data)
          this.newArticelCount = data.newArticleCount
          this.showNewArticle = v
          return
        }
      }
    }
  },
  async created() {
    this.showGuide = !JSON.parse(window.localStorage.getItem('guideStatus'))
    let storage = JSON.parse(window.sessionStorage.getItem('tab')) || { itemCode: '', itemName: '推荐' }
    this.changeClassify(storage)
  },
  computed: {
    ...mapGetters(['userInfo']),
    system () {
      let u = navigator.userAgent, app = navigator.appVersion;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        return 'Android'
      } else if (isIOS) {
         return 'IOS'
      } else {
        return ''
      }
    }
  },
  methods: {
    // 隐藏引导页
    hideStep() {
      this.showGuide = false
      window.localStorage.setItem('guideStatus', true)
    },
    // 获取文章分类
    async getArticleType() {
      let result = await ArticleService.getArticleType({ classify: 'information_classify' })
      if (result) {
        this.articleType.push(...result)
        window.sessionStorage.setItem('type', JSON.stringify(this.articleType))
      }
    },
    // 查询所属城市是否有文章
    async getCityArticle() {
      if (this.userInfo.majorCity) {
        let result = await ArticleService.getArticleList({
        current: this.current,
        size: this.size,
        city: this.userInfo.majorCity,
        classify: '',
        sortType: 2
        })
        if (result.records && result.records.length) {
          // this.showCity = true
          this.articleType.push({ itemCode: '', itemName: this.userInfo.majorCity })
        }
      }
      this.getArticleType()
    },
    // 获取文章列表
    async getArticleList(sortType) {
      this.showLoading = true
      this.nodataStatus = false
      if (!sortType) {
        sortType = this.classifyName === '推荐' ? 1 : 2
      }
      let result = await ArticleService.getArticleList({
        current: this.current,
        size: this.size,
        city: this.classifyName === this.userInfo.majorCity ? this.userInfo.majorCity : '',
        classify: this.classify,
        sortType: sortType
      })
      if (result) {
        this.pages = result.pages
        let records = result.records.map(item => {
          return Object.assign(item, { likeCount: 15, replayCount: 5 })
        })
        this.articleData.push(...records)
        this.current += 1
        // 缓存数据
        this.cacheDataFn ({ itemCode: this.classify, itemName: this.classifyName })
      }
      this.nodataStatus = true
      this.showLoading = false
    },
    // 重新获取位置
    async getLocation() {
      await this.$wechatHelper.getUserArea()
    },
    // tab切换 文章分类查询
    changeClassify(item, e) {
      if (e && e.currentTarget) {
        e.currentTarget.scrollIntoView({behavior: 'smooth', block: 'end'})
      }
      window.sessionStorage.setItem('tab',JSON.stringify(item))
      this.finished = false
      this.cacheDataFn(item)
    },
    // 缓存数据
    cacheDataFn (item) {
      // 缓存上一个tab的数据
      let cacheData = JSON.parse(window.sessionStorage.getItem('cacheData')) || {}
      if (this.articleData.length) {
          cacheData[this.classifyName] = {
          classify: this.classify,
          classifyName: this.classifyName,
          current: this.current,
          articleData: this.articleData
        }
        window.sessionStorage.setItem('cacheData', JSON.stringify(cacheData))
      }
      let data = cacheData[item.itemName]
      if (data && data.articleData && data.articleData.length) {
        this.classify = data.classify
        this.classifyName = data.classifyName
        this.current = data.current
        this.articleData = data.articleData
      } else {
        this.classify = item.itemCode
        this.classifyName = item.itemName
        this.current = 1
        this.articleData = []
        this.getArticleList()
      }
    },
    // 显示按时间排序菜单
    showSubFn() {
      this.showSub = !this.showSub
    },
    // 隐藏时间排序菜单
    hideSubMenu() {
      this.showSub = false
    },
    // 按时间菜单排序
    sortTypeFn(val) {
      if (this.sortType === val) {
        return false
      }
      this.current = 1
      this.sortType = val
      this.articleData = []
      this.getArticleList(val)
    },
    // 点赞
    async updateLike(item, praiseStatus, index) {
      // 防止重复点赞
      if (this.updateLikeItem === item) {
        return false
      }
      this.updateLikeItem = item
      let result = await ArticleService.updateLike({
        infoId: item.articleId,
        likeFlag: praiseStatus
      })
      this.articleData[index].praiseStatus = praiseStatus
      if (praiseStatus === 0) {
        let item = this.articleData[index].praiseAndShareUserVOS
        let r = item.filter(element => element.userId !== this.userInfo.agentId)
        this.articleData[index].praiseAndShareUserVOS = r
      } else {
        this.articleData[index].praiseAndShareUserVOS.unshift({
          operationTime: +new Date(),
          userId: this.userInfo.agentId,
          userName: this.userInfo.name,
          userSource: 0
        })
      }
      this.updateLikeItem = ''
    },
    // 展示评论框
    showReplayFn(item, index, type, replay, num) {
      this.deleteIndex = num !== undefined ?  num : item.discussVOS.length
      if (replay && replay.senderId === this.userInfo.agentId) {
        this.commentIndex = index
        // 隐藏菜单
        this.$store.commit('TABBAR',{show:false})
        return (this.showDelete = true)
      }
      this.replayStatus = type
      this.commentItem = item
      if (replay) {
        this.replayItem = replay
      }
      this.commentIndex = index
      // 如果是评论则展开更多评论
      if (type === 1) {
        item.replayCount = item.discussVOS.length + 1
      }
      // 隐藏菜单
      this.$store.commit('TABBAR',{show:false})
      this.showReplay = true
      this.$nextTick(function() {
        this.$refs.replaybox.focus()
      })
    },
    // 新增文章
    goAdd() {
      this.$router.push('/discover/newlyAdded')
    },
    // 隐藏评论框
    hideReplayFn() {
      // 显示菜单
      this.$store.commit('TABBAR',{show:true})
      this.showReplay = false
      this.replayCnt = ''
    },
    // 发表评论
    insertCommentFn(index) {
      if (!this.replayCnt) {
        return this.$toast('评论内容不能为空')
      }
      if (!checkStrLength(this.replayCnt, 280)) {
        return this.$toast('评论内容不超过140个汉字')
      }
      this.insertComment()
    },
    // 评论
    async insertComment() {
      let receiverId = this.replayStatus === 2 ? this.replayItem.senderId : ''
      let receiverName = this.replayStatus === 2 ? this.replayItem.senderName : ''
      let parentId = this.replayStatus === 2 ? this.replayItem.id : ''
      let type = this.replayStatus === 2 ? 1 : 0
      let receiverSource = this.replayStatus === 2 ? this.replayItem.senderSource : ''
      let result = await ArticleService.insertComment({
        content: this.replayCnt,
        enterpriseId: this.userInfo.enterpriseId,
        infoId: this.commentItem.articleId,
        parentId: parentId,
        receiverId: receiverId,
        receiverName: receiverName,
        receiverSource: receiverSource,
        senderAvatarUrl: this.userInfo.avatarUrl,
        senderId: this.userInfo.agentId,
        senderName: this.userInfo.name,
        senderSource: 0,
        syncId: '',
        type: type
      })
      if (result) {
        let data = {
          id: result.id,
          receiverId: receiverId,
          receiverName: receiverName,
          receiverSource: receiverSource,
          content: this.replayCnt,
          senderId: this.userInfo.agentId,
          senderName: this.userInfo.name,
          senderSource: 0,
          type: type
        }
        this.articleData[this.commentIndex].discussVOS.splice(this.deleteIndex +  1, 0, data)
        this.hideReplayFn()
      }
    },
    // 点击好看名字弹框
    showLike(data) {
      // let clientId = data.userSource === 0 ? '' : data.userId
      let userType = data.userSource
      this.$router.push({ path: '/user/articles/easyLookList', query: { userType: userType, userId: data.userId, userName: data.userName } })
    },
    // 点击评论的名字
    replayLike(data, type) {
      let userType = ''
      let userId = ''
      let userName = ''
      if (type === 1) {
        userId = data.senderId
        userType = data.senderSource
        userName = data.senderName
      } else {
        userId = data.receiverId
        userType = data.receiverSource
        userName = data.receiverName
      }
      this.$router.push({ path: '/user/articles/easyLookList', query: { userType: userType, userId: userId, userName: userName } })
    },
    // 跳转文章详情
    goInfo(item) {
      let articleId = item.articleId
      let area = this.classifyName === this.userInfo.majorCity ? this.userInfo.majorCity : '全国'
      let agentId = this.userInfo.agentId
      let enterpriseId = this.userInfo.enterpriseId
      let classify = this.classify
      this.$router.push(`/discover/${articleId}/${area}?agentId=${agentId}&enterpriseId=${enterpriseId}`)
    },
    // 去新增文章页面
    goAdd() {
      this.$router.push({ name: 'addLinker' })
    },
    // 去我的写一写
    goWrite() {
      this.$router.push('/user/articles/historicalArticles')
    },
    // 加载更多
    async onLoad() {
      if (this.current >= this.pages || this.classifyName === '推荐') {
        // 加载状态结束
        this.finished = true
        this.loading = false
      } else {
        await this.getArticleList()
        this.loading = false
      }
    },
    // 下拉刷新
    async onRefresh() {
      this.current = 1
      this.articleData = []
      this.showNewArticle = false
      await this.getArticleList()
      this.isLoading = false
    },
    // 删除评论上拉菜单
    onSelect(item) {
      if (item.value === 1) {
        this.delComment()
      }
      this.showDelete = false
      // 隐藏菜单
      this.$store.commit('TABBAR',{show:true})
    },
    // 删除评论
    async delComment() {
      let id = this.articleData[this.commentIndex].discussVOS[this.deleteIndex].id || ''
      let result = await ArticleService.updateCommentStatus({
        id: id,
        status: 3
      })
      if (result) {
        this.articleData[this.commentIndex].discussVOS.splice(this.deleteIndex, 1)
      }
    }
  },
  filters: {
    formatData(time) {
      return time ? formatTime(time, '{y}-{m}-{d}') : ''
    }
  },
  mounted () {
    let type = JSON.parse(window.sessionStorage.getItem('type'))
    if (type) {
       this.articleType = type
    } else {
      this.getCityArticle()
    }
  },
  beforeDestroy () {
    // 缓存数据
    
    this.cacheDataFn ({ itemCode: this.classify, itemName: this.classifyName })
  }
}
</script>

<style lang="less" scoped>
.article-box {
  overflow: auto;
  font-family: 'Microsoft YaHei', 'PingFangSC-Regular';
  font-size: 16px;
  .tab-bar {
    font-size: 14px;
    color: #333;
    height: 20px;
    line-height: 20px;
    padding: 12px 16px;
    height: 54px;
    box-sizing: border-box;
    width: 100%;
    position: fixed;
    .classify {
      display: inline-block;
      width: 85%;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      span {
        display: inline-block;
        margin-right: 32px;
        &.active {
          color: #007ae6;
        }
      }
      .recommend {
        font-size: 24px;
        height: 34px;
        line-height: 34px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
      }
    }
    .icon {
      position: absolute;
      right: 0;
      width: 30px;
      top: 25px;
      right: 16px;
      margin-right: 0;
      text-align: center;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
  .submenu {
    position: absolute;
    top: 54px;
    left: 0;
    width: 100%;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2;
    ul {
      position: relative;
      background-color: #fff;
      li {
        height: 50px;
        line-height: 50px;
        padding: 0 16px;
        &.active {
          color: #007ae6;
        }
      }
    }
  }
  .article-list {
    position: fixed;
    top: 54px;
    width: 100%;
    bottom: 50px;
    overflow-y: auto;
    z-index: 1;
    padding-bottom: 50px;
    .article-item {
      margin: 0 16px;
      border-bottom: 10px solid #f7f9fa;
      .content {
        display: flex;
        padding-bottom: 12px;
        .left-cnt {
          height: 90px;
          flex: 1;
          margin-right: 15px;
          .title {
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; //（行数）
            -webkit-box-orient: vertical;
            padding-top: 10px;
            line-height:1.25;
          }
          .attr {
            padding-top:26px;
            color: #969ea8;
            font-size: 12px;
            display: flex;
            .source {
              flex: 1;
              padding-top:1.5px;
              .name {
                display: inline-block;
                margin-right: 8px;
                max-width: 60px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                vertical-align: middle;
              }
              .time {
                display: inline-block;
                vertical-align: middle;
              }
            }
            .read {
              line-height: 16px;
              min-width: 60px;
              text-align: right;
              display: inline-block;
              vertical-align: middle;
            }
          }
        }
        .img {
          width: 120px;
          height: 90px;
          padding-top: 10px;
          border-radius: 6px;
          overflow: hidden;
          img {
            min-width: 100%;
            min-height: 100%;
            border-radius: 6px;
          }
        }
      }
      .comment {
        display: flex;
        padding-top: 10px;
        padding-bottom: 5px;
        .like-count{
          flex: 1;
          font-size: 14px;
          color: #445166;
          font-weight: 600;
          .icon {
            margin-right: 8px;
            img {
              width: 14px;
              height: 14px;
              opacity: 0.7;
              position: relative;
            }
          }
        }
        .action {
          width: 70px;
          text-align: right;
          .like-icon {
            margin-right: 20px;
            img {
              width: 16px;
              height: 16px;
            }
          }
          .comment-icon {
            img {
              width: 16px;
              height: 16px;
            }
          }
        }
      }
      .like-cnt {
          flex: 1;
          padding-bottom: 15px;
          .like-box,
          .comment-box {
            display: flex;
            .icon {
              img {
                width: 14px;
                height: 14px;
                opacity: 0.7;
              }
            }
          }
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 8px;
            padding-top: 2px;
          }
          .list {
            flex: 1;
            .name {
              font-size: 14px;
              color: #445166;
              display: inline-block;
              font-weight: 600;
            }
          }
          .more {
            font-size: 14px;
            color: #969ea8;
            display: block;
          }
          .like-box {
            margin-bottom: 10px;
            .list {
              .name {
                margin: 0 0 5px 0;
                display: inline-block;
                &.active {
                  color: #007ae6;
                }
              }
            }
          }
          .comment-box {
            font-size: 14px;
            .comment-item {
              margin-bottom: 5px;
              .replay-cnt {
                margin-left: 8px;
              }
              .text {
                margin: 0 5px;
              }
            }
          }
        }
    }
  }
  .nodata {
    padding-top: 160px;
    text-align: center;
    color: #999;
    font-size: 12px;
    img {
      width: 88px;
      height: 88px;
      margin-bottom: 5px;
    }
  }
  .artcle-tips {
    width: 120px;
    height: 36px;
    background-color: #007ae6;
    color: #fff;
    text-align: center;
    line-height: 36px;
    border-radius: 4px;
    font-size: 14px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 4px;
  }
  .write {
    width: 56px;
    position: fixed;
    right: 12px;
    bottom: 50px;
    z-index: 3;
    img {
      position: relative;
    }
  }
  .replay {
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    height: 100%;
    z-index: 3;
    .replay-cnt {
      // margin-top: 50px;
      width: 100%;
      padding: 20px 16px 30px 13px;
      box-sizing: border-box;
      position: relative;
      background-color: #fff;
      .top-action {
        display: flex;
        .cancle {
          font-size: 16px;
          color: #333;
          width: 80px;
          height: 32px;
          line-height: 32px;
        }
        .publish {
          flex: 1;
          text-align: right;
          span {
            display: inline-block;
            width: 56px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            border-radius: 6px;
            border: none;
            background-color: #007ae6;
            color: #fff;
            font-size: 14px;
          }
        }
      }
      .replay-title {
        margin: 16px 0;
        font-size: 16px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #666;
      }
      .replay-box {
        position: relative;
        font-size: 16px;
        height: 130px;
        overflow-y: auto;
        background-color: #f7f8f8;
        .name {
          color: #969ea8;
          position: absolute;
          left: 10px;
          top: 5px;
          line-height: 1.5;
          font-size: 14px;
          max-width: 75px;
          z-index: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: inline-block;
        }
        .textarea {
          width: 100%;
          height: 100%;
          box-sizing: boder-box;
          border: none;
          background-color: #f7f8f8;
          line-height: 1.5;
          padding: 5px 10px;
          font-size: 14px;
          z-index: 1;
          &::-webkit-input-placeholder {
            font-size: 14px;
            color: #999;
          }
        }
        .placeholder{
            &::-webkit-input-placeholder {
              padding-left: 75px;
          }
        }
      }
    }
  }
  .loading {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 50px;
    background-color: rgba(0, 0, 0, 0.2);
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
  .comment-like-dialog {
    position: fixed;
    width: 200px;
    height: 45px;
    color: #fff;
    // left: 50%;
    // transform: translateX(-50%);
    text-align: center;
    z-index: 3;
    .arrow-up {
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid #4b5154;
      position: relative;
      left: 50%;
    }
    .action {
      position: relative;
      background-color: #4b5154;
      height: 40px;
      border-radius: 6px;
      font-size: 14px;
      vertical-align: middle;
      line-height: 40px;
      display: flex;
      span {
        flex: 1;
        img {
          width: 16px;
          height: 16px;
          vertical-align: middle;
          position: relative;
          top: -1px;
          margin-right: 2px;
        }
      }
    }
  }
}
</style>

<style lang="less">
.van-actionsheet-del {
  color: #ea4d2e;
}
</style>
