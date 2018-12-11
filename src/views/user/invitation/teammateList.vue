<template>
  <div class="teammateList-page">
     <van-tabs color="#007AE6" :line-width="15" :swipe-threshold="6" v-model="active">
        <van-tab title="邀请注册"></van-tab>
        <van-tab title="邀请开通"></van-tab>
     </van-tabs>
      <div v-if="active === 0 ">
          <div class="teammateList-top" :style="{'backgroundImage':'url('+teammateListBackIcon+')'}">
            <img :src="couponIcon" class="teammateList-top-icon">
            <div class="teammateList-top-center">
              <p class="teammateList-top-price"><span class="teammateList-top-price-num">0</span>元</p>
              <p class="teammateList-top-num">已邀请：{{ registerRewardsTotal == 0 ? 0 : registerRewardsTotal}}人</p>
            </div>
          </div>
          <div class="teammateList-center" v-for="(registerItem,key) in registerRewards" :key="key">
              <div class="teammateList-center-left">
                <p class="teammateList-center-left-text">成功邀请用户</p>
                <p class="teammateList-center-left-tell">{{registerItem.mobile}}</p>
              </div>
              <div class="teammateList-center-right">
                <p class="teammateList-center-right-time">{{registerItem.rewardsTime | dateTimeFormatter(2,'/')}}</p>
              </div>
          </div>
           <!-- <div class="teammateList-center">
              <div class="teammateList-center-left">
                <p class="teammateList-center-left-text">成功邀请用户</p>
                <p class="teammateList-center-left-tell">1365451212</p>
              </div>
              <div class="teammateList-center-right">
                <p class="teammateList-center-right-time">收获¥20元代金券</p>
              </div>
          </div> -->
          
      </div>
      <div v-if="active === 1 ">
          <div class="teammateList-top" :style="{'backgroundImage':'url('+kaitBackIcon+')'}">
             <img :src="redenvelopesIcon" class="teammateList-top-redenvelopesIcon">
            <div class="teammateList-top-center">
              <p class="teammateList-top-price"><span class="teammateList-top-price-num">0</span>元</p>
              <p class="teammateList-top-num">已开通：{{ openRewardsTotal == 0 ? 0 : openRewardsTotal}}个</p>
            </div>
          </div>
          <div class="teammateList-center" v-for="(openItem,key) in openRewards" :key="key">
              <div class="teammateList-center-left">
                <p class="teammateList-center-left-open-text">用户{{ openItem.mobile}}</p>
                <p class="teammateList-center-left-open-tell">成功开通</p>
              </div>
              <div class="teammateList-center-right">
                <p class="teammateList-center-right-open-time">{{openItem.rewardsTime | dateTimeFormatter(2,'/')}}</p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import userService from 'SERVICE/userService'
  // import {invitationUsers,openRewards,registerRewards ,agentCoupons} from '../../../service/me'
  export default {
    data(){
      return{
       active: [],
       teammateListBackIcon:require('IMG/user/invitation/aw-banner@2x.png'),
       kaitBackIcon:require('IMG/user/invitation/aw-banner1@2x.png'),
       couponIcon:require('IMG/user/invitation/aw-coupon@2x.png'),
       redenvelopesIcon:require('IMG/user/invitation/redenvelopes@2x.png'),
       openRewards:[],
       registerRewards:[],
       registerRewardsTotal:0,
       openRewardsTotal:0,
      }
    },
    mounted(){
      this.getopenRewards()
    this.getregisterRewards()                                           
    },
    methods:{
      //邀请开通列表
     async getopenRewards(){
      const res = await userService.getopenRewards()
      this.openRewardsTotal = res.total
     
      this.openRewards = res.records
    },
      //邀请注册列表
      async getregisterRewards(){
        const res = await userService.getregisterRewards()
        this.registerRewardsTotal = res.total
        this.registerRewards = res.records
      }
    },
  }
</script>

<style lang="less">

  .teammateList-page {
    background:rgba(255,255,255,1);
    // background: red;
    .van-tab--active {
        font-weight: 500;
        color: #EB5D2A;
    }
    .teammateList-page .van-tabs__line {
    z-index: 1;
    left: 0;
    bottom: 0.4rem;
    height: 0.05333rem;
    position: absolute;
    border-radius: 0.05333rem;
    background-color: #EB5D2A !important;
}
.van-tabs__line {
    z-index: 1;
    left: 0;
    bottom: 0.4rem;
    height: 0.05333rem;
    position: absolute;
    border-radius: 0.05333rem;
    background-color: #EB5D2A !important;
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
    .teammateList-top{
      width: 100%;
      height: 175px;
      background-size:100% 175px;
      .teammateList-top-redenvelopesIcon{
         width: 18px;
        height: 24px;
        position: absolute;
        margin: 15px;
      }
      .teammateList-top-icon{
        width: 34px;
        height: 15px;
        position: absolute;
        margin: 15px;
      }
      .teammateList-top-center{
        text-align: center;
        padding-top: 10px;
        .teammateList-top-price{
           font-size:20px;
          font-weight:500;
           color:rgba(255,227,162,1);
          .teammateList-top-price-num{
           font-size:48px;
            font-weight:600;
            color:rgba(255,227,162,1);
          }
        }
        .teammateList-top-num{
         font-size:12px;
        font-weight:400;
        color:rgba(255,227,162,1);
        line-height:17px;
        }
      }
    }
    .teammateList-center{
          position: relative;
        bottom: 45px;
       margin: 0rem 8px 8px 8px;
        height:80px;
        background:rgba(255,255,255,1);
        box-shadow:0 2px 4px 0 rgba(0,0,0,0.05);
        border-radius:6px;
        display: flex;
        justify-content: space-between;
      .teammateList-center-left{
        padding-left: 20px;
          align-self: center;
          text-align: left;
          .teammateList-center-left-open-text{
            font-size:16px;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:22px;
          }
          .teammateList-center-left-open-tell{
            font-size:14px;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:20px;
          }
        .teammateList-center-left-text{
            font-size:16px;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:22px;
        }
        .teammateList-center-left-tell{
             font-size:14px;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:20px;
        }
      }
      .teammateList-center-right{
          align-self: center;
          .teammateList-center-right-open-time{
            font-size:14px;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:20px;
             padding-right: 23px;
          }
        .teammateList-center-right-time{
          font-size:14px;
          font-weight:400;
          color:rgba(235,93,42,1);
          line-height:20px;
          align-self: center;
          padding-right: 23px;
        }
      }
    }
  }
</style>
