<template>
  <div class="market-box-page">
    <div class="market-box" @click="itemClickHandler" :class="{line:borderBottom}">
      <div class="all-describe">
        <div class="market-box-page-top">
          <div class="img bg_img" :style="{backgroundImage:'url('+(itemInfo.linkerImg ? itemInfo.linkerImg : itemInfo.linkerHeadUrl)+')'}">
            <!-- 720标示 -->
            <img class="panorama-mark" :src="panoramaImg" v-if="itemInfo.ifPanorama">
            <div class="label bg_img" v-show="itemInfo.sale" :style="{backgroundImage:'url('+labelImg+')'}">
              {{itemInfo.sale}}
              {{itemInfo.labels}}
            </div>
          </div>
          <ul class="market-describe">
            <li class="market-name">
              <div class='box'>
                <span class="title">{{itemInfo.linkerName}}</span>
                <span class="past" v-if="itemInfo.openStatus==10">已过期</span>
              </div>
              <span class="dredge" :style="style" v-if="dredge" @click.stop="openHandle">{{openStatus}}</span>
            </li>
            <li class="site">{{itemInfo.linkerAddress}} <span v-if="itemInfo.openStatus==10">{{itemInfo.invalidTime | dateTimeFormatter(2)}}到期</span></li>
            <tag-group :arr="tags ? tags.slice(0,3) : []"></tag-group>
            <li class="unit-price">
              <span>{{itemInfo.linkerPrice?itemInfo.linkerPrice:`${itemInfo.price}${itemInfo.priceUnit}`}}</span>
              <span>{{itemInfo.openTimes}}次开通</span>
            </li>
          </ul>
        </div>
        <div class="market-box-page-bottom" v-show="itemInfo.commission||itemInfo.divisionRules">
          <span :style="{backgroundImage:'url('+commissionImg+')'}" class="bg_img"></span>
          <span>{{itemInfo.commission?itemInfo.commission:itemInfo.divisionRules}}</span>
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
    if(this.tags) this.tags.unshift(this.saleStatus)
  },
  data() {
    return {
      tags: this.itemInfo.linkerTags,
      resInfo: null,
      style: null,
      panoramaImg: require('IMG/system/icon_panorama@2x.png'),
      commissionImg: require('IMG/user/collection/icon_commission@2x.png'),
      labelImg: require('IMG/marketDetail/discount@2x.png')
    }
  },
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
      if (!this.itemInfo.openStatus || this.itemInfo.openStatus == 20) {
        return '开通'
      } else if(this.itemInfo.openStatus == 10){
        return '续费'
      }
    },
    saleStatus() {
      if (this.itemInfo.saleStatus == 0) {
        return '热销中'
      } else if (this.itemInfo.saleStatus == 1) {
        return '即将发售'
      } else if (this.itemInfo.saleStatus == 3) {
        return '售罄'
      }
    }
  },
  methods: {
    itemClickHandler() {
      this.$emit('skipDetail', this.itemInfo)
    },
    dredgeColor() {
      this.style = conf(this.openStatus)
    },
    openHandle() {
      this.$emit('openReturnHandle', this.itemInfo)
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
    padding-top: 13px;
    margin: 0 0px 0 16px;
    .all-describe {
      display: flex;
      flex-direction: column;
      padding-bottom: 16px;
      .market-box-page-top {
        display: flex;
        .img {
          width: 120px;
          height: 90px;
          border-radius: 6px;
          margin-right: 12px;
          position: relative;
          text-align: center;
          line-height: 90px;
          .panorama-mark {
            width: 32px;
            height: 32px;
            display: inline-block;
            vertical-align: middle;
          }
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
            .box{
              display: flex;
              align-items: center;
              .title{
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width:103px;
              font-size: 16px;
              font-family: PingFangSC-Semibold;
              font-weight: 600;
              color: rgba(51, 51, 51, 1);
              line-height:normal;
            }
            .past{
              font-size:12px;
              transform:scale(0.84);
              font-family:PingFangSC-Regular;
              font-weight:400;
              line-height:normal;
              height:18px;
              color:rgba(234,77,46,1);
              padding:0 4px;
              border-radius:3px;
              // &::after{
              //   border-color: rgba(234,77,46,1);
              border:1px solid rgba(234,77,46,1);
              // }
            }
            }
            .dredge{
              flex:0 0 46px;
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 130px;
        }
      }
    }
  }
}
</style>
