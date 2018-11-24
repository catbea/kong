<template>
  <shadow-box>
    <div slot="container">
      <div class="title-agent">
        <span class="title-agent-left">
          <span class="agent-left-img">
            <img :src="personIcon" class="left-img">
          </span>
          <span class="agent-left-introduce">
            <p class="introduce-name">李晓峰</p>
            <p class="introduce-company">深圳中原地产</p>
            <p class="introduce-adder">深圳尊豪网络科技有限公司</p>
          </span>
        </span>
        <span class="title-agent-right">
          <button class="agent-right">咨询</button>
        </span>
      </div>
    </div>
  </shadow-box>
</template>
<script>
import ShadowBox from 'COMP/ShadowBox'
export default {
  components: {
    ShadowBox
  },
  data() {
    return {
      personIcon: require('IMG/user/person_icon.png')
    }
  }
}
</script>
<style lang="less">
.title-agent {
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
      line-height: 20px;

      > .introduce-name {
        font-size: 18px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
      }
      > .introduce-company {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
      }
      > .introduce-adder {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
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
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 17px;
      border: 0;
      position: absolute;
    }
  }
}
</style>
