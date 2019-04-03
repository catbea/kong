<template>
  <div class="market-list">
    <div class="market-list-box">
      <div class="tags">
        <span 
          v-for="(item, index) in tagList"
          :key="index" :class="{'active': activeType === index}"
          @click="cahngeTag(index)"
          v-if="formatCount(item)"
          >
          {{item}}({{formatCount(item)}})
        </span>
      </div>

      <div class="list-box">
        <div class="wrapper" v-if="commnetList.length">
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
              >
                <div class="comment-user"  @click="goDetail(item)">
                  <img class="usre-img" :src="item.avatarUrl" alt="" srcset="">
                  <div class="user-info">
                    <p class="name">
                      <b>{{item.nickName | formatName}}</b>
                      <span v-show="item.userTag === 1">{{item.userTag | formatTag}}</span>
                    </p>
                    <div class="star"><van-rate v-model="item.starLevel" :size="10" :count="5" :readonly="true" color="#ED8147" void-icon="star" /></div>
                  </div>
                </div>
                <div class="comment-info"  @click="goDetail(item)" :style="{'-webkit-line-clamp': item.showMore? 10: 3}">{{item.content}}</div>
                <div class="comment-more" v-show="!item.showMore && item.content.length > 60" @click.stop="item.showMore=true">全文</div>
                <div class="comment-more" v-show="item.showMore" @click.stop="item.showMore=false">收起</div>
                <div class="comment-pic" v-if="item.imgList.length">
                  <div class="pic-box" v-for="(option,i) in item.imgList" :key="i"  @click="imagePreview(index,i)" v-show="i < 4">
                    <img  :src="option.imgUrl" alt="">
                  </div>
                </div>
                <div class="comment-action">
                  <p class="time">{{item.createTimeStamp | formatData}}</p>
                  <p class="btn">
                    <span @click="showDialogFn(index)"><img src="../../../assets/img/market/comment/msg.png" alt=""> ({{item.replyNum}})</span>
                    <span @click="updateLinkeStatus(item)"><img src="../../../assets/img/market/comment/zan2.png" alt="" v-if="item.likeFlag"><img src="../../../assets/img/market/comment/zan.png" alt="" v-else> ({{item.likeNum}})</span>
                  </p>
                </div>
            </div>
          </van-list>
        </div>
        <div class="nodata" v-if="!commnetList.length && showNodata">
          <img src="../../../assets/img/market/comment/nodata.png" alt="">
          <p>该楼盘没有评论哦，快来抢先一步评论吧！</p> 
        </div>
      </div>
    </div>
    <div class="comment-btn" @click="goWrite">
      写点评 分享心得
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
            v-model.trim="replayCnt"
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
      tagList: ['全部', '实看', '好评', '有图'],
      commentCount: null,
      activeTag: 0,
      commnetList: [],
      loading: false,
      finished: false,
      size: 10,
      current: 1,
      pages: null,
      star: 5,
      replayCnt: '',
      showDialog: false,
      replayIndex: '',
      showNodata: false,
      debounce: false // 重复提交
    }
  },
  created () {
    this.marketId = this.$route.params.id
    this.activeType = +this.$route.query.type || 0
    this.getCommentCount()
    this.getCommentList()
  },
  methods: {
    // 楼盘评论分类统计
    async getCommentCount () {
      let result = await marketService.getCommentCount({linkerId: this.marketId})
      if (result) {
        this.commentCount = result
      }
    },
    // 格式化统计数
    formatCount (val) {
      if (!this.commentCount) {
        return 0
      }
      let status = {
        '全部': this.commentCount.all,
        '有图': this.commentCount.withPicture ,
        '实看': this.commentCount.authUserNum,
        '好评': this.commentCount.goodReputation
      }
      return status[val]
    },
    // 切换标签
    cahngeTag (index) {
      this.activeType = index
      this.current = 1
      this.finished = false
      this.loading = false
      document.querySelector('.list-box').scrollTop = 0
    },
    // 获取评论列表
    async getCommentList () {
      let result = await marketService.getCommentList({
        current: this.current,
        size: this.size,
        linkerId: this.marketId,
        type: this.activeType
      })
      if (result) {
        this.showNodata = true
        this.pages = result.pages
        let commnetList = result.records.map(item => {
          return Object.assign(item, { showMore: false })
        })
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
      let imgs = this.commnetList[index].imgList.map(item => {
        return item.imgUrl
      })
      ImagePreview({
        images: imgs,
        startPosition: i,
        loop: true,
        onClose() {
          // do something
        }
      })
    },
    // 跳转写点评
    goWrite () {
      this.$router.push(`/market/comment/write/${this.marketId}`)
    },
    // 跳转评论详情
    goDetail (item) {
      this.$router.push(`/market/comment/detail/${item.commentId}?marketId=${this.marketId}`)
    },
    // 评论弹框
    blur() {
      setTimeout(()=>{document.activeElement.scrollIntoViewIfNeeded(true)},10)
    },
    // 点赞
    async updateLinkeStatus (item) {
       let result = await marketService.updateLinkeStatus({
        commentId: item.commentId,
        likeStatus: item.likeFlag ? 0 : 1
      })
      item.likeFlag = item.likeFlag ? 0 : 1
      item.likeNum = item.likeFlag ? item.likeNum + 1 : item.likeNum - 1
      // if (result.result) {
      //   item.likeFlag = item.likeFlag ? 0 : 1
      //   item.likeNum = item.likeFlag ? item.likeNum + 1 : item.likeNum - 1
      // }  else {
      //   this.$toast('点赞失败')
      // } 
    },
    // 展示回复框
    showDialogFn (index) {
      this.replayIndex = index
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
    // 回复评论
    replyFn () {
      let data = this.replayCnt.trim()
      if (!data) {
        return this.$toast('回复内容不能为空')
      }
      if (data > 150) {
        return this.$toast('回复内容不超过150个字')
      }
      this.insertLinkerComment()
    },
    // 回复
    async insertLinkerComment () {
      if (this.debounce) {return false}
      this.debounce = true
      let item = this.commnetList[this.replayIndex]
      this.showLoading = true
      let result = await marketService.insertLinkerComment({
        commentType: 2,
        content: this.replayCnt.trim(),
        linkerId: this.marketId,
        parentId: item.commentId
      })
      this.showLoading = false
      item.replyNum += 1
      this.$toast('回复评论成功！')
      this.hideDialogFn()
      this.debounce = false
    },
  },
  filters: {
    // 格式化名称
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
    },
    // 格式化用户标签
    formatTag (val) {
      if (!val) {
        return ''
      }
      let tag = {
        1: '实看用户',
        2: '未实看用户',
        3: '管理员'
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
  }
}
</script>

<style lang="less" scoped>
.market-list{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  .market-list-box{
    flex: 1;
    display: flex;
    flex-direction: column;
    .tags{
      max-height: 80px;
      margin: 12px 16px 0;
      display: flex;
      flex-flow: row wrap;
      // justify-content: space-between;
      span{
        flex: 0 1 100px;
        font-size: 12px;
        text-align: center;
        color: #8B97A7;
        background-color: #F2F5F9;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        margin-bottom: 10px;
        margin-right: 15px;
        &.active{
          background-color: #007AE6;
          color: #fff;
        }
        &:nth-child(3n+3){
          margin-right: 0;
        }
      }
    }
    .list-box{
      flex: 1;
      overflow-y: scroll;
      .wrapper{
        .comment-item{
          margin: 10px 16px 10px;
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
                  border-radius: 2px;
                }
              }
            }
            .star{
              margin-top: 5px;
            }
          }
          .comment-info{
            font-size: 14px;
            color: #666;
            line-height: 1.5;
            // 5行省略
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
            // justify-content: space-between;
            margin-top: 6px;
            .pic-box{
              flex: 0 0 80px;
              height: 60px;
              overflow: hidden;
              border-radius: 6px;
              margin-right: 10px;
              img{
                min-height: 60px;
                min-width: 80px;
              }
              &:nth-child(4n+4){
                margin-right: 0;
              }
            }
          }
          .comment-action{
            margin: 10px 0;
            color: #999;
            display: flex;
            font-size: 12px;
            padding-bottom: 10px;
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
      }
      .nodata{
        height: 400px;
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
  }
  .comment-btn{
    height: 44px;
    margin: 10px 16px;
    border-radius: 6px;
    background-color: #007AE6;
    color: #fff;
    font-size: 16px;
    line-height: 44px;
    text-align: center;
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
