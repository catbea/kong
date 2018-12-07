<template>
  <div class="user-myCoupon-page">
    
      <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6" sticky animated>
          <van-tab v-for="(item,index) in nameList" :key="index" :title="item.title+item.num">
            <keep-alive>
              <van-list :offset="100" v-model="loading" :finished="item.finished" :finished-text="'没有更多了'"   @load="onLoad">
                <!-- <div class="coupon-content"> -->
                <coupon-item :ps="list.ps" v-for="(item1,index) in item.list" :key="index" :info="item1"></coupon-item>
                <!-- </div> -->
                 </van-list>
            </keep-alive>
          </van-tab>
      </van-tabs>
    <div v-if="false" class="not-available bg_img" :style="{backgroundImage:'url('+availableImg+')'}"></div>
    <p v-if="false" class="hint">暂无优惠券</p>
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
      {title:"未使用",num:0,list:[],index:0,agentId:705,page:1,finished:false},
      {title:"使用记录",num:0,list:[],index:1,agentId:705,page:1,finished:false},
      {title:"已过期",num:0,list:[],index:2,agentId:705,page:1,finished:false},
      ],
      activeIndex:0,
     index:null,
    req:{
      agentId:705,
      status:{not:1,recor:2,past:3}
    },
    list:{
     ps:{mayUse:true,yetUse:false,yetPast:false,flag:null},
     info:[]
     },

     promArr:[],
     arrInfo:[],
     availableImg:require('IMG/user/Groupa@2x.png')
    }),
    computed:{

    },
  created() {
    const _this = this
    this.b().then((res)=>{
      _this.nameList[1].num = res.total;
    });
      this.c().then((res)=>{
      _this.nameList[2].num = res.total;
    });

  },
  methods:{
    // 请求数据事件
   async onLoad(){
      let current = this.getCurrentType()
     
         const result = await mycoupons.couponsStatusList(current.agentId, current.index, current.page)
      console.log(result)
      //  if(current.index == 0&& current.page ==1){
        this.nameList[0].num = result.total
      // }
      current.list = current.list.concat(result.records)

      this.$nextTick(()=>{
      console.log(current.page)
      if (result.pages === 0 || current.page === result.pages) 
      {current.finished = true}
      current.page++
      this.loading = false
      })
    },
    getCurrentType(){
      for (let temp of this.nameList){
        if(this.activeIndex===temp.index){
          return temp
        }
      }
    },
     async a(){
        const _this=this
        let p1= new Promise(function(resolve,reject){
          let res =mycoupons.couponsStatusList(
            705,
          0,
          1
        )
        resolve(res)
        })
        return p1
      },
     async b(){
        const _this=this
        let p2= new Promise(function(resolve,reject){
           let res =mycoupons.couponsStatusList(705,1,1)
          resolve(res)
        })
        return p2
      },
     async c(){
        const _this=this
        let p3= new Promise(function(resolve,reject){
           let res =mycoupons.couponsStatusList(
             705,
             2,
             1
        )
        resolve(res)
        });
        return p3
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
