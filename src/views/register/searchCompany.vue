<template>
  <div class="search-container">
    <search :conf="conf"></search>
  </div>
</template>
<script>
import Search from 'COMP/Search'
export default {
  components: {
    Search
  },
  data: () => ({
      conf: {
          siteText: '',
          placeholderText: '请输入公司名称'
      }
  })
}
</script>
<style lang="less">
</style>


