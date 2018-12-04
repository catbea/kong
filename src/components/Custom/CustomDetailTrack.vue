<template>
  <div class="custom-detail-track">
    <div class="shadow_box info-container">
      <div class="info-item" v-for="(item) in trackInfo" :key="item.key">
        <p class="info-title">{{item.key}}</p>
        <p class="info-value">{{item.value}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    trackInfo: { type: Array },
  },
  data: () => ({
    info: [
      { key: '总浏览数', value: 90 },
      { key: '名片浏览', value: 17 },
      { key: '楼盘浏览', value: 190 },
      { key: '文章浏览', value: 124 }
    ]
  }),
  components: {}
}
</script>
<style lang="less">
.custom-detail-track {
  .info-container {
    margin: 20px;
    padding: 15px 15px 10px;
    display: flex;
    justify-content: space-around;
    .info-item {
      text-align: center;
      .info-title {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
      .info-value {
        font-size: 24px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
}
</style>
