<template>
  <div class="van-hairline--bottom estate-item dev" v-if="info">
    <div class="main-container" @click="godynamicsInfo">
      <div class="bg_img left-container" :style="{backgroundImage:'url(' + info.headImgUrl + ')'}">
        <!-- 720标示 -->
        <img class="panorama-mark" :src="panoramaImg" v-if="info.ifPanorama">
      </div>
      <div class="right-container">
        <div class="estate-top">
          <h5 class="estate-name">{{info.linkerName}}</h5>
          <!-- <div class="estate-share" @click.stop="shareHandler">
            <img class="share-icon" :src="imgShare">
          </div>-->
        </div>
        <p class="estate-location">{{`${info.city} ${info.district?info.district:''}`}}</p>
        <div class="sale-lable">
          <van-tag class="lable-first" color="#007AE6" text-color="#ffffff" v-if="info.saleStatus===0">热销中</van-tag>
          <van-tag class="lable-second" color="#ffe1e1" text-color="#EA4D2E" v-else-if="info.saleStatus===1">即将发售</van-tag>
          <van-tag class="lable-third" color="#ffe1e1" text-color="#ad0000" v-else-if="info.saleStatus===3">售罄</van-tag>
          <tag-group :arr="info.linkerTags||info.projectTagArr"></tag-group>
        </div>
        <div class="estate-info">
          <p class="estate-price">{{info.price }} {{info.priceUnit}}</p>
          <p class="estate-area">{{info.buildArea ? `建面${info.buildArea}㎡`:'建面暂无'}}</p>
        </div>
      </div>
    </div>
    <div class="share-icon">
      <i class="icon iconfont icon-article_share"></i>
    </div>
    <slot name="desc"></slot>
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
  data: () => ({
    imgShare: require('IMG/user/rectangle.png'),
    panoramaImg: require('IMG/system/icon_panorama@2x.png')
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
      > .sale-lable {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        > .lable-first {
          width: 52px;
          margin-right: 3px;
        }
        > .lable-second {
          width: 60px;
          margin-right: 3px;
        }
        > .lable-third {
          width: 40px;
          margin-right: 3px;
        }
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
  > .share-icon {
    position: absolute;
    right: 10px;
    top: 10px;
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
</style>
