<template>
  <div id="map-container"></div>
</template>
<script>
import TMap from '@/utils/tMap'
export default {
  props: {
    latLng: {
      type: Object,
      required: true,
      default: () => {
        return { lat: 31.28706, lng: 114.606628 }
      }
    },
    data: {
      type: Object
    },
    conf: {
      type: Object,
      default: () => {
        return {
          draggable: true, // 设置是否可以拖拽
          scrollwheel: true, // 通过滚轮缩放地图的功能
          disableDoubleClickZoom: true, // 双击鼠标左键时时放大地图
          keyboardShortcuts: false // 通过键盘控制地图
        }
      }
    }
  },
  data: () => ({
    map: null,
    markList: [],
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
    this.initMap(this.latLng.lat, this.latLng.lng)
  },
  methods: {
    async initMap(lat, lng) {
      await TMap()
      this.map = new qq.maps.Map(document.getElementById('map-container'), {
        center: new qq.maps.LatLng(lat, lng), // 地图的中心地理坐标
        zoom: 14,
        disableDefaultUI: true, // 禁止所有的默认控件
        draggable: this.conf.draggable,
        scrollwheel: this.conf.scrollwheel,
        disableDoubleClickZoom: this.conf.disableDoubleClickZoom,
        keyboardShortcuts: this.conf.keyboardShortcuts
      })
      this.updateMark()
      this.setIcon()
    },
    setIcon () {
      let icon = require('IMG/mapSearch/map.png')
      //创建marker
      var marker = new qq.maps.Marker({
          position: new qq.maps.LatLng(this.latLng.lat, this.latLng.lng),
          map: this.map
      })
      var anchor = new qq.maps.Point(0, 39),
        size = new qq.maps.Size(73, 39),
        origin = new qq.maps.Point(0, 0),
        markerIcon = new qq.maps.MarkerImage(
          icon,
          size,
          origin,
          anchor
        )
      marker.setIcon(markerIcon)
    },
    updateMark() {
      // clean 当前
      this.cleanMark()
      let icon = this.getIcon()
      this.markMaker(icon)
    },
    cleanMark() {
      while (this.markList.length > 0) {
        let shift = this.markList.shift()
        shift.setMap(null)
      }
    },
    getIcon() {
      for (let key of Object.keys(this.list)) {
        if (this.data.category == this.list[key].index) return this.list[key].mIcon
      }
    },
    markMaker(icon) {
      let scaleSize = new qq.maps.Size(200, 34)
      let arr = this.data.houseAroundList.slice(0,5)
      for (let temp of arr) {
        let marker = new qq.maps.Marker({
          icon: new qq.maps.MarkerImage('', null, null, null, scaleSize),
          map: this.map,
          position: new qq.maps.LatLng(temp.lat, temp.lng),
          decoration: new qq.maps.MarkerDecoration(`<div class="text">${temp.name} <span class="arrow"></span></div>`, new qq.maps.Point(0, -5))
        })
        this.markList.push(marker)
      }
    }
  },
  watch: {
    data: {
      handler(val) {
        // 更换地图标记
        this.updateMark()
      },
      deep: true
    }
  }
}
</script>
<style lang="less">
#map-container {
  min-width: 100%;
  height: 100%;
  font-size: 10px;
  color: #fff;
  .text{
    margin: auto;
    padding: 0 10px;
    height: 17px;
    line-height: 17px;
    text-align: center;
    background-color: #007AE6;
    border-radius: 20px;
    position: relative;
    .arrow{
      position: absolute;
      left: 45%;
      width: 0; 
      height: 0;
      border-width: 5px;
      border-style: solid;
      border-color:#007AE6 transparent transparent transparent;
    }
  }
}
</style>
