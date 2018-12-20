<template>
  <div class="van-hairline--bottom estate-item" v-if="info">
    <div class="main-container" @click="godynamicsInfo">
      <div class="bg_img left-container" :style="{backgroundImage:'url(' + info.headImgUrl + ')'}">
        <!-- 720标示 -->
        <img class="panorama-mark" :src="panoramaImg" v-if="info.ifPanorama">
      </div>
      <div class="right-container">
        <div class="estate-top">
          <h5 class="estate-name">{{info.linkerName}}</h5>
          <div class="estate-share" @click.stop="shareHandler">
            <img class="share-icon" :src="imgShare">
          </div>
        </div>
        <p class="estate-location">{{`${info.city} ${info.district?info.district:''}`}}</p>
        <tag-group :arr="this.info.linkerTags||this.info.projectTagArr"></tag-group>
        <!-- <div class="tag-item-statu blue" v-if="info.saleStatus===0">热销中</div>
        <div class="tag-item-statu red" v-if="info.saleStatus===1">即将发售</div>
        <div class="tag-item-statu gray" v-if="info.saleStatus===3">售罄</div>-->

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
      margin: 16px 0;
      flex-basis: 210px;
      .estate-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .estate-name {
          font-size: 16px;
          font-weight: 600;
          color: #333333;
          padding-bottom: 10px;
        }
        .estate-share {
          width: 30px;
          height: 30px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          .share-icon {
            width: 16px;
            height: 16px;
          }
        }
      }
      .sale-lable {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        > .lable-first {
          width: 40px;
          height: 15px;
          background: rgba(0, 122, 230, 1);
          border-radius: 2px;
          margin: 0 auto;
          text-align: center;
          span {
            color: #ffffff;
            font-size: 8px;
            line-height: 15px;
          }
        }
        > .lable-second {
          width: 49px;
          height: 15px;
          background: rgba(234, 77, 46, 0.1);
          border-radius: 2px;
          margin: 0 auto;
          text-align: center;
          span {
            color: #ea4d2e;
            font-size: 8px;
            line-height: 15px;
          }
        }
        > .lable-third {
          width: 30px;
          height: 15px;
          background: rgba(102, 102, 102, 0.15);
          border-radius: 2px;
          margin: 0 auto;
          text-align: center;
          span {
            color: #666666;
            font-size: 8px;
            line-height: 15px;
          }
        }
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
