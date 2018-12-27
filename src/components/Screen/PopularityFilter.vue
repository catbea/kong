<template>
  <div class="popularity-filter" v-if="show">
    <ul>
      <li class="van-hairline--bottom" v-for="(item,index) in conf" :key="index" :class="checked===index&&'active'" @click="itemClick(item,index)">{{item}}</li>
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
      ',500': '500以下',
      '500,1000': '500-1000',
      '1000,5000': '1000-5000',
      '5000,10000': '5000-10000',
      '10000,-1': '10000以上'
    }
  }),
  methods: {
    itemClick(item, index) {
      this.checked = index
      this.$emit('checkedText', item)
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
.popularity-filter {
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
