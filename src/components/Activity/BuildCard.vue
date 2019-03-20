<template>
  <div class="build-card">
    <div class="build-img" :style="{backgroundImage:'url(' + data.linkerImg  + ')'}">
      <div class="feel-label" :style="{backgroundImage:'url(' + feelLabel + ')'}">免费送</div>
    </div>
    <div class="building-name">{{data.linkerName | textOver(7)}}</div>
    <div class="building-price">{{data.linkerPrice }}{{data.priceUnit }}</div>
  </div>
</template>


<script>
export default {
  props: ['data'],
  data: () => ({
    feelLabel: require('IMG/activity/feel_label.png')
  })
}
</script>


<style lang="less" scoped>
.build-card {
  height: 157px;
  width: 42%;
  margin-left: 6%;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;

  > .build-img {
    width: 100%;
    height: 104px;
    background-size: cover;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    position: relative;

    > .feel-label {
      position: absolute;
      top: 0;
      right: 0;
      border-top-right-radius: 8px;
      font-size: 10px;
      color: white;
      width: 45px;
      height: 17px;
      line-height: 17px;
      text-align: center;
      background-size: 45px 17px;
    }
  }

  > .building-name {
    display: flex;
    width: 95%;
    color: #333333;
    font-size: 14px;
    padding-left: 8px;
    margin-top: 8px;
  }

  > .building-price {
    display: flex;
    color: #ea4d2e;
    font-size: 10px;
    margin-left: 8px;
    margin-top: 8px;
  }
}
</style>
