<template>
  <div class="shadow_box agent-card" v-if="info">
    <div class="title-agent">
      <span class="title-agent-left">
        <span class="agent-left-img">
          <avatar class="left-img" :avatar="info.avatarUrl"></avatar>
        </span>
        <span class="agent-left-introduce">
          <p class="introduce-name">{{info.agentName}}</p>
          <!-- {{info.distributorName}} -->
          <p class="introduce-company">资深房产经纪人</p>    
          <p class="introduce-adder">{{info.institutionName}}</p>
        </span>
      </span>
      <span class="title-agent-right" @click="showQRCodeView">
        <button class="agent-right">咨询</button>
      </span>
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
      personIcon: require('IMG/user/person_icon.png')
    }
  },

  methods:{
    showQRCodeView(){
      this.$emit('showQRCode','')
    }
  }
}
</script>
<style lang="less">
.agent-card {
  margin: 0 15px;
  border-radius: 6px;
}
.title-agent {
  background: #ffffff;
  display: flex;
  padding: 30px 20px;
  margin-top: 13px;
  > .title-agent-left {
    display: flex;
    > .agent-left-img {
      > .left-img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
    > .agent-left-introduce {
      margin-left: 8px;
      > .introduce-name {
        font-size: 18px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        padding: 2px 0 0 5px;
      }
      > .introduce-company {
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        padding: 3px 0 1px 5px;
      }
      > .introduce-adder {
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        padding: 3px 0 3px 5px;
      }
    }
  }
  > .title-agent-right {
    position: absolute;
    right: 110px;
    margin-top: 10px;
    > .agent-right {
      width: 64px;
      height: 32px;
      background: rgba(0, 122, 230, 1);
      border-radius: 16px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      border: 0;
      position: absolute;
    }
  }
}
</style>
