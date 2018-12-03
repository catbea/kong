<template>
  <div class="user-edit-phone-page">
    <div class="user-edit-phone">
      <p class="edit-phone-title">
        注册手机
        <span class="edit-phone-remark">(不可更改)</span>
      </p>
      <p class="edit-phone-conter">
        <input
          type="text"
          class="edit-phone-input"
          placeholder="Bela"
          disabled="disabled"
          value="13590200739"
        >
      </p>
      <p class="edit-phone-card">名片展示手机号</p>
      <p class="edit-phone-card-conter">
        <input type="text" class="edit-phone-card-input" maxlength="11" v-model="Cphone">
      </p>
      <button class="edit-phone-query" @click="godSub">确认修改</button>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant'
import userService from 'SERVICE/userService'
import strFormat from '@/filters/strFormat'

export default {
  components: {
    Dialog
  },
  data() {
    return {
      Cphone: ''
    }
  },
  methods: {
    godSub() {
      if (this.Cphone == '') {
        Dialog.alert({
          message: '名片展示手机号不可为空'
        }).then(() => {
          // on close
        })
      } else {
        let phoneType = strFormat.fmtNum(this.Cphone)
        if (phoneType == null) {
          this.Cphone = ''
          Dialog.alert({
            message: '请输入数字'
          }).then(() => {
            // on close
          })
        } else {
          let date = {
            tempPhone: this.Cphone
          }
          this.upDatePhoneNum(date)
        }
      }
    },

    upDatePhoneNum(obj) {
      const result = userService.upDateUserInfo(obj)
      console.log(result)

    }
  }
}
</script>
<style lang="less">
.van-dialog {
  border-radius: 12px;
  width: 72%;
  text-align: center;
}
.van-dialog__message {
  font-size: 15px;
  color: rgba(51, 51, 51, 1);
}
.van-button__text {
  font-size: 18px;
  color: rgba(0, 122, 230, 1);
}
.user-edit-phone-page {
  background: #ffffff;
  > .user-edit-phone {
    margin: 27px 16px;
    > .edit-phone-title {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      margin-bottom: 22px;
      > .edit-phone-remark {
        font-size: 15px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 21px;
      }
    }
    > .edit-phone-card {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      margin-bottom: 22px;
    }
    > .edit-phone-card-conter {
      > .edit-phone-card-input {
        font-size: 15px;
        font-weight: 500;
        color: #666666;
        line-height: 21px;
        width: 99%;
        border: 0;
        border-bottom: 1px solid #eeeeee;
      }
    }
    > .edit-phone-conter {
      margin-bottom: 24px;
      > .edit-phone-input {
        font-size: 15px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 21px;
        width: 99%;
        border: 0;
        background-color: #ffffff;
        border-bottom: 1px solid #eeeeee;
      }
    }

    > .edit-phone-query {
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
