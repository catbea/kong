<template>
  <div class="van-hairline--bottom analyze-item" v-if="info">
    <div class="shadow_box mask-container" v-if="info.subscribeStatus==0">
      <div class="mask-box" :style="{backgroundImage:'url(' + maskImg + ')'}">
        <div class="mask-left-wrap">
          <div class="mask-left-text">该楼盘已过期</div>
          <div class="mask-left-intention">当前客户意向度{{info.intentionality}}%</div>
        </div>
        <div class="mask-right-wrap" @click="renewHandler">立即续费</div>
      </div>
    </div>
    <div class="shadow_box main-container" @click="godynamicsInfo" v-if="info.subscribeStatus==1">
      <div class="top-container">
        <div
          class="bg_img left-container"
          :style="{backgroundImage:'url(' + info.headImgUrl + ')'}"
        >
          <!-- 720标示 -->
          <img class="panorama-mark" :src="panoramaImg" v-if="info.ifPanorama">
        </div>
        <div class="right-container">
          <div class="analyze-name">{{info.linkerName}}</div>
          <!-- <div class="estate-location">{{`${info.city} ${info.county?info.county:''}`}}</div> -->
          <div class="analyze-location">{{info.area}}</div>
          <tag-group :arr="info.linkerTags"></tag-group>
          <div class="analyze-info">
            <!-- <p class="estate-price">{{info.price | priceFormart }} {{info.priceUnit}}</p> -->
            <p class="analyze-price">{{info.averagePrice}}</p>
            <!-- <p class="estate-area">{{info.buildArea ? `建面${info.buildArea}㎡`:'建面暂无'}}</p> -->
            <p class="analyze-area">{{info.minArea ? `建面${info.minArea-info.maxArea}㎡`:'建面暂无'}}</p>
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
          <span class="sensitive-area">{{info.sensitiveTag}}</span> 比较敏感，主要关注
          <span class="sensitive-area">{{info.attentionTag}}</span> 等楼盘周边配套
        </div>
        <intention-progress
          :progress="info.progress"
          :color="info.color"
          :textColor="info.textColor"
        ></intention-progress>
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
    info: { type: Object }
  },
  components: {
    TagGroup,
    IntentionProgress
  },
  data: () => ({
    panoramaImg: require('IMG/system/icon_panorama@2x.png'),
    commissionImg: require('IMG/user/collection/icon_commission@2x.png'),
    maskImg: require('IMG/dynamics/blurImg.png')
  }),
  created() {},
  methods: {
    godynamicsInfo() {
      this.$emit('click', this.info)
    },
    renewHandler() {
      this.$emit('renew', this.info)
    }
  }
}
</script>
<style lang="less" scoped>
.analyze-item {
  width: 100%;
  margin-top: 20px;
  .mask-container {
    margin: 0 16px 30px 16px;
    padding: 12px;
    .mask-box {
      width: 100%;
      height: 116px;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: auto;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      border-radius: 6px;
      .mask-left-wrap {
        display: flex;
        flex-direction: column;
        .mask-left-text {
          color: #fff;
          font-size: 24px;
          margin-bottom: 4px;
        }
        .mask-left-intention {
          color: #ffffff;
          font-size: 13px;
        }
      }
      .mask-right-wrap {
        color: #ffffff;
        font-size: 12px;
        background-color: #ee7158;
        padding: 10px;
      }
    }
  }
  .main-container {
    margin: 0 16px 30px 16px;
    padding: 0 16px 20px 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
    .top-container {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
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
        .analyze-name {
          font-size: 18px;
          font-weight: bold;
          color: #333333;
          padding-bottom: 6px;
        }
        .analyze-location {
          font-size: 14px;
          color: #666666;
          height: 20px;
        }
        .analyze-info {
          // white-space: nowrap;
          margin-top: -5px;
        //  display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          > p {
            display: inline-block;
          }
          .analyze-price {
            // width: 130px;
            color: #ea4d2e;
            font-size: 15px;
            font-weight: 600;
          }
          .analyze-area {
            font-size: 12px;
            font-weight: 400;
            color: #999999;
            padding-left: 8px;
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
        line-height: 18px;
        .sensitive-area {
          color: #007ae6;
          font-size: 12px;
        }
      }
      .commission {
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #f7f9fa;
        padding: 5px 11px;
        margin-top: 16px;
        height: 34px;
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
