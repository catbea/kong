<template>
  <div class="user-edit-wechat-page">
    <div class="user-edit-wechat">
      <p class="edit-wechat-title">个人介绍</p>
      <p class="edit-wechat-conter">
        <textarea
          v-model="signature"
          maxlength="50"
          placeholder="十年房产置业生涯专业为您服务"
          class="edit-wechat-input"
        ></textarea>
        <!-- <input type="text" class="edit-wechat-input" placeholder="十年房产置业生涯专业为您服务">{{signature.length}}/24 -->
      </p>
      <div class="edit-wechat-number">/50</div>
      <button class="edit-wechat-query" @click="toUpDateSignature">确认修改</button>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant'
import userService from 'SERVICE/userService'

export default {
  components: {
    Dialog
  },

  data() {
    return {
      signature: ''
    }
  },

  methods: {
    toUpDateSignature() {
      let signature = this.signature
      if (signature.length == 0) {
        Dialog.alert({
          message: '个人介绍不可为空'
        }).then(() => {
          // on close
        })
      } else {
        let obj = {
          signature: signature
        }
        this.upDateSignature(obj)
      }
    },

    upDateSignature(obj) {
      const result = userService.upDateUserInfo(obj)
      console.log(result)
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
        color: rgba(153, 153, 153, 1);
        line-height: 21px;
        width: 99%;
        border: 0;
        border-bottom: 1px solid #eeeeee;
        height: 42px;
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
