<template>
  <div class="estate-recommend">
    <title-bar :conf="titleBarConf"></title-bar>
    <div class="recommend-box" v-fuzz-dom>
      <estate-item :info="info"></estate-item>
    </div>
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
    info: Object
  },
  data: () => ({
    titleBarConf: {
      title: 'AI荐盘',
      linkText: '更多楼盘'
    }
  }),
  methods:{
    goRecommendInfo(){
      this.$emit('click', this.info)
    }
    
  }
}
</script>
<style lang="less">
.estate-recommend {
  position: relative;
  > .recommend-box {
    margin: 0 15px;
    border-radius: 6px;
  }
  > .recommend-info {
    position: absolute;
    width: 100%;
    top: 65px;
    left: 45px;
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
      right: 85px;
      top: 25px;
      display: inline-block;
      font-size: 13px;
      font-weight: 400;
      background-color: #ee7158;
      border-radius: 5px;
      padding: 1px 5px;
    }
  }
}
</style>
