<template>
  <div class="mock-login-page">
    <p>{{result}}</p>
    <router-link to="/">返回首页</router-link>
  </div>

</template>
<script>
import userService from '@/services/userService'
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
export default {
  data: _ => ({
    userId: -1,
    result: ''
  }),
  created () {
    this.userId = this.$route.params.userId
    window.localStorage.setItem('userId', this.userId)
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      this.$store.dispatch('getUserInfo', this.userId)
    }
  },
  computed: {
    ...mapGetters({ userInfo: 'userInfo' }),
  },
  watch: {
    userInfo (val) {
      try {
        const userInfoStr = JSON.stringify(val)
        window.localStorage.setItem('userInfo', userInfoStr)
        this.result = `已登录账号:id:[${val.userId}] name:[${val.name}]`
      } catch (error) {
        this.result = error
      }
    }
  }
}
</script>
<style lang="less">
.mock-login-page {
  padding: 30px;
  font-size: 14px;
  > a {
    // padding-top: 200px;
    // background: ;
    color: red;
  }
}
</style>

