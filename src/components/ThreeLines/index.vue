<template>
  <div class="market-detail-info-middle-page">
    <div class="middle-info-box" >
      <ol>
      <li v-for="(item,index) in middleInfo" :key="index">
        <div>{{item.licence}}</div>
        <div>{{item.certificationTime}}</div>
        <div>{{item.bindBuilding}}</div>
      </li>
    </ol>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    middleInfo: {
      type: Array,
      default: function() {
        return {}
      }
    }
  }
}
</script>
<style lang="less">
.market-detail-info-middle-page {
  width: 375px;
  .middle-info-box {
    padding: 0 0 0 15px;
    background: #ffffff;
    border-bottom: 1px solid #eeeeee;
    ol {
      width: 340px;
      overflow: hidden;
      margin-right: 15px;
      li {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: normal;
        display: flex;
        justify-content: space-between;
        margin: 10px 0 10px 0;
        div {
          width: 120px;
        }
      }
    }
  }
}
</style>
