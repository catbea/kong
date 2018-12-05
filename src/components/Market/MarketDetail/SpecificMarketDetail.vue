<template>
  <div class="specific-market-detail-box">
        <div class="specific-market-detail-name">
          {{info.linkerName}}
        </div>
        <div class="specific-market-detail-condition">
          <div class="specific-market-detail-condition-left">
            {{info.projectTagList.join(' | ')}}
          </div>
          <!-- <div class="specific-market-detail-condition-line"></div>
          <div class="specific-market-detail-condition-right">
            地铁房
          </div> -->
        </div>
        <div class="specific-market-detail">
          <ul class="specific-market-detail-left">
          <li class="average-price-left">平均价格:</li> 
          <li class="commission-left">佣金:</li>
          <li class="opening-quotation-left">开盘时间:</li>
          <li class="market-site-left">楼盘地址:</li>
          <li class="developers-left">开发商:</li>
          </ul>
          <ol class="specific-market-detail-right">
          <li class="average-price-right">{{info.averagePrice}}</li> 
          <li class="commission-right" @click="commission"> 
            <div class="commission">{{info.divisionRules}}</div> 
            <div class="commission-detail bg_img" :style="{backgroundImage:'url('+commissionDetailImg+')'}" ></div>
          </li>
          <li class="opening-quotation-right">{{info.openTime}}</li>
          <li class="market-site-right" @click="siteHandle">
            <div class="site">{{info.detailAddress}}</div> 
             <div  class="site-detail bg_img" :style="{backgroundImage:'url('+siteDetailImg+')'}"></div>
          </li>
          <li class="developers-right">{{info.developer}}</li>
          </ol>
        </div>
      </div>
</template>
<script>
export default {
  props: {
    info: { type: Object },
  },
  data: () => ({
    commissionDetailImg: require('IMG/marketDetail/arrow.png'),
    siteDetailImg: require('IMG/marketDetail/arrow.png')
  }),
  methods: {
    commission() {
      this.$router.push({name:'marketDetail-commission', params:{id: this.info.linkerId}})
    },
    siteHandle(){
      this.$router.push({path: '/marketDetail/info', query: this.info})
    }
  }
}
</script>
<style lang="less">
.specific-market-detail-box {
  width: 339px;
  .specific-market-detail-name {
    font-size: 26px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }
  .specific-market-detail-condition {
    display: flex;
    .specific-market-detail-condition-left,
    .specific-market-detail-condition-right {
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .specific-market-detail-condition-line {
      width: 1px;
      height: 16px;
      background: rgba(51, 51, 51, 1);
      margin: 0 5px 0 5px;
      margin-top: 3px;
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
      .commission-right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .commission {
          margin: 0;
        }
        .commission-detail {
          width: 12px;
          height: 12px;
          // margin: 0 8px 0 0;
        }
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
