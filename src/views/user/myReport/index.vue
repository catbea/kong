
<template>
  <div class="report-page" :style="{background:show==null?'#F7F9FA':'#FFFFFF'}">
    <!-- <Tips></Tips>#F7F9FA; -->
    <div class="report-container">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="'没有更多了'"
        @load="onLoad"
        v-if="haveData"
      >
        <shadow-box v-for="item in reportList" :key="item.id">
          <div slot="container" class="report-container-css">
            <div class="report-title">
              <p class="report-title-css">{{item.linkerName}} 报备单</p>
              <p class="container-list">
                报备楼盘
                <span class="container-list-title container-name">{{item.linkerName}}</span>
              </p>
              <p class="container-list">
                报备客户
                <span class="container-list-title container-spec">{{item.clientName}}</span>
              </p>
              <p class="container-list">
                <!-- <span class="container-list container-list-left">
                  代理商
                  <span class="container-list-title">{{item.distributorName}}</span>
                </span>
                <span class="container-list-right" style="margin-top:-30px;">{{reportStatusInfo[item.fillingStatus]}}</span> -->
                <span class="container-list-right" style="margin-top:-30px;">{{reportStatusInfo[item.reportStatus]}}</span>
              </p>
              <p class="container-list">
                <span class="container-list">
                  报备时间
                  <span class="container-list-title">{{item.createTime | dateTimeFormatter}}</span>
                </span>
                <span class="container-list-botton" @click="reportInfo(item)">查看详情</span>
              </p>
            </div>
            <p class="container-list" v-if="item.latestTime">
              {{reportTime[item.minIndex]}}
              <span
                class="container-list-title container-discount"
              >{{item.latestTime}}</span>
            </p>
          </div>
        </shadow-box>
      </van-list>
      <div v-if="!haveData">
        <null :nullIcon="nullIcon" :nullcontent="nullcontent"></null>
      </div>
    </div>
    <div class="report-div-btn">
      <button class="report-btn" @click="addReport">创建报备</button>
    </div>
  </div>
</template>
<script>
import ShadowBox from 'COMP/ShadowBox'
import Null from 'COMP/Null'
import timeUtils from '@/utils/timeUtils'
import reportService from 'SERVICE/reportService'
export default {
  components: {
    Null,
    ShadowBox
  },

  data() {
    return {
      show: 1,
      item: [],
      nullIcon: require('IMG/user/no_report.png'),
      nullcontent: '您还没有任何报备信息',
      reportList: [],
      // reportStatusInfo: {
      //   '0': '待确认',
      //   '1': '报备成功',
      //   '2': '报备失败',
      //   '3': '审核中 '
      // },
      reportStatusInfo: {
        '0': '未到访',
        '1': '已到访', 
        '2': '已认筹',
        '3': '已认购',
        '4': '已签约',
        '5': '已结佣',
        '6': '已放弃',
      },
      reportTimeDict: {
        arriveTime: '到访时间',
        confirmTime: '报备确认时间',
        contractTime: '签约时间',
        fillingAuditingTime: '报备审核中时间',
        fillingFailTime: '报备失败时间',
        // fillingTime: '报备时间', // 报备申请提交时间不计入最新时间判断
        followingTime: '待跟进时间',
        giveUpTime: '放弃时间',
        recognizeTime: '认筹时间',
        settledCommissionTime: '结佣时间',
        subscribedTime: '认购时间',
        waitingConfirmTime: '报备待确认时间'
      },
      reportTime: null,
      loading: false,
      finished: false,
      current: 1,
      haveData: true
    }
  },
  created() {
  },
  methods: {
    /**
     * 上拉加载更多
     */
    onLoad() {
      this.getReportList(this.current)
    },
    async getReportList(current) {
      const res = await reportService.reportList(current)
      if (res.records.length > 0) {
        this.reportList = this.reportList.concat(res.records)
        if (this.reportList.length > 0) {
          this.haveData = true
        } else {
          this.haveData = false
        }
        this.reportTime = this.getValues(this.reportTimeDict)
        for (var i in this.reportList) {
          let item = this.reportList[i]
          let times = []
          let selectTime = []
          for (var key in this.reportTimeDict) {
            times.push(Number(item[key]))
          }
          selectTime = this.copyArray(times)
          this.selectionSort(times)
          item.fillingTime = timeUtils.fmtDate(item.fillingTime)
          if (times[times.length - 1] > 0) {
            item.latestTime = timeUtils.fmtDate(times[times.length - 1])
          }
          item.minIndex = selectTime.indexOf(Math.max.apply(Math, selectTime))
        }

        if (res.pages === 0 || this.page === res.pages) {
          this.finished = true
        }
        this.current++
        this.loading = false
      } else {
        if (current == 1) {
          this.haveData = false
        }
        this.loading = false
        this.finished = true
      }
    },
    // 数组的浅拷贝
    copyArray(arr) {
      var result = []
      result = arr.concat()
      return result
    },
    // 获取values
    getValues(obj) {
      var values = []
      for (var pro in obj) {
        values.push(obj[pro])
      }
      return values
    },

    // 选择排序 从低到高
    selectionSort(arr) {
      var len = arr.length
      var minIndex, temp
      for (var i = 0; i < len - 1; i++) {
        minIndex = i
        for (var j = i + 1; j < len; j++) {
          if (arr[j] < arr[minIndex]) {
            //寻找最小的数
            minIndex = j //将最小数的索引保存
          }
        }
        temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
      }
      return arr
    },

    /**
     * 进入报备详情
     */
    reportInfo(item) {
      // this.$router.push(`/user/myReport/reportInfo/${id}`)
      this.$router.push({ path: '/user/myReport/reportInfo', query: item })
    },
    /**
     * 创建报备
     */
    addReport() {
      this.$router.push('/user/myReport/addReport')
    },
    itemProperties() {
      //跳转到动态详情item
      // this.$router.push('/dynamics/dynamicsInfo')
      this.$dialog
        .confirm({
          title: '暂未开通楼盘',
          message: '请开通后查看楼盘详细动态',
          confirmButtonText: '去开通'
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  filters: {
    // 格式化时间
    formatDate (val) {
      let date = ''
      if (val) {
        let time = new Date(+val)
        let m = time.getMonth() + 1
        let d = time.getDate()
        let y = time.getFullYear()
        let h = time.getHours()
        let M = time.getMinutes()
        m = m < 10 ? '0' + m : m
        d = d < 10 ? '0' + d :d
        h = h < 10 ? '0' + h :h
        M = M < 10 ? '0' + M :M
        date = `${y}/${m}/${d} ${h}:${M}`
      }
      return date
    }
  }
}
</script>
<style lang="less">
.report-page {
  > .report-container {
    width: 100%;
    margin: 16px 0;
    height: 80%;
    overflow: hidden;
    margin-bottom: 70px;
    .report-container-css {
      padding: 20px 16px;
      margin-bottom: 16px;
      > .report-title {
        font-size: 16px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        border-bottom: 1px solid #eeeeee;
        padding-bottom: 13px;
        margin-bottom: 10px;
        .report-title-css {
          margin-bottom: 7px;
        }
        > .report-title-price {
          float: right;
          font-size: 14px;
          font-weight: 600;
          color: rgba(234, 77, 46, 1);
          line-height: 20px;
          > .report-title-num {
            font-size: 20px;
          }
        }
      }
      .container-list {
        font-size: 14px;
        font-weight: 500;
        color: #333333;
        line-height: 30px;
        .container-list-right {
          font-size: 16px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
          float: right;
        }
        .container-list-botton {
          font-size: 12px;
          font-weight: 400;
          color: rgba(0, 122, 230, 1);
          background-color: white;
          line-height: 20px;
          width: 70px;
          height: 20px;
          border-radius: 22px;
          border: 1px solid;
          float: right;
          text-align: center;
        }
        .container-list-title {
          font-size: 14px;
          font-weight: 400;
          color: #666666;
          line-height: 20px;
          padding-left: 12px;
        }
      }
      .container-list-left {
        padding-left: 13px;
      }
    }
  }
  > .report-div-btn {
    width: 343px;
    position: fixed;
    bottom: 0;
    left: 16px;
    background-color: #ffffff;
    > .report-btn {
      font-size: 16px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      height: 44px;
      background: rgba(0, 122, 230, 1);
      border-radius: 6px;
      width: 100%;
      border: 0;
      margin-bottom: 19px;
    }
  }
}
</style>
