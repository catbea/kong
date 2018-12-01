<template>
  <div class="sortWay-page" v-if="show">
    <ul>
      <li :class="checked==='-1,-1' && 'active'" @click="checked='-1,-1'">不限</li>
      <li :class="checked==='0,10000' &&'active'" @click="checked='0,10000'">1万以下</li>
      <li :class="checked==='10000,30000'&&'active'" @click="checked='10000,30000'">1万-3万</li>
      <li :class="checked==='30000,50000'&&'active'" @click="checked='30000,50000'">3万-5万</li>
      <li :class="checked==='50000,100000'&&'active'" @click="checked='50000,100000'">5万-10万</li>
      <li :class="checked==='100000,-1'&&'active'" @click="checked='100000,-1'">10万以上</li>
    </ul>
    <!-- <div class="shade" @click="shade"></div> -->
  </div>
</template>
<script>
export default {
  data: () => ({
    checked: null
    // sortShow: true,
    // num: null
  }),
  // model: {
  //   prop: 'checked',
  //   event: 'change'
  // },
  props: {
    show: { type: Boolean, default: false },
    value: String
  },
  watch: {
    checked (val) {
      // this.checked = val
      console.log(val);
      this.$emit('input', val)
    },
    value(val){
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
  position: fixed;
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
  .shade {
    flex: 1;
    opacity: 0.6;
    background: rgba(0, 0, 0, 0.6);
  }
}
</style>
