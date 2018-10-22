<template>
  <div class="tag-group">
    <tag-item v-for="(item, index) in data" :key="index" :info="item" :styleOptions="styleOptions"></tag-item>
  </div>
</template>
<script>
import TagItem from './TagItem'
export default {
  components: {
    TagItem
  },
  props: {
    data: { type: Array, default: _ => { return [] } },
    textColor: { type: String, default: '#ffffff' },
    backColor: { type: String, default: '#666666' }
  },
  computed: {
    styleOptions () {
      return {
        color: this.textColor,
        'background-color': this.backColor
      }
    }
  }
}
</script>
<style lang="less">
.tag-group {
}
</style>




