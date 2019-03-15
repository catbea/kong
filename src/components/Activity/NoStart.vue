<template>
  <div class="activity-no-start">
    <div class="no-start-container">
      <div class="bg_img no-start-girl" :style="{backgroundImage:'url(' + girlIconImg + ')'}"></div>
      <div class="bg_img no-start-icon" :style="{backgroundImage:'url(' + startIconImg + ')'}"></div>
      <p class="no-start-title">活动倒计时中…</p>
      <p class="no-start-title">敬请关注</p>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    
  },
  props: {
    
  },
  data() {
    return {
      girlIconImg: require('IMG/activity/activity_girl.png'),
      startIconImg: require('IMG/activity/icon_start.png')
    }
  },

  methods: {
    
  }
}
</script>
<style lang="less">
.activity-no-start {
}
.no-start-container {
  width: 310px;
  height: 291px;
  background: linear-gradient(180deg, rgba(253, 245, 225, 1) 0%, rgba(253, 245, 225, 1) 100%);
  box-shadow: 0px 0px 6px 0px rgba(253, 83, 1, 0.75);
  border-radius: 8px;
  margin: 0 auto;
  text-align: center;
  padding: 50px 0;
  position: relative;
  > .no-start-girl {
    position: absolute;
    width: 30px;
    height: 71px;
    left: 10px;
    top: -36px;
  }
  > .no-start-icon {
    width: 68px;
    height: 68px;
    margin: 0 auto;
    margin-bottom: 15px;
  }
  > .no-start-title {
    color: #f55130;
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
  }
}
</style>
