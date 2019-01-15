<template>
  <div class="screen-container">
    <ul class="screen-ul">
      <li class="area" :class="item.index===currentIndex&&'selected'" v-for="item in conf" :key="item.index" @click="itemClickHandler(item)">
        <span class="value-content">{{(item.value ===''||item.value ==='不限')?item.name:item.value}}</span>
        <span class="bg_img" :style="{'backgroundImage':'url(' + (item.index===currentIndex ? arrowUpIcon : arrowDownIcon )  + ')'}"></span>
      </li>
      <li class="sort" @click="currentIndex = currentIndex===4?-1:4"></li>
    </ul>
    <div class="choose-container" @click="coverClickHandler">
      <area-filter :show="currentIndex===0" :parent="localCity" v-model="filters.baseFilters.area" @checkedText="areaStrChange"></area-filter>
      <price-filter :show="currentIndex===1" v-model="filters.baseFilters.aveprice" @checkedText="priceStrChange"></price-filter>
      <popularity-filter :show="currentIndex===2" v-model="filters.baseFilters.popularity" @checkedText="popularityStrChange"></popularity-filter>
      <more-filter :show="currentIndex===3" v-model="filters.moreFilters" @confirm="confirmHandler"></more-filter>
      <sort-way :show="currentIndex===4" v-model="filters.baseFilters.sort" @input="sortChangeHandler"></sort-way>
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
    height: { type: String, default: '14rem' }
  },
  components: {
    AreaFilter,
    PriceFilter,
    PopularityFilter,
    MoreFilter,
    SortWay
  },
  data: () => ({
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
    conf: [
      { index: 0, name: '区域', value: '', checked: false },
      { index: 1, name: '均价', value: '', checked: false },
      { index: 2, name: '人气', value: '', checked: false },
      { index: 3, name: '更多', value: '', checked: false }
    ],
    currentIndex: -1,
    arrowUpIcon: require('IMG/market/listArrowUp.png'),
    arrowDownIcon: require('IMG/market/listArrowDown.png')
  }),
  created() {
    if (this.local === '') {
      this.localCity = this.userInfo.majorCity !== '' ? this.userInfo.majorCity : ''
    } else {
      this.localCity = this.local
    }
  },
  methods: {
    itemClickHandler(val) {
      this.currentIndex = val.index === this.currentIndex ? -1 : val.index
      console.log(11111111111111);
      this.$emit('screen',val.index)
    },
    coverClickHandler() {
      // this.currentIndex = -1
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
        this.$emit('sor',true)
      } else {
        document.getElementsByClassName('choose-container')[0].style.height = 0
        this.$emit('sor',false)
      }
    },
    local(val) {
      this.localCity = val
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userArea'])
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
    margin-bottom: 5px;
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
      span:nth-child(2) {
        width: 16px;
        height: 16px;
        margin-top: 1px;
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
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    overflow: hidden;
  }
}
</style>
