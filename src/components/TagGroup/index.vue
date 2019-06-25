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
  data: () => ({
    data: null
  }),
  props: {
    arr: [Array, String]
  }
}
</script>
<style lang="less">
.tag-group {
  display: flex;
}
</style>
