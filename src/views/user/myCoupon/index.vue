<template>
  <div class="user-myCoupon-page">
    <ul class="user-myCoupon-page-top">
      <li @click="oneHandle()" :class="{textActive:index==1}">
        未使用 {{notNum}}
        <span :class="{backActive:index==1}"></span>
      </li>
      <li @click="twoHandle()" :class="{textActive:index==2}">
        使用记录 {{recordNum}}
        <span :class="{backActive:index==2}"></span>
      </li>
      <li @click="threeHandle()" :class="{textActive:index==3}">
        已过期 {{pastNum}}
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
  components:{
    CouponItem
  },
  data:()=>({
    index:null,
    req:{
      agentId:705,
      status:{a:1,b:2,c:3}
    },
    list:{
     ps:{mayUse:true,yetUse:false,yetPast:false,flag:null},
     info:[
       {},{},{}
     ]},
     notNum:null,
     recordNum:null,
     pastNum:null,
     availableImg:require('IMG/user/Groupa@2x.png')
    }),
    computed:{
      infoLength(){
       return this.list.info.length
      }
    },
  created() {
    // this.oneHandle()
    this.couponsList(this.req.agentId,this.req.status.a)
    // this.couponsList(this.req.agentId,this.req.status.b)
    // this.couponsList(this.req.agentId,this.req.status.c)
  },
  methods:{
    // 切换标签事件
    oneHandle(){
      this.index=1
      this.req.status=1
      this.mayUseHandle()
    },
    mayUseHandle(){
      this.list.ps.mayUse=true
      this.list.ps.yetUse=false
      this.list.ps.yetPast=false
      this.list.ps.flag=1
      this.couponsList()
    },
    async couponsList(agentId,status){
        const res = await mycoupons.couponsStatusList(
          agentId,
          status
        )
        if(status==1){
          this.notNum=res.records.length
        }else if(status==2){
          this.recordNum=res.records.length
        }else{
          this.pastNum=res.records.length
        }
        console.log(this.notNum,this.recordNum,this.pastNum)
        console.log(res)
        this.list.info=res.records
      },
    twoHandle(){
      this.index=2
      this.req.status=2
      this.yetUseHandle()
    },
        yetUseHandle(){
      this.list.ps.mayUse=false
      this.list.ps.yetUse=true
      this.list.ps.yetPast=false
      this.list.ps.flag=0
      this.couponsList()
    },
    threeHandle(){
      this.index=3
      this.req.status=3
      this.yetPastHandle()
    },
        yetPastHandle(){
      this.list.ps.mayUse=false
      this.list.ps.yetUse=false
      this.list.ps.yetPast=true
      this.list.ps.flag=0
      this.couponsList()
    },
// 立即使用事件
    skipMarketDetail(){
      this.$router.push("/market/marketDetail")
    }
  }
}
</script>

<style lang="less">
.user-myCoupon-page{
  .user-myCoupon-page-top{
    position:fixed;
    top:0;
    width:100%;
    z-index:2;
    display: flex;
    justify-content:space-around;
    border-bottom:1px solid #E6E6E6;
    background:rgba(255,255,255,1);
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
  .coupon-content{
    margin-top:45px;
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
