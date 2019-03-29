<template>
  <div class="comment-detail">
    <div class="comment-detail-box">
      <div class="title scale-1px-bottom">
        <h3>碧桂园.山水江南</h3>
        <div class="arrow">
          <img src="../../../assets/img/market/comment/arrow.png" alt="" srcset="">
        </div>
      </div>
      <div class="comment-item">
        <div class="comment-user">
          <img class="usre-img" src="http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg" alt="" srcset="">
          <div class="user-info">
            <p class="name">
              <b>{{'用户名' | formatName}}</b>
              <span>实看用户</span>
            </p>
            <div class="star"><van-rate v-model="star" :size="10" :count="5" :readonly="true" color="#ED8147" /></div>
          </div>
        </div>
        <div class="comment-info">时代天镜附近有挺多综合商场，星美国际嘉荣阿斯蒂芬房东是沙发的个人防护进口量是的发发大师的方式发</div>
        <div class="comment-pic">
          <div class="pic-box"  @click="imagePreview(index)">
            <img src="http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg" alt="">
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
      <div class="reply">
        <div class="reply-title">全部回复（85）</div>
        <div class="reply-box">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="reply-item scale-1px-bottom" v-for="(item,index) in ">
              <div class="reply-user">
                <img class="usre-img" src="http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg" alt="" srcset="">
                <div class="user-info">
                  <p class="name">
                    <b>{{'用户名' | formatName}}</b>
                    <span>实看用户</span>
                  </p>
                  <div class="star">2019年07月27日</div>
                </div>
              </div>
              <div class="reply-info">
                时代天镜附近有挺多综合商场，星美国际嘉荣阿斯蒂芬房东是沙发的个人防护进口量是的发发大师的方式发
              </div>
            </div>
          </van-list>
        </div>
      </div>
    </div>
    <div class="reply-cnt-input scale-1px">
      <div class="input-box">
        <input type="text" placeholder="写回复 与楼主分享心得" ref="inputbox" @blur="blur" @focus="showDialogFn">
      </div>
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
      commnetInfo: null,
      replayList: [],
      loading: false,
      finished: false,
      size: 10,
      current: 1,
      pages: null,
      star: 5,
      replayCnt: '',
      showDialog: false
    }
  },
  created () {},
  methods: {
    // 预览图片
    imagePreview (index) {
      let imgs = this.commnetInfo.imgList
      ImagePreview({
        images: imgs,
        startPosition: index,
        loop: true,
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
    // 获取评论列表
    async getReplyList () {
      let result = await marketService.getReplyList({
      })
      if (result) {
        this.pages = result.pages
        let replayList = result.replayList
        if (this.current === 1) {
          this.replayList = replayList
        } else {
          this.commnetList.push(...commnetList)
        }
        this.current += 1
      }
    },
    // 键盘遮挡
    blur() {
      document.activeElement.scrollIntoViewIfNeeded(true)
    },
    // 展示回复框
    showDialogFn () {
      this.$refs.inputbox.blur()
      this.showDialog = true
      this.$refs.replaybox.focus()
    },
    // 隐藏回复框
    hideDialogFn () {
      this.showDialog = false
    },
    // 回复
    replyFn () {
      this.$refs.replaybox.blur()
      this.hideDialogFn()
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
.comment-detail{
  display: flex;
  flex-direction: column;
  .comment-detail-box{
    flex: 1;
    overflow-y: scroll;
  }
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
  .reply-cnt-input{
    width: 100%;
    height: 60px;
    margin-bottom: 10px;
    .input-box{
      margin: 16px 20px;
      text-align: center;
      input{
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        width: 90%;
        box-sizing: content-box;
        border: 1px solid rgba(183, 183, 183, 1);
        border-radius: 4px;
        outline: none;
        -webkit-appearance: none; 
        ::-webkit-input-placeholder{
          color: #999;
          font-size: 12px;
        }
      }
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

