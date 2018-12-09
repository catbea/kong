<template>
<div class="market-box-page">
  <div class="market-box"  @click="itemClickHandler" :class="{line:borderBottom}">
    
    <div class="all-describe" >
      <div class="market-box-page-top">
        <div class="img bg_img" :style="{backgroundImage:'url('+itemInfo.linkerImg+')'}">
          <div class="label bg_img" v-show="itemInfo.sale" :style="{backgroundImage:'url('+labelImg+')'}">{{itemInfo.sale}}
            {{itemInfo.labels}}
          </div>
        </div>
        <!-- <input type="text" v-model="val"> -->
        <ul class="market-describe">
          <li class="market-name">
            <span> {{itemInfo.linkerName}}</span>
            <span class="dredge" :style="style" v-if="dredge" @click.stop="openHandle">{{openStatus}}</span>
          </li>
          <li class="site">{{itemInfo.linkerAddress}}</li>
          <tag-group :arr="itemInfo.linkerTags"></tag-group>
          <li class="unit-price">
            <span>{{itemInfo.linkerPrice}}</span>
            <span>{{itemInfo.openTimes}}次开通</span>
          </li>
        </ul>
      </div>
        
        <div class="market-box-page-bottom" v-show="itemInfo.commission">
          <span :style="{backgroundImage:'url('+commissionImg+')'}" class="bg_img"></span>
          <span>{{itemInfo.commission}}</span>
        </div>
    </div>
  </div>
</div>
</template>
<script>
import TagGroup from 'COMP/TagGroup/'
import conf from './conf'
export default {
  components: {
    TagGroup
  },
  created() {
    this.dredgeColor()
  },
  data: () => ({
    resInfo: null,
    style: null,
    commissionImg: require('IMG/user/collection/Rectangle@2x.png'),
    labelImg: require('IMG/marketDetail/discount@2x.png')
  }),
  props: {
    // value:'',
    itemInfo: {
      type: Object
    },
    borderBottom: {
      type: Boolean,
      default: true
    },
    dredge: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    openStatus() {
      if (this.itemInfo.openStatus >= 0) {
        return '开通'
      } else {
        return '续费'
      }
    }
  },
  methods: {
    itemClickHandler() {
      this.$emit('skipDetail', 1)
    },
    dredgeColor() {
      this.style = conf(this.openStatus)
    },
    openHandle() {
      this.$emit('openReturnHandle', 1)
    }
  },
  watch: {
    value(val) {
      this.val = val
    },
    val(val) {
      this.$emit('change', val)
    }
  }
}
</script>
<style lang="less">
.line {
  border-bottom: 1px solid #e6e6e6;
}
.market-box-page {
  background: #ffffff;
  width: 375px;
  .market-box {
    width: 343px;
    margin: 13px 0px 0 16px;
    .all-describe {
      display: flex;
      flex-direction: column;
      .market-box-page-top {
        display: flex;
        .img {
          width: 120px;
          height: 90px;
          border-radius: 6px;
          margin-right: 12px;
          position: relative;
          .label {
            position: absolute;
            left: -4px;
            top: 4px;
            width: 36px;
            height: 24px;
            text-align: center;
            line-height: 20px;
            font-size: 11px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }
        }
        .market-describe {
          width: 207px;
          .market-name {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            span:nth-child(1) {
              width: 160px;
              font-size: 16px;
              font-family: PingFangSC-Semibold;
              font-weight: 600;
              color: rgba(51, 51, 51, 1);
              line-height: 16px;
            }
            span:nth-child(2) {
              width: 46px;
              height: 24px;
              background: rgba(0, 122, 230, 1);
              border-radius: 12px;
              font-size: 12px;
              font-family: PingFang-SC-Regular;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 24px;
              text-align: center;
            }
          }
          .site {
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 12px;
            margin-bottom: 9px;
          }
          .unit-price {
            display: flex;
            height: 15px;
            margin-top: 4px;
            justify-content: space-between;
            span:nth-child(1) {
              line-height: 15px;
              font-size: 15px;
              font-family: PingFangSC-Semibold;
              font-weight: 600;
              color: rgba(234, 77, 46, 1);
            }
            span:nth-child(2) {
              line-height: 15px;
              font-size: 12px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
            }
          }
        }
      }

      .market-box-page-bottom {
        width: 335px;
        height: 34px;
        padding: 0 0 0 8px;
        background: rgba(247, 249, 250, 1);
        border-radius: 4px;
        margin: 16px 0 16px 0;
        display: flex;
        align-items: center;
        span:nth-child(1) {
          width: 16px;
          height: 16px;
        }
        span:nth-child(2) {
          margin: 0 0 0 4px;
          font-size: 15px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 24px;
        }
      }
    }
  }
}
</style>
