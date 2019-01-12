<template>
  <div class="discover-page">
    <van-swipe class="shadow swipe-container" v-if="swipeList" :autoplay="3000">
      <van-swipe-item v-for="(item, index) in swipeList" :key="index">
        <div
          class="bg_img swipe-item-container"
          :style="{'backgroundImage':'url('+ item.image +')'}"
          @click="swipeItemClick(item)"
        >
          <div class="cover-container">
            <p class="cover-title">{{item.title}}</p>
            <p
              class="cover-time"
            >{{item.publisher}}&nbsp;&nbsp;{{item.createDate | dateFormatterToHuman}}&nbsp;&nbsp;{{item.scanNum | numberFormatter}}浏览</p>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="fill-View"></div>
    <div class="tab-container">
      <van-tabs
        v-model="activeIndex"
        color="#007AE6"
        :line-width="15"
        :swipe-threshold="6"
        @change="tabsChange"
        sticky
        animated
      >
        <van-tab v-for="item in tabs" :key="item.index" :title="item.typeName">
          <keep-alive>
            <van-list
              v-model="loading"
              v-if="item.index === activeIndex"
              :finished="item.finished"
              :finished-text="'没有更多了'"
              @load="onLoad"
            >
              <discover-item
                v-for="(item,index) in item.list"
                :key="index"
                :data="item"
                @clickCollection="handlerCollection"
                @clickEdit="handlerEdit"
                @enterDetail="enterDetail"
              ></discover-item>
            </van-list>
          </keep-alive>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import AutomaticSwipes from 'COMP/Swipe/AutomaticSwipes'
import discoverService from 'SERVICE/discoverService'
import DiscoverItem from 'COMP/DiscoverItem/index'
import { mapGetters } from 'vuex'
export default {
  components: {
    AutomaticSwipes,
    DiscoverItem
  },
  data: () => ({
    tabs: [],
    swipeList: [],
    activeIndex: 0,
    loading: false,
    idStr: ''
  }),
  created() {
    this.getInformationCarousel()
  },
  mounted() {
    document.querySelector('.router-view').addEventListener('scroll', this.scrollHandler)
  },
  methods: {
    // 获取轮播和tabs配置
    async getInformationCarousel() {
      const res = await discoverService.informationCarousel(this.userInfo.majorCity)
      this.swipeList = res.infoCarouselList

      let idList = []

      for (let i = 0; i < this.swipeList.length; i++) {
        idList.push(this.swipeList[i].id)
      }

      this.idStr = idList.toString()

      this.payloadTabs(res.infoSettingList)
    },
    payloadTabs(tabs) {
      this.tabs.push({ index: 0, type: '', typeName: '热门', page: 1, finished: false, list: [], offsetHeight: 0 })
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].index = i + 1
        tabs[i].page = 1
        tabs[i].finished = false
        tabs[i].list = []
        tabs[i].offsetHeight = 0
        this.tabs.push(tabs[i])
      }
    },
    async onLoad() {
      let current = this.getCurrentType()
      const result = await discoverService.getDiscoverList(this.userInfo.majorCity, current.type, current.page,this.idStr)
      console.log(result, '发现列表数据')

      if (result.records.length > 0) {
        current.list = current.list.concat(result.records)
        if (current.page == result.page) {
          current.finished = true
        }
        current.page++
      } else {
        current.finished = true
      }
      this.loading = false
    },
    // 获取当前玄宗tab的typeid
    getCurrentType() {
      for (let temp of this.tabs) {
        if (temp.index === this.activeIndex) return temp
      }
    },
    swipeItemClick(item) {
      this.$router.push(`/discover/${item.id}/${this.userInfo.majorCity ? this.userInfo.majorCity : '全国'}?agentId=${this.userInfo.agentId}&enterpriseId=${this.userInfo.enterpriseId}`)
    },
    scrollHandler(e) {
      let current = this.getCurrentType()
      current.offsetHeight = e.target.scrollTop
    },
    tabsChange(e) {
      let current = this.getCurrentType()
      document.querySelector('.router-view').scrollTop = current.offsetHeight
    },
    handlerCollection() {
      console.log('111111111111')
    },
    handlerEdit() {
      console.log('222222222222')
    },
    enterDetail(val) {
      this.$router.push({ name: 'discover-detail', params: { id: val.id, city: val.city }, query: { agentId: val.agentId, enterpriseId: val.enterpriseId, classify: val.classify } })
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
<style lang="less">
.discover-page {
  background: #ffffff;
  width: 100%;
  > .fill-View {
    width: 100%;
    height: 16px;
    background-color: #ffffff;
  }

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
          opacity: 0.85;
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
