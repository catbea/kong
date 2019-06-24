<template>
  <div class="asking-body">
    <div
      class="asking-header"
      v-if="this.noData===false"
    >共有{{this.questionNum}}个问题，{{this.replyNum}}个回答</div>
    <div class="asking-center" v-if="this.noData===false">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div
          class="asking-item scale-1px-bottom"
          @click="enterDetails(item.questionId)"
          v-for="(item, index) in this.askingList"
          :key="index"
        >
          <div class="question-view">
            <div class="question-icon">问</div>
            <div class="question-body">
              <span class="question-title">
                #{{linkerName}}# {{item.content | textOver(30)}}
                <span
                  class="question-num"
                >{{item.replyNum}}人回复</span>
              </span>
            </div>
          </div>
          <!--  -->
          <div class="answer-view" v-if="item.replyVO!=''">
            <div class="answer-top">
              <div class="answer-icon">答</div>
              <img class="header-img" :src="item.replyVO.avatarUrl">
              <div class="user-name" v-if="item.replyVO.userId==='-1'">{{item.replyVO.nickName}}</div>
              <div class="user-name" v-else>{{item.replyVO.nickName|privacyName() }}</div>
              <div class="user-lable" v-if="item.replyVO.userId==='-1'">系统客服</div>
              <div class="reply-time">{{item.replyVO.createTimeStamp|dateTimeFormatter(5) }}</div>
            </div>
            <div class="answer-bottom">{{item.replyVO.content}}</div>
            <!--  -->
          </div>
        </div>
      </van-list>
    </div>
    <null :nullIcon="noAskingIcon" :nullcontent="nullcontent" v-if="this.noData===true"></null>
    <div class="asking-foot" @click="enterAskPage">立即提问</div>
  </div>
</template>


<script>
import Null from 'COMP/Null'
import marketService from 'SERVICE/marketService'
import timeUtils from '@/utils/timeUtils'

export default {
  components: {
    Null
  },
  data: () => ({
    loading: false,
    finished: false,
    noAskingIcon: require('IMG/market/no_asking.png'),
    nullcontent: '该楼盘没有问答哦，快来抢先一步提问吧！',
    noData: false,
    current: 1,
    askingList: [],
    linkerName: '',
    questionNum: '',
    replyNum: ''
  }),
  created() {
    var jsonInfo = JSON.parse(this.$route.query.infos)

    this.linkerId = jsonInfo.id
    this.linkerName = jsonInfo.linkerName

    // this.replyNum = jsonInfo.replyNum
    // this.questionNum = jsonInfo.questionNum

    this.getQuestionDetail(jsonInfo.id)
  },
  methods: {
    async getQuestionDetail(linkerId) {
      //获取买房问问的详情
      const result = await marketService.getBuildQuestionDetail(linkerId)
      this.questionNum = result.questionNum
      this.replyNum = result.replyNum
    },

    onLoad() {
      this.getAskingList(this.current, this.linkerId)
    },

    async getAskingList(current, linkerId) {
      const result = await marketService.getAskingList(current, linkerId)
      if (result.records.length > 0) {
        this.askingList = this.askingList.concat(result.records)
        if (this.askingList.length > 0) {
          this.noData = false
        } else {
          this.noData = true
        }

        if (result.pages === 0 || this.current === result.pages) {
          this.finished = true
        }
        this.current++
        this.loading = false
      } else {
        if (current == 1) {
          this.noData = true
        }
        this.loading = false
        this.finished = true
      }
    },

    /**
     * 进入详情
     */
    enterDetails(questionId) {
      this.$router.push({ path: '/marketDetail/askingDetail', query: { linkerId: this.linkerId, questionId: questionId } })
    },

    enterAskPage() {
      this.$router.push({ name: 'market-asking-ask', params: { id: this.linkerId }, query: { linkerName: this.linkerName } })
    }
  }
}
</script>


<style lang="less" scoped>
.asking-body {
  width: 100%;
  height: 100%;
  background: #ffffff;

  > .asking-header {
    width: 100%;
    height: 61px;
    background: #f2f5f9;
    line-height: 65px;
    font-size: 14px;
    text-align: center;
    position: fixed;
    left: 0;
    top: 0;
    color: #666666;
  }

  > .asking-foot {
    position: fixed;
    left: 0;
    bottom: 16px;
    height: 44px;
    background: rgba(0, 122, 230, 1);
    border-radius: 6px;
    width: 92%;
    margin-left: 4%;
    color: #fff;
    font-size: 16px;
    line-height: 44px;
    text-align: center;
  }

  > .asking-center {
    position: absolute;
    top: 61px;
    width: 100%;
    left: 0;
    bottom: 65px;
    overflow: auto;

    .asking-item {
      width: 92%;
      height: auto;
      // max-height: 180px;
      margin-left: 4%;
      margin-right: 4%;
      padding-bottom: 1px;
      // border-bottom: 1px solid #dedede;

      > .question-view {
        width: 100%;
        padding-left: 2px;
        padding-top: 16px;
        display: flex;
        margin-bottom: 16px;

        > .question-icon {
          width: 22px;
          height: 22px;
          background: rgba(235, 108, 82, 1);
          border-radius: 6px;
          color: #fff;
          font-size: 12px;
          line-height: 22px;
          text-align: center;
          float: left;
        }

        > .question-body {
          width: 90%;
          line-height: 20px;

          > .question-title {
            color: #333333;
            font-size: 16px;
            margin-left: 8px;
            float: left;
            width: 100%;
            line-height: 22px;
            // word-break: break-all;
            // text-overflow: ellipsis; //显示为省略号
            // display: -webkit-box; //对象作为伸缩盒子模型显示
            // -webkit-box-orient: vertical; //设置或检索伸缩盒对象的子元素的排列方式
            // -webkit-line-clamp: 2; //显示行数## 标题文字 ##
            // overflow: hidden;

            > .question-num {
              color: #999999;
              font-size: 13px;
              float: right;
              margin-right: -7px;
            }
          }
        }
      }

      > .answer-view {
        width: 100%;
        padding-left: 2px;

        > .answer-top {
          display: flex;
          align-items: center;

          > .answer-icon {
            width: 22px;
            height: 22px;
            background: rgba(0, 122, 230, 1);
            border-radius: 6px;
            color: #fff;
            font-size: 12px;
            line-height: 22px;
            text-align: center;
            float: left;
          }

          .header-img {
            width: 24px;
            height: 24px;
            margin-left: 8px;
            border-radius: 50%;
          }

          .user-name {
            font-size: 12px;
            color: #333333;
            margin-left: 5px;
          }

          .user-lable {
            width: 50px;
            height: 15px;
            background: rgba(143, 159, 177, 0.15);
            border-radius: 2px;
            margin-left: 13px;

            font-size: 10px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(92, 95, 102, 1);
            line-height: 15px;
            text-align: center;
            padding-top: 2px;
          }

          .reply-time {
            font-size: 12px;
            color: #999999;
            margin-left: 10px;
          }
        }

        > .answer-bottom {
          color: rgba(102, 102, 102, 1);
          font-size: 15px;
          margin-top: 6px;
          margin-left: 8%;
          margin-bottom: 10px;
          word-break: break-all;
          text-overflow: ellipsis; //显示为省略号
          display: -webkit-box; //对象作为伸缩盒子模型显示
          -webkit-box-orient: vertical; //设置或检索伸缩盒对象的子元素的排列方式
          -webkit-line-clamp: 3; //显示行数## 标题文字 ##
          overflow: hidden;
          line-height: 21px;
        }
      }
    }
  }
}
</style>
