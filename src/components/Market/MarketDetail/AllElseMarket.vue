<template>
  <div class="all-else-market-box">
      <ul class="else-market-box" v-for="(item,index) in list" :key="index">
        <li class="else-market-box-img">

        </li>
        <li class="else-market-box-top">凯德公园1号</li>
        <li class="else-market-box-bottom">深圳-南山</li>
      </ul>
    </div>
</template>
<script>
export default {
  data: () => ({
    list: [1, 2, 3, 4]
  })
}
</script>
<style lang="less">
.all-else-market-box {
  display: flex;
  overflow-x: auto;
  width: 351px;
  .else-market-box {
    width: 160px;
    margin: 0 12px 3px 0;
    .else-market-box-img {
      width: 160px;
      height: 90px;
      border: 1px solid;
      margin-bottom: 3px;
    }
    .else-market-box-top {
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      margin-top: 8px;
    }
    .else-market-box-bottom {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-top: 8px;
    }
  }
}
</style>
