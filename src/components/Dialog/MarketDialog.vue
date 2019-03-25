<template>
  <van-popup class="dialog-container" v-model="currentShow">
    <div class="shadow_box dialog-box">
      <div class="dialog-title">长按识别查看更多</div>
      <!-- <div class="bg_img mini-qrcode" :style="{backgroundImage:'url('+(info&&info.qrCode)+')'}"></div> -->
      <img class="mini-qrcode" :src="info&&info.qrCode"></img>
      <div class="dialog-content">
        <p class="dialog-name" :style="{'fontSize':info.linkerName.length>7?'15px':'20px'}">{{info&&info.linkerName}}</p>
        <p class="dialog-tag">{{info&&info.tagList&&info.tagList.join(' ')}}</p>
        <p class="dialog-price" v-if="info&&info.linkerPrice&&info.linkerPrice==='0'">价格待定</p>
        <p class="dialog-price" v-else>
          <span v-if="info&&info.linkerPrice">均价</span>
          {{info&&info.linkerPrice}}{{info&&info.priceUnit}}
        </p>
      </div>
      <div class="dialog-bottom">开启买房新模式 及时获取一手房源信息</div>
      <div
        class="bg_img dialog-close"
        :style="{backgroundImage:'url('+closeImg+')'}"
        @click="popupShowControl(false)"
      ></div>
    </div>
  </van-popup>
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
      console.log('你是真的吗:'+val)
      this.currentShow = val
    },
    currentShow(val) {
      console.log('我是真的:'+val)
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
  // top: 0;
  background-color: rgba(0, 0, 0, 0.1);
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
      margin: 20px auto 10px;
      width: 162px;
      height: 162px;
    }
    > .dialog-content {
      padding: 0 36px;
      > .dialog-name {
        color: #333;
        font-weight: bold;
        height: 28px;
        text-align: center;
      }
      > .dialog-tag {
        color: #333;
        font-size: 12px;
        height: 18px;
        text-align: center;
      }
      > .dialog-price {
        color: #333;
        font-size: 12px;
        margin-top: 13px;
        text-align: center;
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
