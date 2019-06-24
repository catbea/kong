<template>
  <div class="messageInfo-page">
    <div class="messageInfo-back" v-if="haveData">
      <!--  -->
      <div class="messageInfo-wd" v-show="UnreadMsgTotal != 0">
        <span class="messageInfo-wd-left">当前共有未读消息 {{UnreadMsgTotal}} 条</span>
        <div class="messageInfo-wd-right">
          <button class="messageInfo-wd-right-select messageInfo-wd-select" @click="goSelestMessage">查 看</button>
          <button class="messageInfo-wd-right-select" @click="getsetMsgRead">全部已读</button>
        </div>
      </div>
      <div class=" messageInfo-sys" v-show="sysMessage !='' " @click="gosysMessage">
        <div class="messageInfo-sys-container">
          <div class="messageInfo-sys-left">
            <div
              :class="sysMessage.unreadMsgCount < 10 ? 'messageInfo-sys-nums' :'messageInfo-sys-num' "
              v-if="sysMessage.unreadMsgCount != 0 "
            >
              <span v-if="sysMessage.unreadMsgCount > 99">99+</span>
              <span v-else>{{sysMessage.unreadMsgCount}}</span>
            </div>
            <img :src="backIcon" class="sys-left-img">
          </div>
          <div class="messageInfo-sys-right">
            <p class="sys-right-top">
              <span class="name">系统消息</span>
              <span
                class="sys-right-time"
                v-show="sysMessage !='' "
              >{{sysMessage.createTime | dateFormatterToHuman}}</span>
            </p>
            <p class="sys-right-btn">{{sysMessage.content ? sysMessage.content.replace(/<[^>]+>/g,"") : ''}}</p>
          </div>
        </div>
      </div>
      <div class="messageInfo-fill"></div>
      <van-list ref="list" v-model="loading" :finished="finished" finished-text="" :offset="500" @load="getMsgList">
        <div v-show="messageList.length !=0"
          class="messageInfo-sys"
          v-for="(item,key) in messageList"
          :key="key" @click="msgClickHandle(item)">
          <van-swipe-cell :right-width="80" :on-close="onClose">          
            <van-cell-group>  
              <div class="messageInfo-sys-container">
                <div class="messageInfo-sys-left">
                  <div
                    :class="item.unreadMsgCount < 10 ? 'messageInfo-sys-nums' :'messageInfo-sys-num' "
                    v-show="item.unreadMsgCount !=0">
                    <span v-if="item.unreadMsgCount > 99 ">99+</span>
                    <span v-else>{{item.unreadMsgCount}}</span>
                  </div>
                  <img :src="item.c2cImage" class="sys-left-img">
                </div>
                <div class="messageInfo-sys-right">
                  <p class="sys-right-top">
                    <span class="name">{{item.c2cNick}}</span>
                    <!-- >3分钟前 -->
                    <span class="sys-right-time">{{ item.msgTimeStamp | dateFormatterToHuman}}</span>
                  </p>
                  <p class="sys-right-btn" v-html="formatMsg(item)"></p>
                </div>
              </div>
            </van-cell-group>
            <span slot="right" class="delete-btn" @click="delMsg(key)">删除</span>
          </van-swipe-cell>
        </div>
      </van-list>
    </div>
    <null :nullIcon="nullIcon" :nullcontent="nullcontent" v-if="!haveData"></null>
  </div>
</template>
<script>
import dynamicsService from 'SERVICE/dynamicsService'
import Null from 'COMP/Null'
export default {
  components: {
    Null
  },
  data() {
    return {
      backIcon: require('IMG/dynamics/top-img.png'),
      messageList: [],
      sysMessage: [],
      nullIcon: require('IMG/user/bill-null.png'),
      nullcontent: '暂无信息',
      haveData: true,
      current: 1,
      size: 20,
      loading: false,
      finished: false,
      UnreadMsgTotal: 0,
      delIndex: ''
    }
  },
  watch: {
    '$store.getters.newMsgStatus': function(v) {
      if (v) {
        this.updateNewMsg()
      }
    }
  },
  mounted() {
    // this.getMsgList()
  },
  methods: {
    // 删除客服提示
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
           this.$dialog.confirm({
              title: '删除提示',
              message: '是否确认删除该用户？',
              className: 'delete-dialog'
          }).then(() => {
            this.confirm()
            instance.close()
          }).catch(() => {
            instance.close()
          })
          break
      }
    },
    delMsg (index) {
      this.delIndex = index
    },
    // 删除消息
    confirm () {
      let item = this.messageList[this.delIndex]
      let clientId = item.keyword.split('|')[0].split('_')[1]
      dynamicsService.deleteMessage({
        clientId: clientId
      }).then(res => {
        this.messageList.splice(this.delIndex, 1)
        this.$toast('删除成功')
      }).catch()
    },
    updateNewMsg() {
      let msgContent = this.$store.getters.newMsgContent
      this.UnreadMsgTotal++
      for (let item of this.messageList) {
        let cid = item.keyword.split('|')[0]
        if (msgContent.clientId == cid) {
          let msgShow = {}
          item.unreadMsgCount = parseInt(item.unreadMsgCount) + 1
          if (msgContent.desc == 1) {
            item.Desc = 1
            item.msgType == 'TIMTextElem'
            msgShow.Text = msgContent.data
          } else if (msgContent.desc == 2) {
            item.Desc = 2
            item.msgType == 'TIMCustomElem'
            msgShow = { Ext: msgContent.ext }
          } else if (msgContent.desc == 3) {
            item.Desc = 3
            item.msgType == 'TIMCustomElem'
            msgShow = { Ext: msgContent.ext }
          } else if (msgContent.desc == 4) {
            item.Desc = 1
            item.msgType == 'TIMTextElem'
            msgShow.Text = msgContent.data
          }
          item.msgShow = JSON.stringify(msgShow)
        }
      }
    },
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
    //帮助页面
    // async godiscoverHelp(){
    //   this.$router.push('/discover/discoverHelp')
    // },
    async getsetMsgRead() {
      //客户id，如果填写则更新单个客户为已读，不填，则更新这个经纪人的所有消息为已读

      await dynamicsService.getsetMsgRead()
      const res = await dynamicsService.getAgentMsgAndTotal(1, 1, this.size)
      this.messageList = res.msgPage.records
      this.sysMessage = res.systemMessage
      this.getcpUnreadMsgTotal()
      // window.location.reload()
      //  this.getMsgList()
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
        } 
        else if (msg.Desc == 1) {
          // if()
          return msg.Data
        }
        else if (msg.Desc == 7) {
          // if()
          return JSON.parse(msg.Data).answer
        }
      } else {
        if (item.Desc == 2) {
          return '[语音消息]'
        } else if (item.Desc == 3) {
          return '【楼盘消息】'
        } else {
          let msg = JSON.parse(item.msgShow)
          return msg.Text
        }
      }
    },
    async getMsgList() {
      const res = await dynamicsService.getAgentMsgAndTotal(1, this.current, this.size)
      this.messageList = this.messageList.concat(res.msgPage.records)
      if (this.current == 1) this.sysMessage = res.systemMessage
      if (res.msgPage.records.length > 0 || res.systemMessage != '') {
        this.haveData = true
      } else {
        this.haveData = false
      }
      if (res.msgPage.pages === 0 || this.current >= res.msgPage.pages) {
        this.finished = true
      }
      this.current++
      this.loading = false
      this.getcpUnreadMsgTotal()
    },
    //未读消息数
    async getcpUnreadMsgTotal() {
      const res = await dynamicsService.getcpUnreadMsgTotal()
      this.UnreadMsgTotal = res.count
    },
    async goSelestMessage() {
      this.$router.push({ path: '/dynamics/message/unreadMessage', query: { UnreadMsgTotal: this.UnreadMsgTotal } })
    }
  }
}
</script>
<style lang="less">
.messageInfo-page {
  width: 100%;
  background: rgba(247, 249, 250, 1);
  .messageInfo-back {
    background: #ffffff;
    .messageInfo-wd {
      height: 50px;
      background: rgba(255, 255, 255, 1);
      // border-bottom: 1px solid #eeeeee;
      // padding: 7px 16px;
      padding: 0 0.42667rem;
      line-height: 37px;
      .messageInfo-wd-left {
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        //line-height:20px;
        position: relative;
        padding-top: 6px;
      }
      .messageInfo-wd-right {
        float: right;
        .messageInfo-wd-select {
          width: 72px;
        }
        .messageInfo-wd-right-select {
          font-size: 12px;
          font-weight: 400;
          color: rgba(0, 122, 230, 1);
          line-height: 17px;
          height: 24px;
          border-radius: 22px;
          border: 1px solid rgba(0, 122, 230, 1);
          margin-left: 8px;
          background-color: #ffffff;
          padding: 0 12px;
        }
      }
    }
    .messageInfo-sys {
      background: #ffffff;
      margin: 0 16px;
      .messageInfo-sys-container {
        display: flex;
        padding: 10px 0;
        .messageInfo-sys-left {
          width: 50px;
          .sys-left-img {
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
        }
        .messageInfo-sys-right {
          padding-left: 12px;
          flex: 1;
          overflow: hidden;
          line-height: 25px;
          .sys-right-top {
            font-size: 16px;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            display: flex;
            .name{
              flex: 1;
              margin-right: 30px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .sys-right-time {
              font-size: 12px;
              font-weight: 400;
              color: rgba(187, 187, 187, 1);
              line-height: 17px;
              float: right;
              padding-right: 5px;
            }
          }
          .sys-right-btn {
            font-size: 13px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 27px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 280px;
            height: 20px;
          }
        }
      }
    }
    .messageInfo-fill {
      height: 10px;
      background: rgba(247, 249, 250, 1);
    }
    .delete-btn{
      display: block;
      height: 80px;
      width: 80px;
      line-height: 80px;
      color: #fff;
      font-size: 16px;
      background-color: #EA4D2E;
      text-align: center;
    }
  }
}
</style>
