<template>
  <div class="search-container">
    <div class="site-box" @click="siteClickHandler">
      <div class="keyword">{{conf.siteText}}</div>
      <div class="bg_img arrow-icon" :style="{'backgroundImage':'url(' + arrowIcon + ')'}"></div>
      <div class="border-right"></div>
    </div>
    <div class="search-input-box">
      <img src="../../assets/img/market/Group 3@2x.png" class="search-icon">
      <input type="search" :placeholder="conf.placeholder" @focus="focusHandler" v-on:input="inputContent" v-model="currentValue" @blur="blur">
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
    blur(){
      setTimeout(() => {
        document.activeElement.scrollIntoViewIfNeeded(true)
      },10)
    },
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
  mounted() {
    setTimeout(() => {
      this.currentValue = this.value
    }, 1)
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
    height: 30px;
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
    vertical-align: middle;
    > i {
      padding: 3px 4px 3px 8px;
    }
    .search-icon {
      width: 24px;
      height: 24px;
      vertical-align: middle;
      margin-right: -4px;
    }
    input {
      width: 100%;
      background-color: #f5f5f5;
      border: none;
      border-radius: 4px;
      height:24px;
      line-height:24px;
      margin-top: 3px;
    }
  }
}
</style>
