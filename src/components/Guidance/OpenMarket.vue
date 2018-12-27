<template>
  <van-popup class="popup-container" v-model="currentShow">
    <img class="close-btn" :src="closeImg" @click="closeHandler">
    <div class="bg_img img-content" :style="{backgroundImage:'url(' + bgImg + ')'}"></div>
    <div class="bg_img img-ai" :style="{backgroundImage:'url(' + aiImg + ')'}"></div>
    <div class="tag-content">
      <div class="tag-item">地铁房</div>
      <div class="tag-item">商业潜力</div>
      <div class="tag-item">优质小区</div>
    </div>
    <p class="desc-content">{{`${this.conf&&this.conf.city||''}${this.conf&&this.conf.openTimes||0}人都在看`}}</p>
    <div class="open-btn" @click="openHandler">0元开通</div>
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
    bgImg: require('IMG/guidance/marketGuidance.png'),
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
  height: 376px;
  background-color: #fff;
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
    height: 200px;
    border-radius: 3px;
    margin: 15px;
    position: relative;
  }
  > .img-ai {
    width: 60px;
    height: 24px;
    position: absolute;
    left: 30px;
    top: 15px;
  }
  > .tag-content {
    height: 30px;
    margin: 15px;
    > .tag-item {
      color: #333333;
      font-size: 14px;
      border: 1px solid #dddddd;
      border-radius: 6px;
    }
  }
  > .desc-content {
    margin: 15px;
    font-size: 16px;
    color: #007ae6;
    font-weight: 600;
  }
  > .open-btn {
    margin: 15px;
    width: 265px;
    height: 44px;
    background-color: #ee7158;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    line-height: 44px;
    text-align: center;
  }
}
// }
</style>
