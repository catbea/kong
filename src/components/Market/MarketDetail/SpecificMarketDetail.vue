<template>
  <div class="specific-market-detail-box">
        <div class="specific-market-detail-name">
          碧桂园。山水江南
        </div>
        <div class="specific-market-detail-condition">
          <div class="specific-market-detail-condition-left">
            湖景地产
          </div>
          <div class="specific-market-detail-condition-line"></div>
          <div class="specific-market-detail-condition-right">
            地铁房
          </div>
        </div>
        <div class="specific-market-detail">
          <ul class="specific-market-detail-left">
          <li class="average-price-left">平均价格:</li> 
          <li class="commission-left">佣金:</li>
          <li class="opening-quotation-left">开盘时间:</li>
          <li class="market-site-left">楼盘地址:</li>
          <li class="developers-left">开发商:</li>
          </ul>
          <ul class="specific-market-detail-right">
          <li class="average-price-right">410000元/㎡起</li> 
          <li class="commission-right" @click="commission"> 
            <div class="commission">0.234%</div> 
            <div class="commission-detail bg_img" :style="{backgroundImage:'url('+commissionDetailImg+')'}" ></div>
          </li>
          <li class="opening-quotation-right">2018年06月08日</li>
          <li class="market-site-right" @click="siteHandle">
            <div class="site">深圳市龙岗龙翔大道与怡翠路深圳市龙岗龙翔大道与怡翠路</div> 
             <div  class="site-detail bg_img" :style="{backgroundImage:'url('+siteDetailImg+')'}"></div>
          </li>
          <li class="developers-right">佛山市碧桂园地产实业有限公司</li>
          </ul>
        </div>
      </div>
</template>
<script>
export default {
  data: () => ({
    commissionDetailImg: require('IMG/marketDetail/arrow.png'),
    siteDetailImg: require('IMG/marketDetail/arrow.png')
  }),
  methods: {
    commission() {
      this.$router.push('/marketDetail/commission')
    },
    siteHandle(){
      this.$router.push('/marketDetail/info')
    }
  }
}
</script>
<style lang="less">
.specific-market-detail-box {
  width: 335px;
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
        .commission {
          margin: 0;
        }
        .commission-detail {
          width: 12px;
          height: 12px;
          margin: 8px 8px 0 0;
        }
      }
      .market-site-right {
        display: flex;
        justify-content: space-between;
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
          margin: 8px 8px 0 0;
        }
      }
    }
  }
}
</style>
