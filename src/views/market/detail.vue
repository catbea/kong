<style lang="less">
.market-detail-page {
  > .top-swipe-container {
    width: 100%;
    height: 281px;
    > .swipe-content {
      width: 100%;
      height: 100%;
      > .van-swipe {
        position: relative;
        width: 100;
        height: 100%;
        > .custom-indicator {
          position: absolute;
          color: #fff;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 10px;
          z-index: 5;
          right: 20px;
          bottom: 15px;
          font-size: 12px;
          padding: 3px 15px;
        }
        .swipe-item {
          width: 100%;
          height: 100%;
          background-color: #999999;
        }
      }
    }
  }
}
</style>

<template>
  <div class="market-detail-page">
    <div class="top-swipe-container dev" v-if="info">
      <div class="swipe-content">
        <van-swipe @change="swipeChange">
          <van-swipe-item v-for="item in info.bannerList">
            <div class="bg_img swipe-item dev" :style="{backgroundImage:'url(' + item.imgUrl + ')'}"></div>
          </van-swipe-item>
          <div class="custom-indicator dev" slot="indicator">{{ swipeCurrent + 1 }}/{{info.bannerList.length}}</div>
        </van-swipe>
      </div>
      <div class="operate-content">
        <!-- 收藏/分享 -->
        <div class="operate-1">
          <!-- div. -->
        </div>
        <!-- 存在全景时全景播放 -->
        <div class="operate-2">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import marketService from 'SERVICE/marketService'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data: () => ({
    id: -1,
    info: null,
    swipeCurrent: 0
  }),
  created() {
    this.id = this.$route.params.id
    this.getDetailInfo(this.id)
  },
  methods: {
    // 获取楼盘详情
    async getDetailInfo(id) {
      const res = await marketService.getLinkerDetail(id)
      this.info = res
    },
    swipeChange(val){
      this.swipeCurrent = val
    }
  }
}
</script>
<style lang="less">
.market-detail-page {
}
</style>

