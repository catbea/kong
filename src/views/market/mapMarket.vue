<template>
  <div id="map-container"></div>
</template>

<script>
import TMap from '@/utils/tMap'
import { mapGetters } from 'vuex'
import commonService from '@/services/commonService'
export default {
  data () {
    return {
      map: null,
      latLng: {
        lat: 31.28706,
        lng: 114.606628,
      },
      markList: [],
      city: '深圳市'
    }
  },
  computed: {
    ...mapGetters(['userArea', 'userInfo'])
  },
  created() {
    if (this.userArea.latitude) {
      this.latLng = {
        lat: this.userArea.latitude,
        lng: this.userArea.longitude
      }
      this.city = this.userArea.city
    }
    this.initMap(this.latLng.lat, this.latLng.lng)
  },
  methods: {
    async initMap(lat, lng) {
      await TMap()
      this.map = new qq.maps.Map(document.getElementById('map-container'), {
        center: new qq.maps.LatLng(lat, lng), // 地图的中心地理坐标
        zoom: 5,
        minZoom: 3,
        maxZoom: 12,
        disableDefaultUI: true, // 禁止所有的默认控件
        scrollwheel: false,
        keyboardShortcuts: false,
        panControl: false
      })
      qq.maps.event.addListener(this.map, 'zoom_changed', () => {
        this.zoomChange(this.map.getZoom())
      })
      qq.maps.event.addListener(this.map, 'center_changed', () => {
        this.latLng = this.map.getCenter()
        this.getCity(this.latLng.lng, this.latLng.lat)
      })
      this.updateMark()
    },
    zoomChange (zoom) {
      if (zoom <= 5) {
        alert('省')
      } else if ( zoom > 5 && zoom <= 7) {
        alert('市')
      } else if (zoom > 7 && zoom <= 10) {
        alert('区')
      } else {
        alert('楼盘列表')
      }
    },
    getMarketList () {
      commonService.getMapMarket().then(res => {
        this.markList = res.records
      }).catch()
    },
    getCity (lng, lat) {
      commonService.getLocation(lng, lat).then(res => {
        this.city = res
        alert(res)
      })
    },
    updateMark() {
      // clean 当前
      this.cleanMark()
      this.markMaker()
    },
    cleanMark() {
      while (this.markList.length > 0) {
        let shift = this.markList.shift()
        shift.setMap(null)
      }
    },
    markMaker(icon) {
      let scaleSize = new qq.maps.Size(200, 34)
      for (let temp of markList) {
        let marker = new qq.maps.Marker({
          icon: new qq.maps.MarkerImage('', null, null, null, scaleSize),
          map: this.map,
          position: new qq.maps.LatLng(temp.lat, temp.lng),
          decoration: new qq.maps.MarkerDecoration(`<div class="text">${temp.name} <span class="arrow"></span></div>`, new qq.maps.Point(0, -5))
        })
        this.markList.push(marker)
      }
    }
  }
}
</script>


<style lang="less" scoped>
#map-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
