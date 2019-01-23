<template>
  <div class="area-filter" v-show="show" :class="{act:flag}">
    <ul>
      <li v-for="(item,index) in list" :key="index" class="van-hairline--bottom" :class="checked===item && 'active'" @click="active(item)">{{item}}</li>
    </ul>
  </div>
</template>
<script>
import { getChildren } from '@/utils/fullArea'
export default {
  props: {
    parent: { type: String, default: '北京市' },
    show: { type: Boolean, default: false },
    value: String
  },
  data: () => ({
    flag: false,
    list: null,
    checked: null
  }),
  created() {
    if (this.$route.name === 'mymarket') {
      this.flag = true
    }
    this.list = {
      '0': '不限'
    }
    if (this.parent) this.list = Object.assign(this.list, getChildren(this.parent))
  },
  mounted() {
    
  },
  methods: {
    active(item) {
      this.checked = item
      this.$emit('activeHandle')
    }
  },
  watch: {
    checked(val) {
      this.$emit('input', val)
      this.$emit('checkedText', val)
    },
    value(val) {
      this.checked = val
    }
  }
}
</script>
<style lang="less">
.area-filter {
  width: 100%;
  height: 82%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  > ul {
    background: rgba(255, 255, 255, 1);
    padding: 0 20px;
    // height:420px;
    max-height:420px;
    overflow:auto;
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
  // &.act {
  //   height: 265px;
  // }
}
</style>
