<template>
  <div id="app">
    <div id="view-box" ref="viewBox">
      <div class="router-view">
        <keep-alive exclude="market-detail" include="write-article">
          <router-view></router-view>
        </keep-alive>
        <share-prompt/>
      </div>
      <tabbar></tabbar>
    </div>
    <van-popup v-model="newMsgPop" :overlay="false" position="top" class="new-msg-popup">
      <new-msg-popup :msg="newMsgObject"></new-msg-popup>
    </van-popup>
  </div>
</template>
<script>
import NewMsgPopup from 'COMP/Message/NewMsgPopup'
import Tabbar from 'COMP/Common/Tabbar'
import SharePrompt from 'COMP/Common/SharePrompt'
import { mapGetters } from 'vuex'
import { webimLogin, callbackaddMsgCount } from '@/utils/im/receive_new_msg.js'
export default {
  data() {
    return {
      newMsgPop: false,
      newMsgObject: {}
    }
  },
  components: {
    NewMsgPopup,
    Tabbar,
    SharePrompt
  },
  created() {
    // let defaultPath = localStorage.getItem('defaultPath', defaultPath)
    // if(defaultPath) {
    //   localStorage.removeItem('defaultPath')
    //   // this.$router.replace({ path: defaultPath })
    //   console.log('path:'+defaultPath)
    // }
  },
  watch: {
    '$store.getters.newMsgStatus': function(v) {
      let msgContent = this.$store.getters.newMsgContent
      if (this.$route.path == '/custom/message/message') {
        //当前在聊天页
        return this.newMsgPop = false
      }
      if (msgContent.desc == 6 && this.$route.path == '/write-article') {
        // console.log(this.$store.getters.newMsgContent, 'this.$store.getters.newMsgContent')
        return this.newMsgPop = false
      }
      if (msgContent.desc == 1 || msgContent.desc == 2 || msgContent.desc == 3) {
        this.newMsgPop = v
        let data = ''
        let desc = msgContent.desc
        let avatar = ''
        let name = ''
        let clientId = msgContent.clientId.split('_')[1]
        if (desc == 2) {
          //语音
          let tmp = JSON.parse(msgContent.ext)
          let userInfo = tmp.userInfo
          avatar = userInfo.avatarUrl
          name = userInfo.nickName
          data = msgContent.data
        } else if (desc == 5) {
          //动态
          let tmp = JSON.parse(msgContent.data)
          avatar = tmp.avatarUrl
          name = tmp.clientName
          clientId = tmp.clientId
          data = tmp.content
        } else {
          //文本消息 楼盘 消息已上报
          if (!msgContent.ext) {
            return
          }
          let userInfo = JSON.parse(msgContent.ext)
          avatar = userInfo.avatarUrl
          name = userInfo.nickName
          data = msgContent.data
        }
        this.newMsgObject = {
          data: data,
          desc: desc,
          avatar: avatar,
          name: name,
          clientId: clientId
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
<style lang="less">
@import '~normalize.css/normalize.css';
@import './assets/css/reset.less';
@import './assets/css/common.less';
@import './assets/icon/iconfont.css';

html {
  -webkit-text-size-adjust: none;
  -webkit-overflow-scrolling: touch;
}

#app {
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  .new-msg-popup {
    height: 50px;
    width: 80%;
    margin: 32px 0;
    border-radius: 25px;
    background: rgb(81, 135, 218);
    opacity: 0.92;
  }
  #view-box {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    > .router-view {
      position: relative;
      margin-bottom: -1px;
      width: 100%;
      height: 100%;
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      > div {
        position: absolute;
        width: 100%;
        min-height: 100%;
        top: 0;
      }
    }
  }
}
</style>
