<template>
  <div class="msg-popup-page" @click="clickHandle">
    <div class="msg-popup-page-left">
      <avatar class="avatar" :avatar="msg && msg.avatar ? msg.avatar : defaultAvatar"></avatar>
    </div>
    <div class="msg-popup-page-right">
      有来自{{msg ? msg.name : ''}}的新消息
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Avatar from 'COMP/Avatar'
import * as types from '@/store/mutation-types'
export default {
  name: 'new-msg-popup',
  components: {
    Avatar
  },
  props: {
    msg: {
      type: Object,
      default: function() {
        return {
          data: '',
          desc: 1,
          avatar: '',
          name: '系统',
          clientId: null,
          ext: {}
        }
      }
    }
  },
  data() {
    return {
      defaultAvatar: 'https://720ljq2test-10037467.file.myqcloud.com/header/qrcode/8bbf60d0c71d4962b8466c914712452c.png'
    }
  },
  created() {},
  methods: {
    clickHandle() {
      this.$store.commit(types['NEW_MSG_STATUS'], false)
      if (!this.msg.clientId) {
        return
      }
      this.$router.push({
        path: '/custom/message/message',
        query: {
          clientId: this.msg.clientId
        }
      })
    }
  }
}
</script>
<style lang="less">
.msg-popup-page {
  width: 100%;
  height: 50px;
  display: flex;
  line-height: 50px;
  padding: 0px 12px;
  color: #fff;
  font-size: 13px;
  .msg-popup-page-left {
    padding: 9px 0px;
    .avatar {
      width: 32px;
      height: 32px;
    }
  }
  .msg-popup-page-right {
    padding-left: 12px;
  }
}
</style>
