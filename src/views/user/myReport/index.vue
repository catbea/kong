
<template>
  <div class="report-page" :style="{background:show==null?'#F7F9FA':'#FFFFFF'}">
    <!-- <Tips></Tips>#F7F9FA; -->
    <div class="report-container">
      <van-list v-model="loading" :finished="finished" :finished-text="'没有更多了'" @load="onLoad" v-if="reportList">
        <shadow-box v-for="item in reportList" :key="item.id">
          <div slot="container" class="report-container-css">
            <div class="report-title">
              <p class="report-title-css">{{item.linkerName}} 报备单</p>
              <p class="container-list">报备楼盘
                <span class="container-list-title container-name">{{item.linkerName}}</span>
              </p>
              <p class="container-list">报备客户
                <span class="container-list-title container-spec">{{item.clientName}}</span>
              </p>
              <p class="container-list">
                <span class="container-list container-list-left">代理商
                  <span class="container-list-title">{{item.distributorName}}</span>
                </span>
                <span class="container-list-right">{{reportStatusInfo[item.fillingStatus]}}</span>
              </p>
              <p class="container-list">
                <span class="container-list">报备时间
                  <span class="container-list-title">{{item.fillingTime}}</span>
                </span>
                <botton class="container-list-botton" @click="reportInfo">查看详情</botton>
              </p>
            </div>
            <p class="container-list">报备确认
              <span class="container-list-title container-discount">{{item.waitingConfirmTime}}</span>
            </p>
          </div>
        </shadow-box>
      </van-list>
      <div v-else>
        <null
      :nullIcon="nullIcon"
      :nullcontent="nullcontent"
    ></null>
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
      this.loading = false
      
    },
    async getReportList(current) {
      const res = await reportService.reportList(current)
      this.reportList = res.records
      var current = this.current + 1
      if (current >= res.pages) {
        this.finished = true;
        this.current = current - 1
      }else {
        this.finished = false
        this.current = current
      }
      
    },
    /**
     * 进入报备详情
     */
    reportInfo() {
      this.$router.push('/user/myReport/reportInfo')
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
          line-height: 20px;
          width: 65px;
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
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 52px;

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
    }
  }
}
</style>


