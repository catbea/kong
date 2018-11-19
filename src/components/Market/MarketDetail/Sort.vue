<template>
  <ul class="detail-screen-box">
      <li class="screen-market" @click="market()">
         <span :class="{active1:showData==1}">楼盘</span>
          <span :class="{active2:showData==1}"></span>
        </li>
        <li class="market-type" @click="type()">
          <span :class="{active1:showData==2}">户型</span>
          <span :class="{active2:showData==2}"></span>
        </li>
        <li class="market-site" @click="site()">
          <span :class="{active1:showData==3}">位置</span>
          <span :class="{active2:showData==3}"></span>
        </li>
        <li class="market-nearby" @click="nearby()">
          <span :class="{active1:showData==4}">周边</span>
          <span :class="{active2:showData==4}"></span>
        </li>
        <li class="recommend" @click="recommend()">
          <span :class="{active1:showData==5}">推荐</span>
          <span :class="{active2:showData==5}"></span>
        </li>
    </ul>
</template>
<script>
export default {
  data:_=>({
    showData:1
  }),
  methods:{
    market(){
      this.showData=1
    },
    type(){
      this.showData=2
    },
    site(){
      this.showData=3
    },
    nearby(){
      this.showData=4
    },
    recommend(){
      this.showData=5
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
.detail-screen-box{
    display: flex;
    justify-content: space-between;
    width:375px;
    height:44px;
    background:rgba(255,255,255,1);
    border-bottom: 1px solid #DDDDDD;
    position: fixed;
    z-index: 10;
    .screen-market,.market-type,.market-site,.market-nearby,.recommend{
      width: 75px;
      height: 44px;
      text-align: center;
      span:nth-child(1){
        display: block;
        font-size:14px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        // color:#333333;
        margin-top: 11px;
        height: 20px;
        }
        span:nth-child(2){
          display: block;
        font-size:14px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        // background:#FFFFFF;
        margin: 3px 0 0 28px;
          height: 3px;
          width: 20px;
          border-radius:2px;
        }
    }
  }
</style>
