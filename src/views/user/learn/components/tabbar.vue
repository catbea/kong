<template>
  <van-tabbar class="learn-tabbar" active-color="#007AE6" v-model="active">
    <van-tabbar-item v-for="tab in tabList">
      <span>{{tab.name}}</span>
      <img slot="icon" slot-scope="props" :src="props.active ? tab.icon[0] : tab.icon[1] ">
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'tabbar',
  data() {
    return {
      active: 0,
      tabList: [
        {
          name: '学习',
          icon: [require('IMG/user/learn/home-icon-on.png'), require('IMG/user/learn/home-icon.png')]
        },
        {
          name: '记录',
          icon: [require('IMG/user/learn/record-icon-on.png'), require('IMG/user/learn/record-icon.png')]
        }
      ]
    }
  }
}
</script>

<style lang="less">
.learn-tabbar {
  height: 49px;
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