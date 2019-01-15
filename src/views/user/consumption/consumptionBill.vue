<template>
  <div>
    <div v-if="haveData">
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
                <span
                  class="container-list-botton"
                  :data-clipboard-text="item.purchaseCode"
                  @click="copy"
                >复制</span>
              </p>
              <p class="container-list container-list-left bill-container-price">
                总价
                <span class="container-list-title container-price">¥{{item.purchasePrice}}</span>
              </p>
              <p class="container-list container-list-left bill-container-discount">
                优惠
                <span class="container-list-title container-discount">¥{{item.preferenPrice}}</span>
              </p>
            </div>
          </shadow-box>
        </div>
      </van-list>
    </div>
    <null :nullIcon="nullIcon" :nullcontent="nullcontent" v-if="!haveData"></null>
  </div>
</template>
<script>
import ShadowBox from 'COMP/ShadowBox'
import Null from 'COMP/Null'
import userService from 'SERVICE/userService'
import timeUtils from '@/utils/timeUtils'
import Clipboard from 'clipboard'
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
      current: 1,
      haveData: true
    }
  },

  created() {},

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

    //复制功能
    copy() {
      var clipboard = new Clipboard('.container-list-botton')
      clipboard.on('success', e => {
        this.$toast('复制成功')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        console.log('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },

    onLoad() {
      this.queryBillList(this.current)
    },

    async queryBillList(current) {
      const res = await userService.getMyBillList(current)

      if (res.records.length > 0) {
        for (let i = 0; i < res.records.length; i++) {
          let payTime = timeUtils.fmtDate(res.records[i].purchaseTime)
          res.records[i].purchaseTime = payTime
        }
        this.billItem = this.billItem.concat(res.records)
        if (this.billItem.length > 0) {
          this.haveData = true
        } else {
          this.haveData = false
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
        line-height: 30px;
        height: 47px;
        border-bottom: 1px solid #eeeeee;
        padding-bottom: 13px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > .bill-title-price {
          font-size: 14px;
          font-weight: 600;
          color: rgba(234, 77, 46, 1);
          line-height: 20px;
          > .bill-title-num {
            font-size: 20px;
            font-family: PingFangSC-Semibold;
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
          height: 20px;
          // margin-left: 10px;
          // margin-right: 10px;
          width: 48px;
          height: 20px;
          line-height: 20px;
          border-radius: 22px;
          border: 1px solid;
          float: right;
          text-align: center;
          background-color: white;
          margin-top: 4px;
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
