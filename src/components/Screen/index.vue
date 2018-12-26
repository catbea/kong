<template>
  <div class="screen-container">
    <ul class="screen-ul">
      <li class="area" :class="item.index===currentIndex&&'selected'" v-for="item in conf" :key="item.index" @click="itemClickHandler(item)">
        <span>{{item.name}}</span>
        <span class="bg_img" :style="{'backgroundImage':'url(' + (item.index===currentIndex ? arrowUpIcon : arrowDownIcon )  + ')'}"></span>
      </li>
      <li class="sort" @click="currentIndex = currentIndex===4?-1:4"></li>
    </ul>
    <div class="choose-container" @click="coverClickHandler">
      <area-filter :show="currentIndex===0" :parent="localCity" v-model="filters.baseFilters.area"></area-filter>
      <price-filter :show="currentIndex===1" v-model="filters.baseFilters.aveprice"></price-filter>
      <popularity-filter :show="currentIndex===2" v-model="filters.baseFilters.popularity"></popularity-filter>
      <more-filter :show="currentIndex===3" v-model="filters.moreFilters"></more-filter>
      <sort-way :show="currentIndex===4" v-model="filters.baseFilters.sort"></sort-way>
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
import { getAreaCode, getChildren, fullArea } from '@/utils/fullArea'
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
        aveprice: '-1,-1',
        popularity: '-1,-1',
        sort: ''
      },
      localCity: '',
      moreFilters: {}
    },
    conf: [{ index: 0, name: '区域', checked: false }, { index: 1, name: '均价', checked: false }, { index: 2, name: '人气', checked: false }, { index: 3, name: '更多', checked: false }],
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
    },
    coverClickHandler() {
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
      } else {
        document.getElementsByClassName('choose-container')[0].style.height = 0
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
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    overflow: hidden;
  }
}
</style>
