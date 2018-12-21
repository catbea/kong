<template>
  <div class="messageInfo-page">
    <div class="messageInfo-back" >
      <div class="messageInfo-sys" v-show="sysMessage !='' " @click="gosysMessage">
        <div class="messageInfo-sys-container">
          <span class="messageInfo-sys-left">
             <button  :class="sysMessage.unreadMsgCount < 10 ? 'messageInfo-sys-nums' :'messageInfo-sys-num' "   v-if="sysMessage.unreadMsgCount != 0 " >
               <span v-if="sysMessage.unreadMsgCount > 99">99+</span>
               <span v-else>{{sysMessage.unreadMsgCount}}</span>
             </button>
            <img :src="backIcon" class="sys-left-img">
          </span>
          <span class="messageInfo-sys-right">
            <p class="sys-right-top">
              系统消息
              <span class="sys-right-time" v-show="sysMessage !='' ">{{sysMessage.createTime | dateFormatterToHuman}}</span>
            </p>
            <p class="sys-right-btn">{{sysMessage.content}}</p>
          </span>
        </div>

      </div>
      <div class="messageInfo-fill"></div>

      <div class="messageInfo-sys" v-for="(item,key) in messageList" :key="key" @click="msgClickHandle(item)">
        <div class="messageInfo-sys-container">
          <span class="messageInfo-sys-left">
            <button :class="item.unreadMsgCount < 10 ? 'messageInfo-sys-nums' :'messageInfo-sys-num' " v-show="item.unreadMsgCount !=0">
              <span v-if="item.unreadMsgCount > 99 ">99+</span><span v-else>{{item.unreadMsgCount}}</span>
            </button>
            <img :src="item.c2cImage" class="sys-left-img">
            
          </span>
          <span class="messageInfo-sys-right">
            <p class="sys-right-top">
              {{item.c2cNick}}
              <!-- >3分钟前 -->
              <span class="sys-right-time"> {{ item.msgTimeStamp | dateFormatterToHuman}} </span>
            </p>
            <p class="sys-right-btn">{{formatMsg(item)}}</p>
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
      messageList: [],
      sysMessage: []
    }
  },
  mounted() {
    this.getMsgList()
  },
  methods: {
    msgClickHandle(item) { 
      let CId = item.keyword.split('|')[0]
      let clientId = CId.split('_')[1]
      this.$router.push({path: '/custom/message/message', query: {
        clientId: clientId
      }})
    },
    gosysMessage() {
      this.$router.push('/dynamics/message/sysMessage')
    },
    formatMsg(item) {
      if(item.msgType == "TIMCustomElem") {
        let msg = JSON.parse(item.msgShow)
        if(msg.Desc == 2) {
          return '[语音消息]'
        } else if(msg.Desc == 3) {
          return '[楼盘消息]'
        } else if(msg.Desc == 1) {
          return msg.Data
        }
      } else {
        let msg = JSON.parse(item.msgShow)
        return msg.Text
      } 
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
          .messageInfo-sys-num {
            font-size: 12px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 16px;
            background: rgba(234, 77, 46, 1);
            border-radius: 50%;
            // width:18px;
            // height:18px;
            border: 0;
            position: absolute;
            margin-left: 35px;
            padding: 1px 2px;
          }
          .messageInfo-sys-nums {
            font-size: 12px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 16px;
            background: rgba(234, 77, 46, 1);
            border-radius: 50%;
            width: 18px;
            height: 18px;
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
