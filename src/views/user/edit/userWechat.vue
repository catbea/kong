<template>
  <div class="user-edit-wechat-page">
    <div class="user-edit-wechat">
      <p class="edit-wechat-title">微信号</p>
      <p class="edit-wechat-conter">
        <input
          type="text"
          class="edit-wechat-input"
          placeholder=""
          v-model="weChatNum"
          maxlength="20"
        >
      </p>
      <p class="edit-wechat-berak">该微信号仅作为客户添加使用</p>
      <button class="edit-wechat-query" @click="upDataWeChat">确认修改</button>
    </div>
  </div>
</template>
<script>
import userService from 'SERVICE/userService'
import strFormat from '@/filters/strFormat'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      weChatNum: ''
    }
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  created() {
    let wechatAccount = this.$route.query.weChatNum
    this.weChatNum = wechatAccount
  },

  methods: {
    upDataWeChat() {
      let tempWeChat = this.weChatNum
      if (tempWeChat.length == 0) {
        this.$dialog
          .alert({
            message: '微信号不可为空'
          })
          .then(() => {
            // on close
          })
      } else {
        let inputStr = strFormat.fmtWebCode(tempWeChat)
        this.weChatNum = inputStr

        if (inputStr.length < 6) {
          this.$toast('微信号长度不得小于6位')
        } else {
          let chinses = strFormat.isChinese(this.weChatNum)
          if (chinses) {
            this.$toast('微信号不得存中文')
          } else {
            let firstStr = this.weChatNum.substr(0, 1)
            let isEnghish = strFormat.isEnghish(firstStr)
            if (!isEnghish) {
              this.$toast('微信号需以字母开头')
            } else {
              let date = {
                wechatAccount: this.weChatNum.replace(/\s*/g, '')
              }
              this.upDateWeChat(date)
            }
          }
        }
      }
    },

    async upDateWeChat(obj) {
      const result = await userService.upDateUserInfo(obj)
      if (result) {
        this.$store.dispatch('getUserInfo', Object.assign(this.userInfo, { wechatAccount: this.weChatNum.replace(/\s*/g, '') }))
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="less">
.user-edit-wechat-page {
  background: #ffffff;
  > .user-edit-wechat {
    margin: 27px 16px;
    > .edit-wechat-title {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
    }
    > .edit-wechat-conter {
      > .edit-wechat-input {
        font-size: 15px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 21px;
        width: 99%;
        border: 0;
        border-bottom: 1px solid #eeeeee;
      }
    }
    > .edit-wechat-berak {
      font-size: 12px;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 17px;
    }
    > .edit-wechat-query {
      font-size: 16px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      height: 44px;
      background: rgba(0, 122, 230, 1);
      border-radius: 4px;
      width: 100%;
      border: 0;
      margin-top: 25px;
    }
  }
}
</style>
