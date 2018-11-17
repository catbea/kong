<template>
  <div class="estate-recommend">
    <title-bar :conf="titleBarConf"></title-bar>
    <div class="recommend-box">

    </div>
  </div>
</template>
<script>
import TitleBar from 'COMP/TitleBar'
export default {
  components: {
    TitleBar
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
