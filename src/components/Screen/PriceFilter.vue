<template>
  <div class="price-filter" v-if="show">
    <ul>
      <li class="van-hairline--bottom" v-for="(item, index) in conf" :key="index" :class="checked===index && 'active'" @click="checked=index">{{item}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    value: String
  },
  data: () => ({
    checked: null,
    conf: {
      '-1,-1': '不限',
      '-1,10000': '1万以下',
      '10000,30000': '1万-3万',
      '30000,50000': '3万-5万',
      '50000,100000': '5万-10万',
      '100000,-1': '10万以上'
    }
  }),
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
.price-filter {
  width: 100%;
  height: 82%;
  display: flex;
  flex-direction: column;
  // position: fixed;
  > ul {
    background: rgba(255, 255, 255, 1);
    padding: 0 20px;
    > .active {
      color: rgba(0, 122, 230, 1);
    }
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
