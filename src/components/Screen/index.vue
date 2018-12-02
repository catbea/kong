<template>
  <div class="screen-container">
    <ul class="screen-ul">
      <li class="area" :class="item.index===currentIndex&&'selected'" v-for="item in conf" :key="item.index" @click="itemClickHandler(item)">
        <span>{{item.name}}</span>
        <span class="bg_img" :style="{'backgroundImage':'url(' + (item.index===currentIndex ? arrowUpIcon : arrowDownIcon )  + ')'}"></span>
      </li>
      <li class="sort" @click="false"></li>
    </ul>
    <div class="choose-container">
    <price-filter :show="currentIndex===1" v-model="a"></price-filter>
    </div>

    <!-- <area-filter :data=""></area-filter> -->
    <!-- <accredit-area :domShowInfo="domShowInfo"></accredit-area>
    <sort-way :domShowInfo="domShowInfo"></sort-way> -->
  </div>
</template>
<script>

import AreaFilter from './AreaFilter'
import PriceFilter from './PriceFilter'
import AccreditArea from 'COMP/AccreditArea/'
import SortWay from './SortWay'

export default {
  components: {
    AreaFilter,
    PriceFilter,
    AccreditArea,
    SortWay
  },

  data: () => ({
    conf: [
      { index: 0, name: '区域', checked: false },
      { index: 1, name: '均价', checked: false },
      { index: 2, name: '人气', checked: false },
      { index: 3, name: '区域', checked: false }
    ],
    a:'-1,-1',
    currentIndex: -1,
    sortShow: false,
    accreditShow: false,
    showData: 1,
    domShowInfo: {
      liShow: false,
      domShow: false,
      sortShow: false
    },
    defaultAvatar: require('IMG/market/list__arrow_@2x.png'),
    arrowUpIcon: require('IMG/market/listArrowUp.png'),
    arrowDownIcon: require('IMG/market/listArrowDown.png')
  }),
  methods: {
    itemClickHandler (val) {
      this.currentIndex = val.index === this.currentIndex ? -1 : val.index
      if (this.currentIndex !== -1) {
        document.getElementsByClassName('choose-container')[0].style.height = (document.body.offsetHeight
          - document.getElementsByClassName('search-box')[0].offsetHeight
          - document.getElementsByClassName('screen-container')[0].offsetHeight
          - document.getElementsByClassName('tabbar')[0].offsetHeight)/37.5+'rem'
      }else{
        document.getElementsByClassName('choose-container')[0].style.height = 0
      }
    }
  }
}
</script>
<style lang="less">
.screen-container {
  position: relative;
  > .screen-ul {
    display: flex;
    justify-content: space-between;
    width: 357px;
    height: 32px;
    padding-top: 12px;
    background: rgba(255, 255, 255, 1);
    background-position: center;
    background-repeat: no-repeat;
    padding-left: 18px;
    li {
      display: flex;
      span {
        display: block;
        font-size: 14px;
        font-weight: 400;
      }
      span:nth-child(2) {
        width: 16px;
        height: 16px;
        margin-top: 3px;
      }
    }
    .sort {
      width: 16px;
      height: 17px;
      background: url('../../assets/img/market/Combined Shape@2x.png') no-repeat;
      background-size: contain;
      margin-right: 13px;
    }
  }
  > .choose-container {
    position: absolute;
    background-color: rgba(0, 0, 0, .6);
    width: 100%;
    // height: 500vw;
  }
}
// .active1 {
//   color: rgba(0, 122, 230, 1);
// }
// .active2 {
//   background: rgba(0, 122, 230, 1);
// }
</style>
