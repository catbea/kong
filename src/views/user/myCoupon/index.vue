<template>
  <div class="user-myCoupon-page">
    
      <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6" sticky animated >
          <van-tab v-for="(item,index) in nameList" :key="index" :title="item.title+item.num" class="list-wrap">
            <keep-alive>
                <van-list :offset="100" v-model="loading" :finished="item.finished" :finished-text="'没有更多了'" @load="onLoad" v-if="!item.show">
                  <!-- <div class="coupon-content"> -->
                  <coupon-item v-for="(itemA,indexA) in item.list" 
                  @skipHandle='returnSkipHandle'
                   :key="indexA" :info="itemA" :status='item.status'></coupon-item>
                  <!-- </div> -->
                </van-list>
            </keep-alive>
            <div v-if="item.show" class="not-available bg_img" :style="{backgroundImage:'url('+availableImg+')'}"></div>
            <p v-if="item.show" class="hint">暂无优惠券</p>
          </van-tab>
      </van-tabs>
  </div>
</template>
<script>
import mycoupons from 'SERVICE/mycoupons'
import CouponItem from 'COMP/User/myCoupon/CouponItem.vue'
import { mapState } from 'vuex'
export default {
  components: {
    CouponItem
  },
  data: () => ({
    couponShow: false,
    loading: false,
    finished: false,
    nameList: [
      { title: '未使用', num: 0, list: [], index: 0, page: 1, finished: false, status: 0, show: false },
      { title: '使用记录', num: 0, list: [], index: 1, page: 1, finished: false, status: 1, show: false },
      { title: '已过期', num: 0, list: [], index: 2, page: 1, finished: false, status: 2, show: false }
    ],
    activeIndex: 0,
    index: null,
    req: {
      status: { not: 1, recor: 2, past: 3 }
    },
    list: {
      ps: { mayUse: true, yetUse: false, yetPast: false, flag: null },
      info: []
    },

    promArr: [],
    arrInfo: [],
    availableImg: require('IMG/user/Groupa@2x.png')
  }),
  computed: {
    ...mapState({
      isVip: state => state.user.userInfo.isVip
    })
  },
  created() {
    const _this = this
    this.notUse().then(res => {
      _this.nameList[0].num = res.total
      if (_this.nameList[0].num == 0) {
        _this.nameList[0].show = true
      } else {
        _this.nameList[0].show = false
      }
    })
    this.useRecord().then(res => {
      _this.nameList[1].num = res.total
      if (_this.nameList[1].num == 0) {
        _this.nameList[1].show = true
      } else {
        _this.nameList[1].show = false
      }
    })
    this.alreadyPast().then(res => {
      _this.nameList[2].num = res.total
      if (_this.nameList[2].num == 0) {
        _this.nameList[2].show = true
      } else {
        _this.nameList[2].show = false
      }
    })
  },
  methods: {
    async onLoad() {
      // 初始tab请求数据事件
      let current = this.getCurrentType()
      const result = await mycoupons.couponsStatusList(current.index, current.page)
      this.nameList[current.index].list = current.list.concat(result.records)
      if (result.pages === 0 || current.page === result.pages) {
        current.finished = true
      }
      current.page++
      this.loading = false
    },
    getCurrentType() {
      //选中的是哪个tab
      for (let temp of this.nameList) {
        if (this.activeIndex === temp.index) {
          return temp
        }
      }
    },
    async notUse() {
      //已使用
      const _this = this
      let p1 = new Promise(function(resolve, reject) {
        let res = mycoupons.couponsStatusList(0, 1)
        resolve(res)
      })
      return p1
    },
    async useRecord() {
      //使用记录
      const _this = this
      let p2 = new Promise(function(resolve, reject) {
        let res = mycoupons.couponsStatusList(1, 1)
        resolve(res)
      })
      return p2
    },
    async alreadyPast() {
      //已过期
      const _this = this
      let p3 = new Promise(function(resolve, reject) {
        let res = mycoupons.couponsStatusList(2, 1)
        resolve(res)
      })
      return p3
    },
    // 立即使用事件
    returnSkipHandle(n) {
      this.$router.push('/market')
    }
  }
}
</script>

<style lang="less" scoped>
.user-myCoupon-page {
  height: 100%;
  position: relative;
  .list-wrap {
    width: 100%;
    height: 630px;
    overflow: auto;
  }
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

    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 17px;
    text-align: center;
  }
}
</style>
