
<template>
  <div
    class="report-page"
    :style="{background:show==null?'#F7F9FA':'#FFFFFF'}"
  >
    <!-- <Tips></Tips>#F7F9FA; -->
    <div class="report-container">
      <shadow-box>
        <div
          slot="container"
          class="report-container-css"
        >
          <div class="report-title">
            <p class="report-title-css">华润城市花园二期 报备单</p>
            <p class="container-list"> 报备楼盘<span class="container-list-title container-name">华润城市花园二期</span> </p>
            <p class="container-list"> 报备客户<span class="container-list-title container-spec">李小博</span> </p>
            <p class="container-list ">
              <span class="container-list container-list-left"> 代理商<span class="container-list-title ">好房易购</span></span>
              <span class="container-list-right">待确认</span>
            </p>
            <p class="container-list ">
              <span class="container-list">报备时间<span class="container-list-title ">2018/10/18 10:00</span></span>
              <botton class="container-list-botton" @click="reportInfo">查看详情</botton>
            </p>

          </div>
          <p class="container-list"> 报备确认<span class="container-list-title container-discount">2018/10/18 10:00</span> </p>
        </div>

      </shadow-box>
    </div>

    <div class="report-div-btn">
      <button class="report-btn" @click="addReport">创建报备</button>
    </div>
    <!-- <null
      :nullIcon="nullIcon"
      :nullcontent="nullcontent"
    ></null> -->

  </div>
</template>
<script>
import ShadowBox from 'COMP/ShadowBox'
import Null from 'COMP/Null'
export default {
  components: {
    Null,
    ShadowBox,

  },

  data () {
    return {
      show: 1,
      item: [],
      nullIcon: require('IMG/user/bill-null.png'),
      nullcontent: '暂还没有消费记录',
      
    }
  },
  methods: {
    reportInfo(){
       this.$router.push('/user/myReport/reportInfo')
    },
     addReport(){
       this.$router.push('/user/myReport/addReport')
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
  > .report-container {
    width: 100%;
    margin: 16px 0;
    .report-container-css {
      padding: 20px 16px;
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


