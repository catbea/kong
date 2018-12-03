<template>
  <div class="user-myCoupon-page">
    
      <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6" sticky animated>
          <van-tab v-for="(item,index) in nameList" :key="index" :title="item.title+item.num">
            <keep-alive>
              <van-list :offset="300" v-model="loading" :finished="item.finished" :finished-text="'没有更多了'"   @load="onLoad">
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
    // this.couponsList(705,1)
    const _this = this
    this.a().then((res)=>{
     
      _this.nameList[0].num = res.total;
      // _this.nameList[0].list  = _this.nameList[0].list.concat(res.records);

      // //  _this.loading = false;
      // if(res.current === res.pages){
      //   _this.finished = true
      //   console.log(11)
      // }
    });
          
          
    //      this.getDataDetail(agentId,status,current).then((res)=>{
    //   console.log(res,0)
     
    //   _this.nameList[0].num = res.total;
    //   _this.nameList[0].list  = _this.nameList[0].list.concat(res.records);

    //    _this.loading = false;
    //   if(res.current === res.pages){
    //     _this.finished = true
    //     console.log(11)
    //   }
    // })

    this.b().then((res)=>{
     
      _this.nameList[1].num = res.total;
      // _this.nameList[1].list  = _this.nameList[1].list.concat(res.records);

      //  _this.loading = false;
      // if(res.current === res.pages){
      //   _this.finished = true
      //   console.log(11)
      // }
    });
      this.c().then((res)=>{
     
      _this.nameList[2].num = res.total;
      // _this.nameList[2].list  = _this.nameList[2].list.concat(res.records);

      //  _this.loading = false;
      // if(res.current === res.pages){
      //   _this.finished = true
      //   console.log(11)
      // }
    });

  },
  methods:{
    // 请求数据事件
   async onLoad(){
      console.log(99999)
      // let current = this.getCurrentType()
      // current.list=current.concat(this.a())
      // this.all()
      let current = this.getCurrentType()
         const result = await mycoupons.couponsStatusList(current.agentId, current.index, current.page)
      console.log(result)
      current.list = current.list.concat(result.records)
      
      console.log(current.page)
      if (result.pages === 0 || current.page === result.pages) 
      {current.finished = true}
      current.page++
      this.loading = false

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
          //  _this.couponsList(705,1)
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
    //  async all(){
        
    //     let _this=this
    //     Promise.all([this.a(),this.b(),this.c()])
    //     .then(function(r){
    //       console.log(r)
    //       _this.promArr=r
    //       console.log(_this.promArr)
    //         // _this.notArr=r[0]
    //         // _this.recordArr=r[1]
    //         // _this.pastArr=r[2]
    //         // _this.onLoad()
    //         if(_this.activeIndex==0){
    //         _this.arrInfo=_this.promArr[0]
    //       }else if(_this.activeIndex==1){
    //         _this.arrInfo=_this.promArr[1]
    //       }else{
    //         _this.arrInfo=_this.promArr[2]
    //       }
    //   // if(this.recordArr.pages===ym){
    //   //   this.finished=false
    //   // }
    //       console.log(_this.promArr,11111,_this.arrInfo)
    //       _this.loading=false
    //       _this.finished=false
     
    //     })
    //   },                                                                               
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
