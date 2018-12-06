<template>
  <div class="user-edit-username-page">
    <div class="user-edit-username">
      <p class="edit-username-title">用户昵称</p>
      <p class="edit-username-conter">
        <input type="text" class="edit-username-input" maxlength="8" v-model="userName">
      </p>
      <button class="edit-username-query" @click="toUpDateName">确认修改</button>
    </div>
  </div>
</template>
<script>
import userService from 'SERVICE/userService'
import { Dialog } from 'vant'
import strFormat from '@/filters/strFormat'

export default {
  components: {
    Dialog
  },

  data() {
    return {
      userName: ''
    }
  },

  created() {
    let userName = this.$route.query.userName
    this.userName = userName
  },

  methods: {
    //更新用户名
    async upDateUserName(obj) {
      const result = await userService.upDateUserInfo(obj)
      if (result) {
        this.$router.go(-1)
      }
    },

    toUpDateName() {
      let userName = this.userName
      if (userName.length == 0) {
        Dialog.alert({
          message: '用户名不可为空'
        }).then(() => {
          // on close
        })
      } else {
        this.userName = strFormat.fmtStr(userName)
        let date = {
          name: this.userName
        }
        this.upDateUserName(date)
      }
    }
  }
}
</script>

<style lang="less">
.user-edit-username-page {
  background: #ffffff;
  > .user-edit-username {
    margin: 27px 16px;
    > .edit-username-title {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      margin-bottom: 22px;
    }
    > .edit-username-conter {
      > .edit-username-input {
        font-size: 15px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 21px;
        width: 99%;
        border: 0;
        border-bottom: 1px solid #eeeeee;
      }
    }

    > .edit-username-query {
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
