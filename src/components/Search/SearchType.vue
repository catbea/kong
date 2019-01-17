<template>
  <div class="sortWay-page" v-if="show">
    <ul>
      <li
        v-for="(item,index) in searchData"
        :key="index"
        class="van-hairline--bottom"
        :class="item.checked===item && 'active'"
        @click="selectType(item.name,item.value)"
      >{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data: () => ({
    checked: -1
  }),
  props: {
    searchData: {
      type: Array
    },
    show: { type: Boolean, default: false }
  },
  methods: {
    selectType(val, code) {
      let obj = {
        val: val,
        code: code
      }
      this.$emit('selectSuccess', obj)
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
  position: fixed;
  top: 44px;
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
