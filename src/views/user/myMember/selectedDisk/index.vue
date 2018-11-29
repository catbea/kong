<template>
  <div class="my-preference-page">
    <div style="margin-left:16px;margin-top:7px">
    <van-search :obj="searchInfo"></van-search>
    </div>
    <div style="margin-left:16px">
    <screen></screen>
    </div>
    <div class="market-box">
    <vip-market v-for="(item,index) in dataArr" :key="index" :dataArr="item"></vip-market>
    </div>
    <div class="check-all-box">
      <div class="img-box">
      <span class="icon-wait bg_img" :style="{backgroundImage:'url('+waitImg+')'}"></span>
     待选楼盘 (8/10)
      </div>
      <router-link tag="p" to="/user/mypreference/openPreference" class="check-all-button">开通</router-link>
    </div>
  </div>
</template>
<script>
import VanSearch from 'COMP/VanSearch/'
import Screen from 'COMP/Screen/'
import VipMarket from './VipMarket.vue'
export default {
  components:{
    VanSearch,
    Screen,
    VipMarket
  },
  data:()=>({
    searchInfo:{
     siteText:"全国",
     placeholderText:"请输入楼盘"
   },
    waitImg:require('IMG/user/alreadyBuy/wait@2x.png'),
   dataArr:[
     {title:"龙光·久钻",site:"深圳 南山 120000元/㎡", condition:["热销中","地铁房","低密度"],open:"125次开通",price:"1%+5万元/套"},
     {title:"龙光·久钻",site:"深圳 南山 120000元/㎡", condition:["热销中","地铁房","低密度"],open:"125次开通",price:"1%+5万元/套"},
     {title:"龙光·久钻",site:"深圳 南山 120000元/㎡", condition:["热销中","地铁房","低密度"],open:"125次开通",price:"1%+5万元/套"},
     {title:"龙光·久钻",site:"深圳 南山 120000元/㎡", condition:["热销中","地铁房","低密度"],open:"125次开通",price:"1%+5万元/套"}
   ]
  })
}
</script>
<style lang="less">
.my-preference-page{
  .market-box{
    margin:0 0 60px 16px;
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
        .icon-wait{
      width:20px;
      height:17px;
      margin:0 5px 0 16px;
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
