<template>
  <div class="mock-login-page">
    <div class="mock-login-by-userid">
      <h5>1.输入用户id登陆</h5>
      <input class="input-area" type="text" v-model="userId">
      <div class="login-by-id" @click="mockLoginByUserId">登陆</div>
    </div>
    <div class="mock-login-by-token">
      <h5>2.输入用户token登陆</h5>
      <input class="input-area" type="text" v-model="token">
      <div class="login-by-id" @click="mockLoginByToken">登陆</div>
    </div>
    <router-link to="/">返回首页</router-link>
  </div>
</template>
<script>
import userService from '@/services/userService'
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    token: '',
    userId: ''
  }),
  created() {
    if (this.$route.query.token) {
      this.token = this.$route.query.token
      this.mockLoginByToken()
    }
    if (this.$route.query.id) {
      this.userId = this.$route.query.id
      this.mockLoginByUserId()
    }
  },
  methods: {
    async mockLoginByToken() {
      this.$store.dispatch('getUserInfo', {
        token: this.token
      })
      let userInfo = await userService.getUserInfo()
      userInfo = Object.assign(userInfo, {
        token: this.token
      })
      this.$store.dispatch('getUserInfo', userInfo)
    },
    async mockLoginByUserId() {
      const corpId = process.env.VUE_APP_AW_ENV === 'sit' ? 'ww8f6801ba5fd2a112' : 'ww8f6801ba5fd2a112'
      const res = await userService.getTokenById(this.userId, corpId)
      this.token = res.token
      this.mockLoginByToken()
    }
  },
  computed: {
    ...mapGetters({ userInfo: 'userInfo' })
  }
}
</script>
<style lang="less">
.mock-login-page {
  padding: 30px;
  font-size: 14px;
  > div {
    margin-top: 20px;
    > h5 {
      font-size: 32px;
      font-weight: bold;
    }
    > input {
      border: 1px solid #333333;
      height: 32px;
      line-height: 1.5;
      width: 100%;
      margin-top: 20px;
    }
    > div {
      height: 32px;
      width: 100%;
      background: green;
      text-align: center;
      line-height: 32px;
      border-radius: 10px;
      font-size: 18px;
      margin-top: 20px;
    }
  }
}
</style>
