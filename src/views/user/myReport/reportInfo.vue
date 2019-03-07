
<template>
  <div class="report-page">
    <div class="report-container">
      <div class="report-container-css">
        <div class="report-title">
          <p class="report-title-css">{{reportInfo.linkerName}} 报备单</p>
          <p class="container-list">
            报备楼盘
            <span class="container-list-title container-name">{{reportInfo.linkerName}}</span>
          </p>
          <p class="container-list">
            报备客户
            <span class="container-list-title container-spec">{{reportInfo.clientName}}</span>
          </p>
          <p class="container-list">
            电话号码
            <span
              class="container-list-title container-spec"
              v-if="this.reportInfo.hideClientTel===1"
            >{{this.reportInfo.hideClientTel===1?this.reportInfo.hideNumber:this.reportInfo.clientMobile}}</span>
            <span
              class="container-list-show-phone"
              @click="judePhoneNum(statusPhone)"
            >{{this.reportInfo.hideClientTel===1? '显示':'隐藏'}}</span>
            <span class="container-list-call-phone" @click="callUp(reportInfo.clientMobile)">拨打电话</span>
          </p>
          <p class="container-list container-list-left">
            代理商
            <span class="container-list-title">{{reportInfo.distributorName}}</span>
          </p>
          <p class="container-list">
            报备时间
            <span class="container-list-title">{{reportInfo.fillingTime}}</span>
          </p>
        </div>
      </div>
      <div class="report-btn" v-for="(item, index) in auditList" :key="index">
        <div class="report-btn-left"></div>
        <div class="report-btn-left-x"></div>
        <div class="report-btn-right">
          <p class="btn-right-title">{{transferInfo[item.transferSts]}}</p>
          <p class="btn-right-time">{{item.createTime | dateTimeFormatter}}</p>
        </div>
      </div>
      <div class="report-bottom">{{reportInfo.expiryTime | dateTimeFormatter}}前有效</div>
    </div>
  </div>
</template>
<script>
import reportService from 'SERVICE/reportService'
import { Dialog } from 'vant'
export default {
  data() {
    return {
      distClientId: '', // 报备单id
      reportInfo: {}, // 报备信息
      auditList: [], // 报备审核列表
      transferInfo: {
        '0': '报备待确认',
        '1': '报备成功',
        '2': '报备失败',
        '3': '审核中',
        '10': '未到访',
        '11': '到访有效',
        '12': '到访无效',
        '100': '待跟进',
        '101': '已认筹',
        '102': '已认购 ',
        '103': '已签约',
        '104': '已结佣',
        '105': '已放弃'
      },
      nullIcon: require('IMG/user/empty_report@2x.png'),
      nullcontent: '您还没有任何报备信息',
      statusPhone: ''
    }
  },
  created() {
    this.distClientId = this.$route.query.id
    this.reportInfo = this.$route.query

    this.phoneNum = this.reportInfo.clientMobile

    this.reportInfo.hideNumber = this.reportInfo.clientMobile.substring(0, 3) + '****' + this.reportInfo.clientMobile.substring(7, 11)

    if (this.reportInfo.hideClientTel === 0) {
      this.reportInfo.showText = '隐藏'
      this.statusPhone = 'hide'
    } else {
      this.reportInfo.showText = '显示'
      this.statusPhone = 'show'
    }

    this.getReportAuditList(this.distClientId)
  },
  methods: {
    /**
     * 报备审核列表请求
     */
    async getReportAuditList(distClientId) {
      const res = await reportService.reportAuditList(distClientId)
      this.auditList = res
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
    },

    /**
     * 拨打电话
     */
    callUp(phoneNum) {
      Dialog.confirm({
        message: phoneNum
      })
        .then(() => {
          // on confirm
          window.location.href = 'tel:' + phoneNum
        })
        .catch(() => {
          // on cancel
        })
    },

    judePhoneNum(status) {
      if (status == 'show') {
        this.reportInfo.showText = '隐藏'
        this.statusPhone = 'hide'
        this.reportInfo.hideClientTel == 0

        console.log(this.reportInfo)
        console.log('99999999999999')
      } else if (status == 'hide') {
        this.reportInfo.showText = '显示'
        this.statusPhone = 'show'
        this.reportInfo.hideClientTel == 1

        console.log(this.reportInfo)
        console.log('000000000000000')
      }
    }
  }
}
</script>
<style lang="less">
.report-page {
  background: #ffffff;
  > .report-container {
    width: 100%;
    margin: 16px 0;
    .report-container-css {
      padding: 20px 16px;
      > .report-title {
        border-bottom: 1px solid #eeeeee;
        padding-bottom: 13px;
        margin-bottom: 10px;
        .report-title-css {
          font-size: 20px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 28px;
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

        .container-list-title {
          font-size: 14px;
          font-weight: 400;
          color: #666666;
          line-height: 20px;
          padding-left: 12px;
        }

        .container-list-show-phone {
          font-size: 14px;
          color: #007ae6;
          margin-left: 8px;
        }

        .container-list-call-phone {
          position: absolute;
          font-size: 14px;
          color: #007ae6;
          margin-right: 16px;
          right: 0;
        }
      }
      .container-list-left {
        padding-left: 13px;
      }
    }
    // .report-btn:last-child {
    //   > .report-btn-left-x {
    //     width: 0;
    //     height: 0;
    //   }
    // }
    > .report-btn {
      display: flex;
      padding: 0 16px;
      margin-bottom: 23px;
      > .report-btn-left {
        background: rgba(0, 122, 230, 1);
        width: 13px;
        height: 13px;
        border-radius: 50%;
        margin-top: 2px;
      }

      > .report-btn-left-x {
        height: 60px;
        width: 3px;
        background: #007ae6;
        position: absolute;
        margin-left: 5px;
        margin-top: 2px;
      }
      > .report-btn-right {
        padding-left: 12px;
        > .btn-right-title {
          font-size: 14px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
        }
        > .btn-right-time {
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 17px;
        }
      }
    }
    > .report-bottom {
      width: 200px;
      position: absolute;
      bottom: 25px;
      left: 50%;
      margin-left: -100px;
      text-align: center;
      color: #ea4d2e;
      font-size: 12px;
    }
  }
}
</style>
