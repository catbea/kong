<template>
  <div class="market-detail-info-middle-page">
    <div class="middle-info-box" >
    <ul>
      <li v-for="(item,index) in info" :key="index">
        <div>{{item.left}}</div>
        <div>{{item.centent}}</div>
        <div>{{item.right}}</div>
      </li>
    </ul>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    info:{
      type:Array,
      default:function () {return[]}
    }
  }
}
</script>
<style lang="less">
.market-detail-info-middle-page{
  width:375px;
  .middle-info-box{
    padding: 0 0 0 15px;
    width: 360px;
    background: #FFFFFF;
    ul{
      width: 340px;
      overflow: hidden;
      border-bottom: 1px solid #EEEEEE;
      margin-right: 15px;
      li{
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:normal;
        display: flex;
        justify-content: space-between;
        margin: 10px 0 10px 0;
        div{
          width: 120px;
        }
        // margin-bottom: 17px;
        // div:nth-child(1){
        //   width: 100px;
        //   font-size:14px;
        // font-family:PingFangSC-Regular;
        // font-weight:400;
        // color:rgba(150,158,168,1);
        // line-height:normal;
        // }
        //  div:nth-child(2){
        //    width: 220px;
        //    font-size:14px;
        //   font-family:PingFangSC-Regular;
        //   font-weight:400;
        //   color:rgba(51,51,51,1);
        //   line-height:normal;
        // } 
        // div:nth-child(3){
        //    width: 220px;
        //    font-size:14px;
        //   font-family:PingFangSC-Regular;
        //   font-weight:400;
        //   color:rgba(51,51,51,1);
        //   line-height:normal;
        // } 
      }
    }
  }
}
</style>
