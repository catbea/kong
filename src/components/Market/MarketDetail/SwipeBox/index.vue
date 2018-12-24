<template>
  <div class="market-img-page">
    <div @click.stop="play" class="market-img-page-box">
      <van-swipe @change="onChange" :show-indicators="false">
        <van-swipe-item v-for="(item,index) in bannerList" :key="index">
          <div class="bg_img loopBox" :style="{backgroundImage:'url('+item.imgUrl+')'}">
          </div>
        </van-swipe-item>
      </van-swipe>
      <span class="bg_img market-img-page-play" :style="{'backgroundImage':'url('+imgPlay+')'}" v-if="ifPanorama" @click.stop="lookPanorama"></span>
      <div class="market-img-page-panorama">720全景</div>
      <div class="market-img-page-photo" @click.stop="photo" v-show="photoButton">图片</div>
      <div class="num">
        {{ current + 1 }}/{{bannerList&&bannerList.length}}
      </div>
      <div class="collect-box" @click.stop="collect">
        <!-- <div class="collect" :class="{collectActive:flag}" :style="{'backgroundImage':'url('+flag?imgPlay： +')'}"></div>  -->
        <div class="bg_img collect" :style="{backgroundImage:'url('+ (status==1?collectImgA:collectImg)+')'}"></div>收藏
      </div>
      <div class="share-box" @click.stop="share">
        <div class="share bg_img" :style="{backgroundImage:'url('+enjoyImg+')'}"></div>分享
      </div>
    </div>
  </div>
</template>
<script>
import MarketService from 'SERVICE/marketService'
export default {
  components: {},

  props: {
    linkerInfo: { type: Object },
    bannerList: { type: Array },
    collectionStatus: { type: String }, // 0-未收藏 1-已收藏
    ifPanorama: { type: Number }, // 是否有全景,
    linkerId: { type: String },
    photoButton: { type: Boolean } //该楼盘是否存在相册
  },
  data() {
    return {
      status: this.collectionStatus,
      current: 0,
      enjoyImg: require('IMG/marketDetail/enjoy@2x.png'),
      imgPlay: require('IMG/marketDetail/Oval@2x.png'),
      collectImg: require('IMG/marketDetail/xx1@2x.png'),
      collectImgA: require('IMG/marketDetail/xx 9@2x.png'),
      show: false
    }
  },
  methods: {
    lookPanorama() {
      window.location.href = this.linkerInfo.linkerUrl
    },
    closeDom(n) {
      this.$router.push('/marketDetail/perfect')
      this.show = n
    },
    photo() {
      this.$router.push({ name: 'photoList', params: { id: this.linkerId } })
    },
    onChange(index) {
      this.current = index
    },
    collect() {
      if (this.status == 1) {
        this.status = 0
      } else {
        this.status = 1
      }
      this.changeLinkerCollectInfo()
    },
    async changeLinkerCollectInfo() {
      //修改收藏状态
      await MarketService.changeLinkerCollect(this.linkerId, this.status, 1)
    },
    share() {
      this.$emit('shareBuilding')
    },
    play() {
      this.playShow = !this.playShow
    }
  }
}
</script>
<style lang="less">
.market-img-page {
  width: 375px;
  height: 281px;
  border-bottom: 1px solid black;
  position: relative;
  .market-img-page-box {
    width: 100%;
    height: 100%;
    .loopBox {
      width: 100%;
      height: 100%;
    }
  }
  .market-img-page-play {
    display: block;
    position: absolute;
    left: 155px;
    top: 99px;
    width: 64px;
    height: 64px;
  }
  .market-img-page-panorama {
    position: absolute;
    left: 120px;
    bottom: 5px;
    text-align: center;
    width: 60px;
    height: 24px;
    background: rgba(0, 122, 230, 1);
    border-radius: 12px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
  }
  .market-img-page-photo {
    position: absolute;
    left: 196px;
    bottom: 5px;
    text-align: center;
    width: 60px;
    height: 24px;
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
  }
  .num {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    width: 48px;
    height: 20px;
    text-align: center;
    line-height: 15px;
    opacity: 0.6;
    background: #000000;
    border-radius: 10px;
  }
  .van-swipe {
    width: 100%;
    height: 100%;
  }
  .collect-box {
    position: absolute;
    top: 20px;
    right: 69px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
    .collect {
      width: 20px;
      height: 20px;
      margin-left: 2px;
    }
  }
  .share-box {
    position: absolute;
    top: 20px;
    right: 29px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
    .share {
      width: 20px;
      height: 20px;
      margin-left: 2px;
    }
  }
}
</style>
