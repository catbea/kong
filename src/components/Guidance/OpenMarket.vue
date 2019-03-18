<template>
  <van-popup class="popup-container" v-model="currentShow">
    <img class="close-btn" :src="closeImg" @click="closeHandler">
    <div class="title">恭喜您</div>
    <div class="desc">免费为您开通一个楼盘</div>
    <div class="bg_img img-content" :style="{backgroundImage:'url(' + bgImg + ')'}"></div>
    <!-- <div class="bg_img img-ai" :style="{backgroundImage:'url(' + aiImg + ')'}"></div> -->
    <!-- <div class="img-ai">AI荐盘</div> -->
    <p class="text">{{`${this.conf&&this.conf.city||''}${this.conf&&this.conf.openTimes||0}人都在关注它`}}</p>
    <div class="tag-content">
      <div class="tag-item">资深中介</div>
      <div class="tag-item">高端社区</div>
      <div class="tag-item">商务区</div>
    </div>
    <div class="open-btn" @click="openHandler">立即体验</div>
  </van-popup>
</template>
<script>
import * as types from '@/store/mutation-types'
export default {
  props: {
    show: { type: Boolean, default: false },
    conf: {
      type: Object,
      default: () => {
        return {
          city: '',
          openTimes: 0
        }
      }
    }
  },
  data: () => ({
    currentShow: false,
    bgImg: require('IMG/guidance/marketGuidance.jpg'),
    aiImg: require('IMG/guidance/guidance_ai.png'),
    closeImg: require('IMG/guidance/closeBtn.png')
  }),
  methods: {
    openHandler() {
      this.$router.push(`/marketDetail/open/${this.conf.linkerId}`)
      this.$store.commit(types.GUIDANCE, { dynamics: true })
    },
    closeHandler() {
      this.currentShow = false
      this.$store.commit(types.GUIDANCE, { dynamics: true })
    }
  },
  watch: {
    show(val) {
      this.currentShow = val
    },
    currentShow(val) {
      this.$emit('update:show', val)
    }
  }
}
</script>
<style lang="less">
// .guidance-open-market {
.popup-container {
  width: 295px;
  height: 408px;
  background-color: #007AE6;
  border-radius: 10px;
  overflow: unset;
  > .close-btn {
    position: absolute;
    width: 24px;
    height: 46px;
    top: -45px;
    right: 15px;
  }
  > .img-content {
    width: 265px;
    height: 150px;
    border-radius: 10px;
    margin: 15px;
    margin-bottom: 0;
    position: relative;
  }
  > .img-ai {
    width: 60px;
    height: 24px;
    position: absolute;
    left: 30px;
    top: 15px;
    font-size: 13px;
    text-align: center;
    line-height: 24px;
    color: #ffffff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    font-family: PingFangSC-Regular;
    font-weight: 500;
    background-color: #ee7158;
  }
  > .title {
    color: #fff;
    font-size: 28px;  
    font-weight: bold;
    margin: 30px 15px 0 15px;
  }
  > .desc {
    color: #fff;
    font-size: 14px;
    margin: 10px 15px;
  }
  .text {
    color: #fff;
    font-size: 14px;  
    font-weight: bold;
    margin: 24px 15px 0 15px;
  }
  > .tag-content {
    height: 30px;
    // margin: 15px;
    margin-left: 8px;
    // margin-top: 8px;
    > .tag-item {
      color: #fff;
      font-size: 10px;
      // border: 1px solid #dddddd;
      // border-radius: 6px;
    }
  }
  > .desc-content {
    margin: 15px;
    margin-left: 18px;
    font-size: 16px;
    color: #007ae6;
    font-weight: 600;
  }
  > .open-btn {
    margin: 20px 15px;
    width: 265px;
    height: 44px;
    background-color: #fff;
    border-radius: 4px;
    font-size: 16px;
    color: #007AE6;
    font-weight: bold;
    line-height: 44px;
    text-align: center;
  }
}
// }
</style>
