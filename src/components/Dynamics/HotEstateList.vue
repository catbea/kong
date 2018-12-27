<template>
  <div class="hot-estate-list">
    <title-bar class="title-container" :conf="titleBarConf" v-if="list&&list.length>0"></title-bar>
    <market-describe v-for="(item,index) in list" :key="index" :itemInfo="item" @skipDetail="godynamicsInfo(item)" @openReturnHandle="openHandler(item)"></market-describe>
  </div>
</template>
<script>
import MarketDescribe from 'COMP/MarketDescribe'
import TitleBar from 'COMP/TitleBar'

export default {
  components: {
    TitleBar,
    MarketDescribe
  },
  props: {
    list: Array,
    info: { type: Object }
  },
  data: () => ({
    titleBarConf: {
      title: '热门楼盘',
      linkText: '更多楼盘',
      link: '/market'
    }
  }),
  methods: {
    godynamicsInfo(item) {
      this.$emit('click', item)
    },
    openHandler(item) {
      this.$emit('open', item)
    }
  },
  watch: {
    list(val) {
      for (let temp of val) {
        temp.linkerImg = temp.linkerHeadUrl
      }
    }
  }
}
</script>
