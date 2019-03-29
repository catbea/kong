<template>
  <div class="market-list">
    <div class="tags">
      <span 
        v-for="(item, index) in tagList"
        :key="index" :class="{'active': activeTag === index}"
        @click="cahngeTag(index)"
        >
        {{item}}{{`(2)`}}
      </span>
    </div>
    <div class="list-box">
      <div class="wrapper">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div 
            v-for="(item, index) in commnetList"
            :key="index"
            class="comment-item" :class="{'scale-1px-bottom': index !== commnetList.length-1}"
            @click=""
            >
              <div class="comment-user">
                <img class="usre-img" src="" alt="" srcset="">
                <div class="user-info">
                  <p class="name">
                    <b>{{'用户名' | formatName}}</b>
                    <span>实看用户</span>
                  </p>
                  <div class="star"><van-rate v-model="star" :size="10" :count="5" :readonly="true" color="#ED8147" /></div>
                </div>
              </div>
              <div class="comment-info"></div>
              <div class="comment-more">全文</div>
              <div class="comment-pic">
                <div class="pic-box"  @click="imagePreview(index,i)">
                  <img src="" alt="">
                </div>
              </div>
              <div class="comment-action">
                <p class="time">2018年07月27日</p>
                <p class="btn">
                  <span><img src="../../../assets/img/market/comment/msg.png" alt=""> (3)</span>
                  <span><img src="../../../assets/img/market/comment/zan.png" alt="" v-if="false"><img src="../../../assets/img/market/comment/zan2.png" alt="" v-else> (6)</span>
                </p>
              </div>
          </div>
        </van-list>
      </div>
      <div class="nodata">
        <img src="../../../assets/img/market/comment/nodata.png" alt="">
        <p>该楼盘没有评论哦，快来抢先一步评论吧！</p> 
      </div>
      <div class="comment-btn">
        写点评 分享心得
      </div>
      
    </div>
  </div>
</template>

<script>
import marketService from 'SERVICE/marketService'
import { ImagePreview } from 'vant'
export default {
  data () {
    return {
      marketId: '',
      tagList: ['全部', '有图', '实看', '好评'],
      activeTag: 0,
      commnetList: [],
      loading: false,
      finished: false,
      size: 10,
      current: 1,
      pages: null,
      star: 5
    }
  },
  created () {
    this.marketId = this.$route.params.id
    this.activeTag = this.$route.query.type || 0
  },
  methods: {
    // 楼盘评论分类统计
    getCommentCount () {

    },
    // 切换标签
    cahngeTag (index) {
      this.activeTag = index
      this.getCommentList()
    },
    // 获取评论列表
    async getCommentList () {
      let result = await marketService.getCommentList({
      })
      if (result) {
        this.pages = result.pages
        let commnetList = result.commnetList
        if (this.current === 1) {
          this.commnetList = commnetList
        } else {
          this.commnetList.push(...commnetList)
        }
        this.current += 1
      }
    },
    // 加载更多
    async onLoad() {
      if (this.current > this.pages) {
        // 加载状态结束
        this.finished = true
        this.loading = false
      } else {
        await this.getCommentList()
        this.loading = false
      }
    },
    // 预览图片
    imagePreview (index,i) {
      let imgs = this.commnetList[index].imgList
      ImagePreview({
        images: imgs,
        startPosition: i,
        loop: true,
        onClose() {
          // do something
        }
      })
    }
  },
  filters: {
    formatName (val) {
      let str = val + ''
      let len = val.length
      if (!len) {
        return ''
      } else if (len === 1) {
        return val + '***'
      } else {
        return `${val[0]}***${val[len-1]}`
      }
    }
  }
}
</script>

<style lang="less" scoped>
.market-list{
   display: flex;
   flex-direction: column;
   font-size: 12px;
  .tags{
    margin: 12px 16px 20px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    span{
      flex: 0 1 108px;
      font-size: 12px;
      text-align: center;
      color: #8B97A7;
      background-color: #F2F5F9;
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
      margin-bottom: 10px;
      &.active{
        background-color: #007AE6;
        color: #fff;
      }
    }
  }
  .list-box{
    flex: 1;
    display: flex;
    flex-direction: column;
    .wrapper{
      flex: 1;
      overflow-y: scroll;
      .comment-item{
        .comment-user{
          display: flex;
          .usre-img{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-right: 15px;
          }
          .user-info{
            .name{
              b{
                font-size: 16px;
                margin-right: 8px;
                line-height: 20px;
                vertical-align: middle;
              }
              span{
                background-color: rgba(143, 159, 177, 0.15);
                color: rgba(92, 95, 102, 1);
                line-height: 15px;
                padding: 0 5px;
                font-size: 10px;
              }
            }
          }
        }
        .comment-info{
          font-size: 14px;
          color: #666;
          line-height: 1.5;
          // 3行省略
          word-break:break-all;
          display:-webkit-box;
          -webkit-line-clamp:3;
          -webkit-box-orient:vertical;
          overflow:hidden;
          margin-top: 10px;
        }
        .comment-more{
          font-size: 14px;
          color: #007AE6;
          line-height: 20px;
          margin: 5px 0;
        }
        .comment-pic{
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          .pic-box{
            flex: 0 1 80px;
            height: 60px;
            overflow: hidden;
            border-radius: 6px;
            img{
              min-height: 60px;
              min-width: 80px;
              border-radius: 6px;
            }
          }
        }
        .comment-action{
          margin: 10px 0;
          color: #999;
          display: flex;
          font-size: 12px;
          .time{
            flex: 1;
          }
          .btn{
            span{
              margin-left: 10px;
            }
          }
        }
      }
    }
    .nodata{
      flex: 1;
      color: #999;
      text-align: center;
      align-self: center;
      font-size: 12px;
      img{
        width: 88px;
      }
    }
    .comment-btn{
      height: 44px;
      margin: 20px 16px;
      border-radius: 6px;
      background-color: #007AE6;
      color: #fff;
      font-size: 16px;
      line-height: 44px;
      text-align: center;
    }
  }
}
</style>
