<template>
  <div class="teammateList-page">
     <van-tabs color="#007AE6" :line-width="15" :swipe-threshold="6" v-model="active">
        <van-tab title="邀请注册"></van-tab>
        <van-tab title="邀请开通"></van-tab>
     </van-tabs>
      <div v-if="active === 0 ">
          <div class="teammateList-top" :style="{'backgroundImage':'url('+teammateListBackIcon+')'}">
            <div class="teammateList-top-center">
              <p class="teammateList-top-price"><span class="teammateList-top-price-num">0</span>元</p>
              <p class="teammateList-top-num">已邀请：9人</p>
            </div>
          </div>
          <div class="teammateList-center">
              <div class="teammateList-center-left">
                <p class="teammateList-center-left-text">成功邀请用户</p>
                <p class="teammateList-center-left-tell">1365451212</p>
              </div>
              <div class="teammateList-center-right">
                <p class="teammateList-center-right-time">2018/05</p>
              </div>
          </div>
           <div class="teammateList-center">
              <div class="teammateList-center-left">
                <p class="teammateList-center-left-text">成功邀请用户</p>
                <p class="teammateList-center-left-tell">1365451212</p>
              </div>
              <div class="teammateList-center-right">
                <p class="teammateList-center-right-time">2018/05</p>
              </div>
          </div>
          
      </div>
      <div v-if="active === 1 ">
          <div class="teammateList-top" :style="{'backgroundImage':'url('+kaitBackIcon+')'}">
            <div class="teammateList-top-center">
              <p class="teammateList-top-price"><span class="teammateList-top-price-num">0</span>元</p>
              <p class="teammateList-top-num">已开通：9个</p>
            </div>
          </div>
          <div class="teammateList-center">
              <div class="teammateList-center-left">
                <p class="teammateList-center-left-text">成功邀请用户</p>
                <p class="teammateList-center-left-tell">1365451212</p>
              </div>
              <div class="teammateList-center-right">
                <p class="teammateList-center-right-time">2018/05</p>
              </div>
          </div>
           <div class="teammateList-center">
              <div class="teammateList-center-left">
                <p class="teammateList-center-left-text">成功邀请用户</p>
                <p class="teammateList-center-left-tell">1365451212</p>
              </div>
              <div class="teammateList-center-right">
                <p class="teammateList-center-right-time">2018/05</p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
  // import {invitationUsers,openRewards,registerRewards ,agentCoupons} from '../../../service/me'
  export default {
    name: "teammateList",
    data(){
      return{
       active: [],
       teammateListBackIcon:require('IMG/user/invitation/aw-banner@2x.png'),
       kaitBackIcon:require('IMG/user/invitation/aw-banner1@2x.png')
      }
    },
    mounted(){
    
    },
    methods:{
     
    },
  }
</script>

<style scoped lang="less">

  .teammateList-page {
    background:rgba(255,255,255,1);
    // background: red;
    .teammateList-top{
      width: 100%;
      height: 3.5rem;
      background-size:100% 3.5rem;
      .teammateList-top-center{
        text-align: center;
        padding-top: 10px;
        .teammateList-top-price{
           font-size:0.4rem;
          font-weight:500;
           color:rgba(255,227,162,1);
          .teammateList-top-price-num{
            font-size:0.96rem;
           font-family:'PingFangSC-Semibold';
            font-weight:600;
            color:rgba(255,227,162,1);
          }
        }
        .teammateList-top-num{
          font-size:0.24rem;
          font-weight:400;
          color:rgba(255,227,162,1);
          line-height:0.34rem;
        }
      }
    }
    .teammateList-center{
          position: relative;
        bottom: 45px;
       margin: 0rem 16px 16px 16px;
        height:60px;
        background:rgba(255,255,255,1);
        box-shadow:0 2px 4px 0 rgba(0,0,0,0.05);
        border-radius:6px;
        display: flex;
        justify-content: space-between;
      .teammateList-center-left{
        padding-left: 16px;
          align-self: center;
          text-align: left;
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
            line-height:18px;
        }
      }
      .teammateList-center-right{
          align-self: center;
        .teammateList-center-right-time{
         font-size:14px;
          font-weight:400;
          color:rgba(235,93,42,1);
          align-self: center;
          padding-right: 16px;
        }
      }
    }
  }
</style>
