<template>
  <div class="user-edit-wechat-page">
    <div class="user-edit-wechat">
      <p class="edit-wechat-title">个人介绍</p>
      <p class="edit-wechat-conter">
        <textarea
          v-model="signature"
          maxlength="24"
          placeholder="别问我是谁,请叫我AW大师"
          class="edit-wechat-input"
          v-on:input="inputListener()"
        >{{content}}</textarea>
        <!-- <input type="text" class="edit-wechat-input" placeholder="十年房产置业生涯专业为您服务">{{signature.length}}/24 -->
      </p>
      <div class="edit-wechat-number">{{this.inputSize}}/24</div>
      <button class="edit-wechat-query" @click="toUpDateSignature">确认修改</button>
    </div>
  </div>
</template>
<script>
import userService from 'SERVICE/userService'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      content: '',
      signature: '',
      inputSize: 0
    }
  },

  created() {
    let signature = this.$route.query.signature
    this.signature = signature
    this.inputSize = this.signature.length
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  methods: {
    toUpDateSignature() {
      let signature = this.signature
      if (signature.length == 0) {
        // this.$dialog
        //   .alert({
        //     message: '个人介绍不可为空'
        //   })
        //   .then(() => {
        //     // on close
        //   })
        let obj = {
          signature: '别问我是谁,请叫我AW大师'
        }
        this.signature = '别问我是谁,请叫我AW大师'
        this.upDateSignature(obj)
      } else {
        let obj = {
          signature: signature
        }
        this.upDateSignature(obj)
      }
    },

    async upDateSignature(obj) {
      const result = await userService.upDateUserInfo(obj)
      if (result) {
        this.$store.dispatch('getUserInfo', Object.assign(this.userInfo, { signature: this.signature }))
        this.$router.go(-1)
      }
    },

    inputListener() {
      let tempSignature = this.signature
      let inputSize = tempSignature.length
      this.inputSize = inputSize
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
      margin-bottom: 24px;
    }
    > .edit-wechat-conter {
      > .edit-wechat-input {
        font-size: 15px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
        width: 99%;
        border: 0;
        border-bottom: 1px solid #eeeeee;
        height: 42px;
        resize: none;
      }

      > .edit-wechat-input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #cccccc;
      }
    }
    > .edit-wechat-number {
      font-size: 10px;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 14px;
      text-align: right;
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
