<template>
  <div class="article-box">
    <Guide v-if="showGuide" @hideGuide="hideStep"/>
    <div class="tab-bar scale-1px-bottom">
      <span class="recommend" :class="{'active': tabIndex === 0}">推荐</span>
      <span class="tab" :class="{'active': tabIndex === 1}">{{city}}</span>
      <span class="tab" :class="{'active': tabIndex === 2}">行情</span>
      <span class="tab" :class="{'active': tabIndex === 3}">大佬说</span>
      <span class="icon" @click="showSubFn">
        <img v-show="!showSub" src="../../assets/img/article/tabicon.png" alt="">
        <img v-show="showSub" src="../../assets/img/article/tabicon2.png" alt="">
      </span>
    </div>
    <div class="submenu" v-show="showSub" @click="showSub=false">
      <ul>
        <li :class="[{'active': subIndex === 0},'scale-1px-bottom']" @click="subIndex=0">按时间排</li>
        <li :class="{'active': subIndex === 1}" @click="subIndex=1">按活跃度排序</li>
      </ul>
    </div>
    <div class="article-list">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="--没有更多了--"
          @load="onLoad"
        >
          <div class="article-item">
            <div class="content scale-1px-bottom">
              <div class="left-cnt">
                <h3 class="title">{{articleData.articleName}}</h3>
                <div class="attr">
                  <p class="source">
                    <span class="name">{{articleData.source}}</span>
                    <span class="time">{{articleData.createTime | formatData}}</span>
                  </p>
                  <span class="read"></span>
                </div>
              </div>
              <div class="img">
                <img src="" alt="">
              </div>
            </div>
            <div class="comment">
              <div class="like-cnt">
                <div class="like-box">
                  <span class="icon"><img src="../../assets/img/article/like1.png" alt=""></span>
                  <div class="list">
                    <span class="name" v-for="(item,index) in articleData.praiseAndShareUserVOS" :key="index" @click="show">{{item.userName}}</span>
                  </div>
                </div>
                <div class="comment-box">
                  <span class="icon"><img src="../../assets/img/article/dis1.png" alt=""></span>
                  <div class="list">
                    <div class="comment-item" v-for="(item,index) in articleData.discussVOS" :key="index">
                      <p><span class="name">{{item.senderName}}</span><span class="name" v-if="item.receiverName ">回复{{item.receiverName }}</span>:<span class="content">{{item.content}}</span></p>
                    </div>
                  </div>
                  
                </div>
              </div>
              <div class="action">
                <span class="like-icon">
                  <img src="../../assets/img/article/like1.png" alt="">
                  <!-- <img src="../../assets/img/article/like2.png" alt=""> -->
                </span>
                <span class="comment-icon">
                  <img src="../../assets/img/article/dis1.png" alt="">
                </span>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="artcle-tips">
      {{'10'}}条新内容<van-icon name="arrow-down" />
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
      articleData: {}, // 文章列表
      tabIndex: 0,  // tab切换
      showSub: false, // 显示排序菜单
      city: '', // 用户所在城市
      subIndex: '', // 排序索引
      loading: false,   //是否处于加载状态
      finished: false,  //是否已加载完所有数据
      isLoading: false,   //是否处于下拉刷新状态
    }
  },
  created () {
    this.showGuide = JSON.parse(window.localStorage.getItem('guideStatus'))
    this.getArticleList()
    if (!this.userArea.city) {
      this.getLocation()
      this.city = this.userArea.city || ''
    } else {
      this.city = this.userArea.city
    }
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
    // 获取文章列表
    async getArticleList () {
      let result = await ArticleService.getArticleList({agentId: this.userInfo.agentId})
      if (result) {
        this.articleData = result
      }
    },
    // 重新获取位置
    async getLocation() {
      await this.$wechatHelper.getUserArea()
    },
    // 显示按时间排序菜单
    showSubFn () {
      this.showSub = !this.showSub
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
      return time? formatTime(time) : ''
    }
  }
}
</script>

<style lang="less" scoped>
.article-box{
  font-size: 16px;
  .tab-bar{
    font-size: 14px;
    color: #333;
    height: 20px;
    line-height: 20px;
    padding: 12px 16px;
    height: 54px;
    position: relative;
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
    position: relative;
    z-index: 1;
    .article-item{
      margin: 0 16px;
      border-bottom:10px solid #F7F9FA;
      .content{
        display: flex;
        .left-cnt{
          height: 90px;
          flex: 1;
        }
        .img{
          width: 120px;
          height: 90px;
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
            margin-right: 8px;
          }
          .list{
            flex: 1;
            margin-right: 50px;
          }
        }
        .action{
          width: 70px;
          .like-icon{
            margin-right: 20px;
            img{
              width: 14px;
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
}
</style>
