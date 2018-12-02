<template>
  <div class="user-myCoupon-page">
    
      <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6" sticky animated>
          <van-tab v-for="(item,index) in nameList" :key="index" :title="item.title+item.num">
            <keep-alive>
              <van-list v-model="loading" :finished="finished" :finished-text="'没有更多了'" :offset="300" @load="onLoad">
                <div class="coupon-content">
                <coupon-item :ps="list.ps" v-for="(item,index) in recordArr.records" :key="index" :info="item"></coupon-item>
                </div>
                 </van-list>
            </keep-alive>
          </van-tab>
      </van-tabs>
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
    loading:false,
    finished:false,
    nameList:[
      {title:"未使用",num:0},
      {title:"使用记录",num:0},
      {title:"已过期",num:0}
      ],
      activeIndex:0,
      aa:[],
     index:null,
    req:{
      agentId:705,
      status:{not:1,recor:2,past:3}
    },
    list:{
     ps:{mayUse:true,yetUse:false,yetPast:false,flag:null},
     info:[]
     },
     notArr:{records:[]},
     recordArr:{records:[]},
     pastArr:{records:[]},
     availableImg:require('IMG/user/Groupa@2x.png')
    }),
    computed:{
      infoLength(){
       return this.list.info.length
      },
      notnum(){
        return notArr.length
      },
      recordnum(){
        return recordArr.length
      },
      pastnum(){
        return pastArr.length
      },
    },
  created() {
    // this.couponsList(705,1)
    
  },
  methods:{
    // 请求数据事件
   async onLoad(){
      console.log(99999)
      this.all()
      let ym= this.recordArr.current
      // this.b(705,2,2)
      ym++
      console.log(ym)
      if(this.recordArr.pages===ym){
        this.finished=false
      }
      this.loading=false
    },
      a(){
        const _this=this
        let p1= new Promise(function(resolve,reject){
          //  _this.couponsList(705,1)
          let res =mycoupons.couponsStatusList(
            705,
          1,
          1
        )
        resolve(res)
        })
        return p1
      },
      b(agentId,status,current){
        const _this=this
        let p2= new Promise(function(resolve,reject){
           let res =mycoupons.couponsStatusList(agentId,status,3)
          resolve(res)
        })
        return p2
      },
      c(){
        const _this=this
        let p3= new Promise(function(resolve,reject){
           let res =mycoupons.couponsStatusList(
             705,
             3,
             1
        )
        resolve(res)
        });
        return p3
      },
      all(){
        let _this=this
        Promise.all([this.a(),this.b(),this.c()])
        .then(function(r){
          console.log(r)
            _this.notArr=r[0]
            _this.recordArr=r[1]
            _this.pastArr=r[2]
        })
      },                                                                               
      // async promiseHandle(){
      // let notHandle =  this.couponsList(this.req.agentId,this.req.status.not)
      // Promise.all([notHandle])
      // },
      // 初始时请求事件

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
