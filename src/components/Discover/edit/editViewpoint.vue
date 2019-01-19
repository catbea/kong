<template>
  <div class="edit-viewpoint-container">
    <div class="viewpoint-container" @click="viewpointAreaClick">{{currentValue === '' ? '您可以在这里输入观点,若无内容分享后将不会进行展示.' : currentValue}}</div>
    <van-popup class="write-board" v-model="viewpointEditShow" position="bottom" :close-on-click-overlay="false">
      <p class="write-title">发表观点</p>
      <div class="pull-btn" @click="viewpointPullHandler">发布</div>
      <textarea class="write-content" v-model="currentValue"/>
    </van-popup>
  </div>
</template>
<script>
export default {
  props: {
    value: { type: String, default: '' }
  },
  data: () => ({
    viewpointEditShow: false,
    currentValue: ''
  }),
  methods: {
    viewpointAreaClick() {
      this.viewpointEditShow = true
    },
    viewpointPullHandler() {
      this.viewpointEditShow = false
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue(val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="less">
.edit-viewpoint-container {
  border: 1px dashed #969ea8;
  height: 90px;
  margin: 0 -5px 5px;
  background: rgba(150, 158, 168, 0.08);
  font-size: 14px;
  color: #969ea8;
  padding: 7px 9px;
  > .viewpoint-container {
    width: 100%;
    height: 100%;
    word-break: break-all;
  }
  > .write-board {
    height: 187px;
    > .pull-btn {
      position: absolute;
      transform: translate(-50%, -50%);
      top: 30px;
      right: -15px;
      font-size: 14px;
      font-weight: 400;
      background: #007ae6;
      border-radius: 100px;
      color: #fff;
      padding: 5px 21px;
    }
    > .write-title {
      font-size: 20px;
      color: #333333;
      padding: 18px 16px;
      font-weight: 600;
    }
    > .write-content {
      font-size: 16px;
      color: #13294f;
      border: none;
      margin: 0 15px;
      padding: 8px;
      width: 345px;
      height: 112px;
      letter-spacing: 1px;
      background: rgba(150, 158, 168, 0.08);
      resize: none;
    }
  }
}
</style>
