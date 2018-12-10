<template>
  <div class="estate-recommend">
    <title-bar :conf="titleBarConf"></title-bar>
    <div class="bg_img recommend-box" :style="{backgroundImage:'url(' + blurImg + ')'}"></div>
    <div class="recommend-info" v-if="info" @click="goRecommendInfo">
      <div class="desc-box">
        <p class="title">{{`${info.district}·${info.linkerName}`}}</p>
        <p class="desc">{{`${info.city}${info.openTimes}位经纪人都已开通`}}</p>
      </div>
      <div class="open-btn">立即开通</div>
    </div>
  </div>
</template>
<script>
import EstateItem from 'COMP/EstateItem'
import TitleBar from 'COMP/TitleBar'
export default {
  components: {
    TitleBar,
    EstateItem
  },
  props: {
    info: {
      type: String
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
    border-radius: 6px;
  }
  > .recommend-info {
    position: absolute;
    width: 100%;
    top: 80px;
    left: 35px;
    > .desc-box {
      color: #fff;
      .title {
        font-size: 24px;
        font-weight: 500;
      }
      .desc {
        font-size: 13px;
        font-weight: 400;
      }
    }
    > .open-btn {
      position: absolute;
      right: 65px;
      top: 25px;
      display: inline-block;
      font-size: 13px;
      font-weight: 400;
      background-color: #ee7158;
      color: #fff;
      border-radius: 5px;
      padding: 5px 15px;
    }
  }
}
</style>
