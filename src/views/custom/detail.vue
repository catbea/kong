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
            :attentionFlag="attentionFlag" :clientMobile="clientMobile"
            @onattention="attentionHandler" @onreport="reportHandler" @onphone="phoneHandler" @onconsult="consultHandler"
          />
        </van-tab>
        <van-tab title="足迹">
          <custom-detail-track 
            :trackInfo="trackInfo" :trackList="trackList" />
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
import { mapGetters } from 'vuex'
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
    isSecondReq: false, // 足迹页签是否请求成功
    isThirdReq: false, // 资料页签是否请求成功
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
    trackInfo: [],
    trackCurrent: 1,
    trackList: [],
    customerInfo: [],
    attentionFlag: false,
    clientMobile: ''
  }),
  computed: {
    ...mapGetters(['reportAddInfo'])
  },
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
    onClick() {
      console.log(this.activeIndex)
      if (this.activeIndex == 1 && this.isSecondReq == false) {
        this.getCustomerDynamicCount(this.clientId)
        this.getCustomerDynamicList(this.clientId, this.trackCurrent, this.size)
        this.isSecondReq = true
      }else if (this.activeIndex == 2 && this.isThirdReq == false) {
        this.getCustomerInfo(this.clientId)
        this.isThirdReq = true
      }
    },
    attentionHandler() {
      this.attentionFlag = !this.attentionFlag
      let params = {
        clientId: this.clientId,
        isFollow: this.attentionFlag ? 0 : 1
      }
      this.updateCustomerInfo(params)
      
    },
    reportHandler() {
      let _reportAddInfo = {
          clientId: this.clientId,
          clientName: this.customBaseInfo.clientName,
          clientPhone: this.clientMobile,
          distributorId: this.customBaseInfo.distributorId,
          institutionId: this.customBaseInfo.institutionId
        }
      this.$store.dispatch('reportAddInfo', Object.assign(this.reportAddInfo, _reportAddInfo))
      this.$router.push('/user/myReport/addReport')
    },
    phoneHandler() {
      
    },
    consultHandler() {
      
    },
    /**
     * 客户基本信息以及购房意向度
     */
    async getCustomBaseInfo(id) {
      const result = await CustomService.getClientInfo(id)
      this.customBaseInfo = result
      let tag = result.intentionProjectTag
      this.intentionProjectTag = tag.split('|')
      this.attentionFlag = result.attentionStatus == 1 ? false : true
      this.clientMobile = result.clientMobile
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
        let percents = [Number(Number(result.vo.mpxqll / total).toFixed(2)), Number(Number(result.vo.lpxqll / total).toFixed(2)), Number(Number(result.vo.llzuxq / total).toFixed(2))]
        for (let i = 0; i < 3; i++) {
          let llzuxq = {}
          llzuxq.name = titles[i]
          llzuxq.percent = percents[i]
          llzuxq.a = '1'
          llzuxq.color = colors[i]
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
        for (let i = 0, len = result.vo.length; i < len; i++) {
          let item = {}
          item.time = result.vo[i].day
          item.count = result.vo[i].total
          item.a = '1'
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
        let types = { mpxqll: '名片', lpxqll: '楼盘', llzuxq: '文章', im: '聊天' }
        for (var key in types) {
          let item = {}
          item.type = types[key]
          item.count = result.vo[key]
          item.shadow = 100
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
      } else {
        this.analysisListData = result.records
      }
      if (result.pages <= this.current) {
        this.finished = true
      } else {
        this.current++
      }
      this.loading = false
    },
    /**
     * 客户详情-足迹-足迹访问统计
     */
    async getCustomerDynamicCount(id) {
      const result = await CustomService.getCustomerDynamicCount(id)
      let info = {
        allViewNum: '总浏览数',
        cardViewNum: '名片浏览',
        linkerViewNum: '楼盘浏览',
        articleViewNum: '文章浏览'
      }
      let trackInfo = []
      for (var key in info) {
        var item = {}
        item.key = info[key]
        item.value = result[key]
        trackInfo.push(item)
      }
      this.trackInfo = trackInfo
    },
    /**
     * 客户详情-足迹-足迹列表
     */
    async getCustomerDynamicList(id, current, size) {
      const result = await CustomService.getCustomerDynamicList(id, current, size)
      if (this.trackCurrent > 1) {
        this.trackList = this.trackList.concat(result.records)
      } else {
        this.trackList = result.records
      }
    },
    /**
     * 客户详情-资料
     */
    async getCustomerInfo(id) {
      const result = await CustomService.getCustomerInfo(id)
      let info = {
        remarkName: '备注名称',
        sex: '性别',
        age: '年龄',
        position: '位置',
        phone: '手机号',
        source: '来源',
        income: '收入',
        industry: '行业',
        buyBuildingPurpose: '购房目的'
      }
      let customerInfo = []
      for (var key in info) {
        var item = {}
        item.key = info[key]
        item.value = result[key]
        customerInfo.push(item)
      }
      console.log(customerInfo)
      this.customerInfo = customerInfo
    },

    /**
     * 更新客户资料信息
     */
    async updateCustomerInfo(params) {
      const result = await CustomService.updateCustomerInfo(params)
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
