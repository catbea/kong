<template>
  <div class="custom-detail">
    <div class="custom-info-box" v-if="customBaseInfo">
      <avatar class="custom-avatar" :avatar="customBaseInfo.clientAvatarUrl" @click.native="previewAvatarUrl"/>
      <div class="bg_img custom-attention" :style="{backgroundImage:'url('+attentionImg+')'}" v-if="attentionFlag"></div>
      <div class="custom-info">
        <div class="custom-name-box">
          <h5 class="custom-name">{{customBaseInfo.remarkName ? customBaseInfo.remarkName : customBaseInfo.clientName}}</h5>
          <div class="custome-realname" v-if="customBaseInfo.remarkName">({{customBaseInfo.clientName}})</div>
        </div>
        <p class="custom-browsed">最近浏览：{{customBaseInfo&&customBaseInfo.lastViewTime}}</p>
      </div>
    </div>
    <div class="custom-analyze-box">
      <van-tabs v-model="activeIndex" sticky color="#007AE6" :line-width="15" :swipe-threshold="6" @click="onClick">
        <van-tab title="足迹">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <custom-detail-track :trackInfo="trackInfo" :trackList="trackList"/>
          </van-list>
        </van-tab>
        <van-tab title="分析">
          <custom-detail-analyze :baseInfo="customAnalyzeInfo" :tempTagData="intentionProjectTag" v-if="isPieDataReqOk" :pieChartHidden="pieChartHidden" :pieData="pieData" :lineChartHidden="lineChartHidden" :lineData="lineData" :barChartHidden="barChartHidden" :barData="barData" :analysisListData="analysisListData" @renew="renewHandler"/>
          <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="'没有更多了'"
              @load="getCustomerBuildingAnalysisList">
            <div class="list">
              <analyze-item v-for="(item,index) in analysisListData" :key="index" :info="item" :progress="analysisListData.progress" :color="analysisListData.color" :textColor="analysisListData.textColor" @renew="renewHandler(item)"></analyze-item>
            </div>
          </van-list>
        </van-tab>
        <van-tab title="资料">
          <custom-detail-info @onClick="onClickHandler" :customerInfoList="customerInfoList" :areaShow="areaShow" :areaTitle="areaTitle" :pickerShow="pickerShow" :columns="pickerList" @cancel="cancelHandler" @confirm="confirmHandler"/>
        </van-tab>
      </van-tabs>
      <custom-operation v-show="showActionBar" :h5Flag="customBaseInfo&&customBaseInfo.h5Flag" :attentionFlag="attentionFlag" :clientMobile="clientMobile" @onattention="attentionHandler" @onreport="reportHandler" @onphone="phoneHandler" @onconsult="consultHandler"/>
    </div>
  </div>
</template>
<script>
import Avatar from 'COMP/Avatar'
import timeUtils from '@/utils/timeUtils'
import * as types from '@/store/mutation-types'
import CustomDetailAnalyze from 'COMP/Custom/CustomDetailAnalyze'
import CustomDetailTrack from 'COMP/Custom/CustomDetailTrack'
import CustomDetailInfo from 'COMP/Custom/CustomDetailInfo'
import CustomOperation from 'COMP/Custom/CustomOperation.vue'
import CustomService from 'SERVICE/customService'
import AnalyzeItem from 'COMP/Custom/CustomDetailAnalyzeItem'
import { ImagePreview } from 'vant'
export default {
  components: {
    Avatar,
    CustomDetailAnalyze,
    CustomDetailTrack,
    CustomDetailInfo,
    CustomOperation,
    AnalyzeItem
  },
  data: () => ({
    attentionImg: require('IMG/user/icon_attention@2x.png'),
    clientId: -1,
    activeIndex: 0,
    isSecondReq: false, // 足迹页签是否请求成功
    isThirdReq: false, // 资料页签是否请求成功
    customBaseInfo: null, // 客户资料 头部尾部信息
    customAnalyzeInfo: null, // 客户分析信息
    intentionProjectTag: [], // 偏好
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
    trackInfo: [], // 足迹头部数量
    trackCurrent: 1,
    trackList: [], // 足迹列表
    customerInfoList: [],
    attentionFlag: false,
    clientMobile: '',
    selectItem: null, // 资料tab选择的是哪一项资料
    selectIndex: null, // 资料tab选择的是哪一项资料index
    areaShow: false, // 省市区是否显示
    areaCode: '440305', // 默认显示省市区位置code
    areaTitle: '',
    pickerShow: false,
    pickerList: null,
    showActionBar: ''
  }),
  computed: {},
  watch: {
    areaShow(val) {
      this.$emit('update:show', val)
    },
    show(val) {
      this.areaShow = val
    }
  },
  created() {
    this.clientId = this.$route.params.id
    this.getCustomerInfo(this.clientId)
    this.activeIndex = window.localStorage.getItem('activeIndex') == 2 ? 2 : 0
    window.localStorage.setItem('activeIndex', 0)
    this.onClick()
    window.localStorage.removeItem('activeIndex')
    // this.queryClientFlag()
  },
  methods: {
    // 查询客户关系
    // async queryClientFlag () {
    //   let result = await CustomService.queryClientFlag({clientId: this.clientId})
    //   if (result) {
    //     this.showActionBar = result.clientDelFlag !== 2
    //   }
    // },
    /**
     * 切换tab
     */
    onClick() {
      this.finished = false
      document.querySelector('.router-view').scrollTop = '0px'
      if (this.activeIndex == 0) {
        // 足迹
        this.trackCurrent = 1
        this.getCustomerDynamicCount(this.clientId)
        this.onLoad()
      } else if (this.activeIndex == 1 && this.isSecondReq == false) {
        // 分析
        this.current = 1
        this.getCustomAnalyzeInfo(this.clientId)
        this.getCustomPieChart(this.clientId)
        this.getCustomerSevenDayTrendChart(this.clientId)
        this.getCustomerBarChart(this.clientId)
        // this.getCustomerBuildingAnalysisList(this.clientId, this.current, this.size)
        this.isSecondReq = true
      } else if (this.activeIndex == 2 && this.isThirdReq == false) {
        // 资料
        // this.getCustomerInfo(this.clientId)
        this.isThirdReq = true
      }
    },
    attentionHandler(flag) {
      this.attentionFlag = !this.attentionFlag
      let params = {
        clientId: this.clientId,
        isFollow: this.attentionFlag ? 0 : 1
      }
      if (this.attentionFlag) {
        this.$toast('关注成功')
      } else {
        this.$toast('取消关注成功')
      }
      this.updateCustomerInfo(params)
    },
    reportHandler() {
      // 报备失败
      if(false) {
        return this.$dialog.alert({
          title: '提示',
          message: '非合作楼盘，无渠道可选，报备失败！'
        })
      }
      let _reportAddInfo = {
        clientId: this.clientId,
        clientName: this.customBaseInfo.clientName,
        clientPhone: this.clientMobile,
        distributorId: this.customBaseInfo.distributorId,
        institutionId: this.customBaseInfo.institutionId
      }

      this.$store.commit(types.REPORT_INFO, _reportAddInfo)
      this.$router.push('/user/myReport/addReport')
    },
    phoneHandler() {
      window.location.href = 'tel:' + this.clientMobile
    },
    consultHandler() {
      this.$router.push({
        path: '/custom/message/message',
        query: {
          clientId: this.clientId
        }
      })
    },
    previewAvatarUrl() {
      if (this.customBaseInfo.clientAvatarUrl != '') {
        ImagePreview({
          images: [this.customBaseInfo.clientAvatarUrl],
          startPosition: 0
        })
      }
    },
    // 立即续费
    renewHandler(val) {
      if (val.sameDistributor == '0') {
        this.$dialog
          .alert({
            title: '该楼盘不可续费',
            message: '非当前所属公司下楼盘无法开通续费',
            confirmButtonText: '知道啦'
          })
          .then(() => {
            // on close
          })
      } else {
        // this.$router.push(`/marketDetail/open${val.linkerId}`)
        this.$router.push({ name: 'marketDetail-open', params: { id: val.linkerId } })
      }
    },
    /**
     * 资料tab 点击事件
     */
    onClickHandler(object) {
      let item = object.item
      this.selectItem = object.item
      this.selectIndex = object.index
      this.areaTitle = object.item.title
      if (item.title == '来源') {
        return
      }
      if (item.title == '备注名称') {
        let params = {
          clientId: this.clientId,
          remarkName: this.customerInfoList[0].content == '暂无' ? '' : this.customerInfoList[0].content
        }
        window.localStorage.setItem('activeIndex', 2)
        this.$router.push({ path: '/custom/edit/remarkName', query: params })
      } else if (item.title == '手机号') {
        let params = {
          clientId: this.clientId,
          phone: this.customerInfoList[4].content == '暂无' ? '' : this.customerInfoList[4].content
        }
        window.localStorage.setItem('activeIndex', 2)
        this.$router.push({ path: '/custom/edit/phone', query: params })
      } else if (item.title == '位置') {
        this.areaShow = !this.areaShow
      } else if (item.title == '来源') {
      } else {
        this.pickerShow = !this.pickerShow
        if (item.title == '性别') {
          this.pickerList = ['男', '女']
        } else if (item.title == '年龄') {
          this.pickerList = ['65以上', '50-65岁', '41-50岁', '31-40岁', '19-30岁', '18以下']
        } else if (item.title == '收入') {
          this.pickerList = ['未知', '月薪3000以下', '月薪3000-5000', '月薪5000-8000', '月薪8000-12000', '月薪12000-15000', '月薪15000-30000', '月薪3W以上']
        } else if (item.title == '行业') {
          this.pickerList = ['未知', 'IT/通信/互联网', '学生', '文化/艺术', '影视/娱乐', '金融', '医药/健康', '工业/制造业', '媒体/公关', '零售', '教育/科研', '其它']
        } else if (item.title == '购房目的') {
          this.pickerList = ['未知', '学区房', '婚房', '工作换房', '投资', '安置老人', '改善型换房']
        }
      }
    },
    cancelHandler(val) {
      this.areaShow = false
      this.pickerShow = false
    },
    confirmHandler(val) {
      this.areaShow = false
      this.pickerShow = false
      if (this.selectItem.title == '位置') {
        this.customerInfoList[3].content = val[0].name + '/' + val[1].name + '/' + val[2].name
      } else {
        this.customerInfoList[this.selectIndex].content = val
      }
      let params = {
        clientId: this.clientId,
        sex: this.customerInfoList[1].content == '男' ? 1 : this.customerInfoList[1].content == '女' ? 2 : '', //  1：男 2：女
        age: this.customerInfoList[2].content == '暂无' ? '' : this.customerInfoList[2].content,
        position: this.customerInfoList[3].content == '暂无' ? '' : this.customerInfoList[3].content,
        income: this.customerInfoList[6].content == '暂无' ? '' : this.customerInfoList[6].content,
        industry: this.customerInfoList[7].content == '暂无' ? '' : this.customerInfoList[7].content,
        buyBuildingPurpose: this.customerInfoList[8].content == '暂无' ? '' : this.customerInfoList[8].content
      }
      this.updateCustomerInfo(params)
    },

    /**
     * 客户详情分析以及购房意向度
     */
    async getCustomAnalyzeInfo(id) {
      const result = await CustomService.getClientInfo(id)
      let tag = result.intentionProjectTag
      this.intentionProjectTag = tag.split('|')
      this.customAnalyzeInfo = result
    },
    /**
     * 客户详情报表饼图
     */
    async getCustomPieChart(id) {
      const result = await CustomService.getCustomerPieChart(id)
      this.pieChartHidden = result.display == 'hide' ? true : false
      if (this.pieChartHidden == false) {
        let pieData = []
        let titles = ['名片', '楼盘', '文章']
        let counts = [Number(result.vo.mpxqll), Number(result.vo.lpxqll), Number(result.vo.llzuxq)]
        let colors = ['#2f7bdf', '#5a9be0', '#7eace1']
        let total = result.vo.llzuxq + result.vo.lpxqll + result.vo.mpxqll
        let percents = [Number(Number(result.vo.mpxqll / total).toFixed(2)), Number(Number(result.vo.lpxqll / total).toFixed(2)), Number(Number(result.vo.llzuxq / total).toFixed(2))]
        for (let i = 0; i < 3; i++) {
          let llzuxq = {}
          llzuxq.name = titles[i]
          llzuxq.count = counts[i]
          llzuxq.percent = percents[i]
          llzuxq.a = '1'
          llzuxq.color = colors[i]
          pieData.push(llzuxq)
        }
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
          item.time = Number(result.vo[i].day)
          item.count = result.vo[i].total
          item.a = '1'
          lineData.push(item)
        }
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
        this.barData = barData
      }
    },
    /**
     * 客户详情-楼盘分析分页列表
     */
    async getCustomerBuildingAnalysisList() {
      let id = this.clientId
      let current = this.current
      let size = this.size
      const result = await CustomService.getCustomerBuildingAnalysisList(id, current, size)
      if (this.current > 1) {
        this.analysisListData =  this.analysisListData.concat(result.records)
      } else {
        this.analysisListData = result.records
      }
      for (var i in this.analysisListData) {
        var item = this.analysisListData[i]
        item.progress = Number(item.intentionality)
        let color
        if (item.progress >= Number(70)) {
          color = '#007AE6'
        } else {
          color = '#cccccc'
        }
        item.color = color
        item.textColor = color
        if (item.saleStatus == 0) {
          item.saleStr = '热销中'
        } else if (item.saleStatus == 1) {
          item.saleStr = '即将发售'
        } else {
          item.saleStr = '售罄'
        }
        if (item.shelfFlag == 0) {
          item.shelfStr = '上架'
        } else {
          item.shelfStr = '下架'
        }
        let tags = []
        let tag
        if (item.shelfFlag == 0) {
          tag = item.saleStr
        } else {
          tag = '下架'
        }
        if (item.projectTagArr && item.projectTagArr.length > 0) {
          item.projectTagArr.unshift(tag)
          tags = item.projectTagArr
          if (tags.length > 3) {
            tags.pop()
          }
        } else {
          tags.push(tag)
        }
        item.linkerTags = tags
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
    onLoad() {
      this.getCustomerDynamicList(this.clientId, this.trackCurrent)
    },
    /**
     * 客户详情-足迹-足迹列表
     */
    async getCustomerDynamicList(id, current) {
      const res = await CustomService.getCustomerDynamicList(id, current)

      if (this.trackCurrent > 1) {
        this.trackList = this.trackList.concat(res.records)
      } else {
        this.trackList = res.records
      }

      if (this.trackList.length > 0) {
        this.haveData = true
        if (res.pages === 0 || this.trackCurrent >= res.pages) {
          this.finished = true
        } else {
          this.trackCurrent++
        }
        this.loading = false
      } else {
        if (current == 1) {
          this.haveData = false
        } else {
          this.haveData = true
        }
        this.loading = false
        this.finished = true
      }
    },

    /**
     * 客户详情-资料
     */
    async getCustomerInfo(id) {
      const result = await CustomService.getCustomerInfo(id)
      this.customBaseInfo = result
      this.attentionFlag = result.isFollow == 1 ? false : true
      this.clientMobile = result.phone
      this.showActionBar = result.clientDelFlag !== 2
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
      let customerInfoList = []
      for (var key in info) {
        var item = {}
        item.title = info[key]
        item.content = result[key]
        if (item.title == '性别') {
          item.content = result[key].length == 0 ? '暂无' : result[key] == 2 ? '女' : '男'
        } else if (item.title == '来源') {
          item.content = result[key].length == 0 ? '暂无' : result[key] == 1 ? '分享' : '扫二维码'
        } else {
          item.content = result[key].length == 0 ? '暂无' : result[key]
        }
        customerInfoList.push(item)
      }
      this.customerInfoList = customerInfoList
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
      margin: 20px 16px 33px;
    }
    .custom-attention {
      width: 16px;
      height: 16px;
      position: absolute;
      left: 60px;
      top: 64px;
    }
    .custom-info {
      margin: 25px 15px 0 0;
      .custom-name-box {
        display: flex;
        .custom-name {
          font-size: 18px;
          font-weight: 500;
          color: #333333;
          line-height: 25px;
        }
        .custome-realname {
          color: #999999;
          font-size: 16px;
          padding-top: 3px;
        }
      }
      .custom-browsed {
        font-size: 13px;
        font-weight: 400;
        color: #999999;
        margin-top: 8px;
      }
    }
  }
  .custom-analyze-box {
    background: #fff;
  }
}
</style>
