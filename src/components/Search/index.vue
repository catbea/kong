<template>
  <div class="search-container">
    <div class="site-box" @click="siteClickHandler">
      {{conf.siteText}}
      <div class="bg_img arrow-icon" :style="{'backgroundImage':'url(' + arrowIcon + ')'}"></div>
      <div class="border-right"></div>
    </div>
    <div class="search-input-box">
      <i class="van-icon van-icon-search van-cell__left-icon"></i>
      <input type="search" :placeholder="conf.placeholder">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    conf: {
      type: Object,
      default: function() {
        return { siteText: '北京市' , placeholder: '请输入平台名称'}
      }
    }
  },
  data: () => ({
    arrowIcon: require('IMG/market/list__arrow_@2x.png')
  }),
  methods: {
    siteClickHandler() {
      this.$router.push('')
    }
  }
}
</script>
<style lang="less" scoped>
.search-container {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: #f5f5f5;
  display: flex;
  > .site-box {
    position: relative;
    font-size: 12px;
    color: #666666;
    line-height: 30px;
    width: 70px;
    height: 100%;
    padding: 0 0 0 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    // border-right: 1px solid red;
    // margin: 10px 0;
    > .arrow-icon {
      position: absolute;
      display: inline-block;
      width: 16px;
      height: 16px;
      top: 7px;
    }
    > .border-right {
      position: absolute;
      display: inline-block;
      z-index: 10;
      border-right: 1px solid #e6e6e6;
      height: 50%;
      top: 25%;
      right: 0px;
    }
  }
  > .search-input-box {
    display: inline-block;
    height: 100%;
    width: 100%;
    display: flex;
    font-size: 12px;
    > i {
      padding: 3px 4px 3px 8px;
    }
    > input {
      width: 100%;
      background-color: #f5f5f5;
      border: none;
      border-radius: 4px;
    }
  }
}
</style>
