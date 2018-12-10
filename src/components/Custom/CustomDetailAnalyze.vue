<template>
  <div class="custom-detail-analyze">
    <div class="shadow_box pie-container" v-if="!pieChartHidden">
      <h5 class="chart-title">客户兴趣占比</h5>
      <pie-chart v-if="pieData.length" :pieData="pieData"></pie-chart>
      <p class="chart-desc">该客户还未有感兴趣的楼盘，请再接再厉多多 推荐，掌握客户的购房意向吧~</p>
    </div>
    <div class="shadow_box line-container" v-if="!lineChartHidden">
      <h5 class="chart-title">近7日活跃度</h5>
      <line-chart v-if="lineData.length" :lineData="lineData"></line-chart>
      <p class="chart-desc">该客户即将失联，请持续分享活动、名片和楼盘 召唤TA吧~</p>
    </div>
    <div class="shadow_box bar-container" v-if="!barChartHidden">
      <h5 class="chart-title">查看次数统计</h5>
      <bar-chart v-if="barData.length" :barData="barData"></bar-chart>
      <p class="chart-desc">该客户默默关注你好久了，不去打声招呼吗~</p>
    </div>
    <div class="shadow_box purchase-intention">
      <h5 class="purchase-title">买房意向</h5>
      <div class="purchase-info-box">
        <p><span>区域:</span>{{baseInfo.intentionArea}}</p>
        <p><span>户型:</span>{{baseInfo.intentionHouseType}}</p>
        <p><span>总价:</span>{{baseInfo.intentionPrice}}</p>
        <p><span>关注:</span>{{baseInfo.intentionDemand}}</p>
        <div class="preferences"><span>偏好:</span>
          <tag-group :arr="tempTagData"></tag-group>
        </div>
      </div>
    </div>
    <div>
      <estate-item v-for="(item,index) in analysisListData" :key="index" :info="item">
        <p class="interest-desc" slot="desc">1312312312</p>
      </estate-item>
    </div>
    <custom-operation></custom-operation>
  </div>
</template>
<script>
import PieChart from 'COMP/Custom/Charts/PieChart'
import LineChart from 'COMP/Custom/Charts/LineChart'
import BarChart from 'COMP/Custom/Charts/BarChart'
import TagGroup from 'COMP/TagGroup'
import EstateItem from 'COMP/EstateItem'
import CustomOperation from './CustomOperation.vue'
export default {
  props: {
    baseInfo: { type: Object },
    tempTagData: { type: Array },
    pieChartHidden: { type: Boolean },
    pieData: { type: Array },
    lineChartHidden: { type: Boolean },
    lineData: { type: Array },
    barChartHidden: { type: Boolean },
    barData: { type: Array },
    analysisListData: { type: Array }
  },

  created() {},
  data: () => ({
    tempEstateData: [
      {
        linkerName: '我是测试',
        city: '广东',
        county: '深圳',
        linkerTags: ['活好', '乖巧', 'but poor'],
        price: 10000,
        priceUnit: 2000,
        linkerUrl: 'http://dummyimage.com/250x250'
      },
      {
        linkerName: '我是测试',
        city: '广东',
        county: '深圳',
        linkerTags: ['活好', '乖巧', 'but poor'],
        price: 10000,
        priceUnit: 2000,
        linkerUrl: 'http://dummyimage.com/250x250'
      },
      {
        linkerName: '我是测试',
        city: '广东',
        county: '深圳',
        linkerTags: ['活好', '乖巧', 'but poor'],
        price: 10000,
        priceUnit: 2000,
        linkerUrl: 'http://dummyimage.com/250x250'
      }
    ]
  }),
  components: {
    PieChart,
    LineChart,
    BarChart,
    TagGroup,
    EstateItem,
    CustomOperation
  }
}
</script>
<style lang="less">
.custom-detail-analyze {
  .pie-container,
  .line-container,
  .bar-container {
    width: 335px;
    margin: 20px;
    .chart-title {
      padding: 15px 15px 0;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      line-height: 22px;
    }
    .chart-desc {
      padding: 0 15px 15px;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
    }
  }
  .purchase-intention {
    position: relative;
    margin: 0 20px;
    padding: 15px;
    .purchase-title {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      padding-bottom: 10px;
    }
    .purchase-info-box {
      > p,
      > div {
        line-height: 1.8;
      }
      > p {
        font-size: 15px;
        font-weight: 400;
        color: #333333;
        > span {
          width: 45px;
          font-size: 15px;
          font-weight: 400;
          color: #8a8f99;
        }
      }
      .preferences {
        display: flex;
        font-size: 15px;
        font-weight: 400;
        color: #8a8f99;
        > span {
          width: 45px;
        }
        > div {
          display: inline-block;
        }
      }
    }
  }
  .interest-desc {
    margin: 0 15px;
    font-size: 12px;
  }
}
</style>
