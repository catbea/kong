<template>
  <div class="article-container">

    <div class="article-list" @click="GOheadline">
      <span class="article-list-left">
        <p class="article-left-title">专家：“规避政策”卖房新路子要不得</p>
        <p class="article-left-time">楚天都市报&nbsp;&nbsp;1小时前
          <span class="left-time-nub"> 12条动态</span>
        </p>
      </span>
      <span class="article-list-right">
        <img :src="backIcon" class="mark-icon">
      </span>

    </div>
    <div class="article-list" @click="GOheadline">
      <span class="article-list-left">
        <p class="article-left-title">专家：“规避政策”卖房新路子要不得</p>
        <p class="article-left-time">楚天都市报&nbsp;&nbsp;1小时前
          <span class="left-time-nub"> 12条动态</span>
        </p>
      </span>
      <span class="article-list-right">
        <img :src="backIcon" class="mark-icon">
      </span>

    </div>
  </div>
</template>
<script>

export default {

  data () {
    return {
      backIcon: require('IMG/user/usercard@2x.png'),
    }
  },
  methods: {
    GOheadline () {
      console.log(1)
      //跳转到房产头条
      this.$router.push('/discover/headline')
    }
  },
}
</script>
<style lang="less">
.article-container {
      margin-right: 16px;
    padding-left: 16px;
  > .article-list {
    // margin: 0 15px;
    display: flex;
    border-bottom: 1px solid #e6e6e6;
    padding: 16px 0 16px 0;
    > .article-list-left {
      height: 90px;
      position: relative;
      > .article-left-title {
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        margin-right: 60px;
        padding-right: 70px;
      }
      > .article-left-time {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        position: absolute;
        bottom: 0;
        > .left-time-nub {
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(0, 122, 230, 1);
          line-height: 17px;
          padding-left: 50px;
        }
      }
    }
    > .article-list-right {
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


