<template>
  <div class="van-hairline--bottom estate-item" :style="{paddingBottom:(info&&info.divisionRules)&&'15px'}">
    <div class="main-continer" @click="mainAreaClickHandler">
      <div class="bg_img left-box" :style="{backgroundImage:'url(' + (info.headImgUrl ? info.headImgUrl : info.linkerUrl) + ')'}">
        <img class="panorama-mark" :src="panoramaImg" v-if="info.ifPanorama">
      </div>
      <div class="right-box">
        <h5 class="estate-name">{{info.linkerName}}</h5>
        <p class="estate-location">{{`${info.city} ${info.district?info.district:''}`}}</p>
        <tag-group class="tag-box" :arr="this.info.linkerTags||this.info.projectTagArr" />
        <div class="estate-info">
          <p class="estate-price" v-if="info.price===0">价格待定</p>
          <p class="estate-price" v-else>{{info.price }} {{info.priceUnit}}</p>
          <p class="estate-area">{{info.buildArea ? `建面${info.buildArea}㎡`:'建面暂无'}}</p>
        </div>
      </div>
    </div>
    <div class="operate-box">
      <div class="share-icon" v-if="conf.op === 'share'" @click.stop="shareHandler">
        <i style="color:#999999;font-size:16px;" class="icon iconfont icon-Building_list_share"></i>
      </div>
    </div>
    <div class="commission-box" v-if="info.divisionRules">
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
          op: ''
        }
      }
    }
  },
  components: {
    TagGroup
  },
  data: () => ({
    panoramaImg: require('IMG/system/icon_panorama@2x.png'),
    commissionImg: require('IMG/user/collection/icon_commission@2x.png')
  }),
  methods: {
    mainAreaClickHandler() {
      this.$emit('click', this.info)
    },
    shareHandler() {
      this.$emit('share', this.info)
    }
  }
}
</script>
<style lang="less">
.estate-item {
  position: relative;
  overflow: hidden;
  > .main-continer {
    word-wrap: none;
    display: flex;
    > .left-box {
      position: relative;
      background-color: #999999;
      border-radius: 6px;
      width: 120px;
      min-width: 120px;
      height: 90px;
      margin: 15px;
      flex-basis: 120px;
      > .panorama-mark {
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        width: 32px;
        height: 32px;
        object-fit: cover;
      }
    }
    > .right-box {
      flex-basis: 225px;
      margin: 16px 16px 16px 0;
      > .estate-name {
        font-size: 16px;
        font-weight: 600;
        color: #333333;
        padding-bottom: 8px;
      }
      > .estate-location {
        font-size: 12px;
        font-weight: 400;
        color: #666666;
        padding-bottom: 3px;
      }
      > .tag-box {
        margin-left: -3px;
      }
      > .estate-info {
        white-space: nowrap;
        line-height: 22px;
        display: flex;
        padding-top: 2px;
        > p {
          display: inline-block;
        }
        > .estate-price {
          color: #ea4d2e;
          font-size: 15px;
          font-weight: 600;
          padding-right: 12px;
        }
        > .estate-area {
          font-size: 12px;
          font-weight: 400;
          color: #999999;
          flex: 1;
        }
      }
    }
  }
  > .operate-box {
    position: absolute;
    top: 0;
    right: 10px;
    > .share-icon {
      width: 100%;
      height: 100%;
    }
  }
  > .commission-box {
    position: relative;
    width: 90%;
    height: 34px;
    line-height: 34px;
    margin: 0 5%;
    background: #f7f9fa;
    border-radius: 4px;
    display: flex;
    align-items: center;
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
}
</style>
