<template>
  <div class="estate-recommend">
    <title-bar :conf="titleBarConf"></title-bar>
    <div class="recommend-box">
      <estate-item :info="info"></estate-item>
    </div>
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
    info: Object
  },
  data: _ => ({
    titleBarConf: {
      title: 'AI荐盘',
      linkText: '更多楼盘'
    }
  })
}
</script>
<style lang="less">
// .estate-recommend {
// }
</style>
