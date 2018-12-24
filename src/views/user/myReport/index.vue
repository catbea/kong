
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
                <span class="container-list container-list-left">
                  代理商
                  <span class="container-list-title">{{item.distributorName}}</span>
                </span>
                <span class="container-list-right">{{reportStatusInfo[item.fillingStatus]}}</span>
              </p>
              <p class="container-list">
                <span class="container-list">
                  报备时间
                  <span class="container-list-title">{{item.fillingTime}}</span>
                </span>
                <span class="container-list-botton" @click="reportInfo(item)">查看详情</span>
              </p>
            </div>
            <p class="container-list" v-if="item.latestTime">
              报备确认
              <span class="container-list-title container-discount">{{item.latestTime}}</span>
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
      nullIcon: require('IMG/user/empty_report@2x.png'),
      nullcontent: '您还没有任何报备信息',
      reportList: [],
      reportStatusInfo: {
        '0': '待确认',
        '1': '报备成功',
        '2': '报备失败',
        '3': '审核中 '
      },
      loading: false,
      finished: false,
      current: 1,
      haveData: true
    }
  },
  created() {},
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
        for (var i in this.reportList) {
          let item = this.reportList[i]
          let times = []
          times.push(Number(item.arriveTime))
          times.push(Number(item.confirmTime))
          times.push(Number(item.contractTime))
          times.push(Number(item.fillingAuditingTime))
          times.push(Number(item.fillingFailTime))
          times.push(Number(item.fillingTime))
          times.push(Number(item.followingTime))
          times.push(Number(item.giveUpTime))
          times.push(Number(item.recognizeTime))
          times.push(Number(item.settledCommissionTime))
          times.push(Number(item.subscribedTime))
          times.push(Number(item.waitingConfirmTime))
          times = this.selectionSort(times)
          item.fillingTime = timeUtils.fmtDate(item.fillingTime)
          item.latestTime = timeUtils.fmtDate(times[times.length - 1])
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
    // 选择排序
    selectionSort(times) {
      var len = times.length
      var minIndex, temp
      for (var i = 0; i < len - 1; i++) {
        minIndex = i
        for (var j = i + 1; j < len; j++) {
          if (times[j] < times[minIndex]) {
            //寻找最小的数
            minIndex = j //将最小数的索引保存
          }
        }
        temp = times[i]
        times[i] = times[minIndex]
        times[minIndex] = temp
      }
      return times
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
