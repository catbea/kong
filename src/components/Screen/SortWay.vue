<template>
  <div class="sortWay-page" v-show="show">
    <ul>
      <li v-for="(item,index) in conf" :key="index" class="van-hairline--bottom" :class="{active:checked===index}" @click="activeHandle(index)">{{item}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data: () => ({
    checked: '-1',
    conf: {
      '1': '默认排序',
      '3': '人气排序',
      '4': '开通最多'
    }
  }),
  props: {
    show: { type: Boolean, default: false },
    value: String
  },
  methods: {
    activeHandle(index) {
      this.checked = index
      this.$emit('activeHandle')
    }
  },
  watch: {
    checked(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.checked = val
    }
  }
}
</script>
<style lang="less">
.sortWay-page {
  width: 375px;
  height: 100%;
  display: flex;
  flex-direction: column;
  // position: fixed;
  .active {
    color: rgba(0, 122, 230, 1) !important;
  }
  ul {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    padding-left: 10px;
    li {
      height: 49px;
      font-size: 15px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 49px;
    }
  }
}
</style>
