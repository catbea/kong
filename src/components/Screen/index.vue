<template>
  <div class="screen-container">
    <ul class="screen-ul">
      <li class="area" :class="item.index===currentIndex&&'selected'" v-for="item in conf" :key="item.index" @click="itemClickHandler(item)">
        <span class="value-content" :class="{active:item.flag}">{{(item.value ===''||item.value ==='不限')?item.name:item.value}}</span>
        <span v-show="item.index==3&&num" :class="{active:item.flag}">({{num}})</span>
        <span class="bg_img" :style="{'backgroundImage':'url(' + (item.index===currentIndex ? arrowUpIcon : arrowDownIcon )  + ')'}"></span>
      </li>
      <li class="bg_img sort" v-show="showSort"  @click="sortHandle" :style="{'backgroundImage':'url('+(sortFlage?sortColorImg:sortImg)+')'}"></li>
    </ul>
    <div class="van-hairline--top choose-container">
      <area-filter :show="currentIndex===0" :parent="localCity" v-model="filters.baseFilters.area" @activeHandle="areaColorHandle" @checkedText="areaStrChange"></area-filter>
      <price-filter :show="currentIndex===1" v-model="filters.baseFilters.aveprice" @activeHandle="priceColorHandle" @checkedText="priceStrChange"></price-filter>
      <popularity-filter :show="currentIndex===2" v-model="filters.baseFilters.popularity" @activeHandle="popularityColorHandle" @checkedText="popularityStrChange"></popularity-filter>
      <more-filter :show="currentIndex===3" v-model="filters.moreFilters" @resetNum="resetNumHandle" @numHandle="numHandle" @confirm="confirmHandler"></more-filter>
      <sort-way :show="currentIndex===4" v-model="filters.baseFilters.sort" @activeHandle="sortHandle" @input="sortChangeHandler"></sort-way>
      <div class="prevent" v-show="currentIndex>=0" @click="coverClickHandler"></div>
    </div>
  </div>
</template>
<script>
import AreaFilter from './AreaFilter'
import PriceFilter from './PriceFilter'
import PopularityFilter from './PopularityFilter'
import MoreFilter from './MoreFilter'
import SortWay from './SortWay'
import { mapGetters } from 'vuex'
export default {
  props: {
    value: {
      default: function() {
        return {}
      }
    },
    local: { type: String, default: '' },
    height: { type: String, default: '20rem' },
    showSort: { type: Boolean, default: true}
  },
  components: {
    AreaFilter,
    PriceFilter,
    PopularityFilter,
    MoreFilter,
    SortWay
  },
  data: () => ({
    num: 0,
    filters: {
      baseFilters: {
        area: '',
        aveprice: '-1,-1,-1',
        popularity: '-1,-1',
        sort: ''
      },
      localCity: '',
      moreFilters: {}
    },
    sortFlage: false,
    conf: [
      { index: 0, name: '区域', value: '', checked: false, flag: false },
      { index: 1, name: '均价', value: '', checked: false, flag: false },
      { index: 2, name: '人气', value: '', checked: false, flag: false },
      { index: 3, name: '更多', value: '', checked: false, flag: false }
    ],
    currentIndex: -1,
    arrowUpIcon: require('IMG/market/listArrowUp.png'),
    arrowDownIcon: require('IMG/market/listArrowDown.png'),
    sortImg: require('IMG/market/sort.png'),
    sortColorImg: require('IMG/market/sortColor.png')
  }),
  created() {
    if (this.local === '') {
      this.localCity = this.userInfo.majorCity !== '' ? this.userInfo.majorCity : ''
    } else {
      this.localCity = this.local
    }
  },
  mounted() {
    document.querySelector('.prevent').addEventListener(
      'touchmove',
      this.touchHandler,
      { passive: false }
    )
  },
  methods: {
    touchHandler(e) {
      return e.preventDefault()
    },
    areaColorHandle() {
      this.conf[0].flag = true
    },
    priceColorHandle() {
      this.conf[1].flag = true
    },
    popularityColorHandle() {
      this.conf[2].flag = true
    },
    numHandle(num) {
      //更多
      if (num != 0) {
        this.conf[3].flag = true
      } else {
        this.conf[3].flag = false
      }
      this.num = num
    },
    resetNumHandle() {
      this.num = 0
      this.conf[3].flag = false
    },
    sortHandle() {
      this.currentIndex = this.currentIndex === 4 ? -1 : 4
      this.sortFlage = !this.sortFlage
    },
    itemClickHandler(val) {
      this.currentIndex = val.index === this.currentIndex ? -1 : val.index
      this.sortFlage = false
      this.$emit('screen', val.index)
    },
    coverClickHandler() {
      this.currentIndex = -1
      // console.log(123);
      
    },
    // 区域文字修改
    areaStrChange(val) {
      this.conf[0].value = val
      this.currentIndex = -1
    },
    // 价格文字修改
    priceStrChange(val) {
      this.conf[1].value = val
      this.currentIndex = -1
    },
    // 人气文字修改
    popularityStrChange(val) {
      this.conf[2].value = val
      this.currentIndex = -1
    },
    // 确认个数修改
    confirmHandler() {
      this.currentIndex = -1
    },
    sortChangeHandler() {
      this.currentIndex = -1
    }
  },
  watch: {
    value(val) {
      this.filters = val
    },
    filters: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true
    },
    currentIndex(val) {
      if (val !== -1) {
        document.getElementsByClassName('choose-container')[0].style.height = this.height
        this.$emit('sor', true)
      } else {
        document.getElementsByClassName('choose-container')[0].style.height = 0
        this.$emit('sor', false)
      }
    },
    local(val) {
      this.localCity = val
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userArea'])
  },
  beforeDestroy() {
    try {
      document.querySelector('.prevent').removeEventListener('touchmove',this.touchHandler,false)
    } catch (error) {}
  }
}
</script>
<style lang="less">
.active {
  color: #007ae6;
}
.screen-container {
  position: relative;
  padding-bottom: 4px;
  > .screen-ul {
    display: flex;
    justify-content: space-between;
    // width: 100%;
    height: 32px;
    padding-top: 9px;
    background: rgba(255, 255, 255, 1);
    background-position: center;
    background-repeat: no-repeat;
    line-height: 23px;
    margin: 0 16px 5px 16px;
    li {
      display: flex;
      > .value-content {
        white-space: nowrap;
        max-width: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span {
        display: block;
        font-size: 14px;
        font-weight: 400;
      }
      span:nth-child(3) {
        width: 16px;
        height: 16px;
        margin-top: 3px;
      }
    }
    .sort {
      width: 16px;
      height: 17px;
      // background: url('../../assets/img/market/Combined Shape@2x.png') no-repeat;
      // background-size: contain;
      // margin-right: 13px;
    }
  }
  > .choose-container {
    position: absolute;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    overflow: hidden;
    .prevent {
      height: 3000px;
    }
  }
}
</style>
