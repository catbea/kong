<template>
  <div class="my-preference-page">
    <div style="margin-left:16px;margin-top:7px">
    <van-search :obj="searchInfo"></van-search>
    </div>
    <div style="margin-left:16px">
    <screen></screen>
    </div>
    <div class="market-box">
    <meal-market  v-for="(item,index) in dataArr" :key="index" :dataArr="item" :indexData="index" :showData="showArr.indexOf(index) >-1" @click.native="selectHandle(index)"></meal-market>
    </div>
    <div class="report-confirm" v-if="type">
      <p>确定</p>
    </div>

    <div class="check-all-box" v-if="!type">
      <div class="img-box">
      <span class="icon-check bg_img" :style="{backgroundImage:'url('+(checkShow?checkColorImg:checkImg)+')'}" @click="allSelectHandle"></span>
      全选
      </div>
      <router-link tag="p" to="/user/mypreference/openPreference" class="check-all-button">开通</router-link>
    </div>
  </div>
</template>
<script>
import VanSearch from 'COMP/VanSearch/'
import Screen from 'COMP/Screen/'
import MealMarket from './MealMarket.vue'
export default {
  components:{
    VanSearch,
    Screen,
    MealMarket
  },
  created() {
    this.arrLength()
  },
  data:()=>({
    type:null,
    dataArrLength:null,
    showArr:[],
    searchInfo:{
     siteText:"全国",
     placeholderText:"请输入楼盘"
   },
    checkImg:require('IMG/user/mealMarket/check@2x.png'),
    checkColorImg:require('IMG/user/mealMarket/checkColor@2x.png'),
    checkShow:false,
   dataArr:[
     {title:"龙光·久钻",site:"深圳 南山 120000元/㎡", condition:["热销中","地铁房","低密度"],open:"125次开通",price:"1%+5万元/套"},
     {title:"龙光·久钻",site:"深圳 南山 120000元/㎡", condition:["热销中","地铁房","低密度"],open:"125次开通",price:"1%+5万元/套"},
     {title:"龙光·久钻",site:"深圳 南山 120000元/㎡", condition:["热销中","地铁房","低密度"],open:"125次开通",price:"1%+5万元/套"},
     {title:"龙光·久钻",site:"深圳 南山 120000元/㎡", condition:["热销中","地铁房","低密度"],open:"125次开通",price:"1%+5万元/套"}
   ]
  }),
  methods:{
    selectHandle(index){
      console.log(11)
      if(this.showArr.indexOf(index) == -1){
        this.showArr.push(index)
      }else{
        console.log(index)
        this.showArr=this.showArr.filter((item)=>{
          return item != index
        })
      }
    },
    allSelectHandle(){
      this.checkShow=! this.checkShow
      if(this.showArr.length>=this.dataArrLength){
        this.showArr=this.showArr.splice(0,0)
      }else{
        this.showArr=this.showArr.splice(0,0)
        for (let index = 0; index < this.dataArr.length; index++) {
        this.showArr.push(index)
      }
      }
      console.log(this.showArr.length)
      console.log(this.showArr)
    },
    arrLength(){
      this.dataArrLength=this.dataArr.length
      switch (this.$route.query) {
        case "report":
          this.type=true
          break;
        case "open":
          this.type=false
          break;
        default:
          break;
      }
    }
  }
}
</script>
<style lang="less">
.my-preference-page{
  .market-box{
    margin:0 0 60px 16px;
  }
  .report-confirm{
    border-top:1px solid #E6E6E6;
    display:flex;
    justify-content: center;
    align-items:center;
    width:100%;
    height:60px;
    position: fixed;
    bottom:0;
    P{
      width:72px;
      height:30px;
      border-radius:22px;
      border:1px solid rgba(0,122,230,1);
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(0,122,230,1);
      text-align:center;
      line-height:30px;
    }
  }
  .check-all-box{
    background:rgba(255,255,255,1);
    width:100%;
    height:60px;
    display:flex;
    justify-content: space-between;
    align-items:center;
    position: fixed;
    bottom:0;
    .img-box{
      display: flex;
      font-size:12px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
    }
        .icon-check{
      width:18px;
      height:18px;
      margin:0 16px;
    }
    .check-all-button{
      margin-right:32px;
      width:72px;
      height:30px;
      border-radius:22px;
      border:1px solid;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(0,122,230,1);
      line-height:30px;
      text-align: center;
    }
  }
}
</style>
