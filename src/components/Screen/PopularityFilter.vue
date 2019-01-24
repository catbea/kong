<template>
  <div class="popularity-filter" v-show="show" :class="{act:flag}">
    <ul>
      <li class="van-hairline--bottom" v-for="(item,index) in conf" :key="index" :class="checked===index&&'active'" @click="itemClick(item,index)">{{item}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  created() {
    if (this.$route.name === 'mymarket') {
      this.flag = true
    }
  },
  mounted() {},
  props: {
    show: { type: Boolean, default: false },
    value: String
  },
  data: () => ({
    flag: false,
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
.popularity-filter {
  width: 100%;
  // height: 82%;
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
  &.act {
    height: 265px;
    overflow: scroll;
  }
}
</style>
