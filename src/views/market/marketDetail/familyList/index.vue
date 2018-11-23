<template>
  <div class="family-list-page">
    <ul class="family-list-page-ul">
      <li :class="{active:num==1}" @click="activeA(1)">全部</li>
      <li :class="{active:num==2}" @click="activeB(2)">一室</li>
      <li :class="{active:num==3}" @click="activeC(3)">二室</li>
      <li :class="{active:num==4}" @click="activeD(4)">三室</li>
    </ul>
    <market-describe v-for="(item,index) in resInfo" :key="index" :itemInfo="item" @skipDetail="skipDetail"
    :dredge="dredge" >

    </market-describe>
  </div>
</template>
<script>
import marketService from 'SERVICE/marketService'
import MarketDescribe from 'COMP/MarketDescribe/'
export default {
  components:{
    MarketDescribe
  },
  created () {
    this.getMarketDescribeInfo()
  },
  data:()=>({
    num:null,
    resInfo:null,
    dredge:false
  }),
  methods:{
    activeA(){
      this.num=1
    },
    activeB(){
      this.num=2
    },
    activeC(){
      this.num=3
    },
    activeD(){
      this.num=4
    },
    async getMarketDescribeInfo () {
      const res = await marketService.getMarketDescribe()
      console.log(res.records)
      this.resInfo = res.records
    }
  }
}
</script>
<style lang="less">
.family-list-page{
  .family-list-page-ul{
    height: 44px;
    width: 375px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #DDDDDD;
    .active{
      color:rgba(0,122,230,1) !important;
    }
    li{
      font-size:14px;
      font-family:PingFang-SC-Regular;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:20px;
    }
  }
}
</style>
