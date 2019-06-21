<template>
  <van-tabbar class="learn-tabbar" active-color="#007AE6" v-model="active">
    <van-tabbar-item :to="{path: tab.url}" :key="tab.name" v-for="tab in tabList">
      <span>{{tab.name}}</span>
      <img slot="icon" slot-scope="props" :src="props.active ? tab.icon[0] : tab.icon[1] ">
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'tabbar',
  data() {
    const { query: { linkerId } } = this.$route;
    return {
      active: 0,
      tabList: [
        {
          name: '首页',
          url: `/user/learn?linkerId=${linkerId}`,
          icon: [require('IMG/user/learn/home-icon-on.png'), require('IMG/user/learn/home-icon.png')]
        },
        {
          name: '学习记录',
          url: `/user/learn/record?linkerId=${linkerId}`,
          icon: [require('IMG/user/learn/record-icon-on.png'), require('IMG/user/learn/record-icon.png')]
        }
      ]
    }
  },
  created() {
    const { path } = this.$route;
    if (path == '/user/learn' ||　path == '/user/learn/') {
      this.active = 0;
    } else {
      this.active = 1;
    }
  }
}
</script>

<style lang="less">
.learn-tabbar {
  height: 49px;
  z-index: 999 !important;
  .van-tabbar-item__icon img {
    height: 20px;
  }
  .van-tabbar-item__text {
    font-size: 10px;
    font-weight: 400;
  }
  &::after {
    border: 0;
  }
}
</style>