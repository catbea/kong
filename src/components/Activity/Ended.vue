<template>
  <div class="activity-ended">
    <div class="ended-container">
      <div class="bg_img ended-girl" :style="{backgroundImage:'url(' + girlIconImg + ')'}"></div>
      <div class="bg_img ended-icon" :style="{backgroundImage:'url(' + endedIconImg + ')'}"></div>
      <p class="ended-title">很遗憾</p>
      <p class="ended-title">活动已结束</p>
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
      endedIconImg: require('IMG/activity/icon_end.png')
    }
  },

  methods: {
    
  }
}
</script>
<style lang="less">
.activity-ended {
}
.ended-container {
  width: 310px;
  height: 291px;
  background: linear-gradient(180deg, rgba(253, 245, 225, 1) 0%, rgba(253, 245, 225, 1) 100%);
  box-shadow: 0px 0px 6px 0px rgba(253, 83, 1, 0.75);
  border-radius: 8px;
  margin: 0 auto;
  text-align: center;
  padding: 50px 0;
  position: relative;
  > .ended-girl {
    position: absolute;
    width: 30px;
    height: 71px;
    left: 10px;
    top: -36px;
  }
  > .ended-icon {
    width: 68px;
    height: 68px;
    margin: 0 auto;
    margin-bottom: 15px;
  }
  > .ended-title {
    color: #333;
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
  }
}
</style>
