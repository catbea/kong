<template>
  <div class="small-agent-card">
    <div class="agent-box-left">
      <avatar class="agent-avatar" :avatar="info&&info.avatarUrl"></avatar>
      <div class="agent-info">
        <p class="agent-name">{{info&&info.agentName}}</p>
        <p class="agent-company">{{info&&info.enterpriseName}}</p>
      </div>
    </div>
    <div class="agent-box-right" @click="clickHandler">
      <button class="agent-right">
        <b>+</b> 名片
      </button>
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
    info: {
      type: Object
    }
  },
  methods: {
    clickHandler() {
      this.$emit('cilck')
    }
  }
}
</script>
<style lang="less">
.small-agent-card {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  > .agent-box-left {
    display: flex;
    > .agent-avatar {
      width: 40px;
      height: 40px;
      margin: 0 5px;
    }
    > .agent-info {
      padding-top: 3px;
      font-weight: 400;
      > .agent-name {
        font-size: 14px;
        color: #333333;
        font-weight: 500;
        margin: 2px 0 2px 3px;
      }
      > .agent-company {
        font-size: 12px;
        color: #8a8f99;
        margin: 1px 0 0 3px;
      }
    }
  }
  > .agent-box-right {
    position: relative;
    > .agent-right {
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      right: 15px;
      width: 64px;
      height: 32px;
      background: rgba(0, 122, 230, 1);
      border-radius: 16px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      border: none;
      b {
        font-size: 14px;
      }
    }
  }
}
</style>

