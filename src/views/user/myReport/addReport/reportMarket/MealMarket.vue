<template>
  <div class="meal-market-page">
    <div class="meal-market-page-box">
      <div class="meal-market-page-box-top">
        <span
          class="icon-check bg_img"
          :style="{backgroundImage:'url('+ (indexData==checkData ? checkColorImg:checkImg)+')'}"
        ></span>
        <div class="meal-market-page-box-top-left">
          <img class="building-img" :src="dataArr.linkerHeadUrl">
          <p
            class="icon-discount"
            :style="{'backgroundImage':'url(' + labelImg + ')'}"
          >{{dataArr.sale}}</p>
          <span class="bg_img icon-play" :style="{backgroundImage:'url('+imgPlay+')'}"></span>
        </div>
        <ul>
          <li>
            <div style="display:flex;">{{dataArr.linkerName}}</div>
          </li>
          <li>{{dataArr.city}} {{dataArr.district}} {{dataArr.price}} {{dataArr.priceUnit}}</li>
          <li>
            <tag-group :arr="dataArr.linkerTags"></tag-group>
          </li>
          <li>{{dataArr.openTimes}}次开通</li>
        </ul>
      </div>
      <div class="meal-market-page-box-bottom" v-if="dataArr.divisionRules">
        <img class="bg_img" :src="imgCommission" alt="" srcset="">
        <span>{{dataArr.divisionRules | textOver}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import TagGroup from 'COMP/TagGroup/'
export default {
  components: {
    TagGroup
  },
  data: () => ({
    val: null,
    faag: false,
    checkImg: require('IMG/user/mealMarket/check@2x.png'),
    checkColorImg: require('IMG/user/mealMarket/checkColor@2x.png'),
    imgShare: require('IMG/user/rectangle.png'),
    imgPlay: require('IMG/user/Oval@2x.png'),
    imgCommission: require('IMG/user/collection/icon_commission@2x.png'),
    labelImg: require('IMG/marketDetail/discount@2x.png')
  }),
  props: {
    value: '',
    dataArr: {
      type: Object
    },
    checkData: {
      type: Number
    },
    indexData: {
      type: Number
    },
    showData: {
      type: Boolean
    }
  },
  watch: {
    value(val) {
      this.val = val
    },
    val(val) {
      this.$emit('update:value', val)
    }
  }
}
</script>
<style lang="less">
.meal-market-page {
  display: flex;
  .meal-market-page-box {
    margin-top: 16px;
    width: 343px;
    box-shadow: 0px 3px 6px 0px rgba(58, 76, 130, 0.07), 0px 2px 17px 0px rgba(34, 47, 85, 0.05);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    .meal-market-page-box-top {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      .icon-check {
        width: 18px;
        height: 18px;
        margin: 0 16px;
      }
      .meal-market-page-box-top-left {
        width: 120px;
        height: 90px;
        margin-right: 10px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .building-img {
          width: 120px;
          height: 70px;
          border-radius: 4px;
          margin-top: 16px;
          // background:url(labelImg);
        }
        .icon-discount {
          width: 38px;
          position: absolute;
          top: 22px;
          left: -4px;
          font-size: 11px;
          font-weight: 500;
          padding-left: 3px;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;
        }
        .icon-play {
          width: 32px;
          height: 32px;
        }
      }
      ul {
        width: 181px;
        li:nth-of-type(1) {
          font-size: 16px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 16px;
          display: flex;
          justify-content: space-between;
        }
        li:nth-of-type(2) {
          font-size: 12px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 5px;
          margin: 10px 0 10px 0;
        }
        li:nth-of-type(3) {
          height: 15px;
        }
        li:nth-of-type(4) {
          font-size: 12px;
          
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 11px;
          margin-top: 12px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .meal-market-page-box-bottom {
      width: 311px;
      height: 32px;
      display: flex;
      align-items: center;
      background: rgba(247, 249, 250, 1);
      border-radius: 4px;
      font-size: 13px;
      
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      padding: 0 0 0 0;
      margin-bottom: 16px;
      margin-left: 8px;
      img {
        margin-left: 8px;
        width: 16px;
        height: 16px;
      }

      span {
        margin-left: 5px;
      }
    }
  }
}
</style>
