<template>
  <div class="compile-poster-describe-page">
    <ul>
      <li>
        <div>楼盘名称:</div>
        <div>{{model.linkerName}}</div>
      </li>
      <li>
        <div>楼盘价格:</div>
        <div>{{model.linkerPrice}}{{model.priceUnit}}</div>
      </li>
      <li>
        <div>经纪人姓名:</div>
        <div>{{model.agentName}}</div>
      </li>
      <li>
        <div>授权开发商:</div>
        <div>{{model.developer}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    model: Object
  }
}
</script>

<style lang="less">
.compile-poster-describe-page {
  display: flex;
  margin: 51px 0 0 15px;
  ul {
    > li {
      display: flex;
      margin-bottom: 12px;
      > div:nth-child(1) {
        width: 100px;
        margin-right: 10px;
        font-size: 16px;
        font-family: PingFang-SC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
      }
      > div:nth-child(2) {
        width: 235px;
        font-size: 16px;
        font-family: PingFang-SC-Regular;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
}
</style>
