<template>
  <div class="custom-detail">
    <div class="custom-info-box">
      <avatar class="custom-avatar" v-if="customBaseInfo.avatarUrl!=''" :avatar="customBaseInfo.avatarUrl"></avatar>
      <div class="custom-info">
        <div class="custom-name-box">
          <h5 class="custom-name">{{customBaseInfo.clientName}}</h5>
          <van-icon name="edit" size="24px"/>
        </div>
        <p class="custom-browsed">最近浏览：{{customBaseInfo.lastViewTime}}</p>
      </div>
    </div>
    <div class="custom-analyze-box">
      <van-tabs
        v-model="activeIndex"
        color="#007AE6"
        :line-width="15"
        :swipe-threshold="6"
        @click="onClick"
      >
        <van-tab title="分析">
          <custom-detail-analyze
            :baseInfo="customBaseInfo"
            :tempTagData="intentionProjectTag"
            v-if="isPieDataReqOk"
            :pieChartHidden="pieChartHidden"
            :pieData="pieData"
            :lineChartHidden="lineChartHidden"
            :lineData="lineData"
            :barChartHidden="barChartHidden"
            :barData="barData"
            :analysisListData="analysisListData"
          />
        </van-tab>
        <van-tab title="足迹">
          <custom-detail-track/>
        </van-tab>
        <van-tab title="资料">
          <custom-detail-info/>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import Avatar from 'COMP/Avatar'
import CustomDetailAnalyze from 'COMP/Custom/CustomDetailAnalyze'
import CustomDetailTrack from 'COMP/Custom/CustomDetailTrack'
import CustomDetailInfo from 'COMP/Custom/CustomDetailInfo'

import CustomService from 'SERVICE/customService'

export default {
  components: {
    Avatar,
    CustomDetailAnalyze,
    CustomDetailTrack,
    CustomDetailInfo
  },
  data: () => ({
    clientId: -1,
    activeIndex: 0,
    customBaseInfo: null,
    intentionProjectTag: [],
    isPieDataReqOk: false,
    pieChartHidden: false,
    pieData: [],
    isLineDataReqOk: false,
    lineChartHidden: false,
    lineData: [],
    barChartHidden: false,
    barData: [],
    analysisListData: [],
    loading: false,
    finished: false,
    current: 1,
    size: 10,
  }),
  created() {
    this.clientId = this.$route.params.id
    this.getCustomBaseInfo(this.clientId)
    this.getCustomPieChart(this.clientId)
    this.getCustomerSevenDayTrendChart(this.clientId)
    this.getCustomerBarChart(this.clientId)
    this.getCustomerBuildingAnalysisList(this.clientId, this.current, this.size)
  },
  methods: {
    /**
     * 切换tab
     */
    onClick() {},
    /**
     * 客户基本信息以及购房意向度
     */
    async getCustomBaseInfo(id) {
      const result = await CustomService.getClientInfo(id)
      this.customBaseInfo = result
      let tag = result.intentionProjectTag
      this.intentionProjectTag = tag.split('|')
    },
    /**
     * 客户详情报表饼图
     */
    async getCustomPieChart(id) {
      const result = await CustomService.getCustomerPieChart(id)
      this.pieChartHidden = result.display == 'hide' ? true : false
      if (this.pieChartHidden == false) {
        let pieData = []
        let titles = ['我', '楼盘', '文章']
        let colors = ['#2f7bdf', '#5a9be0', '#7eace1']
        let total = result.vo.llzuxq + result.vo.lpxqll + result.vo.mpxqll
        let percents = [Number(Number(result.vo.mpxqll/total).toFixed(2)), Number(Number(result.vo.lpxqll/total).toFixed(2)), Number(Number(result.vo.llzuxq/total).toFixed(2))]
        for (let i = 0; i < 3; i++) {
          let llzuxq = {};
          llzuxq.name = titles[i];
          llzuxq.percent = percents[i];
          llzuxq.a = '1';
          llzuxq.color = colors[i];
          pieData.push(llzuxq)
        }
        console.log(pieData)
        this.pieData = pieData
      }
      this.isPieDataReqOk = true
    },
    /**
     * 客户详情报表7天趋势图
     */
    async getCustomerSevenDayTrendChart(id) {
      const result = await CustomService.getCustomerSevenDayTrendChart(id)
      this.lineChartHidden = result.display == 'hide' ? true : false
      if (this.lineChartHidden == false) {
        let lineData = []
        let times = []
        let counts = []
        for (let i = 0,len=result.vo.length; i < len; i++) {
          let item = {};
          item.time = result.vo[i].day;
          item.count = result.vo[i].total;
          item.a = '1';
          lineData.push(item)
        }
        console.log(lineData)
        this.lineData = lineData
      }
    },
    /**
     * 客户详情报表条形图
     */
    async getCustomerBarChart(id) {
      const result = await CustomService.getCustomerBarChart(id)
      this.barChartHidden = result.display == 'hide' ? true : false
      if (this.barChartHidden == false) {
        let barData = []
        let types = {'mpxqll': '名片', 'lpxqll': '楼盘', 'llzuxq': '文章', 'im': '聊天'}
        for (var key in types) {
          let item = {};
          item.type = types[key];
          item.count = result.vo[key];
          item.shadow = 100;
          barData.push(item)
        }
        console.log(barData)
        this.barData = barData
      }
    },
    /**
     * 客户详情-楼盘分析分页列表
     */
    async getCustomerBuildingAnalysisList(id, current, size) {
      const result = await CustomService.getCustomerBuildingAnalysisList(id, current, size)
      if (this.current > 1) {
        this.analysisListData = this.analysisListData.concat(result.records)
      }else {
        this.analysisListData = result.records
      }
      if (result.pages <= this.current) {
        this.finished = true
      } else {
        this.current++
      }
      this.loading = false
    },
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
  }
}
</style>
