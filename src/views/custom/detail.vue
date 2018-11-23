<template>
  <div class="custom-detail">
    <div class="custom-info-box">
      <avatar class="custom-avatar"></avatar>
      <div class="custom-info">
        <div class="custom-name-box">
          <h5 class="custom-name">Susan Hall</h5>
          <van-icon name="edit" size="24px" />
        </div>
        <p class="custom-browsed">最近浏览：2018/05/22 22:08</p>
      </div>
    </div>
    <div class="custom-analyze-box">
      <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6">
        <van-tab title="分析"></van-tab>
        <van-tab title="足迹"></van-tab>
        <van-tab title="资料"></van-tab>
      </van-tabs>
      <div class="shadow_box pie-container">
        <h5 class="chart-title">客户兴趣占比</h5>
        <pie-chart></pie-chart>
        <p class="chart-desc">该客户还未有感兴趣的楼盘，请再接再厉多多 推荐，掌握客户的购房意向吧~</p>
      </div>
      <div class="shadow_box line-container">
        <h5 class="chart-title">近7日活跃度</h5>
        <line-chart></line-chart>
        <p class="chart-desc">该客户即将失联，请持续分享活动、名片和楼盘 召唤TA吧~</p>
      </div>
      <div class="shadow_box bar-container">
        <h5 class="chart-title">查看次数统计</h5>
        <bar-chart></bar-chart>
        <p class="chart-desc">该客户默默关注你好久了，不去打声招呼吗~</p>
      </div>
      <div class="shadow_box purchase-intention">
        <h5 class="purchase-title">买房意向</h5>
        <div class="purchase-info-box">
          <p><span>区域:</span>龙华新区</p>
          <p><span>户型:</span>三室</p>
          <p><span>总价:</span>500-600万</p>
          <p><span>关注:</span>暂不明确</p>
          <div class="preferences"><span>偏好:</span>
            <tag-group :arr="tempTagData"></tag-group>
          </div>
        </div>
      </div>
      <div>
        <estate-item v-for=""></estate-item>
      </div>
      
    </div>
  </div>
</template>
<script>
import Avatar from 'COMP/Avatar'
import PieChart from 'COMP/Custom/Charts/PieChart'
import LineChart from 'COMP/Custom/Charts/LineChart'
import BarChart from 'COMP/Custom/Charts/BarChart'
import TagGroup from 'COMP/TagGroup'
import EstateItem from 'COMP/EstateItem'
import CustomService from 'SERVICE/customService'

export default {
  components: {
    Avatar,
    PieChart,
    LineChart,
    BarChart,
    TagGroup,
    EstateItem
  },
  data: () => ({
    id: -1,
    customBaseInfo: null,
    activeIndex: 0,
    tempTagData: ['地铁房', '高端社区', '商务区'],
    tempEstateData:[
      
    ]
  }),
  created () {
    this.id = this.$route.params.id
    this.getCustomBaseInfo(this.id)
  },
  methods: {
    async getCustomBaseInfo (id) {
      const result = await CustomService.getClientInfo(id)
      this.customBaseInfo = result
    }
  }
}
</script>
<style lang="less">
.custom-detail {
  background: #f7f9fa;
  .custom-info-box {
    background: #fff;
    margin-bottom: 10px;
    display: flex;
    .custom-avatar {
      width: 60px;
      height: 60px;
      margin: 15px;
    }
    .custom-info {
      margin: 20px 15px 15px 0;
      .custom-name-box {
        display: flex;
        .custom-name {
          font-size: 18px;
          font-weight: 500;
          color: #333333;
        }
      }
      .custom-browsed {
        font-size: 13px;
        font-weight: 400;
        color: #999999;
      }
    }
  }
  .custom-analyze-box {
    background: #fff;
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
        >p ,>div {
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
  }
}
</style>

