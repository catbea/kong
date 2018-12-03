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
      <area-filter :show="currentIndex===0" :parent="local" v-model="baseFilters.area"></area-filter>
      <price-filter :show="currentIndex===1" v-model="baseFilters.price"></price-filter>
      <popularity-filter :show="currentIndex===2" v-model="baseFilters.popularity"></popularity-filter>
      <more-filter :show="currentIndex===3" v-model="moreFilters"></more-filter>
    </div>
  </div>
</template>
<script>

import AreaFilter from './AreaFilter'
import PriceFilter from './PriceFilter'
import PopularityFilter from './PopularityFilter'
import MoreFilter from './MoreFilter'


import SortWay from './SortWay'
import { getAreaCode, getChildren, fullArea } from '@/utils/fullArea'

export default {
  components: {
    AreaFilter,
    PriceFilter,
    PopularityFilter,
    MoreFilter,
    SortWay
  },

  data: () => ({
    conf: [
      { index: 0, name: '区域', checked: false },
      { index: 1, name: '均价', checked: false },
      { index: 2, name: '人气', checked: false },
      { index: 3, name: '更多', checked: false }
    ],
    baseFilters:{
      area: '',
      price:'-1,-1',
      popularity: '-1,-1'
    },
    moreFilters:{

    },
    local: '武汉市',
    currentIndex: -1,
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
          - document.getElementsByClassName('tabbar')[0].offsetHeight) / 37.5 + 'rem'
      } else {
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
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    overflow: hidden;
  }
}
</style>
