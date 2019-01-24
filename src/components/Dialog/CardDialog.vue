<template>
  <div class="dialog-container" v-if="currentShow">
    <div class="shadow_box dialog-box">
      <div class="dialog-title">长按识别查看更多</div>
      <!-- <div class="bg_img mini-qrcode" :style="{backgroundImage:'url('+(info&&info.miniQrCode)+')'}"></div> -->
      <img class="mini-qrcode" :src="info&&info.miniQrCode"></img>
      <div class="dialog-content">
        <p class="dialog-name">{{info&&info.agentName}}</p>
        <p class="dialog-tag">{{info&&info.tagList&&info.tagList.slice(0,3).join(' ')}}</p>
        <p class="dialog-mobile">{{info&&info.mobile}}</p>
        <p class="dialog-adder">{{info&&info.institutionName}}</p>
      </div>
      <div class="dialog-bottom">开启买房新模式 及时获取一手房源信息</div>
      <div
        class="bg_img dialog-close"
        :style="{backgroundImage:'url('+closeImg+')'}"
        @click="popupShowControl(false)"
      ></div>
    </div>
  </div>
</template>
<script>
import * as types from '@/store/mutation-types'
export default {
  props: {
    show: { type: Boolean, default: false },
    info: {
      type: Object
    }
  },
  data: () => ({
    currentShow: false,
    closeImg: require('IMG/user/close_popup.png')
  }),
  methods: {
    popupShowControl(val) {
      this.currentShow = false
      this.$emit('close', val)
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
<style lang="less" scoped>
.dialog-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  > .dialog-box {
    width: 260px;
    height: 371px;
    border-radius: 10px;
    background-color: #ffffff;
    position: relative;
    text-align: center;
    > .dialog-title {
      text-align: center;
      margin-top: 22px;
      color: #333;
      font-size: 16px;
    }
    > .mini-qrcode {
      //   position: absolute;
      //   bottom: 200px;
      //   left: 50%;
      //   transform: translate(-50%, -50%);
      margin: 20px auto;
      width: 162px;
      height: 162px;
    }
    > .dialog-content {
      padding: 0 36px;
      > .dialog-name {
        color: #333;
        font-size: 20px;
        font-weight: bold;
        height: 28px;
        text-align: center;
      }
      > .dialog-tag {
        color: #333;
        font-size: 12px;
        height: 18px;
      }
      > .dialog-mobile {
        color: #333;
        font-size: 12px;
        margin-top: 13px;
      }
      > .dialog-adder {
        color: #333;
        font-size: 12px;
        margin-top: 6px;
      }
    }
    > .dialog-bottom {
      width: 100%;
      height: 32px;
      line-height: 32px;
      background-color: #f7f9fa;
      position: absolute;
      bottom: 0;
      color: #969ea8;
      font-size: 12px;
      text-align: center;
      border-radius: 10px;
    }
    > .dialog-close {
      color: white;
      font-size: 17px;
      border: 1px solid #ffffff;
      border-radius: 16px;
      width: 16px;
      height: 16px;
      text-align: center;
      position: absolute;
      right: 8px;
      top: 8px;
    }
  }
}
</style>
