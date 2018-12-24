<template>
  <div class="user-myCoupon-page">
    <ul class="user-myCoupon-page-top">
      <li @click="mayUseHandle" :class="{textActive:index==1}">
        未使用 {{notArr.records.length}}
        <span :class="{backActive:index==1}"></span>
      </li>
      <li @click="yetUseHandle" :class="{textActive:index==2}">
        使用记录 {{recordArr.records.length}}
        <span :class="{backActive:index==2}"></span>
      </li>
      <li @click="yetPastHandle" :class="{textActive:index==3}">
        已过期 {{pastArr.records.length}}
        <span :class="{backActive:index==3}"></span>
      </li>
    </ul>
    <div class="coupon-content">
    <coupon-item :ps="list.ps" v-for="(item,index) in list.info" :key="index" :info="item" @skipHandle="skipMarketDetail"></coupon-item>
    </div>
    <div class="not-available bg_img" :style="{backgroundImage:'url('+availableImg+')'}"></div>
    <p class="hint">暂无优惠券</p>
  </div>
</template>
<script>
import mycoupons from 'SERVICE/mycoupons'
import CouponItem from 'COMP/User/myCoupon/CouponItem.vue'
export default {
  components: {
    CouponItem
  },
  data: () => ({
    index: null,
    req: {
      agentId: 705,
      status: { not: 1, recor: 2, past: 3 }
    },
    list: {
      ps: { mayUse: true, yetUse: false, yetPast: false, flag: null },
      info: {}
    },
    notArr: { records: [] },
    recordArr: { records: [] },
    pastArr: { records: [] },
    availableImg: require('IMG/user/Groupa@2x.png')
  }),
  computed: {
    infoLength() {
      return this.list.info.length
    }
  },
  created() {
    this.createdHandle()
  },
  methods: {
    // 切换标签事件
    async mayUseHandle() {
      this.index = 1
      this.list.ps.mayUse = true
      this.list.ps.yetUse = false
      this.list.ps.yetPast = false
      this.list.ps.flag = 1
      this.list.info = this.notArr.records
      return Promise.resolve()
    },
    async yetUseHandle() {
      this.index = 2
      this.list.ps.mayUse = false
      this.list.ps.yetUse = true
      this.list.ps.yetPast = false
      this.list.ps.flag = 0
      this.list.info = this.recordArr.records
    },
    async yetPastHandle() {
      this.index = 3
      this.list.ps.mayUse = false
      this.list.ps.yetUse = false
      this.list.ps.yetPast = true
      this.list.ps.flag = 0
      this.list.info = this.pastArr.records
    },
    // 请求数据事件
    getData(agentId, status) {
      return new Promise((resolve, reject) => {
        this.couponsList(agentId, status)
        // .then(res=> resolve(res))
      })
    },
    async couponsList(agentId, status) {
      const res = await mycoupons.couponsStatusList(agentId, status)
      if (status == 1) {
        this.notArr = res
      } else if (status == 2) {
        this.recordArr = res
      } else {
        this.pastArr = res
      }
    },
    async promiseHandle() {
      let notHandle = this.getData(this.req.agentId, this.req.status.not)
      let recorHandle = this.getData(this.req.agentId, this.req.status.recor)
      let pastHandle = this.getData(this.req.agentId, this.req.status.past)
      Promise.all([notHandle, recorHandle, pastHandle])
    },
    // 初始时请求事件
    createdHandle() {
      let eventA = this.promiseHandle()
      let eventB = this.mayUseHandle()
      Promise.all([eventA, eventB])
    },
    // 立即使用事件
    skipMarketDetail() {
      this.$router.push('/market/marketDetail')
    }
  }
}
</script>

<style lang="less">
.user-myCoupon-page {
  .user-myCoupon-page-top {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #e6e6e6;
    background: rgba(255, 255, 255, 1);
    .textActive {
      color: rgba(0, 122, 230, 1);
    }
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 44px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      .backActive {
        background: rgba(0, 122, 230, 1);
      }
      span {
        width: 20px;
        height: 3px;
        background: rgba(255, 255, 255, 1);
        border-radius: 2px;
      }
    }
  }
  .coupon-content {
    margin-top: 45px;
  }
  .not-available {
    width: 88px;
    height: 88px;
    margin: 122px 0 0 144px;
  }
  .hint {
    font-size: 12px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 17px;
    text-align: center;
  }
}
</style>
