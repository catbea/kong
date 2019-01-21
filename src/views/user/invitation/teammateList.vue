<template>
  <div class="teammateList-page">
      <div >
          <div class="teammateList-top" :style="{'backgroundImage':'url('+teammateListBackIcon+')'}">
            <img :src="couponIcon" class="teammateList-top-icon">
            <div class="teammateList-top-center">
              <p class="teammateList-top-price"><span class="teammateList-top-price-num">{{registerRewardsPrice | priceFormart}}</span>元</p>
              <p class="teammateList-top-num">已邀请：{{ registerRewardsTotal == 0 ? 0 : registerRewardsTotal}}人</p>
            </div>
          </div>
          <van-list v-model="loading" :finished="finished" :finished-text="'没有更多了'" @load="getregisterRewards">
          <div class="teammateList-center" v-for="(registerItem,key) in registerRewards" :key="key">
              <div class="teammateList-center-left">
                <p class="teammateList-center-left-text">成功邀请用户</p>
                <p class="teammateList-center-left-tell">{{registerItem.mobile}}</p>
              </div>
              <div class="teammateList-center-right">
                <p class="teammateList-center-right-time">{{registerItem.rewardsTime | dateTimeFormatter(2,'/')}}</p>
              </div>
          </div>
          </van-list>
      </div>
  </div>
</template>

<script>
import userService from 'SERVICE/userService'
export default {
  data() {
    return {
      active: [],
      page: 1,
      pageSize: 10,
      loading: false,
      finished: false,
      teammateListBackIcon: require('IMG/user/invitation/aw-banner@2x.png'),
      kaitBackIcon: require('IMG/user/invitation/aw-banner1@2x.png'),
      couponIcon: require('IMG/user/invitation/aw-coupon@2x.png'),
      registerRewards: [],
      registerRewardsTotal: 0,
      registerRewardsPrice: 0,
      openRewardsTotal: 0
    }
  },
  mounted() {
    // this.getregisterRewards()
  },
  methods: {
    //邀请注册列表
    async getregisterRewards() {
      const res = await userService.getregisterRewards(this.page, this.pageSize)
      if(res.list.pages === 0) this.registerRewardsPrice = res.price
      if(res.list.pages === 0) this.registerRewardsTotal = res.count
      this.registerRewards = res.pages === 0 ? res.list.records : this.registerRewards.concat(res.list.records)
      if (res.list.pages === 0 || this.page === res.list.pages) {
        this.finished = true
      }
      this.page++
      this.loading = false
    }
  }
}
</script>

<style lang="less">
.teammateList-page {
  background: rgba(255, 255, 255, 1);
  // background: red;
  .van-tab--active {
    font-weight: 500;
    color: #eb5d2a;
  }
  .teammateList-page .van-tabs__line {
    z-index: 1;
    left: 0;
    bottom: 0.4rem;
    height: 0.05333rem;
    position: absolute;
    border-radius: 0.05333rem;
    background-color: #eb5d2a !important;
  }
  .van-tabs__line {
    z-index: 1;
    left: 0;
    bottom: 0.4rem;
    height: 0.05333rem;
    position: absolute;
    border-radius: 0.05333rem;
    background-color: #eb5d2a !important;
  }
  .van-tabs__line {
    z-index: 1;
    left: 0;
    bottom: 0.4rem;
    height: 0.05333rem;
    position: absolute;
    border-radius: 0.05333rem;
    background-color: #f44;
  }
  .teammateList-top {
    width: 100%;
    height: 175px;
    background-size: 100% 175px;
    .teammateList-top-redenvelopesIcon {
      width: 18px;
      height: 24px;
      position: absolute;
      margin: 15px;
    }
    .teammateList-top-icon {
      width: 34px;
      height: 15px;
      position: absolute;
      margin: 15px;
    }
    .teammateList-top-center {
      text-align: center;
      padding-top: 10px;
      .teammateList-top-price {
        font-size: 20px;
        font-weight: 500;
        color: rgba(255, 227, 162, 1);
        .teammateList-top-price-num {
          font-size: 48px;
          font-weight: 600;
          color: rgba(255, 227, 162, 1);
        }
      }
      .teammateList-top-num {
        font-size: 12px;
        font-weight: 400;
        color: rgba(255, 227, 162, 1);
        line-height: 17px;
      }
    }
  }
  .teammateList-center {
    position: relative;
    bottom: 45px;
    margin: 0rem 8px 8px 8px;
    height: 80px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    .teammateList-center-left {
      padding-left: 20px;
      align-self: center;
      text-align: left;
      .teammateList-center-left-open-text {
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
      }
      .teammateList-center-left-open-tell {
        font-size: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 20px;
      }
      .teammateList-center-left-text {
        font-size: 16px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 22px;
      }
      .teammateList-center-left-tell {
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
      }
    }
    .teammateList-center-right {
      align-self: center;
      .teammateList-center-right-open-time {
        font-size: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 20px;
        padding-right: 23px;
      }
      .teammateList-center-right-time {
        font-size: 14px;
        font-weight: 400;
        color: rgba(235, 93, 42, 1);
        line-height: 20px;
        align-self: center;
        padding-right: 23px;
      }
    }
  }
}
</style>
