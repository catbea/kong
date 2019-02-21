<template>
  <div class="map-search" v-if="info">
    <t-map :latLng="{lat:this.latitude,lng:this.longitude}" :data="mapData" :conf="mapConf"/>
    <div class="bottom-bar">
      <div class="bar-item" v-for="item in info.houseAroundType" :key="item.category" @click="itemClickHandler(item.category)">
        <div class="bg_img item-img" :style="{backgroundImage:'url('+ (getIcon(item.category, item.category == current)) +')'}"></div>
        <p class="item-title" :class="item.category == current&&'active'">{{item.name}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import TMap from 'COMP/TMap'
import marketService from 'SERVICE/marketService'
import { mapGetters } from 'vuex'
export default {
  components: {
    TMap
  },
  data: () => ({
    id: -1,
    info: null,
    latitude: 39.916527,
    longitude: 116.397128,
    map: null,
    current: 0,
    mapConf: {
      draggable: true, // 设置是否可以拖拽
      scrollwheel: true, // 通过滚轮缩放地图的功能
      disableDoubleClickZoom: true, // 双击鼠标左键时时放大地图
      keyboardShortcuts: false // 通过键盘控制地图
    },
    // tabbar icon mIcon-地图标注图标 dIcon-bar未激活图标 aIcon-bar激活图标
    list: {
      bus: {
        index: 0,
        name: '公交',
        mIcon: require('IMG/mapSearch/busMarkIcon.png'),
        dIcon: require('IMG/mapSearch/busDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/busActiveIcon.png')
      },
      market: {
        index: 1,
        name: '购物',
        mIcon: require('IMG/mapSearch/marketMarkIcon.png'),
        dIcon: require('IMG/mapSearch/marketDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/marketActiveIcon.png')
      },
      hospital: {
        index: 2,
        name: '医院',
        mIcon: require('IMG/mapSearch/hospitalMarkIcon.png'),
        dIcon: require('IMG/mapSearch/hospitalDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/hospitalActiveIcon.png')
      },
      school: {
        index: 3,
        name: '教育',
        mIcon: require('IMG/mapSearch/schoolMarkIcon.png'),
        dIcon: require('IMG/mapSearch/schoolDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/schoolActiveIcon.png')
      },
      food: {
        index: 4,
        name: '美食',
        mIcon: require('IMG/mapSearch/foodMarkIcon.png'),
        dIcon: require('IMG/mapSearch/foodDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/foodActiveIcon.png')
      },
      metro: {
        index: 5,
        name: '地铁',
        mIcon: require('IMG/mapSearch/metroMarkIcon.png'),
        dIcon: require('IMG/mapSearch/metroDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/metroActiveIcon.png')
      },
      bank: {
        index: 6,
        name: '银行',
        mIcon: require('IMG/mapSearch/bankMarkIcon.png'),
        dIcon: require('IMG/mapSearch/bankDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/bankActiveIcon.png')
      },
      relax: {
        index: 7,
        name: '休闲',
        mIcon: require('IMG/mapSearch/relaxMarkIcon.png'),
        dIcon: require('IMG/mapSearch/relaxDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/relaxActiveIcon.png')
      },
      gym: {
        index: 8,
        name: '健身',
        mIcon: require('IMG/mapSearch/gymMarkIcon.png'),
        dIcon: require('IMG/mapSearch/gymDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/gymActiveIcon.png')
      }
    }
  }),
  created() {
    this.id = this.$route.query.id
    this.latitude = this.$route.query.latitude || 39.916527
    this.longitude = this.$route.query.longitude || 116.397128
    this.current = this.$route.query.mapTab
    this.getHouseInfo()
  },
  methods: {
    async getHouseInfo() {
      const res = await marketService.getLinkerDetail(this.id)
      this.info = res
    },
    itemClickHandler(val) {
      console.log('current', val)

      if (val == this.current) return
      this.current = val
    },
    getIcon(index, status) {
      for (let temp of Object.keys(this.list)) {
        if (this.list[temp].index == index) {
          return status ? this.list[temp].aIcon : this.list[temp].dIcon
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userArea']),
    mapData() {
      for(let temp of this.info.houseAroundType){
        if(temp.category == this.current) return temp
      }
    }
  }
}
</script>
<style lang="less">
.map-search {
  display: flex;
  flex-direction: column;
  #map-container {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    margin-bottom: 60px;
  }
  > .bottom-bar {
    position: fixed;
    width: 100%;
    height: 60px;
    bottom: 0;
    background-color: #fff;
    display: flex;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    > .bar-item {
      margin: 12px 20px;
      > .item-img {
        width: 24px;
        height: 24px;
      }
      > .item-title {
        font-size: 12px;
        font-weight: 400;
        color: #969ea8;
        &.active {
          color: #007ae6;
        }
      }
    }
  }
}
</style>
