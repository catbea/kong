<template>
  <div class="all-market-type-box">
     <ol class="market-type-box" v-for="(item,index) in list" :key="index">
      <li class="market-type-img">

      </li>
      <li class="market-type-box-top">3室2厅1卫</li>
      <li class="market-type-box-middle">建面 120㎡ 南北朝向</li>
      <li class="market-type-box-bottom">约320万/套</li>
     </ol>
    </div>
</template>
<script>
export default {
  data: _ => ({
    list:[1,2,3,4],
  }),
}
</script>
<style lang="less">
.all-market-type-box{
    display: flex;
    overflow-x: auto;
    width:351px;
   .market-type-box{
     width: 160px;
     margin-right: 12px;
     .market-type-img{
       width: 160px;
       height: 120px;
       border: 1px solid;
       margin-bottom:4px;
     }
     .market-type-box-top{
       height: 18px;
       font-size:16px;
      font-weight:500;
      font-family:PingFangSC-Medium;
      color:rgba(51,51,51,1);
      margin-top: 7px;
     }
     .market-type-box-middle{
       height: 14px;
       font-size:12px;
      font-weight:400;
      color:rgba(51,51,51,1);
      margin-top: 7px;
     }
     .market-type-box-bottom{
       height: 17px;
      font-size:12px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(153,153,153,1);
      margin-top: 7px;
     }
   }
  }
</style>