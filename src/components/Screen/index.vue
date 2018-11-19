<template>
  <ul class="home-screen-box">
      <li class="area" @click="area()">
          <span :class="{active1:showData==1}">区域</span>
          <span :class="{active2:showData==1}"></span>
        </li>
        <li class="average-price" @click="average()">
          <span :class="{active1:showData==2}">均价</span>
          <span :class="{active2:showData==2}"></span>
        </li>
        <li class="popularity" @click="popularity()">
          <span :class="{active1:showData==3}">均价</span>
          <span :class="{active2:showData==3}"></span>
        </li>
        <li class="state" @click="state()">
          <span :class="{active1:showData==4}">状态</span>
          <span :class="{active2:showData==4}"></span>
        </li>
        <li class="sort"></li>
    </ul>
</template>
<script>
export default {
  data:_=>({
    showData:1
  }),
  methods:{
    area(){
      this.showData=1
    },
    average(){
      this.showData=2
    },
    popularity(){
      this.showData=3
    },
    state(){
      this.showData=4
    }
  }
}
</script>
<style lang="less">
.active1{
      color:rgba(0,122,230,1);
    }
    .active2{
      background:rgba(0,122,230,1);
    }
.home-screen-box{
    display: flex;
    justify-content: space-between;
    width:357px;
    height:32px;
    padding-top: 12px;
    background:rgba(255,255,255,1);
    border-bottom:solid 1px #DFDFDF;
    padding-left: 18px;
    li{
      display: flex;
    span{
      display:block;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      line-height:20px;
      }
      span:nth-child(2){
          width: 16px;
          height: 16px;
          border: 1px solid black;
        }
    }
    .sort{
      width: 16px;
      height: 17px;
      background: url("../../assets/img/market/Combined Shape.png") no-repeat;
      margin-right: 13px;
    }
  }
</style>
