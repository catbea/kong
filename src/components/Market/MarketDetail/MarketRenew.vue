<template>
  <div class="market-renew-box">
      <ul class="market-renew-box-recommend">
      <li class="market-renew-box-recommend-icon"></li>
      <li class="market-renew-box-recommend-text">推荐</li>
      </ul>
    <ul class="market-renew-box-show">
      <li class="market-renew-box-show-icon"></li>
      <li class="market-renew-box-show-text">展示</li>
    </ul>
    <ul class="market-renew-box-stick">
      <li class="market-renew-box-stick-icon"></li>
      <li class="market-renew-box-stick-text">置顶</li>
    </ul>
    <div class="market-renew-box-button">续费(07/11到期)</div>
</div>
</template>
<script>
export default {
  
}
</script>
<style lang="less">
.market-renew-box{
display: flex;
width:375px;
height:57px;
padding-top: 14px;
background:rgba(255,255,255,1);
border-top: 1px solid #E6E6E6;
.market-renew-box-recommend{
margin:0 34px 0 25px;

.market-renew-box-recommend-icon{
width: 14px;
height: 19px;
}
.market-renew-box-recommend-text{
font-size:11px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(153,153,153,1);
height: 16px;
}
}
.market-renew-box-show{
margin-right: 34px;
.market-renew-box-show-icon{
width: 18px;
height: 18px;
}
.market-renew-box-show-text{
font-size:11px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(153,153,153,1);
height: 16px;
}
}
.market-renew-box-stick{
margin-right: 34px;
.market-renew-box-stick-icon{
width: 15px;
height: 19px;
}
.market-renew-box-stick-text{
font-size:11px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(153,153,153,1);
height: 16px;
}
}
.market-renew-box-button{
width:156px;
height:44px;
border-radius:6px;
border:1px solid;
line-height: 44px;
text-align: center;
font-size:14px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(0,122,230,1);
margin-left: 7px;
}
}
</style>