<template>
  <div class="shadow_box meal-market-page-box">
    <div class="meal-market-page-box-top">
      <!-- <span class="icon-check" :class="statusClassCompute" @click="clickHandler"></span> -->
      <div class="meal-market-page-box-top-left bg_img" :style="{backgroundImage:'url('+data.linkerUrl+')'}">
        <!-- <p class="icon-discount bg_img" v-show="data.sale" :style="{backgroundImage:'url('+discountImg+')'}">{{data.sale}}</p> -->
        <div  v-show="data.cpActivityVo" class="coupon">卡券</div>
        <span class="bg_img icon-play" v-show="data.ifPanorama==1" :style="{backgroundImage:'url('+imgPlay+')'}"></span>
      </div>
      <ul>
        <li>
          <div>{{data.linkerName}}</div>
        </li>
        <li>{{data.site}}<span v-if="data.buildArea"> | {{data.buildArea}}</span></li>
        <li>
          <div class="tag-item-statu blue" v-if="0===data.saleStatus">{{status[data.saleStatus]}}</div>
          <div class="tag-item-statu red" v-if="1===data.saleStatus">{{status[data.saleStatus]}}</div>
          <div class="tag-item-statu gary" v-if="3===data.saleStatus">{{status[data.saleStatus]}}</div>
          <!-- <div class="tag-item" v-if="data&&data.condition&&data.condition!==''" v-for="(item,index) in data.condition.slice(0,1)" :key="index">{{item}}</div> -->
        </li>
        <li class="market_price">{{data.price}}</li>
      </ul>
    </div>
    <div class="meal-market-page-box-bottom" v-if="showRules&&data.divisionRules">
      <img class="bg_img" :src="imgCommission" alt srcset>
      {{data.divisionRules}}
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
    currentStatus: false, // 当前存储是否选中
    status: ['热销中', '即将发售', '', '售罄'],
    discountImg: require('IMG/marketDetail/discount@2x.png'),
    checkImg: require('IMG/user/mealMarket/check@2x.png'),
    checkColorImg: require('IMG/user/mealMarket/checkColor@2x.png'),
    checkColorUnAble: require('IMG/user/mealMarket/isChecked.png'),
    imgShare: require('IMG/user/rectangle.png'),
    imgPlay: require('IMG/user/Oval@2x.png'),
    imgCommission: require('IMG/user/collection/icon_commission@2x.png')
  }),
  props: {
    value: { type: Boolean, default: false }, // 是否选中
    disabled: { type: Boolean, default: false }, // 是否禁用
    data: { type: Object },
    showRules: { type: Boolean, default: true }
  },
  methods: {
    clickHandler() {
      if (!this.disabled) {
        this.currentStatus = !this.currentStatus
        this.$emit('click', this.currentStatus)
      }
    }
  },
  watch: {
    value(val) {
      this.currentStatus = val
    },
    currentStatus(val) {
      this.$emit('input', val)
    }
  },
  computed: {
    statusClassCompute() {
      return `icon iconfont ${this.disabled ? 'icon-chat_register_rb_n' : this.value ? 'icon-chat_register_rb_s' : 'icon-chat_register_rb_n'} ${this.disabled && 'disabled'}`
    }
  }
}
</script>
<style lang="less">
.meal-market-page-box {
  padding-left: 16px;
  width: 100%;
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
      font-size: 18px;
      margin: 0 10px 0 16px;
      &.icon-chat_register_rb_s {
        color: #2f7bdf;
      }
      &.icon-chat_register_rb_n {
        color: #2f7bdf;
      }
      &.disabled {
        color: #333333;
      }
    }
    .meal-market-page-box-top-left {
      width: 120px;
      height: 90px;
      margin-right: 15px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      .coupon{
        position: absolute;
        left: 0;
        top: 8px;
        font-size: 12px;
        color: #fff;
        padding: 0 10px 0 5px;
        height: 20px;
        line-height: 20px;
        background-color: #CF562B;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
      .icon-discount {
        width: 36px;
        height: 20px;
        position: absolute;
        top: 4px;
        left: -4px;
        font-size: 11px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
        text-align: center;
      }
      .icon-play {
        width: 32px;
        height: 32px;
      }
    }
    ul {
      flex: 1;
      width: 181px;
      li:nth-of-type(1) {
        font-size: 18px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 26px;
        display: flex;
        justify-content: space-between;
        width: 98%;
        div {
          width: 98%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      li:nth-of-type(2) {
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 15px;
        margin: 7px 0 4px 0;
      }
      li:nth-of-type(3) {
        height: 18px;
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
          padding: 1px 5px;
          border-radius: 3px;
          height: 18px;
          // line-height: 18px;
        }
        .tag-item {
          background: rgba(143, 159, 177, 0.15);
          color: #5c5f66;
        }
      }
      // li:nth-of-type(4) {
      //   font-size: 12px;
      //   font-weight: 400;
      //   color: rgba(153, 153, 153, 1);
      //   // line-height: 11px;
      //   margin-top: 12px;
      //   display: flex;
      //   justify-content: space-between;
      // }
      .market_price{
        font-size: 16px;
        color: #E65E2E;
        line-height: 24px;
        font-weight: bold;
        margin-top: 7px;
      }
      .free{
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
        margin-top: 1px;
        vertical-align: middle;
        padding: 0 1px;
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
</style>
