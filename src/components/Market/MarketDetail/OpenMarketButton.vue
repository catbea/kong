<template>
  <div class="open-market-button-box" @click="open">
      <div class="open-market-button">
        开通(0.4元/天起)
      </div>
    </div>
</template>
<script>
export default {
  methods:{
    open(){
      this.$router.push("/marketDetail/open")
    }
  }
}
</script>
<style lang="less">
.open-market-button-box{
   width: 100%;
   height: 72px;
   border-top: 1px solid #E6E6E6;
   text-align: center;
   line-height: 72px;
   .open-market-button{
     line-height: 44px;
     display: inline-block;
     width:343px;
    height:44px;
    background:rgba(0,122,230,1);
    border-radius:6px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
   }
 }
</style>