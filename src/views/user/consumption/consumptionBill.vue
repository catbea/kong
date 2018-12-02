<template>
  <van-list
    class="bill-page"
    :style="{background:show==null?'#ffffff':'#F7F9FA'}"
    v-model="loading"
    :finished="finished"
    :finished-text="'没有更多了'"
    @load="onLoad"
  >
    <!-- <Tips></Tips>#F7F9FA; -->
    <!-- v-for="(item, index) in billItem" :key="index" -->
    <div class="bill-container" v-for="(item,index) in billItem" :key="index">
      <shadow-box>
        <div slot="container" class="bill-container-css">
          <div class="bill-title">
            {{item.costTypeDesc}}
            <span class="bill-title-price">
              ¥
              <span class="bill-title-num">{{item.payPrice}}</span>
            </span>
          </div>
          <p class="container-list bill-container-name">
            购买楼盘
            <span class="container-list-title container-name">{{item.linkerName}}</span>
          </p>
          <p class="container-list bill-container-spec">
            购买规格
            <span class="container-list-title container-spec">{{item.buyRule}}</span>
          </p>
          <p class="container-list bill-container-time">
            下单时间
            <span class="container-list-title container-time">{{item.purchaseTime}}</span>
          </p>
          <p class="container-list bill-container-num">
            <span class="container-list">
              交易单号
              <span class="container-list-title">{{item.purchaseCode}}</span>
            </span>
            <botton class="container-list-botton">复制</botton>
          </p>
          <p class="container-list container-list-left bill-container-price">
            总价
            <span class="container-list-title container-price">¥{{item.purchasePrice}}</span>
          </p>
          <p class="container-list container-list-left bill-container-discount">
            优惠
            <span class="container-list-title container-discount">¥{{item.preferenPrice }}</span>
          </p>
        </div>
      </shadow-box>
    </div>
  </van-list>
</template>
<script>
import ShadowBox from 'COMP/ShadowBox'
import Null from 'COMP/Null'
import userService from 'SERVICE/userService'
export default {
  components: {
    Null,
    ShadowBox
  },

  data() {
    return {
      show: 1,
      billItem: [],
      nullIcon: require('IMG/user/bill-null.png'),
      nullcontent: '暂还没有消费记录',
      loading: false,
      finished: false,
      current: 1
    }
  },

  created() {
    // this.getBillList(this.current)
  },

  methods: {
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

     async getBillList(current) {
      const res = await userService.getMyBillList(current)
      this.billItem = res.records
      this.current = res.current + 1
      console.log(this.current)
    },

    async onLoad() {
      let tempCurrent = this.current
      const res = await userService.getMyBillList(tempCurrent)
      let tempBillItem = res.records
      if (tempBillItem.length !== 0) {
        this.billItem = this.billItem.concat(tempBillItem)
        this.current = tempCurrent + 1
        this.loading = false
      } else {
        this.finished = true
      }

      if (res.pages == 0 || this.current > res.pages) {
        this.finished = true
      }
    }
  }
}
</script>
<style lang="less">
.bill-page {
  > .bill-container {
    width: 100%;
    margin: 16px 0;
    .bill-container-css {
      padding: 12px 16px;
      > .bill-title {
        font-size: 16px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        border-bottom: 1px solid #eeeeee;
        padding-bottom: 13px;
        margin-bottom: 10px;
        > .bill-title-price {
          float: right;
          font-size: 14px;
          font-weight: 600;
          color: rgba(234, 77, 46, 1);
          line-height: 20px;
          > .bill-title-num {
            font-size: 20px;
          }
        }
      }
      > .container-list {
        font-size: 14px;
        font-weight: 500;
        color: #333333;
        line-height: 30px;
        .container-list-botton {
          font-size: 12px;
          font-weight: 400;
          color: rgba(0, 122, 230, 1);
          line-height: 20px;
          width: 48px;
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
      > .container-list-left {
        padding-left: 27px;
      }
    }
  }
}
</style>
