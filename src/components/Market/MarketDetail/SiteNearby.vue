<template>
  <div class="site-nearby-box">
      <ul class="site-nearby-box-classify">
        <li class="site-nearby-box-classify-public-transportation">公交</li>
        <li class="site-nearby-box-classify-hospital">医院</li>
        <li class="site-nearby-box-classify-shopping">购物</li>
        <li class="site-nearby-box-classify-education">教育</li>
        <li class="site-nearby-box-classify-cate">美食</li>
      </ul>
      <div class="site-nearby-box-map"></div>
      <div class="site-nearby-box-hint-box">
        <div class="site-nearby-box-hint-box-icon" :style="{'background':'url('+siteNearbyBoxHintBoxIconIMG+') no-repeat','background-size':'contain'}"></div>
        <div class="site-nearby-box-hint">数据统计范围为楼盘2公里以内，数据来至于百度地图，仅供参考！</div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    aroundList: { type: Array }
  },
  data: () => ({
    siteNearbyBoxHintBoxIconIMG: require('IMG/marketDetail/Shape@2x.png')
  })
}
</script>
<style lang="less">
.site-nearby-box {
  width: 343px;
  .site-nearby-box-classify {
    display: flex;
    justify-content: space-between;
    li {
      font-size: 14px;

      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    li:last-child {
      margin-right: 10px;
    }
  }
  .site-nearby-box-map {
    width: 343px;
    height: 188px;
  }
  .site-nearby-box-hint-box {
    display: flex;
    .site-nearby-box-hint-box-icon {
      width: 14px;
      height: 13px;
      margin: 3px 6px 0 0;
    }
    .site-nearby-box-hint {
      font-size: 12px;

      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
}
</style>
