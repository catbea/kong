<template>
  <div class="my-estate-list">
    <title-bar :conf="titleBarConf"></title-bar>
    <estate-item v-for="(item,index) in list" :key="index" :info="item"></estate-item>

  </div>
</template>
<script>
import EstateItem from 'COMP/Dynamics/EstateItem'
import TitleBar from 'COMP/TitleBar'

export default {
  components: {
    TitleBar,
    EstateItem
  },
  props: {
    list: Array
  },
  data: _ => ({
    titleBarConf: {
      title: '我的楼盘',
      linkText: '更多楼盘'
    }
  }),
  methods: {

  }
}
</script>
<style lang="less">
.my-estate-list {
}
</style>
