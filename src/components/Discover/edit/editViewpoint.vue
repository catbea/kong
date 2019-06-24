<template>
  <div class="edit-viewpoint-container">
    <div v-if="status === 'edit'" class="box_border viewpoint-container" :class="{'no-content-style':!currentValue,'content-style':currentValue}" @click="viewpointAreaClick">{{currentValue === '' ? '您可以在这里输入观点,若无内容分享后将不会进行展示.' : currentValue}}</div>
    <div v-if="status === 'view' && currentValue !==''" class="discover-viewpoint">
      <div class="viewpoint-line"></div>
      <div class="viewpoint-top">
        <div style="color:#333333;font-size:18px;font-weight:bold;">观点</div>
        <div class="viewpoint-right">
        </div>
      </div>
      <div class="viewpoint-content content-style">{{currentValue}}</div>
    </div>
    <van-popup class="write-board" v-model="viewpointEditShow" position="bottom">
      <p class="write-title">发表观点</p>
      <div class="pull-btn" @click="viewpointPullHandler">发布</div>
      <textarea class="write-content" maxlength="140" v-model="tempValue" @blur="blurHandler"/>
    </van-popup>
  </div>
</template>
<script>
export default {
  props: {
    value: { type: String, default: '' },
    status: { type: String, default: 'edit' }
  },
  data: () => ({
    viewpointEditShow: false,
    currentValue: '',
    tempValue: ''
  }),
  methods: {
    viewpointAreaClick() {
      this.viewpointEditShow = true
      this.tempValue = this.currentValue
    },
    viewpointPullHandler() {
      this.viewpointEditShow = false
      this.currentValue = this.tempValue
    },
    blurHandler() {
      document.activeElement.scrollIntoViewIfNeeded(true)
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
      this.tempValue = val
    },
    currentValue(val) {
      this.$emit('input', val)
    }
    // tempValue(val){
    //   this.currentValue = val
    // }
  }
}
</script>
<style lang="less">
.edit-viewpoint-container {
  margin: 0 -5px;
  font-size: 14px;
  color: #13294f;
  padding: 5px;

  > .viewpoint-container {
    width: 100%;
    min-height: 140px;
    word-break: break-all;
    background: rgba(0,122,230,0.1);
    padding: 7px 9px;
  }
  .no-content-style{
    color: #9CA5B5;
    font-size: 16px;
  }
  .content-style{
    color: #13284D;
    font-size: 16px;
    font-weight: bold;
  }
  > .discover-viewpoint {
    // margin: 20px 16px;
    padding: 16px;
    position: relative;
    box-sizing: border-box;
    border: 1px dashed rgba(0,122,230,0.5);
    > .viewpoint-line {
      width: 2px;
      height: 13px;
      background-color: #007ae6;
      position: absolute;
      top: 22px;
      left: 0;
    }
    > .viewpoint-top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      > .viewpoint-right {
        display: flex;
        > .viewpoint-name {
          margin-left: 7px;
          margin-top: -5px;
        }
      }
    }
    > .viewpoint-content {
      color: #13284D;
      font-size: 16px;
      font-weight: bold;
      margin-top: 20px;
      line-height: 1.5;
    }
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
