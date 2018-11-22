<template>
  <div class="tag-group">
    <tag-item v-for="(item, index) in condition" :key="index" :info="item"></tag-item>
  </div>
</template>
<script>
import TagItem from './TagItem'
export default {
  components: {
    TagItem
  },
  data: _ => ({
    data: null
  }),
  props: {
    condition: { 
      type: Array,
      default:function() {
        return []
      }
    }
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
