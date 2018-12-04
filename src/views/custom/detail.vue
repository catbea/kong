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
            :pieChartHidden="pieChartHidden"
            :pieData="pieData"
            v-if="isPieDataReqOk"
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
    pieData: []
  }),
  created() {
    this.clientId = this.$route.params.id
    this.getCustomBaseInfo(this.clientId)
    this.getCustomPieChart(this.clientId)
  },
  methods: {
    /**
     * 切换tab
     */
    onClick() {},
    /**
     * 获取基本信息以及购房意向度
     */
    async getCustomBaseInfo(id) {
      const result = await CustomService.getClientInfo(id)
      this.customBaseInfo = result
      let tag = result.intentionProjectTag
      this.intentionProjectTag = tag.split('|')
    },
    async getCustomPieChart(id) {
      const result = await CustomService.getCustomerPieChart(id)
      this.pieChartHidden = result.display == 'hide' ? false : true
      if (this.pieChartHidden == false) {
        let pieData = []
        let titles = ['文章', '楼盘', '我']
        let colors = ['#7eace1', '#5a9be0', '#2f7bdf']
        let total = result.vo.llzuxq + result.vo.lpxqll + result.vo.mpxqll
        let percents = [parseFloat(result.vo.llzuxq/total).toFixed(2), parseFloat(result.vo.lpxqll/total).toFixed(2), parseFloat(result.vo.mpxqll/total).toFixed(2)]
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
  }
}
</style>
