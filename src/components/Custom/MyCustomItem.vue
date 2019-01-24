<template>
  <div class="van-hairline--bottom my-custom-item" @click="clickHandler">
    <avatar class="user-avatar" :avatar="info.avatarUrl"></avatar>
    <div
      class="bg_img user-attention"
      :style="{backgroundImage:'url('+attentionImg+')'}"
      v-if="info.attentionStatus==0"
    ></div>
    <div class="baseinfo-box">
      <p class="username">{{info.clientName}}</p>
      <p class="base-focus">{{focusInfo}}</p>
    </div>
    <div class="intention-box">
      <p class="intention-value" v-bind:style="{'color':Number(this.info.intentionality*100) >70?'#007AE6':'#999999'}">{{Number(this.info.intentionality*100).toFixed(1)}}%</p>
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
  data: () => ({
    attentionImg: require('IMG/user/icon_attention@2x.png')
  }),
  methods: {
    clickHandler() {
      this.$emit('click', this.info)
    }
  },
  computed: {
    focusInfo() {
      return `累计浏览${this.info.browsCount || 0}次，平均停留${Number(this.info.averageTime)}s`
    }
  }
}
</script>
<style lang="less">
.my-custom-item {
  display: flex;
  // justify-content: space-around;
  width: 100%;
  height: 80px;
  .user-avatar {
    margin: 15px;
    margin-right: 12px;
    width: 50px;
    height: 50px;
  }
  .user-attention {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 49px;
    top: 49px;
  }
  .baseinfo-box {
    margin: 15px;
    margin-left: 0px;
    flex: 1;
    width: calc(100%-160px);
    width: -webkit-calc(100%-160px);
    font-family: PingFangSC-Semibold;
    .username {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      padding-top: 5px;
      padding-bottom: 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .base-focus {
      font-size: 13px;
      font-weight: 400;
      color: #666666;
      font-family: PingFangSC-Regular;
    }
  }
  .intention-box {
    margin: 15px 0;
    margin-top: 9px;
    text-align: center;
    width: 80px;
    .intention-value {
      font-size: 20px;
      font-weight: 500;
      color: #007ae6;
      padding: 6px 0 10px 0;
      font-family: PingFangSC-Semibold;
    }
    .intention-title {
      font-size: 12px;
      font-weight: 400;
      color: #999999;
    }
  }
}
</style>
