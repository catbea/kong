<template>
  <div class="asking-detail-page">
    <div class="asking-top">
      <div class="asking-title">#{{linkerName}}#{{questionContent}}</div>
      <div class="asking-desc">
        <span class="asking-time">{{timestamp | dateTimeFormatter(5)}}</span>
        <span class="asking-count">共{{answerCount}}个回复</span>
      </div>
    </div>
    <div class="asking-content">
      <van-list v-model="loading" :finished="finished" finished-text="--没有更多了--" @load="onLoad">
        <div class="asking-list" v-for="(item, index) in lists" :key="index">
          <div class="asking-list-top">
            <avatar :avatar="item.avatarUrl"/>
            <span class="asking-list-top-name">{{item.nickName | privacyName() }}</span>
            <span class="asking-list-top-time">{{item.createTimeStamp | dateTimeFormatter(5) }}</span>
          </div>
          <div class="asking-list-bottom">{{item.content}}</div>
        </div>
      </van-list>
    </div>
    <div class="asking-bottom">
      <div class="asking-input" @click="answerHandler">写回复，与楼主分享观点</div>
    </div>
    <comment-alert
      :show.sync="showCommentAlert"
      :info="commentInfo"
      :maxlength="150"
      @cancel="cancelHandler"
      @publish="publishHandler"
      @input="inputHandler"
    ></comment-alert>
  </div>
</template>

<script>
import Avatar from 'COMP/Avatar'
import CommentAlert from 'COMP//Discover/CommentAlert'
import marketService from 'SERVICE/marketService'
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
export default {
  components: {
    Avatar,
    CommentAlert
  },
  data: () => ({
    loading: false, //是否处于加载状态
    finished: false, //是否已加载完所有数据
    size: 10,
    current: 1,
    pages: null,
    questionId: null,
    showCommentAlert: false,
    commentInfo: {
      placeholder: '请输入回复内容（1-150字）',
      content: '',
      contentHeight: window.screen.height - 64
    },
    contentHeight: 0,
    commentContent: '', // 评论内容
    time: '',
    answerCount: 0,
    lists: [],
    linkerId: '',
    linkerName: '',
    questionContent: '',
    timestamp: ''
  }),
  created() {
    this.questionId = this.$route.query.questionId
    this.linkerId = this.$route.query.linkerId
    this.queryLinkerQuestion(this.questionId)
  },
  methods: {
    async queryLinkerQuestion(questionId) {
      const res = await marketService.queryLinkerQuestion(questionId)
      this.linkerName = res.linkerName
      this.questionContent = res.content
      this.timestamp = res.createTimeStamp
    },
    // 加载更多
    async onLoad() {
      this.queryAskingDetail()
    },
    async queryAskingDetail() {
      const res = await marketService.queryAskingDetail(this.current, this.size, this.questionId)
      this.answerCount = res.total
      this.lists = this.current == 1 ? res.records : this.lists.concat(res.records)
      if (this.current >= res.pages) {
        this.finished = true
        this.loading = false
      } else {
        this.current++
        this.finished = false
        this.loading = false
      }
    },
    // 新增回复
    async insertQuestion() {
      let param = {
        interlocutionType: '2', // 1-评论、2-普通回复、3-管理员回复
        linkerId: this.linkerId,
        parentId: this.questionId,
        content: this.commentContent
      }
      const res = await marketService.insertQuestion(param)
      this.lists.unshift(res)
      this.answerCount++
    },
    answerHandler() {
      this.showCommentAlert = true
    },
    inputHandler(content) {
      this.commentContent = content
    },
    cancelHandler() {
      this.showCommentAlert = false
      this.commentContent = ''
    },
    publishHandler() {
      if (this.commentContent.length == 0) {
        this.$dialog.alert({ message: '请输入回复内容' })
        return
      }
      this.showCommentAlert = false
      this.insertQuestion()
      this.commentContent = ''
    }
  }
}
</script>

<style lang="less" scoped>
.asking-detail-page {
  > .asking-top {
    box-sizing: border-box;
    width: 100%;
    padding: 16px;
    border-bottom: 1px solid #dedede;
    > .asking-title {
      color: #333;
      font-size: 18px;
      font-weight: bold;
      line-height: 25px;
    }
    > .asking-desc {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      > .asking-time {
        color: #999;
        font-size: 12px;
      }
      > .asking-count {
        color: #333;
        font-size: 12px;
      }
    }
  }
  > .asking-content {
    width: 100%;
    padding: 16px;
    margin-bottom: 100px;
    .asking-list:first-child {
      padding-top: 0;
    }
    .asking-list {
      border-bottom: 1px solid #dedede;
      padding-top: 16px;
      padding-bottom: 16px;
      > .asking-list-top {
        display: flex;
        align-items: center;
        > .asking-list-top-name {
          color: #333;
          font-size: 12px;
          margin-left: 8px;
          margin-right: 8px;
        }
        > .asking-list-top-time {
          color: #999;
          font-size: 12px;
        }
      }
      > .asking-list-bottom {
        color: #666;
        font-size: 15px;
        margin-top: 12px;
        line-height: 21px;
      }
    }
  }
  > .asking-bottom {
    box-sizing: border-box;
    width: 100%;
    height: 62px;
    border-top: 1px solid #dedede;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    > .asking-input {
      margin-top: 16px;
      border: 1px solid #b7b7b7;
      border-radius: 4px;
      padding-left: 12px;
      color: #999;
      font-size: 13px;
      height: 30px;
      line-height: 30px;
      position: absolute;
      bottom: 16px;
      left: 16px;
      right: 16px;
    }
  }
}
</style>

