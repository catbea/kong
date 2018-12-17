<template>
  <div class="van-hairline--bottom my-custom-item" @click="clickHandler">
    <avatar class="user-avatar" :avatar="info.avatarUrl"></avatar>
    <div class="baseinfo-box">
      <p class="username">{{info.clientName}}</p>
      <p class="base-focus">{{focusInfo}}</p>
    </div>
    <div class="intention-box">
      <p class="intention-value">{{Number(this.info.intentionality)*100}}%</p>
      <p class="intention-title">意向度</p>
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
  methods: {
    clickHandler() {
      this.$emit('click', this.info)
    }
  },
  computed: {
    focusInfo() {
      return `累计浏览${this.info.browsCount}次，平均停留${Number(this.info.averageTime)}s`
    }
  }
}
</script>
<style lang="less">
.my-custom-item {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 80px;
  .user-avatar {
    margin: 15px;
    width: 50px;
    height: 50px;
  }
  .baseinfo-box {
    margin: 15px 0 15px -25px;
    .username {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      padding-bottom: 10px;
    }
    .base-focus {
      font-size: 13px;
      font-weight: 400;
      color: #666666;
    }
  }
  .intention-box {
    margin: 15px 0;
    text-align: center;
    .intention-value {
      font-size: 20px;
      font-weight: 500;
      color: #007ae6;
      padding: 3px 0;
    }
    .intention-title {
      font-size: 12px;
      font-weight: 400;
      color: #999999;
    }
  }
}
</style>
