<template>
  <div class="custom-detail-analyze">
    <div class="shadow_box pie-container" v-if="!pieChartHidden">
      <h5 class="chart-title">客户兴趣占比</h5>
      <pie-chart v-if="pieData.length" :pieData="pieData"></pie-chart>
      <div class="chart-bottom">
        <div class="chart-list" v-for="(item, index) in pieData" :key="index">
          <div class="chart-dot" :style="{backgroundColor:item.color}"></div>
          <div class="chart-right">
            <div class="chart-name">{{item.name}}</div>
            <div class="chart-count">{{item.count}}</div>
          </div>
        </div>
      </div>
      <p class="chart-desc">该客户还未有感兴趣的楼盘，请再接再厉多多推荐，掌握客户的购房意向吧~</p>
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
      <div class="purchase-title-wrap">
        <h5 class="purchase-title">买房意向</h5>
        <span class="browse-count">{{baseInfo&&baseInfo.browseCount}}次查看</span>
      </div>
      <div class="purchase-info-box">
        <p>
          <span>区域:</span>
          {{baseInfo&&baseInfo.intentionArea}}
        </p>
        <p>
          <span>户型:</span>
          {{baseInfo&&baseInfo.intentionHouseType}}
        </p>
        <p>
          <span>总价:</span>
          {{baseInfo&&baseInfo.intentionPrice}}
        </p>
        <p>
          <span>关注:</span>
          {{baseInfo&&(baseInfo.intentionDemand ===''?'暂无数据':baseInfo.intentionDemand)}}
        </p>
        <div class="preferences">
          <span>偏好:</span>
          <tag-group :arr="tempTagData"></tag-group>
        </div>
      </div>
    </div>
    <div class="list">
      <analyze-item v-for="(item,index) in analysisListData" :key="index" :info="item" :progress="analysisListData.progress" :color="analysisListData.color" :textColor="analysisListData.textColor" @renew="renewHandler(item)"></analyze-item>
    </div>
  </div>
</template>
<script>
import PieChart from 'COMP/Custom/Charts/PieChart'
import LineChart from 'COMP/Custom/Charts/LineChart'
import BarChart from 'COMP/Custom/Charts/BarChart'
import TagGroup from 'COMP/TagGroup'
import AnalyzeItem from 'COMP/Custom/CustomDetailAnalyzeItem'
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
    analysisListData: { type: Array },
    attentionFlag: { type: Boolean, default: false },
    clientMobile: { type: String, default: '' }
  },

  created() {},
  data: () => ({}),
  methods: {
    attentionHandler() {
      this.$emit('onattention', this.attentionFlag)
    },
    reportHandler() {
      this.$emit('onreport')
    },
    phoneHandler() {
      this.$emit('onphone')
    },
    consultHandler() {
      this.$emit('onconsult')
    },
    renewHandler(item) {
      this.$emit('renew', item)
    }
  },
  components: {
    PieChart,
    LineChart,
    BarChart,
    TagGroup,
    AnalyzeItem
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
    .chart-bottom {
      width: 80%;
      margin: 16px auto 24px auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      .chart-list {
        width: 30%;
        display: flex;
        flex-direction: row;
        .chart-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 2px;
          margin-right: 4px;
        }
        .chart-right {
          display: flex;
          flex-direction: column;
          .chart-name {
            color: #333333;
            font-size: 12px;
            margin-bottom: 4px;
          }
          .chart-count {
            color: #666666;
            font-size: 12px;
          }
        }
      }
      .chart-list:first-child {
        justify-content: flex-start;
      }
      .chart-list:last-child {
        justify-content: flex-end;
      }
      .chart-list:nth-child(2) {
        justify-content: center;
      }
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
    margin: 20px 20px 0 20px;
    padding: 15px;
    .purchase-title-wrap {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .purchase-title {
        font-size: 16px;
        font-weight: 600;
        color: #333333;
        padding-bottom: 10px;
      }
      .browse-count {
        color: #999;
        font-size: 12px;
      }
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
  .list {
    margin-bottom: 80px;
  }
  .interest-desc {
    margin: 0 15px;
    font-size: 12px;
  }
}
</style>
