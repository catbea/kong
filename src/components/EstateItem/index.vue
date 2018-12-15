<template>
  <div class="van-hairline--bottom estate-item" v-if="info">
    <div class="main-container" @click="godynamicsInfo">
      <div class="bg_img left-container" :style="{backgroundImage:'url(' + info.headImgUrl + ')'}">
        <!-- TODO 720标示 -->
      </div>
      <div class="right-container">
        <h5 class="estate-name">{{info.linkerName}}</h5>
        <p class="estate-location">{{`${info.city} ${info.county?info.county:''}`}}</p>
        <tag-group :arr="info.linkerTags||info.projectTagArr"></tag-group>
        <div class="estate-info">
          <p class="estate-price">{{info.price }} {{info.priceUnit}}</p>
          <p class="estate-area">{{info.buildArea ? `建面${info.buildArea}㎡`:'建面暂无'}}</p>
        </div>
      </div>
    </div>
    <slot name="desc"></slot>
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
  },
  methods: {
    godynamicsInfo() {
      this.$emit('click', this.info)
    }
  }
}
</script>
<style lang="less">
.estate-item {
  width: 100%;
  .main-container {
    display: flex;
    overflow: hidden;
    .left-container {
      display: inline-block;
      background-color: #999999;
      flex-basis: 120px;
      height: 90px;
      margin: 16px;
      border-radius: 6px;
      flex-shrink: 0;
    }
    .right-container {
      display: inline-block;
      margin: 16px 0;
      .estate-name {
        font-size: 16px;
        font-weight: 600;
        color: #333333;
        padding-bottom: 10px;
      }
      .estate-location {
        font-size: 12px;
        font-weight: 400;
        color: #666666;
        padding-bottom: 10px;
      }
      .estate-info {
        white-space: nowrap;
        > p {
          display: inline-block;
        }
        .estate-price {
          width: 130px;
          color: #ea4d2e;
          font-size: 15px;
          font-weight: 600;
        }
        .estate-area {
          font-size: 12px;
          font-weight: 400;
          color: #999999;
        }
      }
    }
  }
}
</style>
