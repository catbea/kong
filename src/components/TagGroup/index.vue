<template>
  <div class="tag-group">
    <tag-item v-for="(item, index) in arr" :key="index" :info="item"></tag-item>
  </div>
</template>
<script>
import TagItem from './TagItem'
export default {
  components: {
    TagItem
  },
  props: {
    arr: { type: Array }
  }
}
</script>
<style lang="less">
.tag-group {
  display: flex;
  overflow: hidden;
  // flex-wrap: wrap;
}
</style>
