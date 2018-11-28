
<template>
  <div class="report-page">
    <!-- <Tips></Tips>#F7F9FA; -->
    <div class="report-container">

      <div class="report-container-css">
        <div class="report-title">
          <p class="report-title-css">华润城市花园二期 报备单</p>
          <p class="container-list"> 报备楼盘<span class="container-list-title container-name">华润城市花园二期</span> </p>
          <p class="container-list"> 报备客户<span class="container-list-title container-spec">李小博</span> </p>
          <p class="container-list container-list-left">代理商<span class="container-list-title ">好房易购</span> </p>
          <p class="container-list "> 报备时间<span class="container-list-title ">2018/10/18 10:00</span></p>

        </div>

      </div>
      <div class="report-btn" v-for="(item, index) in steps" :key="index">
        <div class="report-btn-left"></div>
        <div class="report-btn-left-x"></div>
        <div class="report-btn-right">
          <p class="btn-right-title">{{item.title}}</p>
          <p class="btn-right-time">{{item.time}}</p>
        </div>
      </div>
     
      <!-- <steps
        direction="vertical"
        :active="0"
        active-color="#f44"
      >
        <step>
          <h3>报备确认</h3>
          <p>2018/10/18 10:00</p>
        </step>
        <step>
          <h3>到访时间</h3>
          <p>2016-07-11 10:00</p>
        </step>
        <step>
          <h3>认筹时间</h3>
          <p>2016-07-10 09:30</p>
        </step>
        </steps> -->

    </div>

  </div>
</template>
<script>
import { Step, Steps } from 'vant';
export default {
  components: {
    Step,
    Steps

  },

  data () {
    return {
      show: 1,
      item: [],
      nullIcon: require('IMG/user/bill-null.png'),
      nullcontent: '暂还没有消费记录',
      steps: [
        {'id':'1','title':'报备确认','time':'2018/10/18 10:00'},
        {'id':'2','title':'到访时间','time':'2018/10/18 10:00'},
        {'id':'3','title':'认筹时间','time':'2018/10/18 10:00'}
      ]
    }
  },
  methods: {
    reportInfo () {
      this.$router.push('/user/myMarket')
    },
    itemProperties () {

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
      }
      .container-list-left {
        padding-left: 13px;
      }
    }
    > .report-btn {
      display: flex;
      padding: 0 16px;
      margin-bottom: 23px;
      > .report-btn-left {
        background: rgba(0, 122, 230, 1);
        width: 13px;
        height: 13px;
        border-radius: 50%;
      }
     
       > .report-btn-left-x {
        height: 60px;
        width: 3px;
        background: #007ae6;
        position: absolute;
        margin-left: 5px;
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
  }
}
</style>


