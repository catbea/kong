<template>
  <div class="share-business-card-page">
    <div class="bg_img result-status" v-if="result" :style="{backgroundImage:'url(' + result.imgUrl + ')'}">
    </div>
  </div>
</template>
<script>
import userService from '@/services/userService'
import { mapGetters } from 'vuex'
export default {
  data: _ => ({
    userId: -1,
    result: null
  }),
  created () {
    this.userId = this.userInfo.userId
    this.$toast.loading({
      mask: true,
      message: '海报生成中...',
      duration:0
    });
    this.getShareInfo()
  },
  methods: {
    async getShareInfo () {
      const res = await userService.getShareInfo(0, this.userId, this.userId)
      this.$toast.clear()
      this.result = res.data
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
<style lang="less">
.share-business-card-page {
  position: relative;
  width: 100%;
  height: 100%;
  >.result-status {
    height: 100%;
    background-color: #07294e;
    background-size: contain;
  }
}
</style>

