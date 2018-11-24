<template>
  <div class="sortWay-page" v-if="domShowInfo.sortShow">
    <ul>
      <li :class="{active:num==1}" @click="a">默认排序</li>
      <li :class="{active:num==2}" @click="b">佣金最高</li>
      <li :class="{active:num==3}" @click="c">人气最多</li>
      <li :class="{active:num==4}" @click="d">开通最多</li>
    </ul>
    <div class="shade" @click="shade"></div>
  </div>
</template>
<script>
export default {
  data: () => ({
    sortShow: true,
    num: null
  }),
  props: {
    domShowInfo: {
      type: Object
    }
  },
  methods: {
    shade() {
      this.domShowInfo.sortShow = false
    },
    a() {
      this.num = 1
    },
    b() {
      this.num = 2
    },
    c() {
      this.num = 3
    },
    d() {
      this.num = 4
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
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 49px;
      border-bottom: 1px solid #e6e6e6;
    }
  }
  .shade {
    flex: 1;
    opacity: 0.6;
    background: rgba(0, 0, 0, 0.6);
  }
}
</style>
