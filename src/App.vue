<template>
  <div id="app">
    <div id="view-box" ref="viewBox">
      <div class="router-view">
        <router-view></router-view>
      </div>
      <tabbar></tabbar>
    </div>
    <van-popup 
        v-model="newMsgPop" 
        :overlay="false"
        position="top" 
        class="new-msg-popup">
        <div class="new-msg-box">
            游新消息
        </div>
    </van-popup>
  </div>
</template>
<script>
import commonService from 'SERVICE/commonService'
import Navbar from '@/components/Common/Navbar'
import Tabbar from '@/components/Common/Tabbar'
import { mapGetters } from 'vuex'
import { webimLogin, callbackaddMsgCount } from "@/utils/im/receive_new_msg.js";
export default {
  data() {
    return {
      newMsgPop: false
    }
  },
  components: {
    Navbar,
    Tabbar
  },
  watch: {
    '$store.getters.newMsgStatus': function(v) {
      this.newMsgPop = v
    }
  },
  mounted() {
    // document.addEventListener('touchstart', this.handler, false)
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
  .new-msg-popup {
    height: 50px;
    background: #000;
    opacity: .6;
    .new-msg-box {
      color: #FFF;
      font-size: 14px;
      line-height: 50px;
      padding: 0 12px;
    }
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
