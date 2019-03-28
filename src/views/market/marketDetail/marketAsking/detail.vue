<template>
  <div class="asking-detail-page">
    <div class="asking-top">
      <div class="asking-title">#满京华#满京华云楼盘现在还有什么户型在卖啊？周边配套怎样，有幼儿园么？</div>
      <div class="asking-desc">
        <span class="asking-time">2019年2月18日</span>
        <span class="asking-count">共{{answerCount}}个回复</span>
      </div>
    </div>
    <div class="asking-content">
      <div class="asking-list" v-for="(item, index) in lists" :key="index">
        <div class="asking-list-top">
          <avatar :avatar="item.clientImg"/>
          <span class="asking-list-top-name">{{item.name | privacyName() }}</span>
          <span class="asking-list-top-time">{{item.time | dateTimeFormatter(5) }}</span>
        </div>
        <div class="asking-list-bottom">{{item.content}}</div>
      </div>
    </div>
    <div class="asking-bottom">
      <div class="asking-input" @click="answerHandler">写回复，与楼主分享观点</div>
    </div>
    <comment-alert
      :show.sync="showCommentAlert"
      :info="commentInfo"
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
    showCommentAlert: false,
    commentInfo: {
      placeholder: '请输入回复内容（1-150字）',
      content: '',
      contentHeight: window.screen.height - 64
    },
    contentHeight: 0,
    commentContent: '', // 评论内容
    time: '',
    answerCount: 23,
    lists: [
      {
        avatar: '',
        name: '',
        time: '2019年2月18日',
        content: '时代天镜附近有挺多综合商场，星美国际嘉荣，吃的还挺多的，来个朋友也有地方可玩，未来松山湖发展号了，应会产生溢价…'
      },
      {
        avatar: '',
        name: '李',
        time: '2019年2月18日',
        content: '时代天镜附近有挺多综合商场，星美国际嘉荣，吃的还挺多的，来个朋友也有地方可玩，未来松山湖发展号了，应会产生溢价…'
      },
      {
        avatar: '',
        name: '李林',
        time: '2019年2月18日',
        content: '时代天镜附近有挺多综合商场，星美国际嘉荣，吃的还挺多的，来个朋友也有地方可玩，未来松山湖发展号了，应会产生溢价…'
      }
    ]
  }),
  methods: {
    // 新增评论
    async insertComment(receiver) {
      let param = {
        enterpriseId: this.enterpriseId,
        infoId: this.infoId,
        parentId: receiver ? receiver.parentId : '',
        content: this.commentContent,
        senderId: this.agentId,
        senderSource: 0, // 0-企业微信；1-小程序
        receiverId: receiver ? receiver.receiverId : '',
        receiverSource: receiver ? receiver.receiverSource : '',
        type: receiver.type // 0-评论，1-回复
      }
      //   const res = await discoverService.insertComment(param)
      //   this.commentIds.push(res.id)
      //   this.commentList.push(res)
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
      this.showCommentAlert = false
      // this.insertComment(this.commentInfo)
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
    .asking-list:first-child {
      padding-top: 0;
    }
    > .asking-list {
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

