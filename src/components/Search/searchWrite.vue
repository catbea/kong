<template>
  <div class="search-container">
    <div class="site-box" @click="siteClickHandler">
      <div class="keyword" @click="selectType">{{conf.siteText}}</div>
      <div class="bg_img arrow-icon" :style="{'backgroundImage':'url(' + arrowIcon + ')'}"></div>
      <div class="border-right"></div>
    </div>
    <div class="search-input-box">
      <!-- <i class="van-icon van-icon-search van-cell__left-icon"></i> -->
      <img src="../../assets/img/market/Group 3@2x.png" class="search-icon">
      <input
        type="search"
        :placeholder="conf.placeholder"
        @focus="focusHandler"
        v-on:input="inputContent"
        v-model="currentValue"
      >
    </div>
    <div class="choose-container">
      <search-type
        :searchData="confData"
        :show="currentIndex===1"
        checkedText="checkedText"
        @selectSuccess="selectSuccess"
      ></search-type>
    </div>
  </div>
</template>

<script>
import SearchType from './SearchType'
export default {
  components: {
    SearchType
  },
  props: {
    conf: {
      type: Object,
      default: function() {
        return { siteText: '全部', placeholder: '请输入文章名称' }
      }
    }
  },
  data: () => ({
    arrowIcon: require('IMG/market/list__arrow_@2x.png'),
    currentValue: '',
    confData: [
      { index: 0, name: '全部', value: '', checked: false },
      { index: 1, name: '分享', value: '', checked: false },
      { index: 2, name: '编辑', value: '', checked: false },
      { index: 3, name: '收藏', value: '', checked: false }
    ],
    currentIndex: -1
  }),
  methods: {
    siteClickHandler() {
      if (this.currentIndex === 1) {
        this.currentIndex = -1
      } else {
        this.currentIndex = 1
      }
    },
    focusHandler() {},
    selectType() {},
    selectSuccess(val) {
      this.conf.siteText = val
      this.currentIndex = -1
      this.$emit('goSearch', val)
    },
    inputContent() {
      this.$emit('getContent', this.currentValue)
    }
  }
}
</script>


<style lang="less">
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
    height: 100%;
    padding: 0 0 0 10px;
    display: inline-block;
    width: 90px;
    > .keyword {
      display: inline-block;
      width: 50px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    > .arrow-icon {
      position: absolute;
      display: inline-block;
      width: 16px;
      height: 16px;
      top: 7px;
      left: 55px;
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
    align-items: center;
    justify-content: center;
    > i {
      padding: 3px 4px 3px 8px;
    }
    > .search-icon {
      width: 24px;
      height: 24px;
    }
    > input {
      width: 100%;
      background-color: #f5f5f5;
      border: none;
      border-radius: 4px;
    }
  }

  > .choose-container {
    position: absolute;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    // overflow: hidden;
  }
}
</style>