<template>
  <div class="meal-market-page">
    <div class="meal-market-page-box">
      <div class="meal-market-page-box-top">
        <span
          class="icon-check bg_img"
          :style="{backgroundImage:'url('+ ( dataArr.isUnable ? checkColorUnAble : (dataArr.isChecked ? checkColorImg : checkImg) )+')'}"
        ></span>
        <div
          class="meal-market-page-box-top-left bg_img"
          :style="{backgroundImage:'url('+dataArr.linkerUrl+')'}"
        >
          <!-- <p
            class="icon-discount bg_img"
            v-show="dataArr.sale"
            :style="{backgroundImage:'url('+discountImg+')'}"
          >{{dataArr.sale}}</p> -->
          <span
            class="bg_img icon-play"
            v-show="dataArr.ifPanorama==1"
            :style="{backgroundImage:'url('+imgPlay+')'}"
          ></span>
        </div>
        <ul>
          <li>
            <div><span class="free" v-if="+dataArr.isFree">免费</span>{{dataArr.linkerName}}</div>
          </li>
          <li>{{dataArr.site}}</li>
          <li>
            <div
              class="tag-item-statu blue"
              v-if="0===dataArr.saleStatus"
            >{{status[dataArr.saleStatus]}}</div>
            <div
              class="tag-item-statu red"
              v-if="1===dataArr.saleStatus"
            >{{status[dataArr.saleStatus]}}</div>
            <div
              class="tag-item-statu gary"
              v-if="3===dataArr.saleStatus"
            >{{status[dataArr.saleStatus]}}</div>
            <div
              class="tag-item"
              v-for="(item,index) in dataArr.condition.slice(0,1)"
              :key="index"
            >{{item}}</div>
            <!-- <tag-group :arr="dataArr.condition"></tag-group> -->
          </li>
          <li>{{dataArr.open}}</li>
        </ul>
      </div>
      <div class="meal-market-page-box-bottom" v-if="dataArr.divisionRules">
        <img class="bg_img" :src="imgCommission" alt="" srcset="">
        {{dataArr.divisionRules}}
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
    status: ['热销中', '即将发售', '', '售罄'],
    val: null,
    faag: false,
    discountImg: require('IMG/marketDetail/discount@2x.png'),
    checkImg: require('IMG/user/mealMarket/check@2x.png'),
    checkColorImg: require('IMG/user/mealMarket/checkColor@2x.png'),
    checkColorUnAble: require('IMG/user/mealMarket/isChecked.png'),
    imgShare: require('IMG/user/rectangle.png'),
    imgPlay: require('IMG/user/Oval@2x.png'),
    imgCommission: require('IMG/user/collection/icon_commission@2x.png')
  }),
  props: {
    dataArr: {
      type: Object
    }
  }
}
</script>
<style lang="less">
.meal-market-page {
  display: flex;
  .meal-market-page-box {
    width: 343px;
    box-shadow: 0px 3px 6px 0px rgba(58, 76, 130, 0.07), 0px 2px 17px 0px rgba(34, 47, 85, 0.05);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    .meal-market-page-box-top {
      display: flex;
      align-items: center;
      margin-top: 16px;
      margin-bottom: 16px;
      li {
        width: 160px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .icon-check {
        flex: 0 0 18px;
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
        border-radius: 4px;
        .building-img {
          width: 120px;
          height: 90px;
          border-radius: 4px;
          // background:url(labelImg);
        }
        .icon-discount {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 36px;
          width: 36px;
          height: 20px;
          position: absolute;
          top: 6px;
          left: -4px;
          font-size: 11px;
          font-weight: 500;
          text-align: center;
          color: rgba(255, 255, 255, 1);
          line-height: 18px;
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 172px;
        }
        li:nth-of-type(2) {
          font-size: 12px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          margin: 7px 0 5px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 172px;
        }
        li:nth-of-type(3) {
          display: flex;
          flex-wrap: wrap;
          .blue {
            background: rgba(0, 122, 230, 1);
            color: #ffffff;
          }
          .red {
            background: rgba(234, 77, 46, 0.1);
            color: #ea4d2e;
          }
          .gary {
            background: rgba(143, 159, 177, 0.15);
            color: #5c5f66;
          }
          .tag-item-statu,
          .tag-item {
            display: inline-block;
            white-space: nowrap;
            font-size: 12px;
            transform: scale(0.85);
            margin: 2px 4px 0px -6px;
            padding: 2px 5px;
            border-radius: 3px;
            height: 19px;
            line-height: 15px;
          }
          .tag-item {
            background: rgba(143, 159, 177, 0.15);
            color: #5c5f66;
          }
        }
        li:nth-of-type(4) {
          font-size: 12px;
          height: 14px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 11px;
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
        }
        .free{
          display: inline-block;
          font-size: 10px;
          width:28px;
          height:15px;
          text-align: center;
          line-height: 15px;
          background:rgba(234,77,46,1);
          border-radius:2px;
          color: #fff;
          border-radius: 2px;
          margin-right: 2px;
          vertical-align: middle;
          padding: 0 2px;
        }
      }
    }
    .meal-market-page-box-bottom {
      width: 318px;
      height: 32px;
      display: flex;
      align-items: center;
      background: rgba(247, 249, 250, 1);
      border-radius: 4px;
      font-size: 13px;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      padding: 7px 7px;
      margin-bottom: 16px;
      margin-left: 16px;
      overflow: hidden;
      img {
        margin-right: 8px;
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
