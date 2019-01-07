<template>
  <div class="messageInfo-page">
    <div class="messageInfo-back">
      <div class="messageInfo-wd">
        <span class="messageInfo-wd-left">当前共有未读消息 12 条</span>
        <div class="messageInfo-wd-right">
          <button class="messageInfo-wd-right-select">全部已读</button> 
        </div>
      </div>
      <div class="messageInfo-sys" v-show="sysMessage !='' " @click="gosysMessage">
        <div class="messageInfo-sys-container">
          <span class="messageInfo-sys-left">
            <div class="messageInfo-sys-num">
            </div>
            <img :src="backIcon" class="sys-left-img">
          </span>
          <span class="messageInfo-sys-right">
            <p class="sys-right-top">
              系统消息
              <span
                class="sys-right-time"
                v-show="sysMessage !='' "
              >{{sysMessage.createTime | dateFormatterToHuman}}</span>
            </p>
            <p class="sys-right-btn">{{sysMessage.content}}</p>
          </span>
        </div>
      </div>
      <div class="messageInfo-fill"></div>
      <div
      v-show="messageList.length !=0"
        class="messageInfo-sys"
        v-for="(item,key) in messageList"
        :key="key"
        @click="msgClickHandle(item)"
      >
        <div class="messageInfo-sys-container">
          <span class="messageInfo-sys-left">
            <div class="messageInfo-sys-num">
            </div>
            <img :src="item.c2cImage" class="sys-left-img">
          </span>
          <span class="messageInfo-sys-right">
            <p class="sys-right-top">
              {{item.c2cNick}}
              <!-- >3分钟前 -->
              <span class="sys-right-time">{{ item.msgTimeStamp | dateFormatterToHuman}}</span>
            </p>
            <p class="sys-right-btn">{{formatMsg(item)}}</p>
          </span>
        </div>
      </div>
     
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
      sysMessage: [],
      nullIcon: require('IMG/user/bill-null.png'),
      nullcontent: '暂无信息',
      current:1,
      size:20
    }
  },
  mounted() {
    this.getMsgList()
  },
  methods: {
    msgClickHandle(item) {
      let CId = item.keyword.split('|')[0]
      let clientId = CId.split('_')[1]
      this.$router.push({
        path: '/custom/message/message',
        query: {
          clientId: clientId
        }
      })
    },
 
    gosysMessage() {
      this.$router.push('/dynamics/message/sysMessage')
    },
    //查看未读消息
   
    formatMsg(item) {
      if (item.msgType == 'TIMCustomElem') {
        let msg = JSON.parse(item.msgShow)
        if (msg.Desc == 2) {
          return '[语音消息]'
        } else if (msg.Desc == 3) {
          return '【链接】' + JSON.parse(msg.Data).linkerName
        } else if (msg.Desc == 1) {
          return msg.Data
        }
      } else {
        let msg = JSON.parse(item.msgShow)
        return msg.Text
      }
    },
    async getMsgList() {
      const res = await dynamicsService.getAgentMsgAndTotal(3,this.current,this.size)
      this.messageList = res.msgPage.records
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
    > .messageInfo-wd{
      height:50px;
      background:rgba(255,255,255,1);
      border-bottom: 1px solid #eeeeee;
      padding: 7px 16px;
      .messageInfo-wd-left{
        font-size:14px;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:20px;
      }
      .messageInfo-wd-right{
        float: right;
        .messageInfo-wd-right-select{
          font-size:12px;
          font-weight:400;
          color:rgba(0,122,230,1);
          line-height:17px;
          width:72px;
          height:24px;
          border-radius:22px;
          border:1px solid rgba(0,122,230,1);
          margin-left: 8px;
          background-color: #ffffff;
        }

      }
    }
    > .messageInfo-sys {
      background: #ffffff;
      padding-top: 16px;
      margin: 0 16px;
      margin-bottom: 0;
      border-bottom: 1px solid #eeeeee;
      > .messageInfo-sys-container {
        display: flex;
        margin-bottom: 10px;
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
            transform: translate(50%, -50%);
            border-radius: 100%;
            width:11px;
            height:11px;
            border: 0;
            position: absolute;
            margin-left: 30px;
            margin-top: 6px;
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
            line-height: 27px;
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
