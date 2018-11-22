<template>
  <div class="market-detail-correction-page">
    <div class="market-detail-correction-page-top">
      <p>请选择错误类型</p>
    <ul>
      <li>价格错误 <span></span></li>
      <li>位置错误 <span></span></li>
      <li>开盘错误 <span></span></li>
      <li>预计交房错误 <span></span></li>
      <li>其他错误 <span></span></li>
    </ul>
    <p>反馈内容</p>
    </div>
   <form action="">
     <textarea name="" id="" cols="30" rows="10"></textarea>
   </form>
  </div>
</template>
<script>
export default {
  data:()=>({
                
            }),
  methods:{
    submit(){
      // if(thisform.txt.value.length>50)thisform.txt.value=thisform.txt.value.substring(0,50)
    }
  },
}
</script>
<style lang="less">
.market-detail-correction-page{
  width: 100%;
  height: 100%;
  background:rgba(247,249,250,1);
  .market-detail-correction-page-top{
    background:rgba(255,255,255,1);
    p:nth-of-type(1),p:nth-of-type(2){
      height:45px;
      font-size:15px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:45px;
      background:rgba(247,249,250,1);
      margin-left:15px;
    }
  ul{
    li{
      display: flex;
      justify-content: space-between;
      margin-left:15px;
      width:345px;
      height:22px;
      padding:17px 0;
      font-size:16px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:22px;
      span{
        width: 22px;
        height:22px;
        border: 1px solid #EEEEEE;
        border-radius:50%;
      }
    }
  }
  }
}
</style>
