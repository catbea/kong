<template>
  <div class="article-box">
    <Guide v-if="showGuide" @hideGuide="hideStep"/>
    <div class="tab-bar scale-1px-bottom">
      <div class="classify">
        <span :class="{'recommend': item.itemCode===classify && item.itemName === classifyName}" v-for="(item, index) in articleType" :key="index" @click="changeClassify(item)">{{item.itemName}}</span>
      </div>
      <span class="icon" @click="showSubFn">
        <img v-show="!showSub" src="../../assets/img/article/tabicon.png" alt="">
        <img v-show="showSub" src="../../assets/img/article/tabicon2.png" alt="">
      </span>
    </div>
    <div class="submenu" v-show="showSub" @click="hideSubMenu">
      <ul>
        <li :class="[{'active': sortType === 1},'scale-1px-bottom']" @click="sortTypeFn(1)">按时间排</li>
        <li :class="{'active': sortType === 2}" @click="sortTypeFn(2)">按活跃度排序</li>
      </ul>
    </div>
    <div class="article-list"  v-if="articleData.length">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="--没有更多了--"
          @load="onLoad"
        >
          <div class="article-item" v-for="(item,index) in articleData" :key="index">
            <div class="content scale-1px-bottom">
              <div class="left-cnt">
                <h3 class="title">{{item.articleTitle}}</h3>
                <div class="attr">
                  <p class="source">
                    <span class="name">{{item.publisher}}</span>
                    <span class="time">{{item.createTime | formatData}}</span>
                  </p>
                  <span class="read">{{item.scanNum}}次阅读</span>
                </div>
              </div>
              <div class="img">
                <img :src="item.articleImg" alt="">
              </div>
            </div>
            <div class="comment">
              <div class="like-cnt">
                <div class="like-box" v-show="item.praiseAndShareUserVOS.length">
                  <span class="icon"><img src="../../assets/img/article/like1.png" alt=""></span>
                  <div class="list">
                    <span class="name" v-for="(data,num) in item.praiseAndShareUserVOS" :key="num" @click="" v-show="num < item.likeCount-1">{{data.userName}}<label v-show="num !== item.praiseAndShareUserVOS.length-1">、</label></span>
                    <span class="more" v-show="item.praiseAndShareUserVOS.length > item.likeCount" @click="item.likeCount=item.praiseAndShareUserVOS.length">展开查看<van-icon name="arrow-down" /></span>
                    <span class="more" v-show="item.praiseAndShareUserVOS.length <= item.likeCount && item.praiseAndShareUserVOS.length > 25" @click="item.likeCount=25" >收起<van-icon name="arrow-up" /></span>
                  </div>
                </div>
                <div class="comment-box" v-show="item.discussVOS.length">
                  <span class="icon"><img src="../../assets/img/article/dis1.png" alt=""></span>
                  <div class="list">
                    <div class="comment-item" v-for="(data,num) in item.discussVOS" :key="num">
                      <p  v-show="num < item.replayCount-1"><span class="name">{{data.senderName}}</span><span class="text" v-if="data.receiverName">回复</span><span class="name" v-if="data.receiverName">{{data.receiverName }}</span>:<span class="replay-cnt">{{data.content}}</span></p>
                    </div>
                    <span class="more" v-show="item.discussVOS.length > item.replayCount" @click="item.replayCount=item.discussVOS.length">展开查看<van-icon name="arrow-down" /></span>
                    <span class="more" v-show="item.discussVOS.length === item.replayCount && item.discussVOS.length > 5" @click="item.replayCount=5">收起<van-icon name="arrow-up" /></span>
                  </div>
                  
                </div>
              </div>
              <div class="action">
                <span class="like-icon">
                  <img src="../../assets/img/article/like2.png" alt="" v-if="item.praiseStatus===1" @click="updateLike(item.articleId, 0, index)" />
                  <img src="../../assets/img/article/like1.png" alt="" v-else  @click="updateLike(item.articleId, 1, index)" />
                </span>
                <span class="comment-icon">
                  <img src="../../assets/img/article/dis1.png" alt="" @click="showReplayFn(item,index)" />
                </span>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="nodata" v-else>
      <img src="../../assets/img/article/noarticle.png" alt="">
      <p>对不起，暂时没有查询到相关文章！</p>
    </div>
    <div class="artcle-tips" v-show="showNewArticle">
      {{'10'}}条新内容<van-icon name="arrow-down" />
    </div>
    <div class="write">
      <p @click="goAdd"><img src="../../assets/img/article/plus.png" alt=""></p>
      <p><img src="../../assets/img/article/write.png" alt=""></p>
    </div>
    <div class="replay" v-show="showReplay">
      <div class="replay-cnt">
        <div class="top-action">
          <span class="cancle" @click="hideReplayFn">取消</span>
          <span  class="publish" @click=""><button>发布</button></span>
        </div>
        <div class="replay-title">
          {{}}
        </div>
        <div class="replay-box">
          <span class="name">回复{{'王毅'}}</span>
          <textarea class="textarea" name="" id="" ref="replaybox" maxlength="140" v-model="replayCnt"></textarea>
        </div>
      </div>
    </div>
    <div class="loading"  v-show="showLoading" >
        <van-loading type="spinner" color="white" class="van-loading"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Guide from './guide'
import ArticleService from 'SERVICE/articleService'
import { formatTime, parseTime } from '@/utils/tool'
export default {
  components: {
    Guide
  },
  data () {
    return{
      showGuide: false, // 显示引导
      articleData: [], // 文章列表
      showSub: false, // 显示排序菜单
      city: '', // 用户主营城市
      loading: false,   //是否处于加载状态
      finished: false,  //是否已加载完所有数据
      isLoading: false,   //是否处于下拉刷新状态
      showReplay: false, //显示回复框
      showNewArticle: false, // 显示新消息
      articleType: [{itemCode: '', itemName: '推荐'}],
      size: 10,
      current: 1,
      pages: null,
      classify: '', // 分类
      sortType: 1,  // 排序
      classifyName: '推荐', // 分类
      showLoading: false, // loading
      replayCnt: '', // 评论内容
      replayItem: '' // 评论文章
    }
  },
  created () {
    this.showGuide = JSON.parse(window.localStorage.getItem('guideStatus'))
    if (this.userArea.city) {
      this.city = this.userArea.city
      this.articleType.push({itemCode: '', itemName: this.userArea.city})
    }
    this.getArticleType()
    this.getArticleList()
    console.log(this.userInfo)
  },
  computed: {
    ...mapGetters(['userArea', 'userInfo'])
  },
  mounted () {
  },
  methods: {
    // 隐藏引导页
    hideStep () {
      this.showGuide = false
      window.localStorage.setItem('guideStatus', false)
    },
    // 获取文章分类
    async getArticleType () {
      this.showLoading = true
      let result = await ArticleService.getArticleType({classify: 'information_classify'})
      if (result) {
        this.articleType.push(...result)
      }
      this.showLoading = false
    },
    // 获取文章列表
    async getArticleList () {
      this.showLoading = true
      let result = await ArticleService.getArticleList({
        current: this.current,
        size: this.size,
        city: (this.classifyName === this.city) ? this.city : '',
        classify: this.classify,
        sortType: this.sortType
      })
      if (result) {
        this.listPages = result.pages
        let records = result.records.map(item => {
         return Object.assign(item, {likeCount: 25, replayCount: 5})
        })
        this.articleData.push(...records)
      }
      this.showLoading = false
    },
    // 重新获取位置
    async getLocation() {
      await this.$wechatHelper.getUserArea()
    },
    // tab切换 文章分类查询
    changeClassify (item) {
      this.classify = item.itemCode
      this.classifyName = item.itemName
      this.articleData = []
      this.getArticleList()
    },
    // 显示按时间排序菜单
    showSubFn () {
      this.showSub = !this.showSub
    },
    // 隐藏时间排序菜单
    hideSubMenu () {
      this.showSub = false
    },
    // 按时间菜单排序
    sortTypeFn (val) {
      this.sortType = val
      this.articleData = []
      this.getArticleList()
    },
    // 点赞
    async updateLike (articleId, praiseStatus, index) {
      // debugger
      let result = await ArticleService.updateLike({
        infoId: articleId,
        likeFlag: praiseStatus
      })
      this.articleData[index].praiseStatus = praiseStatus
      if (praiseStatus===0) {
        let item = this.articleData[index].praiseAndShareUserVOS
        let r = item.filter(el => el.articleId !== articleId)
        this.articleData[index].praiseAndShareUserVOS = r
      } else {
        this.articleData[index].praiseAndShareUserVOS.unshift({
          operationTime: +new Date(),
          userId: this.userInfo.agentId,
          userName: this.userInfo.nickName,
          userSource: 0
        })
      }
    },
    // 展示评论框
    showReplayFn (item, index) {
      this.replayItem = item
      this.showReplay = true
      this.$nextTick(function() {
        this.$refs.replaybox.focus()
      })
    },
    // 隐藏评论框
    hideReplayFn () {
      this.showReplay = false
    },
    insertCommentFn () {

    },
    // 评论
    async insertComment (item, index) {
      let result = await ArticleService.insertComment({
        content: this.replayCnt,
        enterpriseId: this.userInfo.enterpriseId,
        infoId: item.articleId,
        receiverId: '',
        receiverSource: '',
        senderId: this.userInfo.agentId,
        senderSource: 0,
        syncId: '',
        type: 0
      })
      if (result) {

      }
    },
    // 新增文章
    goAdd () {
      this.$router.push('/discover/newlyAdded/index')
    },
    // 加载更多
    onLoad() {
      // 加载状态结束
      this.loading = false
    },
    // 下拉刷新
    onRefresh() {
      this.isLoading = false
    }
  },
  filters: {
    formatData (time) {
      return time? formatTime(time, '{y}-{m}-{d}') : ''
    }
  }
}
</script>

<style lang="less" scoped>
.article-box{
  font-family:"Microsoft YaHei";
  font-size: 16px;
  .tab-bar{
    font-size: 14px;
    color: #333;
    height: 20px;
    line-height: 20px;
    padding: 12px 16px;
    height: 54px;
    position: relative;
    .classify{
      width: 85%;
      overflow-x: auto;
      white-space: nowrap;
    }
    span{
      display: inline-block;
      margin-right: 32px;
      &.active{
        color: #007AE6;
      }
    }
    .recommend{
      font-size: 24px;
      height: 34px;
      line-height: 34px;
    }
    .icon{
        position: absolute;
        right: 0;
        width: 30px;
        top: 25px;
        right: 16px;
        margin-right: 0;
        text-align: center;
        img{
          width: 16px;
          height: 16px;
        }
      }
  }
  .submenu{
    position: absolute;
    top: 54px;
    left: 0;
    width: 100%;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2;
    ul{
      position: relative;
      background-color: #fff;
      li{
        height: 50px;
        line-height: 50px;
        padding: 0 16px;
        &.active{
          color: #007AE6;
        }
      }
    }
  }
  .article-list{
    position: fixed;
    top: 54px;
    width: 100%;
    bottom: 50px;
    overflow-y: auto;
    z-index: 1;
    .article-item{
      margin: 0 16px;
      border-bottom:10px solid #F7F9FA;
      .content{
        display: flex;
        padding-bottom: 12px;
        .left-cnt{
          height: 90px;
          flex: 1;
          margin-right: 15px;
          .title{
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; //（行数）
            -webkit-box-orient: vertical;
            padding-top: 10px;
          }
          .attr{
            padding-top: 30px;
            color: #969EA8;
            font-size: 12px;
            display: flex;
            .source{
              flex: 1;
              .name{
                display: inline-block;
                margin-right: 8px;
                max-width: 60px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                vertical-align: middle;
              }
              .time{
                display: inline-block;
                vertical-align: middle;
              }
            }
            .read{
              line-height: 16px;
              min-width: 60px;
              text-align: right;
              display: inline-block;
              vertical-align: middle;
            }
          }
        }
        .img{
          width: 120px;
          height: 90px;
          padding-top: 10px;
          border-radius: 6px;
          overflow: hidden;
          img{
            min-width: 100%;
            min-height: 100%;
            border-radius: 6px;
          }
        }
      }
      .comment{
        display: flex;
        padding-top: 10px;
        padding-bottom: 18px;
        .like-cnt{
          flex: 1;
          .like-box,.comment-box{
            display: flex;
          }
          .icon{
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 8px;
            padding-top: 2px;
          }
          .list{
            flex: 1;
            margin-right: 20px;
            .name{
              font-size: 14px;
              color: #445166;
              display: inline-block;
            }
          }
          .more{
            font-size: 12px;
            color: #969EA8;
            margin-left: 10px;
          }
          .like-box{
            margin-bottom: 10px;
            .list{
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 5; //（行数）
              -webkit-box-orient: vertical;
              .name{
                margin: 0 5px 5px 0;
              }
            }
          }
          .comment-box{
            font-size: 14px;
            .comment-item{
              margin-bottom: 5px;
              .replay-cnt{
                margin-left: 8px;
              }
              .text{
                margin: 0 5px;
              }
            }
          }
        }
        .action{
          width: 70px;
          .like-icon{
            margin-right: 20px;
            img{
              width: 16px;
              height: 16px;
            }
          }
          .comment-icon{
            img{
              width: 16px;
              height: 16px;
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
    img{
      width: 88px;
      height: 88px;
      margin-bottom: 5px;
    }
  }
  .artcle-tips{
    width: 120px;
    height: 36px;
    background-color: #007AE6;
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
  .write{
    width: 56px;
    position: fixed;
    right: 12px;
    bottom: 60px;
    z-index: 3;
    img{
      position: relative;
    }
  }
  .replay{
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    height: 100%;
    z-index: 3;
    .replay-cnt{
      margin-top: 50px;
      width: 100%;
      padding: 20px 16px 30px 13px;
      box-sizing: border-box;
      position: relative;
      background-color: #fff;
      .top-action{
        display: flex;
        .cancle{
          font-size: 16px;
          color: #333;
          width: 80px;
          height: 32px;
          line-height: 32px;
        }
        .publish{
          flex: 1;
          text-align: right;
          button{
            width: 56px;
            height: 32px;
            border-radius: 6px;
            border: none;
            background-color: #007AE6;
            color: #fff;
            font-size: 14px;
          }
        }
      }
      .replay-title{
        margin: 16px 0;
        font-size: 16px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #666;
      }
      .replay-box{
        position: relative;
        font-size: 16px;
        height: 130px;
        overflow-y: auto;
        background-color: #F7F8F8;
        .name{
          color: #969EA8;
          position: absolute;
          left: 10px;
          top: 5px;
          line-height: 1.5;
        }
        .textarea{
          width: 100%;
          height: 100%;
          box-sizing: boder-box;
          border: none;
          background-color: #F7F8F8;
          line-height: 1.5;
          text-indent: 75px;
          padding: 5px 10px;
        }
      }
    }
  }
  // loading
  .loading{
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
}
</style>
