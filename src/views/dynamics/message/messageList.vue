<template>
  <div class="messageInfo-page">
    <div class="messageInfo-back" >
      <div class="messageInfo-sys" @click="gosysMessage">
        <div class="messageInfo-sys-container">
          <span class="messageInfo-sys-left">
             <button class="messageInfo-sys-num" >{{sysMessage.unreadMsgCount}}</button>
            <img :src="backIcon" class="sys-left-img">
          </span>
          <span class="messageInfo-sys-right">
            <p class="sys-right-top">
              系统消息
              <span class="sys-right-time">{{sysMessage.createTime | dateFormatterToHuman}}</span>
            </p>
            <p class="sys-right-btn">{{sysMessage.content}}</p>
          </span>
        </div>

      </div>
      <div class="messageInfo-fill"></div>

      <div class="messageInfo-sys" v-for="(item,key) in messageList" :key="key">
        <div class="messageInfo-sys-container">
          <span class="messageInfo-sys-left">
            <button class="messageInfo-sys-num" v-show="item.unreadMsgCount !=0">{{item.unreadMsgCount}}</button>
            <img :src="item.c2cImage" class="sys-left-img">
            
          </span>
          <span class="messageInfo-sys-right">
            <p class="sys-right-top">
              {{item.c2cNick}}
              <!-- >3分钟前 -->
              <span class="sys-right-time"> {{ item.msgTimeStamp | dateFormatterToHuman}} </span>
            </p>
            <p class="sys-right-btn">{{item.msgShow}}</p>
          </span>
        </div>
      </div>
      <!-- <div class="messageInfo-sys">
        <div class="messageInfo-sys-container">
          <span class="messageInfo-sys-left">
            <img :src="backIcon" class="sys-left-img">
          </span>
          <span class="messageInfo-sys-right">
            <p class="sys-right-top">
              张佳玮
              <span class="sys-right-time">5分钟前</span>
            </p>
            <p class="sys-right-btn">涂先生，下午有时间一起去看看吗</p>
          </span>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import dynamicsService from 'SERVICE/dynamicsService'
export default {
  data() {
    return {
      backIcon: require('IMG/dynamics/top-img.png'),
      messageList:[],
      sysMessage:[],
    }
  },
  created() {
    this.getMsgList()
  },
  methods: {
    gosysMessage() {
      this.$router.push('/dynamics/message/sysMessage')
    },
    async getMsgList() {
      const res = await dynamicsService.getAgentMsgAndTotal()
      this.messageList = res.msgList
      this.sysMessage = res.systemMessage
      
    }
  }
}
</script>
<style lang="less">
.messageInfo-page {
  width: 100%;
  background: rgba(247, 249, 250, 1);
  > .messageInfo-back {
    background: #ffffff;
    > .messageInfo-sys {
      background: #ffffff;
      padding-top: 16px;
      margin: 0 16px;
      margin-bottom: 0;
      border-bottom: 1px solid #e6e6e6;
      > .messageInfo-sys-container {
        display: flex;
        > .messageInfo-sys-left {
          > .sys-left-img {
            width: 50px;
            height: 50px;
            background: rgba(0, 122, 230, 1);
            border-radius: 50%;
          }
          .messageInfo-sys-num{
            font-size:12px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:16px;
            background:rgba(234,77,46,1);
            border-radius:50%;
            width:18px;
            height:18px;
            border: 0;
            position: absolute;
            margin-left: 35px;

          }
        }
        > .messageInfo-sys-right {
          padding-left: 12px;
          > .sys-right-top {
            font-size: 16px;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 22px;
            > .sys-right-time {
              font-size: 12px;
              font-weight: 400;
              color: rgba(187, 187, 187, 1);
              line-height: 17px;
              float: right;
            }
          }
          > .sys-right-btn {
            font-size: 13px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 32px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 280px;
          }
        }
      }
    }
    > .messageInfo-fill {
      height: 10px;
      background: rgba(247, 249, 250, 1);
    }
  }
}
</style>
