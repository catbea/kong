<template>
  <div class="discover-container">
  
    <div class="discover-list" @click="GOheadline">
      <span class="discover-list-left">
        <p class="list-left-title">专家：“规避政策”卖房新路子要不得</p>
        <p class="list-left-time">华尔街见闻&nbsp;&nbsp;刚刚&nbsp;&nbsp;1.2万浏览</p>
      </span>
      <span class="discover-list-right">
        <img :src="backIcon" class="mark-icon">
      </span>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backIcon: require('IMG/user/usercard@2x.png')
    }
  },
  methods: {
    GOheadline() {
      console.log(1)
      //跳转到房产头条
      this.$router.push('/discover/headline')
    }
  }
}
</script>
<style lang="less">
.discover-container {
  background: #ffffff;
  > .discover-list {
    margin: 0 15px;
    display: flex;
    border-bottom: 1px solid #e6e6e6;
    padding: 0 0 16px 0;
    > .discover-list-left {
      height: 90px;
      position: relative;
      > .list-left-title {
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        margin-right: 60px;
        padding-right: 70px;
      }
      > .list-left-time {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        position: absolute;
        bottom: 0;
      }
    }
    > .discover-list-right {
      width: 120px;
      height: 90px;
      border-radius: 6px;
      position: absolute;
      margin-right: 0;
      padding-right: 0;
      right: 16px;
      > .mark-icon {
        width: 120px;
        height: 90px;
        background: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
