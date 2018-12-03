<template>
  <div class="already-open-page">
    <ul>
      <li>已开通{{agentIdInfo}}个楼盘</li>
      <li>
          <router-link to="/user/myMarket" tag="p">我的楼盘</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    agentIdInfo: {
      type: Number
    }
  }
}
</script>

<style lang="less">
.already-open-page {
  width: 100%;
  ul {
    width: 311px;
    height: 54px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 6px 0px rgba(58, 76, 130, 0.07),
      0px 2px 17px 0px rgba(34, 47, 85, 0.05);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 8px 0 8px 16px;
    padding: 0 16px 0 16px;
    li:nth-child(1) {
      font-size: 15px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
    }
    li:nth-child(2) {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 122, 230, 1);
      line-height: 24px;
      text-align: center;
      width: 68px;
      height: 24px;
      border-radius: 12px;
      border: 1px solid rgba(0, 122, 230, 1);
    }
  }
}
</style>
