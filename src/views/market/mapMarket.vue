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
      city: '全国',
      houseList: [],
      zoom: 5,
      geocoder: ''
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
    this.getRegionTotal(1)
  },
  methods: {
    async initMap(lat, lng) {
      await TMap()
      this.map = new qq.maps.Map(document.getElementById('map-container'), {
        center: new qq.maps.LatLng(lat, lng), // 地图的中心地理坐标
        zoom: 5,
        minZoom: 3,
        maxZoom: 15,
        disableDefaultUI: true, // 禁止所有的默认控件
        scrollwheel: false,
        keyboardShortcuts: false,
        panControl: false
      })
      qq.maps.event.addListener(this.map, 'zoom_changed', () => {
        this.zoomChange(this.map.getZoom())
      })
      this.geocoder = new qq.maps.Geocoder({
        complete : (result) => {
          if (this.zoom <= 5) {
            this.city = '全国'
            this.getRegionTotal(1)
          } else if (this.zoom > 5 && this.zoom <= 7) {
            if (result.detail.address.indexOf('自治区') > -1) {
              this.city = result.detail.address.split('区')[0].slice(2) + '区'
            } else {
              this.city = result.detail.address.split('省')[0].slice(2) + '省'
            }
            this.getRegionTotal(2)
          } else if (this.zoom > 7 && this.zoom <= 10){
            if (result.detail.address.indexOf('县') > -1) {
              this.city = result.detail.address.split('县')[0].split('省')[1] + '县'
            } else if (result.detail.address.indexOf('自治区') > -1){
              this.city = result.detail.address.split('自治区')[1].split('市')[0] + '市'
            } else {
              this.city = result.detail.address.split('市')[0].split('省')[1] + '市'
            }
            this.getRegionTotal(3)
          } else {
            this.city = ''
            this.getRegionLinkers()
          }  
          
        }
    })
      this.updateMark()
    },
    getCity () {
      this.latLng = this.map.getCenter()
      var latLng = new qq.maps.LatLng(this.latLng.lat, this.latLng.lng)
      this.geocoder.getAddress(latLng)
    },
    zoomChange (zoom) {
      this.zoom = zoom
      this.getCity()
    },
    getRegionLinkers () {
      commonService.getRegionLinkers({
        longitude: this.latLng.lng,
        latitude: this.latLng.lat
      }).then(res => {
        let arr = []
        res.forEach(el => {
          let obj = {
            linkerId: el.linkerId,
            latitude: el.latitude,
            level: 3,
            linkerNum: '',
            longitude: el.longitude,
            name: el.linkerName
          }
          arr.push(obj)
        })
        this.houseList = arr
        this.updateMark()
      }).catch()
    },
    getRegionTotal (level) {
      commonService.getRegionTotal({
        parentName: this.city,
        longitude: this.latLng.lng,
        latitude: this.latLng.lat,
        level: level
      }).then(res => {
        this.houseList = res
        this.updateMark()
      }).catch()
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
    markMaker() {
      let scaleSize = new qq.maps.Size(140, 30)
      let html = ''
      for (let temp of this.houseList) {
        if (temp.linkerNum) {
          html = `<div class="text">${temp.name}(${temp.linkerNum})</span><span class="arrow"></span></div>`
        } else {
          html = `<div class="text">${temp.name}</span><span class="arrow"></span></div>`
        }
        let marker = new qq.maps.Marker({
          icon: new qq.maps.MarkerImage('', null, null, null, scaleSize),
          map: this.map,
          position: new qq.maps.LatLng(temp.latitude, temp.longitude),
          decoration: new qq.maps.MarkerDecoration(html, new qq.maps.Point(0, -4))
        })
        qq.maps.event.addListener(marker, 'click', (e) => {
          if (temp.linkerId) {
            this.$router.push(`/market/${temp.linkerId}`)
          }
          let zoom = this.map.zoom
          this.map.setCenter(new qq.maps.LatLng(e.latLng.lat, e.latLng.lng))
          if (zoom > 5 && zoom <= 7) {
            this.city = temp.name
            this.map.setZoom(zoom + 1)
          } else {
            this.map.setZoom(zoom + 2)
          }
        })
        this.markList.push(marker)
      }
    }
  }
}
</script>


<style lang="less">
#map-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: #fff;
  .text{
    margin: auto;
    padding: 0 10px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #007AE6;
    border-radius: 10px;
    position: relative;
    .arrow{
      position: absolute;
      left: 50%;
      width: 0; 
      height: 0;
      top: 20px;
      border-width: 5px;
      border-style: solid;
      border-color:#007AE6 transparent transparent transparent;
      transform: translateX(-50%);
    }
  }
}
</style>
