<template>
 <div>
  <ul class="home-screen-box">
      <li class="area" @click="area()">
          <span :class="{active1:showData==1}">区域</span>
          <span :class="{active2:showData==1}" :style="{'background':'url(' + defaultAvatar + ')','background-size':'contain'}"></span>
        </li>
        <li class="average-price" @click="average()">
          <span :class="{active1:showData==2}">均价</span>
          <span :class="{active2:showData==2}" :style="{'background':'url(' + defaultAvatar + ')','background-size':'contain'}"></span>
        </li>
        <li class="popularity" @click="popularity()">
          <span :class="{active1:showData==3}">人气</span>
          <span :class="{active2:showData==3}" :style="{'background':'url(' + defaultAvatar + ')','background-size':'contain'}" ></span>
        </li>
        <li class="state" @click="state()">
          <span :class="{active1:showData==4}">状态</span>
          <span :class="{active2:showData==4}" :style="{'background':'url(' + defaultAvatar + ')','background-size':'contain'}"></span>
        </li>
        <li class="sort" @click="sort"></li>
    </ul>
    <accredit-area  :domShowInfo="domShowInfo"></accredit-area>
    <sort-way :domShowInfo="domShowInfo"></sort-way>
 </div>
</template>
<script>
import AccreditArea from 'COMP/AccreditArea/'
import SortWay from './SortWay'

export default {
  components:{
    AccreditArea,
    SortWay
  },
  data: _ => ({
    sortShow:false,
    accreditShow:false,
    showData: 1,
    domShowInfo:{
      liShow:false,
      domShow:false,
      sortShow:false
    },
    defaultAvatar: require('IMG/market/list__arrow_@2x.png'),
  }),
  methods: {
    sort(){
      this.domShowInfo.sortShow=true,
      this.domShowInfo.domShow=false,
      this.showData=null
    },
    area() {
      this.showData = 1,
      // this.activeShow=false,
      this.domShowInfo.domShow=true,
      this.domShowInfo.liShow=true,
      this.domShowInfo.sortShow=false
    },
    average() {
      this.showData = 2,
      // this.activeShow=false,
      this.domShowInfo.domShow=true,
      this.domShowInfo.liShow=true,
      this.domShowInfo.sortShow=false
    },
    popularity() {
      this.showData = 3,
      // this.activeShow=true,
      this.domShowInfo.domShow=true,
      this.domShowInfo.liShow=false,
      this.domShowInfo.sortShow=false
    },
    state() {
      this.showData = 4,
      // this.activeShow=false,
      this.domShowInfo.domShow=true,
      this.domShowInfo.liShow=true,
      this.domShowInfo.sortShow=false
    }
  }
}
</script>
<style lang="less">
.active1 {
  color: rgba(0, 122, 230, 1);
}
.active2 {
  background: rgba(0, 122, 230, 1);
}
.home-screen-box {
  display: flex;
  justify-content: space-between;
  width: 357px;
  height: 32px;
  padding-top: 12px;
  background: rgba(255, 255, 255, 1);
  border-bottom: solid 1px #dfdfdf;
  padding-left: 18px;
  li {
    display: flex;
    span {
      display: block;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      line-height: 20px;
    }
    span:nth-child(2) {
      width: 16px;
      height: 16px;
      border: 1px solid black;
    }
  }
  .sort {
    width: 16px;
    height: 17px;
    background: url('../../assets/img/market/Combined Shape@2x.png') no-repeat;
    background-size:contain;
    margin-right: 13px;
  }
}
</style>
