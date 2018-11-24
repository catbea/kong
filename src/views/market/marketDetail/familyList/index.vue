<template>
  <div class="family-list-page">
    <classify></classify>
    <div class="family-list-page-box">
    <market-describe v-for="(item,index) in resInfo" :key="index" :itemInfo="item" @skipDetail="skipDetail"
    :dredge="dredge" >

    </market-describe>
    </div>
  </div>
</template>
<script>
import Classify from 'COMP/Classify/'
import marketService from 'SERVICE/marketService'
import MarketDescribe from 'COMP/MarketDescribe/'
export default {
  components:{
    Classify,
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
  .family-list-page-box{
    margin-top:45px;
  }
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
