<template>
  <div class="comment-detail">
    <div class="title scale-1px-bottom">
      <h3 v-if="commnetInfo">{{commnetInfo.linkerName}}</h3>
      <div class="arrow" @click="goMarket">
        <img src="../../../assets/img/market/comment/arrow.png" alt="" srcset="">
      </div>
    </div>
    <div class="comment-detail-box">
      <div class="comment-item" v-if="commnetInfo">
        <div class="comment-user">
          <img class="usre-img" :src="commnetInfo.avatarUrl" alt="" srcset="">
          <div class="user-info">
            <p class="name">
              <b>{{commnetInfo.nickName | formatName}}</b>
              <span v-show="commnetInfo.userTag !== 2">{{commnetInfo.userTag | formatTag}}</span>
            </p>
            <div class="star"><van-rate v-model="commnetInfo.starLevel" :size="10" :count="5" :readonly="true" color="#ED8147" void-icon="star" /></div>
          </div>
        </div>
        <div class="comment-info">{{commnetInfo.content}}</div>
        <div class="comment-pic">
          <div class="pic-box"  v-for="(item,index) in commnetInfo.imgList" :key="index"   @click="imagePreview(index)">
            <img :src="item.imgUrl" alt="">
          </div>
        </div>
        <div class="comment-action">
          <p class="time">{{commnetInfo.createTimeStamp | formatData}}</p>
          <p class="btn">
            <span @click="showDialogFn"><img src="../../../assets/img/market/comment/msg.png" alt=""> ({{commnetInfo.replyNum}})</span>
            <span @click="updateLinkeStatus"><img src="../../../assets/img/market/comment/zan2.png" alt="" v-if="commnetInfo.likeFlag"><img src="../../../assets/img/market/comment/zan.png" alt="" v-else> ({{commnetInfo.likeNum}})</span>
          </p>
        </div>
      </div>
      <div class="list-box">
        <div class="reply" v-if="replayList.length">
          <div class="reply-title">全部回复（{{this.total}}）</div>
          <div class="reply-box">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="reply-item scale-1px-bottom" v-for="(item,index) in replayList" :key="index">
                <div class="reply-user">
                  <img class="usre-img" :src="item.avatarUrl" alt="" srcset="">
                  <div class="user-info">
                    <p class="name">
                      <b>{{item.nickName | formatName(item)}}</b>
                      <span v-show="item.userTag && item.userTag !== 2">{{item.userTag | formatTag}}</span>
                    </p>
                    <div class="star">{{item.createTimeStamp | formatData}}</div>
                  </div>
                </div>
                <div class="reply-info">
                  {{item.content}}
                </div>
              </div>
            </van-list>
          </div>
        </div>
        <div class="nodata" v-if="showNodata && !replayList.length">
          <img src="../../../assets/img/market/comment/nodata.png" alt="">
          <p>该评论还没有回复，快来抢先一步回复吧！</p> 
        </div>
      </div>
    </div>
    <div class="reply-cnt-input scale-1px">
      <div class="input-box" @click="showDialogFn">写回复 与楼主分享心得</div>
    </div>
    <div class="replay-cnt-dialog" v-show="showDialog" @click="hideDialogFn">
      <div class="replay-cnt" @click.stop="">
        <div class="top-action">
          <p class="cancle" @click.stop="hideDialogFn">取消</p>
          <p class="publish">
            <span @click.stop="replyFn">发布</span>
          </p>
        </div>
        <div class="replay-box">
          <textarea
            placeholder="请输入回复内容（1-150字）"
            class="textarea"
            name=""
            id=""
            ref="replaybox"
            maxlength="150"
            v-model="replayCnt"
            @blur="blur"
          ></textarea>
        </div>
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
      commentId: '',
      commnetInfo: null,
      replayList: [],
      loading: false,
      finished: false,
      size: 10,
      current: 1,
      pages: null,
      total: '',
      star: 5,
      replayCnt: '',
      showDialog: false,
      showNodata: false,
      debounce: false, // 重复提交
      imagePreviewObj: ''
    }
  },
  created () {
    this.marketId = this.$route.query.marketId
    this.commentId = this.$route.params.id
    this.getLinkerComment()
    this.getReplyList()
  },
  methods: {
    // 获取评论详情
    async getLinkerComment () {
      let result = await marketService.getLinkerComment({
        commentId: this.commentId
      })
      if (result) {
        this.commnetInfo = result
      }
    },
    // 预览图片
    imagePreview (index) {
      let imgs = this.commnetInfo.imgList.map(item => {
        return item.imgUrl
      })
      this.imagePreviewObj = ImagePreview({
        images: imgs,
        startPosition: index,
        loop: false,
        onClose() {
          // do something
        }
      })
    },
    // 加载更多
    async onLoad() {
      if (this.current > this.pages) {
        // 加载状态结束
        this.finished = true
        this.loading = false
      } else {
        await this.getReplyList()
        this.loading = false
      }
    },
    // 获取评论回复列表
    async getReplyList () {
      let result = await marketService.getReplyList({
        current: this.current,
        size: this.size,
        commentId: this.commentId
      })
      if (result) {
        this.showNodata = true
        this.pages = result.pages
        this.total = result.total
        let replayList = result.records
        if (this.current === 1) {
          this.replayList = replayList
        } else {
          this.replayList.push(...replayList)
        }
        this.current += 1
        
      }
    },
    // 键盘遮挡
    blur() {
      setTimeout(()=>{document.activeElement.scrollIntoViewIfNeeded(true)},10)
    },
    // 展示回复框
    showDialogFn () {
      this.showDialog = true
      this.$nextTick(function() {
        this.$refs.replaybox.focus()
      })
    },
    // 隐藏回复框
    hideDialogFn () {
      this.showDialog = false
      this.replayCnt = ''
    },
    // 点赞
    async updateLinkeStatus () {
      let item = this.commnetInfo
      let result = await marketService.updateLinkeStatus({
        commentId: item.commentId,
        likeStatus: item.likeFlag ? 1 : 0
      })
      item.likeFlag = item.likeFlag ? false : true
      item.likeNum = item.likeFlag ? item.likeNum + 1 : item.likeNum - 1
      // if (result.result) {
      //   item.likeFlag = item.likeFlag ? 0 : 1
      //   item.likeNum = item.likeFlag ? item.likeNum + 1 : item.likeNum - 1
      // } else {
      //   this.$toast('点赞失败')
      // } 
    },
    // 回复评论
    replyFn () {
      let data = this.replayCnt.trim()
      if (!data) {
        return this.$toast('回复内容不能为空')
      }
      if (data.length > 150) {
        return this.$toast('回复内容不超过150个字')
      }
      this.insertLinkerComment()
    },
    // 回复
    async insertLinkerComment () {
      if (this.debounce) {return false}
      this.debounce = true
      this.showLoading = true
      let result = await marketService.insertLinkerComment({
        commentType: 2,
        content: this.replayCnt.trim(),
        linkerId: this.marketId,
        parentId: this.commnetInfo.commentId
      })
      this.showLoading = false
      this.hideDialogFn()
      this.debounce = false
      this.replayCnt = ''
      this.commnetInfo.replyNum += 1
      this.current = 1
      this.getReplyList()
    },
    // goMarket跳转楼盘详情
    goMarket () {
      this.$router.push(`/market/${this.marketId}`)
    }
  },
  filters: {
    // 格式化名称
    formatName (val,item) {
      let str = val + ''
      let len = val.length
      if (!len) {
        return ''
      } else if (item&&item.userTag === 3) {
        return val
      }
      else if (len === 1) {
        return val + '***'
      } else {
        return `${val[0]}***${val[len-1]}`
      }
    },
    // 格式化用户标签
    formatTag (val) {
      if (!val) {
        return ''
      }
      let tag = {
        1: '实看用户',
        2: '未实看用户',
        3: '系统客服'
      }
      return tag[val]
    },
    // 格式化时间
    formatData (time) {
      let date =  new Date(+time)
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      return `${y}年${m}月${d}日`
    }
  },
  beforeDestroy () {
    this.imagePreviewObj&&this.imagePreviewObj.close()
  }
}
</script>

<style lang="less" scoped>
.comment-detail{
  height: 100%;
  display: flex;
  flex-direction: column;
  .title{
    height: 45px;
    line-height: 45px;
    display: flex;
    h3{
      padding: 0 16px;
      flex: 1;
      font-size: 20px;
    }
    .arrow{
      width: 100px;
      text-align: right;
      margin-right: 16px;
      img{
        width: 16px;
        height: 16px;
      }
    }
  }
  .comment-detail-box{
    flex: 1;
    overflow-y: scroll;
    .comment-item{
      font-size: 12px;
      margin: 15px 16px;
      .comment-user{
        display: flex;
        .usre-img{
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 15px;
          object-fit: cover;
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
          .star{
            margin-top: 5px;
          }
        }
      }
      .comment-info{
        font-size: 14px;
        color: #666;
        line-height: 1.5;
        margin-top: 10px;
      }
      .comment-pic{
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        .pic-box{
          flex: 0 0 80px;
          height: 60px;
          overflow: hidden;
          border-radius: 6px;
          margin-bottom: 10px;
          margin-right: 6px;
          &:nth-child(4n+4){
            margin-right: 0;
          }
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
            vertical-align: middle;
            img{
              width: 12px;
              height: 12px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .reply{
      margin: 20px 16px;
      .reply-title{
        font-size: 18px;
      }
      .reply-box{
        margin-top: 15px;
        .reply-user{
          display: flex;
          .usre-img{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-right: 15px;
            margin-top: 5px;
            object-fit: cover;
          }
          .user-info{
            flex: 1;
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
                vertical-align: middle;
              }
            }
            .star{
              margin-top: 2px;
              font-size: 12px;
              color: #999;
            }
          }
        }
        .reply-info{
          margin-top: 16px;
          font-size: 14px;
          color: #666;
          line-height: 1.5;
          padding-bottom: 15px;
        }
      }
    }
    .nodata{
      height: 300px;
      display: flex;
      flex-direction: column;
      color: #999;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 12px;
      img{
        width: 88px;
      }
    }
  }
  .reply-cnt-input{
    width: 100%;
    height: 60px;
    margin-bottom: 10px;
    .input-box{
      margin: 16px auto;
      padding: 0 5px;
      color: #999;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
      width: 90%;
      box-sizing: content-box;
      border: 1px solid rgba(183, 183, 183, 1);
      border-radius: 4px;
    }
  }
  .replay-cnt-dialog {
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    z-index: 3;
    .replay-cnt {
      // margin-top: 50px;
      width: 100%;
      padding: 0 16px 30px 13px;
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      background-color: #fff;
      .top-action {
        display: flex;
        padding: 10px 0;
        .cancle {
          width: 80px;
          height: 32px;
          line-height: 32px;
          font-size: 16px;
          color: #333;
          margin-right: 50px;
          box-sizing: content-box;
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
        p {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          color: #666;
        }
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
      }
    }
  }
}
</style>

<style>
.van-image-preview__image{
    max-height: 90%!important;
  }
</style>