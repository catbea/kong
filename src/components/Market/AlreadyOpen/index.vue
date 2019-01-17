<template>
  <div class="already-open-page">
    <ul>
      <li>已开通
        <span>{{agentIdInfo}}</span> 个有效楼盘
        </li>
      <li class="li" @click="myMarket">
          <p>我的楼盘</p>
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
  },
  methods: {
    myMarket() {
      this.$emit('returnMyMarket', 1)
    }
  }
}
</script>

<style lang="less">
.already-open-page {
  width: 100%;
  ul {
    width: 343px;
    height: 54px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 6px 0px rgba(58, 76, 130, 0.07), 0px 2px 17px 0px rgba(34, 47, 85, 0.05);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 8px 16px;
    padding: 0 16px 0 16px;
    li:nth-child(1) {
      font-size: 15px;

      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      span {
        color: #007ae6;
      }
    }
    .li {
      font-size: 12px;
      font-weight: 400;
      color: rgba(0, 122, 230, 1);
      line-height: 24px;
      text-align: center;
      width: 68px;
      height: 24px;
      border-radius: 25px;
      border: 0.8px solid rgba(0, 122, 230, 1);
    }
  }
}
</style>
