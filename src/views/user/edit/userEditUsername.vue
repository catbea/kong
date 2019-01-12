<template>
<div class="user-edit-username-page">
  <div class="user-edit-username">
    <p class="edit-username-title">用户昵称</p>
    <p class="edit-username-conter">
      <input type="text" class="edit-username-input" maxlength="16" v-model.trim="userName" placeholder="请输入用户昵称">
      <span class="tips">必填项，8个汉字(或16个字符) 不可输入特殊字符</span>
    </p>
      <button class="edit-username-query" @click="toUpDateName">确认修改</button>
  </div>
</div>
</template>

<script>
import userService from 'SERVICE/userService'
import strFormat from '@/filters/strFormat'
import {
  mapGetters
} from 'vuex'
import {
  checkStrLength,
  checkStrType
} from '@/utils/tool'

export default {
  data() {
    return {
      userName: ''
    }
  },

  created() {
    let userName = this.$route.query.userName
    this.userName = userName
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  methods: {
    //更新用户名
    async upDateUserName(obj) {
      let nameObj = {
        name: this.userName
      }
      const result = await userService.upDateUserInfo(obj)
      if (result) {
        this.$store.dispatch('getUserInfo', Object.assign(this.userInfo, {
          name: this.userName
        }))
        this.$router.go(-1)
      }
    },

    toUpDateName() {
      let userName = this.userName
      if (!userName) {
        return this.$toast('昵称不能为空')
      }
      if (!checkStrLength(userName, 16)) {
        return this.$toast('昵称最多8个汉字(或16个字符)')
      }
      if (!checkStrType(userName)) {
        return this.$toast('昵称只支持中文、英文和数字')
      }
      this.upDateUserName({
        name: userName
      })
      // if (!userName) {
      //   this.$dialog
      //     .alert({
      //       message: '用户名不可为空'
      //     })
      //     .then(() => {
      //       // on close
      //     })
      // } else {
      //   let date = {
      //     name: this.userName
      //   }
      //   this.upDateUserName(date)

      // this.userName = strFormat.fmtStr(userName)
      // let date = {
      //   name: this.userName
      // }

      // if (this.userName.length > 0) {
      //   this.upDateUserName(date)
      // } else {
      //   this.$dialog.alert({
      //     message: '用户名不可为空'
      //   }).then(() => {
      //     // on close
      //   })
      // }
      // }
    }
  }
}
</script>

<style lang="less">
.user-edit-username-page {
  background: #ffffff;

  >.user-edit-username {
    margin: 27px 16px;

    >.edit-username-title {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      margin-bottom: 22px;
    }

    >.edit-username-conter {
      >.edit-username-input {
        font-size: 15px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 21px;
        width: 99%;
        border: 0;
        border-bottom: 1px solid #eeeeee;
        padding: 8px 0;
        color: #333;
        &::placeholder{
          color: rgba(150, 158, 168, 1);
        }
      }
      .tips{
        font-size: 12px;
        color: rgba(150, 158, 168, 1);
      }
    }

    >.edit-username-query {
      font-size: 16px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      height: 44px;
      background: rgba(0, 122, 230, 1);
      border-radius: 4px;
      width: 100%;
      border: 0;
      margin-top: 46px;
    }
  }
}
</style>
