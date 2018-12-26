<template>
  <div class="market-allDynamic-page">
    <div class="market-allDynamic-page-top">
      <span></span>
      <p>楼盘动态</p>
      <p @click="statement()">免责声明</p>
    </div>
    <dynamic></dynamic>
  </div>
</template>
<script>
import { Dialog } from 'vant'
import Dynamic from './Dynamic.vue'
export default {
  components: {
    Dynamic
  },
  data: () => ({}),
  methods: {
    statement() {
      Dialog.alert({
        title: '免责声明',
        message:
          '本页面内容，旨在满足广大用户的信息需求而采集提供，如有异议请及时与我们联系。页面所载内容不代表本网站之观点或意见，仅供用户参考与借鉴最终以政府网站或开发商实际公示为准。商品房预售须取得《商品房预售许可证》，用户在购房时需慎重查验开发商的证件信息。'
      }).then(() => {
        // on close
      })
    }
  }
}
</script>
<style lang="less">
.market-allDynamic-page {
  width: 100%;
  height: 100%;
  background: #ffffff;
  .market-allDynamic-page-top {
    margin: 20px 0 0 15px;
    display: flex;
    margin-bottom: 19px;
    span {
      width: 11px;
      height: 13px;
    }
    p:nth-of-type(1) {
      margin-left: 12px;
      font-size: 14px;
      
      font-weight: 400;
      color: rgba(150, 158, 168, 1);
      line-height: 20px;
    }
    p:nth-of-type(2) {
      margin-left: 8px;
      font-size: 14px;
      
      font-weight: 400;
      color: #445166;
      line-height: 20px;
    }
  }
}
</style>
