<template>
  <div class="search-container">
    <div class="site-box" @click="siteClickHandler">
      {{conf.siteText}}
      <div class="bg_img arrow-icon" :style="{'backgroundImage':'url(' + arrowIcon + ')'}"></div>
      <div class="border-right"></div>
    </div>
    <div class="search-input-box">
      <i class="van-icon van-icon-search van-cell__left-icon"></i>
      <input type="search" :placeholder="conf.placeholder" @focus="focusHandler" v-on:input="inputContent" v-model="currentValue">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    conf: {
      type: Object,
      default: function() {
        return { siteText: '全国', placeholder: '请输入楼盘名称' }
      }
    },
    value: String
  },
  data: () => ({
    arrowIcon: require('IMG/market/list__arrow_@2x.png'),
    currentValue: ''
  }),
  methods: {
    siteClickHandler() {
      if (this.$route.name === 'area-select') {
        // 在地区选择页面,直接返回上个
        this.$router.go(-1)
      } else {
        this.$emit('areaClick')
      }
    },
    focusHandler() {
      if (this.$route.name === 'area-select') {
        // 在地区选择页面,直接返回上个
        this.$router.go(-1)
      } else {
        this.$emit('focus')
      }
    },
    inputContent() {
      this.$emit('getContent', this.currentValue)
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
<style lang="less" scoped>
.search-container {
  width: 100%;
  height: 30px;
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
