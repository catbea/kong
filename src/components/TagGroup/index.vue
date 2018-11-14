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
  data:_=>({
    data:null
  }),
  props: {
    arr: {
      type: Array,
      default: _ => {
        return []
      }
    },
    textColor: { type: String, default: '#ffffff' },
    backColor: { type: String, default: '#666666' }
  },
  computed: {
    styleOptions() {
      return {
        color: this.textColor,
        'background-color': this.backColor
      }
    }
  },
  watch:{
    arr:function (params) {
      this.data=params
    }
  }
}
</script>
<style lang="less">
.tag-group {
}
</style>
