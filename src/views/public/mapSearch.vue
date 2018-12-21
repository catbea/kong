<template>
  <div class="map-search">
    <!-- <div id="map-container"></div> -->
    <t-map :latLng="{lat:this.userArea.latitude,lng:this.userArea.longitude}" :conf="mapConf"></t-map>
    <div class="bottom-bar dev">
      <div class="bar-item" v-for="item in list" :key="item.index" @click="itemClickHandler(item.index)">
        <div class="bg_img item-img" :style="{backgroundImage:'url('+ (item.index === current ? item.aIcon:item.dIcon) +')'}"></div>
        <p class="item-title" :class="item.index === current&&'active'">{{item.name}}</p>
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
    latitude: 39.916527,
    longitude: 116.397128,
    map: null,
    current: 0,
    mapConf: {
      draggable: false,
      scrollwheel: false,
      disableDoubleClickZoom: false
    },
    // tabbar icon mIcon-地图标注图标 dIcon-bar未激活图标 aIcon-bar激活图标
    list: {
      bank: {
        index: 0,
        name: '银行',
        mIcon: require('IMG/mapSearch/bankMarkIcon.png'),
        dIcon: require('IMG/mapSearch/bankDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/bankActiveIcon.png')
      },
      bus: {
        index: 1,
        name: '公交',
        mIcon: require('IMG/mapSearch/busMarkIcon.png'),
        dIcon: require('IMG/mapSearch/busDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/busActiveIcon.png')
      },
      metro: {
        index: 2,
        name: '地铁',
        mIcon: require('IMG/mapSearch/metroMarkIcon.png'),
        dIcon: require('IMG/mapSearch/metroDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/metroActiveIcon.png')
      },
      school: {
        index: 3,
        name: '教育',
        mIcon: require('IMG/mapSearch/schoolMarkIcon.png'),
        dIcon: require('IMG/mapSearch/schoolDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/schoolActiveIcon.png')
      },
      hospital: {
        index: 4,
        name: '医院',
        mIcon: require('IMG/mapSearch/hospitalMarkIcon.png'),
        dIcon: require('IMG/mapSearch/hospitalDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/hospitalActiveIcon.png')
      },
      relax: {
        index: 5,
        name: '休闲',
        mIcon: require('IMG/mapSearch/relaxMarkIcon.png'),
        dIcon: require('IMG/mapSearch/relaxDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/relaxActiveIcon.png')
      },
      market: {
        index: 6,
        name: '购物',
        mIcon: require('IMG/mapSearch/marketMarkIcon.png'),
        dIcon: require('IMG/mapSearch/marketDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/marketActiveIcon.png')
      },
      gym: {
        index: 7,
        name: '健身',
        mIcon: require('IMG/mapSearch/gymMarkIcon.png'),
        dIcon: require('IMG/mapSearch/gymDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/gymActiveIcon.png')
      },
      food: {
        index: 8,
        name: '美食',
        mIcon: require('IMG/mapSearch/foodMarkIcon.png'),
        dIcon: require('IMG/mapSearch/foodDefaultIcon.png'),
        aIcon: require('IMG/mapSearch/foodActiveIcon.png')
      }
    }
  }),
  created() {
    // this.getAou
    // this.latitude = this.$route.query.latitude || 39.916527
    // this.longitude = this.$route.params.longitude || 116.397128
    // this.initMap()
  },
  methods: {
    async initMap() {
      await TMap()
      this.map = new qq.maps.Map(document.getElementById('map-container'), {
        center: new qq.maps.LatLng(this.latitude, this.longitude), // 地图的中心地理坐标
        zoom: 14, // 缩放级别，原本缩放级别是16，后期暂时改成了14
        disableDefaultUI: true // 禁止所有的默认控件
      })

      // let anchor = new qq.maps.Point(0, 36),
      //   size = new qq.maps.Size(36, 36),
      //   origin = new qq.maps.Point(0, 0),
      //   icon = new qq.maps.MarkerImage(this.centerMarkerIconUrl, size, origin, anchor)
      // var centerMarker = new qq.maps.Marker({
      //   map: this.map,
      //   position: centerLatLng
      // })
      // centerMarker.setIcon(icon)
      this.markIcon()
    },
    markIcon() {
      let currentItem
      for (let temp of this.list) {
        if (this.current === temp.index) return (currentItem = temp)
      }
      //地图中心点回到楼盘坐标
      this.map.panTo(new qq.maps.LatLng(this.latitude, this.longitude))
      //控制缩放级别
      this.map.zoomTo(14)
    },
    itemClickHandler(val) {
      if (val === this.current) return
      this.current = val
    }
  },
  computed: {
    ...mapGetters(['userArea'])
  }
}
</script>
<style lang="less">
.map-search {
  display: flex;
  flex-direction: column;
  #map-container {
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
    /*padding: 0 25px 0 0;*/
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
