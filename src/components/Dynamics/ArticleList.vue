<template>
   <div class="article-container" >

    <div class="article-list" @click="GOheadline" >
      <span class="article-list-left">
        <p class="article-left-title">cdcsd吃的是草</p>
        <p class="article-left-time">bcuisdjc &nbsp;&nbsp;1小时
          <span class="left-time-nub"> 3条动态</span>
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
  data() {
    return {
      backIcon: require('IMG/user/usercard@2x.png')
    }
  },
  props: {
    info: Object,
    HouseDynamicList: { type: Array }
  },
  created() {},
  methods: {
    GOheadline() {
      console.log(1)
      //跳转
      this.$emit('click', this.info)
      // this.$router.push('/discover/headline')
    }
  }
}
</script>
<style lang="less">
.article-container {
  background: #ffffff;
  margin-top: 13px;
  > .article-list {
    // margin: 0 15px;
    display: flex;
    border-bottom: 1px solid #e6e6e6;
    margin: 0 16px;
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
