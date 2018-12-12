<template>
  <div class="van-hairline--bottom estate-item" v-if="info">
    <div class="shadow_box main-container" @click="godynamicsInfo">
      <div class="top-container">
        <div
          class="bg_img left-container"
          :style="{backgroundImage:'url(' + info.headImgUrl + ')'}"
        >
          <!-- 720标示 -->
          <img class="panorama-mark" :src="panoramaImg" v-if="info.ifPanorama">
        </div>
        <div class="right-container">
          <div class="estate-name">{{info.linkerName}}</div>
          <div class="estate-location">{{`${info.city} ${info.county?info.county:''}`}}</div>
          <tag-group :arr="info.linkerTags||info.projectTagArr"></tag-group>
          <div class="estate-info">
            <p class="estate-price">{{info.price | priceFormart }} {{info.priceUnit}}</p>
            <p class="estate-area">{{info.buildArea ? `建面${info.buildArea}㎡`:'建面暂无'}}</p>
          </div>
        </div>
      </div>
      <div class="bottom-container">
        <div class="intention">
          关注
          <span class="intention-house-type">{{info.intentionHouseType}}</span>
        </div>
        <div class="sensitive" v-if="info.sensitiveTag">
          对
          <span class="sensitive-area">{{info.area}}</span> 比较敏感，主要关注
          <span class="sensitive-area">{{info.attentionTag}}</span> 等楼盘周边配套
        </div>
        <intention-progress :progress="info.progress" :color="info.color" :textColor="info.textColor"></intention-progress>
        <div class="commission">
            <img :src="commissionImg" class="commission-img">
            <span class="commission-text">{{info.commissionProgram}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TagGroup from 'COMP/TagGroup'
import IntentionProgress from 'COMP/IntentionProgress'
export default {
  props: {
    info: { type: Object },
  },
  components: {
    TagGroup,
    IntentionProgress
  },
  data: () => ({
    panoramaImg: require('IMG/system/icon_panorama@2x.png'),
    commissionImg: require('IMG/user/collection/icon_commission@2x.png'),
  }),
  created() {
      
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
  margin-top: 20px;
  .main-container {
    margin: 0 16px 30px 16px;
    padding: 0 16px 20px 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .top-container {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      .left-container {
        margin: 0 12px 8px 0;
        display: inline-block;
        background-color: #999999;
        flex-basis: 120px;
        height: 90px;
        border-radius: 6px;
        flex-shrink: 0;
        text-align: center;
        line-height: 90px;
        .panorama-mark {
          width: 32px;
          height: 32px;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .right-container {
        display: inline-block;
        .estate-name {
          font-size: 18px;
          font-weight: bold;
          color: #333333;
          padding-bottom: 10px;
        }
        .estate-location {
          font-size: 14px;
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
    .bottom-container {
      margin-top: 8px;
      .intention {
        color: #333333;
        font-size: 12px;
        margin-bottom: 4px;
        .intention-house-type {
          color: #007ae6;
          font-size: 12px;
        }
      }
      .sensitive {
        color: #333333;
        font-size: 12px;
        margin-bottom: 10px;
        .sensitive-area {
          color: #007ae6;
          font-size: 12px;
        }
      }
      .commission {
          display: flex;
          flex-direction: row;
          align-items: center;
          background-color: #F7F9FA;
          padding: 5px 11px;
          margin-top: 16px;
          .commission-img {
              width: 16px;
              height: 16px;
          }
          .commission-text {
              color: #333333;
              font-size: 15px;
              margin-left: 5px;
            }
      }
      
    }
  }
}
</style>
