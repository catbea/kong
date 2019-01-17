<template>
  <div class="unreadMessage-page">
    <div class="unreadMessage-back">
      <div class="unreadMessage-wd">
        <span class="unreadMessage-wd-left">当前共有未读消息 {{UnreadMsgTotal}} 条</span>
        <div class="unreadMessage-wd-right">
          <button class="unreadMessage-wd-right-select" @click="getsetMsgRead">全部已读</button> 
        </div>
      </div>
      <div class="unreadMessage-sys" v-show="sysMessage !='' " @click="gosysMessage">
        <div class="unreadMessage-sys-container">
          <span class="unreadMessage-sys-left">
            <!-- <div class="unreadMessage-sys-num" v-if>
            </div> -->
             <div
              :class="sysMessage.unreadMsgCount < 10 ? 'messageInfo-sys-nums' :'messageInfo-sys-num' "
              v-if="sysMessage.unreadMsgCount != 0 "
            >
              <span v-if="sysMessage.unreadMsgCount > 99">99+</span>
              <span v-else>{{sysMessage.unreadMsgCount}}</span>
            </div>
            <img :src="backIcon" class="sys-left-img">
          </span>
          <span class="unreadMessage-sys-right">
            <p class="sys-right-top">
              系统消息
              <span
                class="sys-right-time"
                v-show="sysMessage !='' "
              >{{sysMessage.createTime | dateFormatterToHuman}}</span>
            </p>
            <p class="sys-right-btn">{{sysMessage.content ? sysMessage.content.replace(/<[^>]+>/g,"") : ''}}</p>
          </span>
        </div>
      </div>
      <div class="unreadMessage-fill"></div>
      <div
      v-show="messageList.length !=0"
        class="unreadMessage-sys"
        v-for="(item,key) in messageList"
        :key="key"
        @click="msgClickHandle(item)"
      >
        <div class="unreadMessage-sys-container">
          <span class="unreadMessage-sys-left">
            <!-- <div class="unreadMessage-sys-num">
            </div> -->
            <div
              :class="item.unreadMsgCount < 10 ? 'messageInfo-sys-nums' :'messageInfo-sys-num' "
              v-show="item.unreadMsgCount !=0"
            >
              <span v-if="item.unreadMsgCount > 99 ">99+</span>
              <span v-else>{{item.unreadMsgCount}}</span>
            </div>
            <img :src="item.c2cImage" class="sys-left-img">
          </span>
          <span class="unreadMessage-sys-right">
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
      size:20,
      UnreadMsgTotal:0
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
    //未读消息数
    async getcpUnreadMsgTotal(){
      const res = await dynamicsService.getcpUnreadMsgTotal()
      this.UnreadMsgTotal = res.count

    },
 
    gosysMessage() {
      this.$router.push('/dynamics/message/sysMessage')
    },
    async getsetMsgRead(){
      //客户id，如果填写则更新单个客户为已读，不填，则更新这个经纪人的所有消息为已读
      await dynamicsService.getsetMsgRead()
      this.getMsgList()
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
      this.getcpUnreadMsgTotal()
    
    }
  }
}
</script>
<style lang="less">
.unreadMessage-page {
  width: 100%;
  background: rgba(247, 249, 250, 1);
  > .unreadMessage-back {
    background: #ffffff;
    > .unreadMessage-wd{
       height:50px;
      background:rgba(255,255,255,1);
      border-bottom: 1px solid #eeeeee;
      padding: 0 0.42667rem;
      line-height: 37px;


      .unreadMessage-wd-left{
        font-size:14px;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:20px;
      }
      .unreadMessage-wd-right{
        float: right;
      
        .unreadMessage-wd-right-select{
          font-size:12px;
          font-weight:400;
          color:rgba(0,122,230,1);
          line-height:17px;
          padding: 0 12px;
          height:24px;
          border-radius:22px;
          border:1px solid rgba(0,122,230,1);
          margin-left: 8px;
          background-color: #ffffff;
        }

      }
    }
    > .unreadMessage-sys {
      background: #ffffff;
      padding-top: 16px;
      margin: 0 16px;
      margin-bottom: 0;
      border-bottom: 1px solid #eeeeee;
      > .unreadMessage-sys-container {
        display: flex;
        margin-bottom: 10px;
        > .unreadMessage-sys-left {
            .messageInfo-sys-num {
            font-size: 12px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 16px;
            background: rgba(234, 77, 46, 1);
            transform: translate(50%, -50%);
            border-radius: 100%;
            // width:18px;
            // height:18px;
            border: 0;
            position: absolute;
           // margin-left: 35px;
            margin-left: 18px;
            margin-top: 8px;
            padding: 1px 3px;
          }
          .messageInfo-sys-nums {
            position: absolute;
            margin-left: 23px;
            margin-top: 10px;
            transform: translate(50%, -50%);
            width: 18px;
            height: 18px;
            background-color: #ea4d2e;
            border-radius: 100%;
            color: #fff;
            font-size: 12px;
            text-align: center;
            line-height: 16px;
          }
          > .sys-left-img {
            width: 50px;
            height: 50px;
            background: rgba(0, 122, 230, 1);
            border-radius: 50%;
          }
          .unreadMessage-sys-num {
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
        > .unreadMessage-sys-right {
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
    > .unreadMessage-fill {
      height: 10px;
      background: rgba(247, 249, 250, 1);
    }
  }
}
</style>
