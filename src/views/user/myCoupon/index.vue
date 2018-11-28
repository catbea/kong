<template>
  <div class="user-myCoupon-page">
    <ul class="user-myCoupon-page-top">
      <li @click="oneHandle();mayUseHandle()" :class="{textActive:index==1}">
        未使用 10
        <span :class="{backActive:index==1}"></span>
      </li>
      <li @click="twoHandle();yetUseHandle()" :class="{textActive:index==2}">
        使用记录 8
        <span :class="{backActive:index==2}"></span>
      </li>
      <li @click="threeHandle();yetPastHandle()" :class="{textActive:index==3}">
        已过期 12
        <span :class="{backActive:index==3}"></span>
      </li>
    </ul>
    <coupon-item :ps="list.ps" v-for="(item,index) in list.info" :key="index" :info="item"></coupon-item>
    <!-- <div class="not-available bg_img" :style="{backgroundImage:'url('+availableImg+')'}"></div> -->
    <p class="hint">暂无优惠券</p>
  </div>
</template>
<script>
import CouponItem from 'COMP/User/myCoupon/CouponItem.vue'
export default {
  components:{
    CouponItem
  },
  data:()=>({
    index:null,
    list:{
     ps:{mayUse:true,yetUse:false,yetPast:false,flag:null},
     info:[
       {},{},{}
     ]},
    //  availableImg:require('IMG/user/Groupa@2x.png')
    }),
  created() {
    this.oneHandle()
  },
  methods:{
    oneHandle(){
      this.index=1
    },
    twoHandle(){
      this.index=2
    },
    threeHandle(){
      this.index=3
    },
    mayUseHandle(){
      this.list.ps.mayUse=true
      this.list.ps.yetUse=false
      this.list.ps.yetPast=false
      this.list.ps.flag=1
    },
    yetUseHandle(){
      this.list.ps.mayUse=false
      this.list.ps.yetUse=true
      this.list.ps.yetPast=false
      this.list.ps.flag=0
    },
    yetPastHandle(){
      this.list.ps.mayUse=false
      this.list.ps.yetUse=false
      this.list.ps.yetPast=true
      this.list.ps.flag=0
    }
  }
}
</script>

<style lang="less">
.user-myCoupon-page{
  .user-myCoupon-page-top{
    display: flex;
    justify-content:space-around;
    border-bottom:1px solid #E6E6E6;
    .textActive{
      color:rgba(0,122,230,1);
    }
    li{
      display: flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      width:80px;
      height:44px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(51,51,51,1);
      .backActive{
        background:rgba(0,122,230,1);
      }
      span{
        width:20px;
        height:3px;
        background:rgba(255,255,255,1);
        border-radius:2px;
      }
    }
  }
  .not-available{
    width:88px;
    height:88px;
    margin:122px 0 0 144px;
  }
  .hint{
    font-size:12px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:17px;
    text-align: center;
  }
}
</style>
