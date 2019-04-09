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
  overflow: hidden;
  padding: 2px 0;
  .tag-item{
    height: 12px;
    line-height: 14px;
    padding: 4px 8px;
    box-sizing: content-box;
  }
  .tag-item:nth-child(1) {
    margin-left: 0;
  }
  .tag-item:nth-child(3) {
    margin-left: -6px;
  }
}
</style>
