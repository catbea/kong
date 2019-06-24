<template>
  <div class="my-estate-list">
    <title-bar class="title-container" :conf="titleBarConf" v-if="list&&list.length>0"></title-bar>
    <estate-item v-for="(item,index) in list" :key="index" :info="item" :conf="{op:'share'}" :itemBorder="true" @click="godynamicsInfo(item)" @share="shareHandler(item)"></estate-item>
  </div>
</template>
<script>
import EstateItem from 'COMP/EstateItem'
import TitleBar from 'COMP/TitleBar'

export default {
  components: {
    TitleBar,
    EstateItem
  },
  props: {
    list: Array,
    info: { type: Object }
  },
  data: () => ({
    titleBarConf: {
      title: '我的楼盘',
      linkText: '更多楼盘',
      link: '/market/classify/mymarket'
    }
  }),
  methods: {
    godynamicsInfo(item) {
      this.$emit('click', item)
    },
    shareHandler(item) {
      this.$emit('share', item)
    }
  }
}
</script>
<style lang="less">
.my-estate-list {
  margin-bottom: 10px;
}
</style>
