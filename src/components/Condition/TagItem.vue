<template>
  <div class="tag-item" :style="styleComputed">{{info.text}}</div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    styleComputed() {
      return {
        color: this.info.textColor || '#5C5F66',
        background: this.info.backColor || '#8F9FB1'
      }
    }
  }
}
</script>
<style lang="less">
.tag-item {
  display: inline-block;
  font-size: 12px;
  transform: scale(0.8);
  height: 7px;
  padding: 5px;
  line-height: 7px;
  border-radius: 3px;
}
</style>
