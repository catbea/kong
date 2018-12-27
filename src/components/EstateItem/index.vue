<template>
  <div class="van-hairline--bottom container-box">
    <div class="estate-item" v-if="info">
      <div class="main-container" @click="godynamicsInfo">
        <div
          class="bg_img left-container"
          :style="{backgroundImage:'url(' + info.headImgUrl + ')'}"
        >
          <!-- 720标示 -->
          <img class="panorama-mark" :src="panoramaImg" v-if="info.ifPanorama">
        </div>
        <div class="right-container">
          <div class="estate-top">
            <h5 class="estate-name">{{info.linkerName}}</h5>
          </div>
          <p class="estate-location">{{`${info.city} ${info.district?info.district:''}`}}</p>
          <tag-group :arr="this.info.linkerTags||this.info.projectTagArr"></tag-group>
          <div class="estate-info">
            <p class="estate-price" v-if="info.price===0">价格待定</p>
            <p class="estate-price" v-else>{{info.price }} {{info.priceUnit}}</p>
            <p class="estate-area">{{info.buildArea ? `建面${info.buildArea}㎡`:'建面暂无'}}</p>
          </div>
        </div>
      </div>
      <div class="touch-view">
        <div class="share-icon" @click.stop="shareHandler">
          <i style="color:#999999;font-size:16px;" class="icon iconfont icon-Building_list_share"></i>
        </div>
      </div>
      <slot name="desc"></slot>
    </div>
    <div class="bottom-view" v-if="info.divisionRules">
      <img :src="commissionImg" class="bottom-view-img">
      <span>{{info.divisionRules | textOver}}</span>
    </div>
  </div>
</template>
<script>
import TagGroup from 'COMP/TagGroup'
export default {
  props: {
    info: { type: Object },
    conf: {
      type: Object,
      default: () => {
        return {
          op: 'share' // 右上角操作按钮 share-分享 open-开通楼盘
        }
      }
    }
  },

  components: {
    TagGroup
  },
  data: () => ({
    imgShare: require('IMG/user/rectangle.png'),
    panoramaImg: require('IMG/system/icon_panorama@2x.png'),
    commissionImg: require('IMG/user/collection/icon_commission@2x.png')
  }),
  methods: {
    godynamicsInfo() {
      this.$emit('click', this.info)
    },
    shareHandler() {
      this.$emit('share', this.info)
    }
  }
}
</script>
<style lang="less">
.container-box {
  display: flex;
  flex-direction: column;

  > .bottom-view {
    width: 90%;
    height: 34px;
    margin-left: 5%;
    background: rgba(247, 249, 250, 1);
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    > .bottom-view-img {
      width: 16px;
      height: 16px;
      margin-left: 8px;
    }

    span {
      color: #333333;
      font-size: 13px;
      margin-left: 8px;
    }
  }

  .estate-item {
    width: 100%;
    position: relative;
    > .main-container {
      display: flex;
      overflow: hidden;
      > .left-container {
        display: inline-block;
        background-color: #999999;
        flex-basis: 120px;
        height: 90px;
        margin: 16px;
        border-radius: 6px;
        flex-shrink: 0;
        text-align: center;
        line-height: 90px;
        > .panorama-mark {
          width: 32px;
          height: 32px;
          display: inline-block;
          vertical-align: middle;
        }
      }
      > .right-container {
        display: inline-block;
        margin: 16px 0;
        flex-basis: 210px;
        > .estate-top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          > .estate-name {
            font-size: 16px;
            font-weight: 600;
            color: #333333;
            padding-bottom: 10px;
          }
        }
        > .estate-location {
          font-size: 12px;
          font-weight: 400;
          color: #666666;
          padding-bottom: 10px;
        }
        > .estate-info {
          white-space: nowrap;
          > p {
            display: inline-block;
          }
          > .estate-price {
            width: 130px;
            color: #ea4d2e;
            font-size: 15px;
            font-weight: 600;
          }
          > .estate-area {
            font-size: 12px;
            font-weight: 400;
            color: #999999;
          }
        }
      }
    }

    > .touch-view {
      width: 30px;
      height: 30px;
      position: absolute;
      right: 10px;
      top: 10px;

      > .share-icon {
        position: absolute;
        right: 5px;
        top: 5px;
        width: 12px;
        height: 12px;
        padding: 10px;
        > i {
          color: #999999;
          position: absolute;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
