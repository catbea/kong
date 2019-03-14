<template>
  <div class="activity-no-start">
    <div class="no-start-container">
      <div class="bg_img no-start-girl" :style="{backgroundImage:'url(' + girlIconImg + ')'}"></div>
      <p class="no-start-title">活动倒计时中…</p>
      <p class="no-start-title">敬请关注</p>
    </div>
  </div>
</template>
<script>
import Avatar from 'COMP/Avatar'
export default {
  components: {
    Avatar
  },
  props: {
    info: Object
  },
  data() {
    return {
      girlIconImg: require('IMG/activity/activity_girl.png')
    }
  },

  methods: {
    showQRCodeView() {
      this.$emit('showQRCode', '')
    }
  }
}
</script>
<style lang="less">
.activity-no-start {
}
.no-start-container {
  width: 304px;
  height: 291px;
  background: linear-gradient(180deg, rgba(253, 245, 225, 1) 0%, rgba(253, 245, 225, 1) 100%);
  box-shadow: 0px 0px 6px 0px rgba(253, 83, 1, 0.75);
  border-radius: 8px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  > .no-start-girl {
    position: absolute;
    width: 30px;
    height: 71px;
    left: 22px;
    top: -36px;
  }
  > .no-start-title {
    color: #f55130;
    font-size: 24px;
  }
}
</style>
