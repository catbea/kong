<template>
  <div class="popup-container" v-if="show">
    <div class="bg_img guide-share" :style="{backgroundImage:'url('+shareGuideImg+')'}"></div>
    <div class="close-title">点击此处分享给好友</div>
    <div class="close-know" @click="popupShowControl(false)">知道了</div>
  </div>
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
    shareGuideImg: require('IMG/guidance/guide_share@2x.png'),
  }),
  methods: {
    popupShowControl() {
        this.show = false
        window.localStorage.setItem('isFirst', true)
    }
  },
  watch: {
    show(val) {
      this.show = val
    },
    currentShow(val) {
      this.$emit('update:show', val)
    }
  }
}
</script>
<style lang="less">
.popup-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: #000;
  opacity:0.65;
  z-index: 50;
  > .guide-share {
      width: 69px;
      height: 171px;
      position: absolute;
      top: 4px;
      right: 20px;
  }
  > .close-title {
    position: absolute;
    height: 24px;
    right: 97px;
    top: 163px;
    color: white;
    font-size: 17px;
  }
  > .close-know {
    color: white;
    font-size: 17px;
    border: 1px solid #ffffff;
    border-radius: 16px;
    width: 95px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    position: absolute;
    bottom: 200px;
    left: 50%;
    transform: translate(-50%, -50%);
  }

}
</style>
