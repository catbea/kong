<template>
  <div class="my-estate-list">
    <title-bar class="title-container" :conf="titleBarConf"></title-bar>
    <estate-item v-for="(item,index) in list" :key="index" :info="item" @click="godynamicsInfo"></estate-item>
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
      link: '/user/myMarket'
    }
  }),
  methods: {
    godynamicsInfo() {
      this.$emit('click', this.info)
    }
  }
}
</script>
