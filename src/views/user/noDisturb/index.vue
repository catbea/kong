<template>
  <div class="no-disturb-page">
    <div class="no-disturb-page-top">
      <div class="disturb-box">
        勿扰模式
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data:()=>({})
}
</script>
<style lang="less">
.no-disturb-page{
  background:rgba(247,249,250,1);
  .no-disturb-page-top{
    margin-top:10px;
    padding:18px 15px 7px 14px; 
    height:56px;
    background:rgba(255,255,255,1);
    .disturb-box{
      font-size:15px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:21px;
    }
  }
}
</style>
