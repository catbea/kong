<template>
  <div class="discover-page">
    <van-swipe class="shadow swipe-container" v-if="swipeList" :autoplay="3000">
      <van-swipe-item v-for="(item, index) in swipeList" :key="index">
        <div class="bg_img swipe-item-container" :style="{'backgroundImage':'url('+ item.image +')'}">
          <div class="cover-container">
            <p class="cover-title">{{item.title}}</p>
            <p class="cover-time">{{item.publisher}}&nbsp;&nbsp;{{item.createDate | dateFormatterToHuman}}&nbsp;&nbsp;{{item.scanNum | numberFormatter}}浏览</p>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="tab-container">


      <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6" sticky animated>
        <van-tab v-for="item in tabs" :key="item.index" :title="item.typeName">
          <keep-alive>
            <van-list v-model="loading" :finished="item.finished" :finished-text="'没有更多了'" @load="onLoad">
              <discover-item v-for="(item,index) in item.list" :key="index" :data="item"></discover-item>
            </van-list>
          </keep-alive>
        </van-tab>
      </van-tabs>

    </div>
  </div>
</template>
<script>
import AutomaticSwipes from 'COMP/Swipe/AutomaticSwipes'
import discoverItem from 'COMP/DiscoverItem'
import discoverService from 'SERVICE/discoverService'
import { mapGetters } from 'vuex'
export default {
  components: {
    AutomaticSwipes,
    discoverItem
  },
  data: () => ({
    tabs: [],
    swipeList: [],
    activeIndex: 0,
    loading: false
  }),
  created () {
    this.getInformationCarousel()
  },
  methods: {
     
    // 获取轮播和tabs配置
    async getInformationCarousel () {
      const res = await discoverService.informationCarousel(this.userArea.city)
      console.log(res)
      this.payloadTabs(res.infoSettingList)
      this.swipeList = res.infoCarouselList
    },
    payloadTabs (tabs) {

      this.tabs.push({ index: 0, type: '', typeName: '热门', page: 0, finished: false, list: [] })
      for (let i = 1; i < tabs.length; i++) {
        tabs[i].index = i
        tabs[i].page = 0
        tabs[i].finished = false
        tabs[i].list = []
        this.tabs.push(tabs[i])
      }

    },
    async onLoad () {
      let current = this.getCurrentType()
      const result = await discoverService.getDiscoverList(this.userArea.city, current.type, current.page)
      current.list = current.list.concat(result.records)
      current.page++
      if (result.pages === 0 || current.page === result.pages) current.finished = true
      this.loading = false
    },
    // 获取当前玄宗tab的typeid
    getCurrentType () {
      for (let temp of this.tabs) {
        if (temp.index === this.activeIndex) return temp
      }
    }
  },
  computed: {
    ...mapGetters(['userArea'])

  },
}
</script>
<style lang="less">
.discover-page {
  background: #ffffff;
  width: 100%;
  > .swipe-container {
    .swipe-item-container {
      width: 100%;
      height: 200px;
      position: relative;
      > .cover-container {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
        > .cover-title {
          font-size: 18px;
          font-weight: 600;
          padding: 90px 30px 0;
        }
        > .cover-time {
          font-size: 12px;
          font-weight: 400;
          padding: 5px 30px 0;
          opacity: .85;
        }
      }
    }
  }
}
[class*='van-hairline']::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  pointer-events: none;
  border-top: 0 solid #eee;
}
</style>
