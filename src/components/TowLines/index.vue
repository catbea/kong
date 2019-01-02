<template>
  <div class="market-detail-info-top-page">
    <div class="top-info-box" >
    <ul>
      <li v-for="(item,index) in topInfo.top" :key="index">
        <div >{{item.left}}</div>
        <div >{{item.right}}</div>
      </li>
    </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    topInfo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {},
  methods: {
    textChange() {}
  }
}
</script>
<style lang="less">
.market-detail-info-top-page {
  width: 100%;
  .top-info-box {
    margin-top: 10px;
    padding: 19px 0 0 15px;
    background: #ffffff;
    ul {
      width: 100%;
      height: 100%;
      li {
        display: flex;
        margin-bottom: 14px;
        div:nth-child(1) {
          width: 100px;
          font-size: 14px;

          font-weight: 400;
          color: rgba(150, 158, 168, 1);
          line-height: normal;
        }
        div:nth-child(2) {
          width: 220px;
          font-size: 14px;

          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: normal;
        }
      }
    }
  }
}
</style>
