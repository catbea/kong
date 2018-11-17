<template>
  <div class="estate-item dev" v-if="info">
    <div class="bg_img left-container" :style="{backgroundImage:'url(' + info.linkerUrl + ')'}">
      <!-- TODO 720标示 -->
    </div>
    <div class="right-container dev">
      <h5 class="estate-name">{{info.linkerName}}</h5>
      <p class="estate-location">{{`${info.city} ${info.county}`}}</p>
      <tag-group :arr="info.linkerTags"></tag-group>
      <div class="estate-info"></div>
    </div>
    <div class="rebate"></div>
  </div>
</template>
<script>
import TagGroup from 'COMP/TagGroup'
export default {
  props: {
    info: { type: Object }
  },
  components: {
    TagGroup
  }
}
</script>
<style lang="less">
.estate-item {
  display: flex;
  width: 100%;
  height: 122px;
  .left-container {
    display: inline-block;
    width: 120px;
    height: 90px;
    margin: 16px;
    border-radius: 6px;
  }
  .right-container {
    display: inline-block;
    margin: 16px 0;
    .estate-name {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
    }
    .estate-location {
      font-size: 12px;
      font-weight: 400;
      color: #666666;
    }
  }
}
</style>
