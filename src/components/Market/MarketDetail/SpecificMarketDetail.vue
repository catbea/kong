<template>
  <div class="specific-market-detail-box">
        <div class="specific-market-detail-name">
          {{info&&info.linkerName}}
        </div>
        <div class="specific-market-detail-condition">
          <div class="specific-market-detail-condition-left">
            {{info&&info.projectTagList.join(' | ')}}
          </div>
          <!-- <div class="specific-market-detail-condition-line"></div>
          <div class="specific-market-detail-condition-right">
            地铁房
          </div> -->
        </div>
        <div class="specific-market-detail-commission" @click="commission" v-if="info&&info.divisionRules">
            <span class="bg_img" :style="{backgroundImage:'url('+commissionImg+')'}"></span>
           <span class="commission-text">{{info&&info.divisionRules}}</span>
          </div>
        <div class="specific-market-detail">
          <ul class="specific-market-detail-left">
          <li class="average-price-left">平均价格:</li> 
          <li class="opening-quotation-left">开盘时间:</li>
          <li class="market-site-left">楼盘地址:</li>
          <li class="developers-left">开发商:</li>
          </ul>
          <ol class="specific-market-detail-right">
          <li class="average-price-right">{{info&&info.averagePrice}}</li> 
          <!-- <li class="commission-right" > 
            <div class="commission">{{info&&info.divisionRules}}</div> 
            <div class="commission-detail bg_img" :style="{backgroundImage:'url('+commissionDetailImg+')'}" ></div>
          </li> -->
          <li class="opening-quotation-right">{{info&&info.openTime}}</li>
          <li class="market-site-right" @click="siteHandle">
            <div class="site">{{info&&info.detailAddress}}</div> 
             <div  class="site-detail bg_img" :style="{backgroundImage:'url('+siteDetailImg+')'}"></div>
          </li>
          <li class="developers-right">{{info&&info.developer}}</li>
          </ol>
        </div>
      </div>
</template>
<script>
export default {
  props: {
    info: { type: Object }
  },
  data: () => ({
    commissionImg: require('IMG/user/collection/icon_commission@2x.png'),
    siteDetailImg: require('IMG/marketDetail/arrow.png')
  }),
  methods: {
    commission() {
      this.$router.push({ name: 'marketDetail-commission', params: { id: this.info.linkerId } })
    },
    siteHandle() {
      this.$router.push({
    path:'/public/map-Search',
    query:{
        latitude:this.info.longitude,
        longitude:this.info.latitude
    }
    })
    }
  }
}
</script>
<style lang="less">
.specific-market-detail-box {
  width: 339px;
  .specific-market-detail-name {
    line-height:37px;
    font-size: 26px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }
  .specific-market-detail-condition {
    display: flex;
    .specific-market-detail-condition-left,
    .specific-market-detail-condition-right {
      font-size: 14px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height:20px;
    }
    .specific-market-detail-condition-line {
      width: 1px;
      height: 16px;
      background: rgba(51, 51, 51, 1);
      margin: 0 5px 0 5px;
      margin-top: 3px;
    }
  }
  .specific-market-detail-commission {
    width: 339px;
    height: 34px;
    background: rgba(247, 249, 250, 1);
    border-radius: 4px;
    font-size: 15px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(234, 77, 46, 1);
    line-height: 24px;
    display: flex;
    align-items: center;
    span:nth-child(1){
      width: 16px;
      height: 16px;
      margin: 0 8px;
    }
    .commission-text{
      white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          width: 130px;
    }
  }
  .specific-market-detail {
    display: flex;
    height: auto;
    width: 335px;
    margin-top: 5px;
    .specific-market-detail-left {
      font-size: 16px;
      font-weight: 400;
      color: #8a8f99;
      margin-right: 9px;
      li {
        margin-top: 9px;
      }
    }
    .specific-market-detail-right {
      font-size: 16px;
      font-weight: 400;
      color: rgba(138, 143, 153, 1);
      flex: 1;
      li {
        margin: 9px 0px 0 0;
        color: #333333;
      }
      .average-price-right {
        color: #ea4d2e;
      }
      .market-site-right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .site {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          width: 210px;
        }
        .site-detail {
          width: 12px;
          height: 12px;
          // margin: 0px 8px 0 0;
        }
      }
    }
  }
}
</style>
