<template>
  <div class="estate-recommend" >
    <title-bar :conf="titleBarConf"></title-bar>
    <div class="bg_img recommend-box" :style="{backgroundImage:'url(' + blurImg + ')'}"></div>
    <div class="recommend-info" v-if="info" @click="goRecommendInfo">
      <div class="desc-box">
        <!-- <p class="title">{{`${info.district}·${info.linkerName}`}}</p> -->
        <p class="title">{{`${info.linkerTags&&info.linkerTags.slice(0,2).join('·')}`}}</p>
        <p class="desc">{{`${info.city}${info.openTimes}位经纪人都已开通`}}</p>
      </div>
      <div class="open-btn">立即开通</div>
    </div>
  </div>
</template>
<script>
import TitleBar from 'COMP/TitleBar'
export default {
  components: {
    TitleBar
  },
  props: {
    info: {
      type: [String, Object]
    }
  },
  data: () => ({
    titleBarConf: {
      title: 'AI荐盘',
      linkText: '更多楼盘',
      link: '/market'
    },
    blurImg: require('IMG/dynamics/blurImg.png')
  }),
  methods: {
    goRecommendInfo() {
      this.$emit('click', this.info)
    }
  }
}
</script>
<style lang="less">
.estate-recommend {
  position: relative;
  > .recommend-box {
    width: 345px;
    height: 125px;
    margin: 0 15px;
    border-radius:10px;
  }
  > .recommend-info {
    position: absolute;
    width: 100%;
    top: 70px;
    left:30px;
    > .desc-box {
      color: #fff;
      .title {
        font-size: 22px;
        font-weight: 500;
        height: 30px;
      }
      .desc {
        font-size: 13px;
        font-weight: 400;
        margin-top:10px;
      }
    }
    > .open-btn {
      position: absolute;
      right: 75px;
      top: 10px;
      display: inline-block;
      font-size: 13px;
      font-weight: 400;
      background-color: #ee7158;
      color: #fff;
      border-radius: 5px;
      padding: 5px 15px;
      height: 32px;
      line-height: 25px;
    }
  }
}
</style>
