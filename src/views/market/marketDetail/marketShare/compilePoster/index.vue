<template>
  <div class="compile-poster-page" id="compile-poster-page">
    <div class="box" v-show="status === 1">
      <swipe-poster :model="buildingInfo" id="share-top" :modelBgImg="changeBgImg"></swipe-poster>
      <!-- <tow-lines v-for="(item,index) in topList" :key="index" :topInfo="item"></tow-lines> -->
      <poster-describe :model="buildingInfo"></poster-describe>
      <div class="compile-tagline">
        <div class="compile-tagline-top">宣传语</div>
        <div class="compile-tagline-bottom">
          <input type="text" name="" placeholder="请填写宣传语，小于12个字符">
        </div>
      </div>
      <compile-cover :model="bannerList" @changeBackground="changeBg"></compile-cover>
      <div class="compile-button">
        <p @click="setReport">重置海报</p>
        <p @click="savaReport" :style="{'pointer-events':this.pointerEvents}">生成海报</p>
      </div>
    </div>
    <van-loading type="spinner" class="van-loading" v-if="showLoading==true"/>
    <div class="result" id="card-result" v-show="status === 2"></div>
  </div>
</template>
<script>
import SwipePoster from 'COMP/Market/MarketDetail/MarketShare/CompilePoster/SwipePoster'
import PosterDescribe from 'COMP/Market/MarketDetail/MarketShare/CompilePoster/PosterDescribe'
import CompileCover from 'COMP/Market/MarketDetail/MarketShare/CompilePoster/CompileCover'
import marketService from 'SERVICE/marketService'
import { mapGetters } from 'vuex'
import h2c from 'html2canvas'
export default {
  computed: {
    ...mapGetters(['buildId'])
  },
  components: {
    SwipePoster,
    PosterDescribe,
    CompileCover
  },
  data: () => ({
    list: [1, 2, 3, 4],
    show: false,
    buildingInfo: {},
    bannerList: [],
    status: 1,
    changeBgImg: '',
    showLoading: false,
    pointerEvents: '',
    lastOpTimer: 0
  }),
  methods: {
    changeBg(val) {
      this.changeBgImg = val
    },

    async getPosterInfo(buildId) {
      let bannerList = []
      let obj = {}

      const result = await marketService.shareBuildingCard(buildId)
      if (result) {
        this.buildingInfo = result
        obj.imgUrl = result.postersUrl
        obj.checked = true
        bannerList.push(obj)

        this.bannerList = bannerList
      }
    },

    async getBuildingImg(buildId) {
      const bannerResult = await marketService.getBannerList(buildId)
      if (bannerResult) {
        for (let i = 0; i < bannerResult.length; i++) {
          bannerResult[i].checked = '0'
        }
        bannerResult[0].checked = '0'
        this.bannerList = bannerResult
      }
    },

    savaReport() {
      let dd = new Date().getTime()
      if (dd - this.lastOpTimer < 3000) return
      this.lastOpTimer = dd
      this.handleDate()
    },

    async handleDate() {
      this.showLoading = true
      this.pointerEvents = 'none'
      this.status = 2
      const dpr = window.devicePixelRatio
      const canvas = await h2c(document.querySelector('#share-top').children[0], {
        // logging: false,
        // useCORS: true,
        // dpr: 5,
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        allowTaint: false,
        logging: false
      })
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      document.getElementById('card-result').appendChild(canvas)
      this.showLoading = false
    },

    setReport() {
      // this.changeBgImg = ''
    }
  },

  created() {
    let linkerId = this.$route.query.linkerId
    this.getPosterInfo(linkerId)
    // this.getBuildingImg(this.buildId)
  }
}
</script>
<style lang="less">
.compile-poster-page {
  position: relative;
  width: 100%;
  height: 100%;
  background: #ffffff;

  .van-loading {
    display: inline-block;
    position: absolute;
    margin-left: 39%;
    width: 84px;
    height: 84px;
    margin-top: 50%;
    z-index: 10000;
  }

  .result {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .box {
    position: absolute;
    line-height: 22px;
    background: #ffffff;
    height: auto !important;
    .compile-tagline {
      display: none;
      margin-left: 15px;
      .compile-tagline-top {
        font-size: 16px;

        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        margin-bottom: 12px;
      }
      .compile-tagline-bottom {
        width: 325px;
        height: 44px;
        display: flex;
        align-items: center;
        padding: 0 0 0 16px;
        border-radius: 4px;
        border: 1px solid;
        input::-webkit-input-placeholder {
          color: rgba(221, 221, 221, 1);
          font-size: 16px;
          // text-align:left;
        }
        input {
          width: 320px;
          height: 21px;
          border: none;
          padding-bottom: 3px;
          font-size: 16px;
        }
      }
    }

    > .compile-button {
      margin: 48px 0 24px 38px;
      text-align: center;
      line-height: 44px;
      display: flex;
      > p:nth-child(1) {
        width: 144px;
        height: 42px;
        border-radius: 4px;
        border: 1px solid;
        margin-right: 12px;
        font-size: 16px;

        font-weight: 400;
        color: rgba(0, 122, 230, 1);
        // line-height:22px;
      }
      > p:nth-child(2) {
        width: 144px;
        height: 44px;
        background: rgba(0, 122, 230, 1);
        border-radius: 4px;
        font-size: 16px;

        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        // line-height:22px;
      }
    }
  }
}
</style>
