<template>
  <div class="mock-login-page">
    <p>当前环境为{process.env.VUE_APP_BASE_API_URL}</p>
    <input class="input-area" type="text" v-model="token">
    <!-- <p>{{result}}</p> -->
    <router-link to="/">返回首页</router-link>
  </div>
</template>
<script>
import userService from '@/services/userService'
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    token: ''
  }),
  created() {
    if (this.$route.query.token) {
      this.token = this.$route.query.token
      this.mockLogin()
    }

    // store.getters.userInfo.token

    // let token
    // let userInfo = {
    //   token: this.$route.params.token
    // }
    // this.$store.dispatch('getUserInfo', userInfo)
    // console.log(this.apiUrl)
  },
  methods: {
    async mockLogin() {
      this.$store.dispatch('getUserInfo', {
        token: this.token
      })
      let userInfo = await userService.getUserInfo()
      userInfo = Object.assign(userInfo,{
        token: this.token
      })
      this.$store.dispatch('getUserInfo', userInfo)
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
  > .input-area {
    border: 1px solid #333333;
  }
}
</style>
